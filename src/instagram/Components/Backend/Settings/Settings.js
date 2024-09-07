import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, RangeControl, ToggleControl, SelectControl, __experimentalUnitControl as UnitControl, __experimentalNumberControl as NumberControl, Dashicon, CheckboxControl, TextControl } from '@wordpress/components';
import {produce} from 'immer';

import { tabController } from '../../../../../../Components/utils/functions';

// Settings Components
import { Label, Background, BColor, BDevice, BorderControl, ColorsControl, InlineMediaUpload, SpaceControl, Typography } from '../../../../../../Components';
import { pxUnit, perUnit, emUnit } from '../../../../../../Components/utils/options';

import ProModal from '../../ProModal';

import Loading from '../../Loading';
import useAllAccounts from '../../../hooks/useAllAccounts';
import useBlockAccounts from '../../../hooks/useBlockAccounts';
import { hasIdInAccounts, isSameArray } from '../../../utils/functions';
import { imgHoverEffects, captionStyles, captionStylesPro, generalStyleTabs, timePeriods } from '../../../utils/options';
import { remLocal } from '../../../not_used/services';

const Settings = ({ attributes, setAttributes, setPageNumber }) => {
	const { isPremium, accounts, accessToken, itemVisible, isPopup, isLink, isLinkNewTab, isProfile, profileImg, profileInfo, isFollowBtn, isFollowBtnInFooter, isCaption, isRemCaptionHash, captionLength, isLoadMore, columns, columnGap, rowGap, background, padding, border, followBtnColors, followBtnHovColors, imgHoverEffect, captionStyle, captionBG, captionTypo, captionColor,cacheTime, cacheTimePeriod, cId  } = attributes;
	const { photoSize, popupPhotoSize, userNameColor, isFollowers, followersColor, isFollows, isName, name, nameColor, isBio, bio, bioColor } = profileInfo || {};

	const { allAccounts, loading: allAccLoading } = useAllAccounts(accessToken);
	const { accounts: blockAccounts, loading } = useBlockAccounts(allAccounts, attributes);

	const [device, setDevice] = useState('desktop');
	const [proModalOpen, setProModalOpen] = useState(false);

	useEffect(() => {
		window.addEventListener('ifbEvent', () => {
			
			if (!allAccLoading) {
				const allAccountsIds = allAccounts?.map(a => a?.user_id);

				const filtered = accounts?.filter(bA => allAccountsIds?.includes(bA?.user_id));

				if (!isSameArray(accounts, filtered, 'user_id')) {
					setAttributes({ accounts: filtered });
				}
			}
		});
	}, [allAccounts]);

	const updateObj = (obj, prop, val) => setAttributes({ [obj]: { ...attributes[obj], [prop]: val } });

	if (loading) {
		return <Loading />
	}

	const isBusiness = 'business' === blockAccounts[0]?.connectType;

	console.log(allAccounts);
	

	return <><InspectorControls>
		<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
			{'general' === tab.name && <>
				<PanelBody className='bPlPanelBody help' title={__('Help', 'instagram-feed')} initialOpen={false}>
					<div className='helpItem'>
						<a href='https://bblockswp.com/docs/instagram-feed-block/' target='_blank' rel='noreferrer'><Dashicon icon='book' />{__('Read Documentation', 'instagram-feed')}</a>
					</div>

					<div className='helpItem rateUs'>
						<a href='https://wordpress.org/support/plugin/social-feed-block/reviews/#new-post' target='_blank' rel='noreferrer'>
							<span><Dashicon icon='star-filled' />{__('Would you please rate us?', 'instagram-feed')}</span>
							<span>{__('We are new and we need your help to grow!🙏', 'instagram-feed')}</span>
						</a>
					</div>
				</PanelBody>

				<PanelBody className='bPlPanelBody' title={__('Instagram Settings', 'instagram-feed')}>

					{/* {!allAccLoading && allAccounts?.length ? <div className='ifbAccounts'>
						{allAccounts?.map((account, index) => {
							const { user_id, connectType = 'personal' } = account;

							return <div className='ifbProfileNameWrap' key={index}>
								{user_id && <CheckboxControl checked={hasIdInAccounts(accounts, user_id)} onChange={(val) => setAttributes({ accounts: val ? [...accounts, { user_id, connectType }] : accounts.filter(a => a.user_id !== user_id) })} />}

								<ProfileName account={account} />
							</div>
						})}
					</div> : null} */}
					
					<Label className='mb5'>{__('Access Token:', 'instagram-feed')}</Label>
					<TextControl value={accessToken[0]} onChange={val => setAttributes({ accessToken: [val] })} />

					<PanelRow className='ifbCacheTimeRow mt20'>
						<Label className=''>{__('Cache Time:', 'instagram-feed')}</Label>

						<NumberControl value={cacheTime} onChange={val => {
							setAttributes({ cacheTime: parseInt(val) });
							remLocal(`ifbData-${cId}`);
						}} />

						<SelectControl value={cacheTimePeriod} onChange={val => {
							setAttributes({ cacheTimePeriod: val });
							remLocal(`ifbData-${cId}`);
						}} options={timePeriods} />
					</PanelRow>
				</PanelBody>


				<PanelBody className='bPlPanelBody' title={__('Layout Settings', 'instagram-feed')} initialOpen={false}>
					<Label className='mb5'>{__('Item Visible:', 'instagram-feed')}</Label>
					<RangeControl value={itemVisible} onChange={val => {
						setAttributes({ itemVisible: val });
						setPageNumber(1);
					}} min={1} max={100} step={1} />


					<PanelRow className='mt20'>
						<Label className='mb5'>{__('Columns:', 'instagram-feed')}</Label>
						<BDevice device={device} onChange={val => setDevice(val)} />
					</PanelRow>
					<RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />

					<UnitControl className='mt20' label={__('Column Gap:', 'instagram-feed')} labelPosition='left' value={columnGap} onChange={val => setAttributes({ columnGap: val })} units={[pxUnit(), perUnit(), emUnit()]} />

					<UnitControl className='mt20' label={__('Row Gap:', 'instagram-feed')} labelPosition='left' value={rowGap} onChange={val => setAttributes({ rowGap: val })} units={[pxUnit(), perUnit(), emUnit()]} />
				</PanelBody>


				<PanelBody className='bPlPanelBody' title={__('Features', 'instagram-feed')} initialOpen={false}>
					<ToggleControl label={__('Enable Popup', 'instagram-feed')} checked={isPopup} onChange={val => setAttributes({ isPopup: val })} isPremium={isPremium} Component={ToggleControl} setOpen={setProModalOpen} />
					<small>{__('Gallery Item link will not work if popup is enabled! Link will be in the popup area.')}</small>

					{!isPopup && <>
						<ToggleControl className='mt20' label={__('Enable Gallery Item Link', 'instagram-feed')} checked={isLink} onChange={val => setAttributes({ isLink: val })} />

						{isLink && <ToggleControl className='mt10' label={__('Gallery Item Link in New Tab', 'instagram-feed')} checked={isLinkNewTab} onChange={val => setAttributes({ isLinkNewTab: val })} />}
					</>}
				</PanelBody>
			</>}


			{'elements' === tab.name && <>
				<PanelBody className='bPlPanelBody' title={__('Profile', 'instagram-feed')}>
					<ToggleControl label={__('Show Profile', 'instagram-feed')} checked={isProfile} onChange={val => setAttributes({ isProfile: val })} />

					{isProfile && <>
						{!isBusiness && <>
							<Label>{__('Profile Photo:', 'instagram-feed')}</Label>
							<InlineMediaUpload value={profileImg} types={['image']} onChange={val => setAttributes({ profileImg: val })} placeholder={__('Upload Profile Picture', 'instagram-feed')} />
						</>}
						<small className={isBusiness ? 'mt20' : ''}>{__('For business connect, profile photo will show from instagram account!')}</small>

						<ToggleControl className='mt20' label={__('Show Followers Count', 'instagram-feed')} checked={isFollowers} onChange={val => updateObj('profileInfo', 'isFollowers', val)} isPremium={isPremium} Component={ToggleControl} setOpen={setProModalOpen} />

						<ToggleControl className='mt20' label={__('Show Following Count', 'instagram-feed')} checked={isFollows} onChange={val => updateObj('profileInfo', 'isFollows', val)} isPremium={isPremium} Component={ToggleControl} setOpen={setProModalOpen} />

						<ToggleControl className='mt20' label={__('Show Name', 'instagram-feed')} checked={isName} onChange={val => updateObj('profileInfo', 'isName', val)} isPremium={isPremium} Component={ToggleControl} setOpen={setProModalOpen} />
						<small>{__('For business connect, name will show from instagram account!')}</small>

						{!isBusiness && <TextControl value={name} onChange={val => updateObj('profileInfo', 'name', val)} placeholder={__('Enter Name', 'instagram-feed')} isPremium={isPremium} Component={TextControl} setOpen={setProModalOpen} />}

						<ToggleControl className='mt20' label={__('Show Biography', 'instagram-feed')} checked={isBio} onChange={val => updateObj('profileInfo', 'isBio', val)} isPremium={isPremium} Component={ToggleControl} setOpen={setProModalOpen} />
						<small>{__('For business connect, biography will show from instagram account!')}</small>

						{!isBusiness && <TextControl value={bio} onChange={val => updateObj('profileInfo', 'bio', val)} placeholder={__('Enter Biography', 'instagram-feed')} isPremium={isPremium} Component={TextControl} setOpen={setProModalOpen} />}
					</>}
				</PanelBody>


				<PanelBody className='bPlPanelBody' title={__('Follow Button', 'instagram-feed')} initialOpen={false}>
					<ToggleControl label={__('Show Follow Button', 'instagram-feed')} checked={isFollowBtn} onChange={val => setAttributes({ isFollowBtn: val })} />

					{isFollowBtn && <ToggleControl className='mt10' label={__('Follow Button In Footer', 'instagram-feed')} checked={isFollowBtnInFooter} onChange={val => setAttributes({ isFollowBtnInFooter: val })} isPremium={isPremium} Component={ToggleControl} setOpen={setProModalOpen} />}
				</PanelBody>


				<PanelBody className='bPlPanelBody' title={__('Caption', 'instagram-feed')} initialOpen={false}>
					<ToggleControl label={__('Show Caption', 'instagram-feed')} checked={isCaption} onChange={val => setAttributes({ isCaption: val })} />

					{isCaption && <>
						<ToggleControl className='mt10' label={__('Remove Caption Hashtag', 'instagram-feed')} checked={isRemCaptionHash} onChange={val => setAttributes({ isRemCaptionHash: val })} isPremium={isPremium} Component={ToggleControl} setOpen={setProModalOpen} />

						<PanelRow>
							<Label className=''>{__('Caption length:', 'instagram-feed')}</Label>
							<NumberControl value={captionLength} onChange={val => setAttributes({ captionLength: parseInt(val) })} min={0} />
						</PanelRow>
					</>}
				</PanelBody>


				<PanelBody className='bPlPanelBody' title={__('Load More Button', 'instagram-feed')} initialOpen={false}>
					<ToggleControl label={__('Show Load More', 'instagram-feed')} checked={isLoadMore} onChange={val => setAttributes({ isLoadMore: val })} />
				</PanelBody>
			</>}


			{'style' === tab.name && <>
				<PanelBody className='bPlPanelBody' title={__('Feed', 'instagram-feed')}>
					<Background label={__('Background:', 'instagram-feed')} value={background} onChange={val => setAttributes({ background: val })} defaults={{ color: '#0000' }} />

					<SpaceControl className='mt20' label={__('Padding:', 'instagram-feed')} value={padding} onChange={val => setAttributes({ padding: val })} defaults={{ vertical: '15px', horizontal: '15px' }} />

					<BorderControl className='mt20' label={__('Border:', 'instagram-feed')} value={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '5px' }} />
				</PanelBody>


				{isProfile && <PanelBody className='bPlPanelBody' title={__('Profile', 'instagram-feed')} initialOpen={false}>
					<UnitControl label={__('Photo Size:', 'instagram-feed')} labelPosition='left' value={photoSize} onChange={val => updateObj('profileInfo', 'photoSize', val)} units={[pxUnit(55), emUnit(3.5)]} />

					<UnitControl className='mt15' label={__('Photo Size in Popup:', 'instagram-feed')} labelPosition='left' value={popupPhotoSize} onChange={val => updateObj('profileInfo', 'popupPhotoSize', val)} units={[pxUnit(55), emUnit(3.5)]} isPremium={isPremium} Component={UnitControl} setOpen={setProModalOpen} />

					<BColor label={__('Username Color:', 'instagram-feed')} value={userNameColor} onChange={val => updateObj('profileInfo', 'userNameColor', val)} defaultColor='#4527a4' />

					<BColor label={__('Follow Color:', 'instagram-feed')} value={followersColor} onChange={val => setAttributes({ profileInfo: { ...profileInfo, followersColor: val, followsColor: val } })} defaultColor='#4b4f58' />

					<BColor label={__('Name Color:', 'instagram-feed')} value={nameColor} onChange={val => updateObj('profileInfo', 'nameColor', val)} defaultColor='#333' />

					<BColor label={__('Biography Color:', 'instagram-feed')} value={bioColor} onChange={val => updateObj('profileInfo', 'bioColor', val)} defaultColor='#4b4f58' />
				</PanelBody>}


				<PanelBody className='bPlPanelBody' title={__('Follow Button', 'instagram-feed')} initialOpen={false}>
					<ColorsControl value={followBtnColors} onChange={val => setAttributes({ followBtnColors: val })} defaults={{ color: '#fff', bg: '#4527a4' }} />

					<ColorsControl value={followBtnHovColors} onChange={val => setAttributes({ followBtnHovColors: val })} defaults={{ color: '#fff', bg: '#8344c5' }} />
				</PanelBody>


				<PanelBody className='bPlPanelBody' title={__('Image', 'instagram-feed')} initialOpen={false}>
					<PanelRow>
						<Label className=''>{__('Hover Effect:', 'instagram-feed')}</Label>

						<SelectControl value={imgHoverEffect} onChange={val => setAttributes({ imgHoverEffect: val })} options={imgHoverEffects} />
					</PanelRow>
				</PanelBody>


				{isCaption && <PanelBody className='bPlPanelBody' title={__('Caption', 'instagram-feed')} initialOpen={false}>
					<PanelRow>
						<Label className=''>{__('Caption Style:', 'instagram-feed')}</Label>

						<SelectControl value={captionStyle} onChange={val => setAttributes({
							captionStyle: val,
							captionBG: 'overlayTop' === val ? { type: 'gradient', gradient: 'linear-gradient(0deg, #0000 30%, #000000d9)' } : 'overlayBottom' === val ? { type: 'gradient', gradient: 'linear-gradient(180deg, #0000 30%, #000000d9)' } : { type: 'solid', color: '#0006' }
						})} options={[...captionStyles, ...captionStylesPro]} />
					</PanelRow>

					<Background label={__('Background:', 'instagram-feed')} value={captionBG} onChange={val => setAttributes({ captionBG: val })} defaults={{ color: '#0006' }} isImage={false} />

					<Typography label={__('Typography:', 'instagram-feed')} value={captionTypo} onChange={val => setAttributes({ captionTypo: val })} defaults={{ fontSize: { desktop: 22, tablet: 20, mobile: 18 } }} produce={produce} />

					<BColor label={__('Color:', 'instagram-feed')} value={captionColor} onChange={val => setAttributes({ captionColor: val })} defaultColor='#fff' />
				</PanelBody>}
			</>}
		</>}</TabPanel>
	</InspectorControls >


		<ProModal proModalOpen={proModalOpen} setProModalOpen={setProModalOpen} />
	</>;
};
export default Settings;