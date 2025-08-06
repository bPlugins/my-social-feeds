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
            <PanelBody className='bPlPanelBody' title={__('Profile', 'tiktok')} initialOpen={false}>

                {/* Profile Layout Select  */}
                <BControlPro className='mt15' labelPosition='side' label={__('Layout', 'tiktok')} value={pLayoutStyle}
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
                <SelectControl className='mt15 mb15' labelPosition='side' label={__('Alignment', 'tiktok')} value={profileAlignment}
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
                <ColorControl className="mb10" label={__('Background Color', 'tiktok')} value={profilebgColor} onChange={val => setAttributes({ profilebgColor: val })} defaultColor={{ color: '#000' }} />

                {/* Global Color  */}
                <ColorControl className="mb10" label={__('Color', 'tiktok')} value={globalPColor}
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

                <BoxControl label={__('Padding', 'tiktok')} values={profilePadding} onChange={val => setAttributes({ profilePadding: val })} resetValues={{ top: 0, right: 0, bottom: 0, left: 0 }} units={[pxUnit(3), emUnit(2)]} />
            </PanelBody>

            {'compact' === pLayoutStyle && <PanelBody className='bPlPanelBody' title={__('Compact Profile', 'tiktok')} initialOpen={false}>
                {/* profile img and button  */}
                <ColorControl label={__('Top Background Color:', 'tiktok')} value={profilebgCTop} onChange={val => setAttributes({ profilebgCTop: val })} defaultColor='#333' />
                {/* profileInfo Bottom  */}
                <ColorControl label={__('Bottom Background Color:', 'tiktok')} value={profilebgCbottom} onChange={val => setAttributes({ profilebgCbottom: val })} defaultColor='#fff' />
            </PanelBody>}

            {isDisplayName &&
                <PanelBody className='bPlPanelBody' title={__('Name', 'tiktok')} initialOpen={false}>

                    <BControlPro className='mt20' label={__('Typography', 'titkok')} value={nameTypo} onChange={val => setAttributes({ nameTypo: val })} defaults={{ fontSize: 18 }} produce={produce} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={Typography} />

                    <BControlPro label={__('Color', 'tiktok')} value={displayNameColor} onChange={val => setAttributes({ displayNameColor: val })} defaultColor={{ color: '#fff' }} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ColorControl} />
                </PanelBody>}

            {isShareBtn &&
                <PanelBody className='bPlPanelBody sharePanelBody' title={__('Share Button', 'tiktok')} initialOpen={false}>

                    <BControlPro label={__('Text', 'tiktok')} className='mt15 shareBtn' value={shareBtn}
                        onChange={(val) => setAttributes({ shareBtn: val })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={TextControl} />

                    <BControlPro className='mt20 mb20' label={__('Typography:', 'titkok')} value={shareBtnTypo} onChange={val => setAttributes({ shareBtnTypo: val })} defaults={{ fontSize: 12 }} produce={produce} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={Typography} />

                    <BoxControl label={__('Padding', 'tiktok')} values={btnPadding} onChange={val => setAttributes({ btnPadding: val })} units={[pxUnit(3), emUnit(2)]} resetValues={{ top: 0, right: 0, bottom: 0, left: 0 }} />

                    <ColorsControl className='' label={__('Colors', 'tiktok')} value={sharebtnColors} onChange={val => setAttributes({ sharebtnColors: val })} defaults={{ color: '#fff', bg: '#ff3b5c' }} />

                    <ColorsControl className='' label={__('Hover Colors', 'tiktok')} value={sharebtnHoverColors} onChange={val => setAttributes({ sharebtnHoverColors: val })} defaults={{ color: '#fff', bg: '#fe2c55' }} />

                </PanelBody>}

            {(isFollowing || isFollowers || isTotalLike) &&
                <PanelBody className='bPlPanelBody' title={__('Info Count', 'tiktok')} initialOpen={false}>
                    <BControlPro label={__('Count Color', 'tiktok')} value={countNumColor} onChange={val => setAttributes({ countNumColor: val })} defaultColor='#fff' isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ColorControl} />

                    <BControlPro label={__('Text Color', 'tiktok')} value={TextColor} onChange={val => setAttributes({ TextColor: val })} defaultColor='#ffffffbf' isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ColorControl} />

                    <BControlPro className='mt20' label={__('Typography:', 'titkok')} value={InfoTypo} onChange={val => setAttributes({ InfoTypo: val })} produce={produce} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={Typography} />

                    {['card', 'compact'].includes(pLayoutStyle) &&
                        <ColorControl label={__('Border Color', 'tiktok')} value={borderColor} onChange={val => setAttributes({ borderColor: val })} defaultColor='#000' />
                    }
                </PanelBody>}

            {['default', 'card'].includes(pLayoutStyle) && <>
                {isBio &&
                    <PanelBody className='bPlPanelBody' title={__('Biography', 'tiktok')} initialOpen={false}>
                        <BControlPro label={__('Color', 'tiktok')} value={bioColor} onChange={val => setAttributes({ bioColor: val })} defaultColor='#fff' isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ColorControl} />

                        <BControlPro className='mt20' label={__('Typography', 'business-review')} value={bioTypo} onChange={val => setAttributes({ bioTypo: val })} defaults={{ fontSize: 17 }} produce={produce} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={Typography} />
                    </PanelBody>
                }
            </>}
        </>}

        {isVideos && <PanelBody className='bPlPanelBody sharePanelBody' title={__('Gallery', 'tiktok')} initialOpen={false}>
            <ColorsControl label={__('Colors', 'tiktok')} value={layoutColors} onChange={(val) => {
                setAttributes({ layoutColors: val })
            }} />
        </PanelBody>}

        {/* profile Condition End */}
        {isVideos && <>
            <PanelBody className='bPlPanelBody sharePanelBody' title={__('Load More', 'tiktok')} initialOpen={false}>

                <BControlPro label={__('Text', 'tiktok')} className='mt15 shareBtn' value={loadMoreBtn}
                    onChange={(val) => setAttributes({ loadMoreBtn: val })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={TextControl} />

            </PanelBody>

            <PanelBody className='bPlPanelBody' title={__('Overly', 'tiktok')} initialOpen={false}>

                <BControlPro className="mt10 mb10" label={__('Color', 'tiktok')} value={overlyColor} onChange={val => setAttributes({ overlyColor: val })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ColorControl} />

                <BControlPro className="mt10 mb10" label={__('Icon Color', 'tiktok')} value={overlyIconColor} onChange={val => setAttributes({ overlyIconColor: val })} defaultColor='#fff' isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ColorControl} />

                <RangeControl label={__('Icon size', 'tiktok')} value={overlyIcon?.size} onChange={(val) => { setAttributes({ overlyIcon: { ...overlyIcon, size: val } }) }} min={1} max={100} />

            </PanelBody>

            <PanelBody className='bPlPanelBody' title={__('Icon', 'tiktok')} initialOpen={false}>

                {/* <BControlPro className="mt10 mb10" label={__('Color', 'tiktok')} value={icon?.color} onChange={val => setAttributes({ icon: { ...icon, color: val } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ColorControl} /> */}

                <BControlPro value={icon?.size} onChange={(val) => { setAttributes({ icon: { ...icon, size: val } }) }} min={1} max={100} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={RangeControl} />
            </PanelBody>

            <PanelBody className='bPlPanelBody' title={__('Button', 'tiktok')} initialOpen={false}>

                <BControlPro className='mt20' label={__('Typography', 'titkok')} value={btnTypo} onChange={val => setAttributes({ btnTypo: val })} produce={produce} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={Typography} />

                <ColorsControl className='' label={__('Colors', 'tiktok')} value={loadMoreBtnColors} onChange={val => setAttributes({ loadMoreBtnColors: val })} defaults={{ color: '#fff', bg: '#4527a4' }} />

                <ColorsControl className='' label={__('Hover Colors', 'tiktok')} value={loadMoreBtnHoverColors} onChange={val => setAttributes({ loadMoreBtnHoverColors: val })} defaults={{ color: '#000', bg: '#fff' }} />

                <BControlPro label={__('Icon Size', 'tiktok')} value={viewLoadBtnIcon?.size} onChange={(val) => { setAttributes({ viewLoadBtnIcon: { ...viewLoadBtnIcon, size: val } }) }} min={1} max={100} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={RangeControl} />

                <BoxControl label={__('Padding', 'clipboard')} values={viewLoadBtnPadding} onChange={val => setAttributes({ viewLoadBtnPadding: val })} resetValues={{ top: "6px", right: "12px", bottom: "6px", left: "12px" }} units={[pxUnit(3), emUnit(2)]} />

            </PanelBody>
        </>}
    </>
}
export default Style