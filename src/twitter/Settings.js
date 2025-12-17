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
			clickToCopyToolTipRef.current.innerHTML = __('Copied Successfully!', 'easy-twitter');
			setTimeout(() => {
				clickToCopyToolTipRef.current.innerHTML = __('Copy To Clipboard', 'easy-twitter');
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
		console.log("All Tokens", tokens);

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
							<PanelBody className='bPlPanelBody' title={__('Twitter Feed', 'easy-twitter')}>
								{['timeline', 'follow', 'tweet'].includes(type) && <>
									{/* <Label className='mb5'>{__('Username:', 'easy-twitter')}</Label> */}
									{/* <TextControl value={userName} onChange={val => setAttributes({ userName: val })} /> */}

									<SelectControl label={__('Username:', 'easy-twitter')} options={[{ label: "Select Token", value: '' }, ...userNames]} value={userName} onChange={val => setAttributes({ userName: val })} />

								</>}

								{['video', 'post'].includes(type) && <>
									<Label className='mb5'>{__('Post ID:', 'easy-twitter')}</Label>
									{/* <TextControl value={videoPostID} onChange={val => setAttributes({ videoPostID: val })} /> */}

									<SelectControl options={[{ label: "Select Token", value: '' }, ...postIds]} value={videoPostID} onChange={val => setAttributes({ videoPostID: val })} />
									<small>{__('https://twitter.com/spacesudoer/status/1732827373249438073', 'easy-twitter')}</small>
								</>}

								<SelectControlPro
									className='mt20'
									label="Type"
									labelPosition='left'
									value={type}
									onChange={val => setAttributes({ type: val })}
									options={types}
									proValues={['tweet', 'video', 'post', 'tag']}
									{...premiumProps}
									setIsProModalOpen={setAboutProOpen}
								/>
							</PanelBody>


							{['video', 'post', 'timeline'].includes(type) && <PanelBody className='bPlPanelBody' title={__('Config', 'easy-twitter')} initialOpen={false}>
								<UnitControl label={__('Width:', 'easy-twitter')} labelPosition='left' value={width} onChange={val => updateObj('config', 'width', val)} units={[pxUnit(610), emUnit(35), perUnit(100)]} />

								{type != "video" && <UnitControl className='mt20' label={__('Height:', 'easy-twitter')} labelPosition='left' value={height} onChange={val => updateObj('config', 'height', val)} units={[pxUnit(500), emUnit(30), vhUnit(80)]} />}

								<SelectControl className='mt20' label={__('Scrolling?', 'easy-twitter')} labelPosition='left' value={scrolling} onChange={val => updateObj('config', 'scrolling', val)} options={yesNoOptions} />

								<SelectControl className='mt20' label={__('Theme', 'easy-twitter')} labelPosition='left' value={theme} onChange={val => updateObj('config', 'theme', val)} options={themes} />

								{['timeline'].includes(type) && <>
									<BControlPro className='mt20' label={__('Show Header', 'easy-twitter')} checked={isHeader} onChange={val => updateObj('config', 'isHeader', val)} {...premiumProps} Component={ToggleControl} />

									<BControlPro className='mt10' label={__('Show Footer', 'easy-twitter')} checked={isFooter} onChange={val => updateObj('config', 'isFooter', val)} {...premiumProps} Component={ToggleControl} />
								</>
								}
								<BControlPro className='mt20' label={__('Language', 'easy-twitter')} labelPosition='left' value={language} onChange={val => updateObj('config', 'language', val)} options={languages} {...premiumProps} Component={SelectControl} />

							</PanelBody>}


							{['tweet', 'tag'].includes(type) && <PanelBody className='bPlPanelBody addRemoveItems editItem' title={__('Tweet Button', 'easy-twitter')}>
								<Label className='mb5'>{__('Tweet Text:', 'easy-twitter')}</Label>
								<TextControl value={tweetText} onChange={val => updateObj('button', 'tweetText', val)} />

								{['tag'].includes(type) && <>
									<Label className='mb5'>{__('Tag Text:', 'easy-twitter')}</Label>
									<TextControl value={hasTagText} onChange={val => updateObj('button', 'hasTagText', val)} />
								</>}
							</PanelBody>}

						</>
					}
				</>}


				{'style' === tab.name && <>

					{
						type && <>

							<PanelBody className='bPlPanelBody' title={__('Twitter', 'easy-twitter')}>
								<BorderControl label={__('Border:', 'easy-twitter')} value={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '5px' }} />

								<ShadowControl label={__('Shadow:', 'easy-twitter')} value={shadow} onChange={val => setAttributes({ shadow: val })} produce={produce} />
							</PanelBody>


							{type !== 'timeline' && <PanelBody className='bPlPanelBody' title={__('Button', 'easy-twitter')}>
								<BtnGroupPro
									label={__('Button Icon', 'easy-twitter')}
									value={iconsType}
									onChange={val => updateObj('button', 'iconsType', val)}
									options={twitterIcons}
									isTextIcon={true}
									proValues={['xIcon']}
									{...premiumProps}
								/>
								<UnitControl className='mt20' label={__('Icon Width:', 'easy-twitter')} labelPosition='left' value={icon.width} onChange={val => updateObj('button', 'icon', val, 'width')} units={[pxUnit(28)]} />

								<UnitControl className='mt20' label={__('Icon Height:', 'easy-twitter')} labelPosition='left' value={icon.height} onChange={val => updateObj('button', 'icon', val, 'height')} units={[pxUnit(20)]} />

								<Typography className='mt20' label={__('Typography:', 'easy-twitter')} value={typo} onChange={val => updateObj('button', 'typo', val)} defaults={{ fontSize: { desktop: 14 } }} />

								<ColorsControl className='mt20' label={__('Colors:', 'easy-twitter')} value={colors} onChange={val => updateObj('button', 'colors', val)} defaults={{ color: "#fff", bg: "#1d9bf0" }} />

								<br />

								<BoxControl label={__('Padding:', 'easy-twitter')} value={padding} onChange={val => updateObj('button', 'padding', val)} resetValues={{ top: "6px", right: "10px", bottom: "6px", left: "10px" }} />
							</PanelBody>}
						</>
					}
				</>}
			</>}</TabPanel>
		</InspectorControls>


		<AboutProModal isProModalOpen={aboutProOpen} setIsProModalOpen={setAboutProOpen} link={adminUrl()}>
			<li>&emsp;<strong>{__('Tweet Button: ', 'easy-twitter')}</strong>{__('Quick tweet with the text', 'easy-twitter')}</li>

			<li>&emsp;<strong>{__('Hastag Button: ', 'easy-twitter')}</strong>{__('Quick tag with the text', 'easy-twitter')}</li>

			<li>&emsp;<strong>{__('Header: ', 'easy-twitter')}</strong>{__('Hide the timeline header', 'easy-twitter')}</li>

			<li>&emsp;<strong>{__('Footer: ', 'easy-twitter')}</strong>{__('Hide the timeline footer', 'easy-twitter')}</li>

			<li>&emsp;<strong>{__('Language: ', 'easy-twitter')}</strong>{__('Select language for the timeline', 'easy-twitter')}</li>

			<li>&emsp;<strong>{__('Video: ', 'easy-twitter')}</strong>{__('Video from any twitter post', 'easy-twitter')}</li>

			<li>&emsp;<strong>{__('Post: ', 'easy-twitter')}</strong>{__('Show Twitter Spacific Post', 'easy-twitter')}</li>

			<li>&emsp;<strong>{__('Button Icon: ', 'easy-twitter')}</strong>{__('You Can change the Button Icon', 'easy-twitter')}</li>
		</AboutProModal>


		<BlockControls>
			<AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('Twitter Alignment')} alignmentControls={[
				{ title: __('Twitter in left', 'easy-twitter'), align: 'left', icon: 'align-left' },
				{ title: __('Twitter in center', 'easy-twitter'), align: 'center', icon: 'align-center' },
				{ title: __('Twitter in right', 'easy-twitter'), align: 'right', icon: 'align-right' }
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