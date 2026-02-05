import { useEffect, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, TabPanel, TextControl, ToggleControl, SelectControl, __experimentalUnitControl as UnitControl, __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { produce } from 'immer';

// Settings Components
import { Label, ColorsControl, Typography, ShadowControl } from '../../../bpl-tools/Components';
import { BorderControl } from '../../../bpl-tools/Components/Deprecated';

// import { AboutPro, BControlPro, BtnGroupPro, SelectControlPro } from '../../Components/Pro';
import { AboutProModal, BControlPro, BtnGroupPro, SelectControlPro } from '../../../bpl-tools/ProControls';
import { tabController } from '../../../bpl-tools/utils/functions';
import { emUnit, perUnit, pxUnit, vhUnit } from '../../../bpl-tools/utils/options';

import { generalStyleTabs, yesNoOptions, themes, languages, types, twitterIcons } from './utils/options';
import { withSelect } from '@wordpress/data';
import { adminUrl } from './utils/functions';
import InsertFeeds from '../utils/InsertFeeds';

const Settings = ({ attributes, setAttributes, updateObj, currentPostId, currentPostType, premiumProps, aboutProOpen, setAboutProOpen, clientId }) => {
	const { userName, type, config, alignment, border, shadow, button, videoPostID } = attributes;
	const { theme, width, height, scrolling, isHeader, isFooter, language } = config;
	const { tweetText, icon, typo, colors, padding, hasTagText, iconsType } = button;

	const clickToCopyToolTipRef = useRef(null);
	const clickToCopyRef = useRef(null);
	const [tokens, setTokens] = useState([]);

	const clickToCopy = () => {
		if (clickToCopyRef.current) {
			clickToCopyRef.current.select();

			document.execCommand('copy');
			clickToCopyToolTipRef.current.innerHTML = __('Copied Successfully!', 'my-social-feeds');
			setTimeout(() => {
				clickToCopyToolTipRef.current.innerHTML = __('Copy To Clipboard', 'my-social-feeds');
			}, 1500);
		}
	}

	const fetchTokens = async () => {
		try {
			const res = await fetch(
				`${msfAuthorization?.ajaxUrl}?action=msfbp-get-twitter-credentials&nonce=${msfAuthorization?.nonce}`
			);
			const data = await res.json();
			setTokens(data?.data);

		} catch (e) {
			console.error(e);
		} finally {
			// setLoading(false);
		}
	};

	useEffect(() => {
		fetchTokens();
	}, []);

	const userNames = tokens.filter(item => item.isPostId === false);
	const postIds = tokens.filter(item => item.isPostId === true);

	return <>

		<InspectorControls>
			{
				type && <>

					{currentPostType == "easy-twitter-feeds" && <div className='etfFrontShortcode' >
						<TextControl value={`[etf id=${currentPostId}]`} className='components-text-control__input' label={__('Copy Shortcode', 'easy-twitter')} onClick={clickToCopy} ref={clickToCopyRef} />
						<span className='tooltip' ref={clickToCopyToolTipRef}>{__('Copy To Clipboard', 'easy-twitter')}</span>
					</div>}
				</>

			}

			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
				{'general' === tab.name && <>

					<InsertFeeds blockType={'etf/twitter-feed'} clientId={clientId} />

					{
						type && <>
							<PanelBody className='bPlPanelBody' title={__('Twitter Feed', 'my-social-feeds')}>

								<SelectControlPro className='mt20' label="Type" labelPosition='left' value={type} onChange={val => setAttributes({ type: val })} options={types} proValues={['video', 'post', 'tag']}
									{...premiumProps} setIsProModalOpen={setAboutProOpen} />

								{['timeline', 'follow', 'tweet'].includes(type) && <>
									<Label className='mb5'>{__('Username:', 'my-social-feeds')}</Label>
									<TextControl value={userName} onChange={val => setAttributes({ userName: val })} />

									{/* <SelectControl label={__('Username:', 'my-social-feeds')} options={[{ label: "Select Token", value: '' }, ...userNames]} value={userName} onChange={val => setAttributes({ userName: val })} /> */}
								</>}

								{['video', 'post'].includes(type) && <>
									<Label className='mb5'>{__('Post ID:', 'my-social-feeds')}</Label>
									<TextControl value={videoPostID} onChange={val => setAttributes({ videoPostID: val })} />

									{/* <SelectControl options={[{ label: "Select Token", value: '' }, ...postIds]} value={videoPostID} onChange={val => setAttributes({ videoPostID: val })} />
									<small>{__('https://twitter.com/spacesudoer/status/1732827373249438073', 'my-social-feeds')}</small> */}
								</>}
							</PanelBody>


							{['video', 'post', 'timeline'].includes(type) && <PanelBody className='bPlPanelBody' title={__('Config', 'my-social-feeds')} initialOpen={false}>
								<UnitControl label={__('Width:', 'my-social-feeds')} labelPosition='left' value={width} onChange={val => updateObj('config', 'width', val)} units={[pxUnit(610), emUnit(35), perUnit(100)]} />

								<UnitControl className='mt20' label={__('Height:', 'my-social-feeds')} labelPosition='left' value={height} onChange={val => updateObj('config', 'height', val)} units={[pxUnit(500), emUnit(30), vhUnit(80)]} />

								<SelectControl className='mt20' label={__('Scrolling?', 'my-social-feeds')} labelPosition='left' value={scrolling} onChange={val => updateObj('config', 'scrolling', val)} options={yesNoOptions} />

								<SelectControl className='mt20' label={__('Theme', 'my-social-feeds')} labelPosition='left' value={theme} onChange={val => updateObj('config', 'theme', val)} options={themes} />

								{['timeline'].includes(type) && <>
									<BControlPro className='mt20' label={__('Show Header', 'my-social-feeds')} checked={isHeader} onChange={val => updateObj('config', 'isHeader', val)} {...premiumProps} Component={ToggleControl} />

									<BControlPro className='mt10' label={__('Show Footer', 'my-social-feeds')} checked={isFooter} onChange={val => updateObj('config', 'isFooter', val)} {...premiumProps} Component={ToggleControl} />
								</>
								}
								<BControlPro className='mt20' label={__('Language', 'my-social-feeds')} labelPosition='left' value={language} onChange={val => updateObj('config', 'language', val)} options={languages} {...premiumProps} Component={SelectControl} />

							</PanelBody>}


							{['tweet', 'tag'].includes(type) && <PanelBody className='bPlPanelBody addRemoveItems editItem' title={__('Tweet Button', 'my-social-feeds')}>
								<Label className='mb5'>{__('Tweet Text:', 'my-social-feeds')}</Label>
								<TextControl value={tweetText} onChange={val => updateObj('button', 'tweetText', val)} />

								{['tag'].includes(type) && <>
									<Label className='mb5'>{__('Tag Text:', 'my-social-feeds')}</Label>
									<TextControl value={hasTagText} onChange={val => updateObj('button', 'hasTagText', val)} />
								</>}
							</PanelBody>}

						</>
					}
				</>}


				{'style' === tab.name && <>

					{
						type && <>

							<PanelBody className='bPlPanelBody' title={__('Twitter', 'my-social-feeds')}>
								<BorderControl label={__('Border:', 'my-social-feeds')} value={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '5px' }} />

								<ShadowControl label={__('Shadow:', 'my-social-feeds')} value={shadow} onChange={val => setAttributes({ shadow: val })} produce={produce} />
							</PanelBody>


							{type !== 'timeline' && <PanelBody className='bPlPanelBody' title={__('Button', 'my-social-feeds')}>
								<BtnGroupPro
									label={__('Button Icon', 'my-social-feeds')}
									value={iconsType}
									onChange={val => updateObj('button', 'iconsType', val)}
									options={twitterIcons}
									isTextIcon={true}
									proValues={['xIcon']}
									{...premiumProps}
								/>
								<UnitControl className='mt20' label={__('Icon Width:', 'my-social-feeds')} labelPosition='left' value={icon.width} onChange={val => updateObj('button', 'icon', val, 'width')} units={[pxUnit(28)]} />

								<UnitControl className='mt20' label={__('Icon Height:', 'my-social-feeds')} labelPosition='left' value={icon.height} onChange={val => updateObj('button', 'icon', val, 'height')} units={[pxUnit(20)]} />

								<Typography className='mt20' label={__('Typography:', 'my-social-feeds')} value={typo} onChange={val => updateObj('button', 'typo', val)} defaults={{ fontSize: { desktop: 14 } }} />

								<ColorsControl className='mt20' label={__('Colors:', 'my-social-feeds')} value={colors} onChange={val => updateObj('button', 'colors', val)} defaults={{ color: "#fff", bg: "#1d9bf0" }} />

								<br />

								<BoxControl label={__('Padding:', 'my-social-feeds')} value={padding} onChange={val => updateObj('button', 'padding', val)} resetValues={{ top: "6px", right: "10px", bottom: "6px", left: "10px" }} />
							</PanelBody>}
						</>
					}
				</>}
			</>}</TabPanel>
		</InspectorControls>


		<AboutProModal isProModalOpen={aboutProOpen} setIsProModalOpen={setAboutProOpen} link={adminUrl()}>
			<li>&emsp;<strong>{__('Tweet Button: ', 'my-social-feeds')}</strong>{__('Quick tweet with the text', 'my-social-feeds')}</li>

			<li>&emsp;<strong>{__('Hastag Button: ', 'my-social-feeds')}</strong>{__('Quick tag with the text', 'my-social-feeds')}</li>

			<li>&emsp;<strong>{__('Header: ', 'my-social-feeds')}</strong>{__('Hide the timeline header', 'my-social-feeds')}</li>

			<li>&emsp;<strong>{__('Footer: ', 'my-social-feeds')}</strong>{__('Hide the timeline footer', 'my-social-feeds')}</li>

			<li>&emsp;<strong>{__('Language: ', 'my-social-feeds')}</strong>{__('Select language for the timeline', 'my-social-feeds')}</li>

			<li>&emsp;<strong>{__('Video: ', 'my-social-feeds')}</strong>{__('Video from any twitter post', 'my-social-feeds')}</li>

			<li>&emsp;<strong>{__('Post: ', 'my-social-feeds')}</strong>{__('Show Twitter Spacific Post', 'my-social-feeds')}</li>

			<li>&emsp;<strong>{__('Button Icon: ', 'my-social-feeds')}</strong>{__('You Can change the Button Icon', 'my-social-feeds')}</li>
		</AboutProModal>


		<BlockControls>
			<AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('Twitter Alignment')} alignmentControls={[
				{ title: __('Twitter in left', 'my-social-feeds'), align: 'left', icon: 'align-left' },
				{ title: __('Twitter in center', 'my-social-feeds'), align: 'center', icon: 'align-center' },
				{ title: __('Twitter in right', 'my-social-feeds'), align: 'right', icon: 'align-right' }
			]} />
		</BlockControls>
	</>;
};
export default withSelect((select) => {
	const { getCurrentPostId, getCurrentPostType } = select('core/editor');
	return {
		currentPostId: getCurrentPostId(),
		currentPostType: getCurrentPostType()
	}
})(Settings);