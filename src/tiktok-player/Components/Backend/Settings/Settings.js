import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel, Button, Spinner } from '@wordpress/components';

import ProModal from '../../../../Pro-modal/ProModal';

import { tabController, generateString } from '../../../utils/functions';
import { btnTiktok, comment, heart, playCount } from '../../../utils/icons';

import usePremiumInEditor from '../../../../hooks/usePremiumInEditor';

import options from '../../../utils/options';
import getTimeFromString from '../../../utils/getTimeFromString';
import General from './General/General';
import Style from './Style/Style';
import Patterns from './Patterns/Patterns';
const { generalStyleTabs } = options;

const Settings = ({ attributes, elId, setAttributes, clientId }) => {
	const { videosLists, overlyIconColor, overlyIcon, viewLoadBtnIcon, loadMoreBtnColors, authorized, clearCache, profileCacheT, videoCacheT } = attributes;

	const { isPremium } = usePremiumInEditor();

	const [loading, setLoading] = useState(false);
	const [proModalOpen, setProModalOpen] = useState(false);
	const [postId, setPostId] = useState(null);
	const state = generateString(15);

	// Cache Clear 
	const handleCacheClear = async () => {
		setLoading(true);

		const response = await fetch(`${ttpData.ajaxUrl}?action=ttp_tiktok_clear&nonce=${ttpData?.nonce}&action_type=clear_cache&key=${elId}&profileCacheTime=${getTimeFromString(profileCacheT)}&videoCacheTime=${getTimeFromString(videoCacheT)}`);

		await response.json();
		setLoading(false);
		setAttributes({ clearCache: !clearCache });
	}

	// Authorized 
	const handleUnauthorized = async () => {
		setLoading(true);
		try {
			const response = await fetch(`${ttpData.ajaxUrl}?action=ttp_tiktok_clear&nonce=${ttpData?.nonce}&action_type=unauthorized&key=${elId}`);
			await response.json();
			setAttributes({ authorized: false });
			setLoading(false);
		} catch (error) {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (window.location.href.includes('data')) {
			// wp.data.dispatch('core/editor').autosave();
		}
		const postId = wp.data.select("core/editor").getCurrentPostId();
		setPostId(postId);
	}, []);

	useEffect(() => {
		handleCacheClear();
	}, [videosLists])

	useEffect(() => {
		playCount(overlyIconColor, overlyIcon?.size);
		comment(overlyIconColor, overlyIcon?.size);
		heart(overlyIconColor, overlyIcon?.size);
	}, [overlyIconColor, overlyIcon]);

	useEffect(() => {
		btnTiktok(loadMoreBtnColors?.color, viewLoadBtnIcon?.size);
	}, [viewLoadBtnIcon]);

	const requireAtt = { attributes, setAttributes, isPremium, setProModalOpen, clientId }

	return <>
		<InspectorControls>
			{authorized ?
				<div className='ttpAuthorization'>
					<Button className='ttpAuthBtn' onClick={handleUnauthorized} disabled={loading}>{__('Remove Authorize', 'tiktok')}</Button>
					<Button className='ttpAuthBtn' disabled={loading} onClick={handleCacheClear}>{__('Clear Cache', 'tiktok')}</Button>

					{loading && <h3 className='wppLoading'><Spinner /></h3>}
				</div>
				: <div className='ttpAuthorization'><Button className='ttpAuthBtn' onClick={async () => {
					const { href, origin, pathname } = window.location;
					const beforeWPAdmin = pathname?.substring(0, pathname?.indexOf('wp-admin'));

					const pageUrl = origin?.includes('action=edit') ? href : `${origin}${beforeWPAdmin}wp-admin/post.php?post=${postId}&action=edit`;
					await wp.data.dispatch('core/editor').savePost();
					window.location.href = `https://api.bplugins.com/tiktok-landing/?state=${state}&redirect_url=${pageUrl}`
				}} > {__('Add TikTok Account', 'tiktok')}</Button></div>
			}

			{authorized && <TabPanel className='bPlTabPanel ttpTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={() => tabController()}>{tab => <>

				{'general' === tab.name && <General {...requireAtt} videosLists={videosLists} handleCacheClear={handleCacheClear} />}

				{'style' === tab.name && <Style {...requireAtt} />}

				{'patterns' === tab.name && <Patterns setProModalOpen={setProModalOpen} isPremium={isPremium} clientId={clientId} />}

			</>}</TabPanel>}
		</InspectorControls>
		{/* Moadal  */}
		<ProModal isProModal={proModalOpen} setIsProModal={setProModalOpen} block='B TikTok Feeds'>
			<li>{__('Videos per page', 'tiktok-feed')}</li>
			<li>{__('Show Hide Video Overly like,share and view', 'tiktok-feed')}</li>
			<li>{__('Video overly icon style', 'tiktok-feed')}</li>
			<li>{__('Share button text change', 'tiktok-feed')}</li>
			<li>{__('Share button style', 'tiktok-feed')}</li>
			<li>{__('Cache time set profile and video', 'tiktok-feed')}</li>
			<li>{__('Profile 3 layout', 'tiktok-feed')}</li>
			<li>{__('Profile name style', 'tiktok-feed')}</li>
			<li>{__('Info style', 'tiktok-feed')}</li>
			<li>{__('Load more button text change', 'tiktok-feed')}</li>
		</ProModal>

	</>;
};
export default Settings;