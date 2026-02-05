import { __ } from '@wordpress/i18n';
import { produce } from 'immer';
import options from '../../../../utils/options';
import { PanelBody, TextControl, SelectControl, RangeControl, __experimentalBoxControl as BoxControl } from '@wordpress/components';
const { profileStyle, emUnit, pxUnit } = options;

import { BControlPro } from '../../../../../../../bpl-tools/ProControls';
import { ColorControl, ColorsControl, Typography } from '../../../../../../../bpl-tools/Components';

const Style = ({ attributes, setAttributes, isPremium, setProModalOpen, }) => {

    const { isProfile, isVideos, profilebgColor, globalPColor, profileAlignment, profilePadding, profilebgCTop, profilebgCbottom, displayNameColor, nameTypo, shareBtn, btnPadding, shareBtnTypo, sharebtnColors, sharebtnHoverColors, layoutColors, pLayoutStyle, countNumColor, borderColor, bioColor, bioTypo, TextColor, InfoTypo, isDisplayName, isShareBtn, isFollowing, isFollowers, isTotalLike, isBio, icon, overlyColor, overlyIconColor, overlyIcon, btnTypo, viewLoadBtnIcon, viewLoadBtnPadding, loadMoreBtnColors, loadMoreBtnHoverColors, loadMoreBtn } = attributes;

    return <>
        {isProfile && <>
            <PanelBody className='bPlPanelBody' title={__('Profile', 'my-social-feeds')} initialOpen={false}>

                {/* Profile Layout Select  */}
                <BControlPro className='mt15' labelPosition='side' label={__('Layout', 'my-social-feeds')} value={pLayoutStyle}
                    onChange={(val) => {
                        setAttributes({ pLayoutStyle: val })
                        if ('compact' === val) {
                            setAttributes({
                                TextColor: "#5c5757",
                                countNumColor: "#000",
                                btnPadding: { "top": "2px", "right": "6px", "bottom": "2px", "left": "6px" },
                                shareBtnTypo: {
                                    ...shareBtnTypo,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    lineHeight: "135%"
                                },
                                nameTypo: {
                                    ...nameTypo,
                                    fontSize: 18,
                                    fontWeight: 500
                                }
                            })
                        }
                        if (['default', 'card'].includes(val)) {
                            setAttributes({
                                countNumColor: "#ffffffe6",
                                TextColor: "#ffffffbf",
                                btnPadding: { "top": "4px", "right": "8px", "bottom": "4px", "left": "8px" },
                                shareBtnTypo: {
                                    ...shareBtnTypo,
                                    fontSize: 18,
                                    fontWeight: 600
                                },
                                nameTypo: {
                                    ...nameTypo,
                                    fontSize: 32,
                                    fontWeight: 700
                                }
                            })
                        }

                    }} options={profileStyle}
                    __nextHasNoMarginBottom isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={SelectControl} />

                {/* profile Alignment  */}
                <SelectControl className='mt15 mb15' labelPosition='side' label={__('Alignment', 'my-social-feeds')} value={profileAlignment}
                    onChange={(val) => {

                        if ('compact' === pLayoutStyle) {
                            if ('flex-start' === val) {
                                setAttributes({ profileAlignment: "left" })
                            }
                            else if ('flex-end' === val) {
                                setAttributes({ profileAlignment: "right" })
                            }
                            else (
                                setAttributes({ profileAlignment: "center" })
                            )
                        }
                        else {
                            setAttributes({ profileAlignment: val });
                        }
                    }} options={options.alignSelect}
                    __nextHasNoMarginBottom
                />

                {/* Background Color  */}
                <ColorControl className="mb10" label={__('Background Color', 'my-social-feeds')} value={profilebgColor} onChange={val => setAttributes({ profilebgColor: val })} defaultColor={{ color: '#000' }} />

                {/* Global Color  */}
                <ColorControl className="mb10" label={__('Color', 'my-social-feeds')} value={globalPColor}
                    onChange={(val) =>
                        setAttributes({
                            globalPColor: val,
                            displayNameColor: val,
                            sharebtnColors: { ...sharebtnColors, color: val, styles: `color: ${val}; background: ${sharebtnColors?.bg}` },
                            countNumColor: val,
                            TextColor: val,
                            borderColor: val,
                            bioColor: val
                        })}
                    defaultColor={{ color: '#fff' }} />

                <BoxControl label={__('Padding', 'my-social-feeds')} values={profilePadding} onChange={val => setAttributes({ profilePadding: val })} resetValues={{ top: 0, right: 0, bottom: 0, left: 0 }} units={[pxUnit(3), emUnit(2)]} />
            </PanelBody>

            {'compact' === pLayoutStyle && <PanelBody className='bPlPanelBody' title={__('Compact Profile', 'my-social-feeds')} initialOpen={false}>
                {/* profile img and button  */}
                <ColorControl label={__('Top Background Color:', 'my-social-feeds')} value={profilebgCTop} onChange={val => setAttributes({ profilebgCTop: val })} defaultColor='#333' />
                {/* profileInfo Bottom  */}
                <ColorControl label={__('Bottom Background Color:', 'my-social-feeds')} value={profilebgCbottom} onChange={val => setAttributes({ profilebgCbottom: val })} defaultColor='#fff' />
            </PanelBody>}

            {isDisplayName &&
                <PanelBody className='bPlPanelBody' title={__('Name', 'my-social-feeds')} initialOpen={false}>

                    <Typography className='mt20' label={__('Typography', 'my-social-feeds')} value={nameTypo} onChange={val => setAttributes({ nameTypo: val })} defaults={{ fontSize: 18 }} produce={produce} />

                    <ColorControl label={__('Color', 'my-social-feeds')} value={displayNameColor} onChange={val => setAttributes({ displayNameColor: val })} defaultColor={{ color: '#fff' }} />
                </PanelBody>}

            {isShareBtn &&
                <PanelBody className='bPlPanelBody sharePanelBody' title={__('Share Button', 'my-social-feeds')} initialOpen={false}>

                    <TextControl label={__('Text', 'my-social-feeds')} className='mt15 shareBtn' value={shareBtn} onChange={(val) => setAttributes({ shareBtn: val })} />

                    <Typography className='mt20 mb20' label={__('Typography:', 'my-social-feeds')} value={shareBtnTypo} onChange={val => setAttributes({ shareBtnTypo: val })} defaults={{ fontSize: 12 }} produce={produce} />

                    <BoxControl label={__('Padding', 'my-social-feeds')} values={btnPadding} onChange={val => setAttributes({ btnPadding: val })} units={[pxUnit(3), emUnit(2)]} resetValues={{ top: 0, right: 0, bottom: 0, left: 0 }} />

                    <ColorsControl className='' label={__('Colors', 'my-social-feeds')} value={sharebtnColors} onChange={val => setAttributes({ sharebtnColors: val })} defaults={{ color: '#fff', bg: '#ff3b5c' }} />

                    <ColorsControl className='' label={__('Hover Colors', 'my-social-feeds')} value={sharebtnHoverColors} onChange={val => setAttributes({ sharebtnHoverColors: val })} defaults={{ color: '#fff', bg: '#fe2c55' }} />
                </PanelBody>}

            {(isFollowing || isFollowers || isTotalLike) &&
                <PanelBody className='bPlPanelBody' title={__('Info Count', 'my-social-feeds')} initialOpen={false}>
                    <ColorControl label={__('Count Color', 'my-social-feeds')} value={countNumColor} onChange={val => setAttributes({ countNumColor: val })} defaultColor='#fff' />

                    <ColorControl label={__('Text Color', 'my-social-feeds')} value={TextColor} onChange={val => setAttributes({ TextColor: val })} defaultColor='#ffffffbf' />

                    <Typography className='mt20' label={__('Typography:', 'my-social-feeds')} value={InfoTypo} onChange={val => setAttributes({ InfoTypo: val })} produce={produce} />

                    {['card', 'compact'].includes(pLayoutStyle) &&
                        <ColorControl label={__('Border Color', 'my-social-feeds')} value={borderColor} onChange={val => setAttributes({ borderColor: val })} defaultColor='#000' />
                    }
                </PanelBody>}

            {['default', 'card'].includes(pLayoutStyle) && <>
                {isBio &&
                    <PanelBody className='bPlPanelBody' title={__('Biography', 'my-social-feeds')} initialOpen={false}>
                        <ColorControl label={__('Color', 'my-social-feeds')} value={bioColor} onChange={val => setAttributes({ bioColor: val })} defaultColor='#fff' />

                        <Typography className='mt20' label={__('Typography', 'my-social-feeds')} value={bioTypo} onChange={val => setAttributes({ bioTypo: val })} defaults={{ fontSize: 17 }} produce={produce} />
                    </PanelBody>
                }
            </>}
        </>}

        {isVideos && <PanelBody className='bPlPanelBody sharePanelBody' title={__('Gallery', 'my-social-feeds')} initialOpen={false}>
            <ColorsControl label={__('Colors', 'my-social-feeds')} value={layoutColors} onChange={(val) => {
                setAttributes({ layoutColors: val })
            }} />
        </PanelBody>}

        {/* profile Condition End */}
        {isVideos && <>
            <PanelBody className='bPlPanelBody sharePanelBody' title={__('Load More', 'my-social-feeds')} initialOpen={false}>
                <TextControl label={__('Text', 'my-social-feeds')} className='mt15 shareBtn' value={loadMoreBtn} onChange={(val) => setAttributes({ loadMoreBtn: val })} />
            </PanelBody>

            <PanelBody className='bPlPanelBody' title={__('Overly', 'my-social-feeds')} initialOpen={false}>
                <ColorControl className="mt10 mb10" label={__('Color', 'my-social-feeds')} value={overlyColor} onChange={val => setAttributes({ overlyColor: val })} />

                <ColorControl className="mt10 mb10" label={__('Icon Color', 'my-social-feeds')} value={overlyIconColor} onChange={val => setAttributes({ overlyIconColor: val })} defaultColor='#fff' />

                <RangeControl label={__('Icon size', 'my-social-feeds')} value={overlyIcon?.size} onChange={(val) => { setAttributes({ overlyIcon: { ...overlyIcon, size: val } }) }} min={1} max={100} />

            </PanelBody>

            <PanelBody className='bPlPanelBody' title={__('Icon', 'my-social-feeds')} initialOpen={false}>

                {/* <BControlPro className="mt10 mb10" label={__('Color', 'my-social-feeds')} value={icon?.color} onChange={val => setAttributes({ icon: { ...icon, color: val } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ColorControl} /> */}

                <RangeControl value={icon?.size} onChange={(val) => { setAttributes({ icon: { ...icon, size: val } }) }} min={1} max={100} />
            </PanelBody>

            <PanelBody className='bPlPanelBody' title={__('Button', 'my-social-feeds')} initialOpen={false}>

                <Typography className='mt20' label={__('Typography', 'my-social-feeds')} value={btnTypo} onChange={val => setAttributes({ btnTypo: val })} produce={produce} />

                <ColorsControl className='' label={__('Colors', 'my-social-feeds')} value={loadMoreBtnColors} onChange={val => setAttributes({ loadMoreBtnColors: val })} defaults={{ color: '#fff', bg: '#4527a4' }} />

                <ColorsControl className='' label={__('Hover Colors', 'my-social-feeds')} value={loadMoreBtnHoverColors} onChange={val => setAttributes({ loadMoreBtnHoverColors: val })} defaults={{ color: '#000', bg: '#fff' }} />

                <BControlPro label={__('Icon Size', 'my-social-feeds')} value={viewLoadBtnIcon?.size} onChange={(val) => { setAttributes({ viewLoadBtnIcon: { ...viewLoadBtnIcon, size: val } }) }} min={1} max={100} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={RangeControl} />

                <BoxControl label={__('Padding', 'my-social-feeds')} values={viewLoadBtnPadding} onChange={val => setAttributes({ viewLoadBtnPadding: val })} resetValues={{ top: "6px", right: "12px", bottom: "6px", left: "12px" }} units={[pxUnit(3), emUnit(2)]} />

            </PanelBody>
        </>}
    </>
}
export default Style