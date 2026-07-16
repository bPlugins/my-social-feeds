import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, PanelRow, SelectControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';

import { produce } from 'immer';

import { Label, Background, ColorControl, ColorsControl, Typography } from '../../../../../../../bpl-tools/Components';

import { BorderControl, SpaceControl } from '../../../../../../../bpl-tools/Components/Deprecated';
import { emUnit, pxUnit } from '../../../../../../../bpl-tools/utils/options';
import { captionStyles, captionStylesPro, imgHoverEffects } from '../../../../utils/options';
import { BControlPro } from '../../../../../../../bpl-tools/ProControls';

const Style = ({ attributes, setAttributes, updateObj, isPremium, setProModalOpen }) => {

    const { isProfile, profileInfo, isCaption, isLoadMore, background, padding, border, followBtnColors, followBtnHovColors, loadMoreBtnColors, loadMoreBtnHovColors, loadMoreBtnTypo, imgHoverEffect, captionStyle, captionBG, captionTypo, captionColor } = attributes;

    const { photoSize, popupPhotoSize, userNameColor, followersColor, nameColor, bioColor } = profileInfo || {};

    return <>
        <PanelBody className='bPlPanelBody' title={__('Feed', 'my-social-feeds')}>
            <Background label={__('Background:', 'my-social-feeds')} value={background} onChange={val => setAttributes({ background: val })} defaults={{ color: '#0000' }} />

            <SpaceControl className='mt20' label={__('Padding:', 'my-social-feeds')} value={padding} onChange={val => setAttributes({ padding: val })} defaults={{ vertical: '15px', horizontal: '15px' }} />

            <BorderControl className='mt20' label={__('Border:', 'my-social-feeds')} value={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '5px' }} />
        </PanelBody>

        {isProfile && <PanelBody className='bPlPanelBody' title={__('Profile', 'my-social-feeds')} initialOpen={false}>
            <UnitControl label={__('Photo Size:', 'my-social-feeds')} labelPosition='left' value={photoSize} onChange={val => updateObj('profileInfo', 'photoSize', val)} units={[pxUnit(55), emUnit(3.5)]} isPremium={isPremium} Component={ToggleControl} setIsProModalOpen={setProModalOpen} />

            <UnitControl className='mt15' label={__('Photo Size in Popup:', 'my-social-feeds')} labelPosition='left' value={popupPhotoSize} onChange={val => updateObj('profileInfo', 'popupPhotoSize', val)} units={[pxUnit(55), emUnit(3.5)]} isPremium={isPremium} Component={UnitControl} setIsProModalOpen={setProModalOpen} />

            <ColorControl label={__('Username Color:', 'my-social-feeds')} value={userNameColor} onChange={val => updateObj('profileInfo', 'userNameColor', val)} defaultColor='#4527a4' />

            <BControlPro label={__('Name Color:', 'my-social-feeds')} value={nameColor} onChange={val => updateObj('profileInfo', 'nameColor', val)} defaultColor='#333' isPremium={isPremium} Component={ColorControl} setIsProModalOpen={setProModalOpen} />

            <BControlPro label={__('Biography Color:', 'my-social-feeds')} value={bioColor} onChange={val => updateObj('profileInfo', 'bioColor', val)} defaultColor='#4b4f58' isPremium={isPremium} Component={ColorControl} setIsProModalOpen={setProModalOpen} />
        </PanelBody>}

        <PanelBody className='bPlPanelBody' title={__('Follow Button', 'my-social-feeds')} initialOpen={false}>
            <ColorsControl value={followBtnColors} onChange={val => setAttributes({ followBtnColors: val })} defaults={{ color: '#fff', bg: '#4527a4' }} />

            <ColorsControl value={followBtnHovColors} onChange={val => setAttributes({ followBtnHovColors: val })} defaults={{ color: '#fff', bg: '#8344c5' }} />
        </PanelBody>

        {isLoadMore && <PanelBody className='bPlPanelBody' title={__('Load More Button', 'my-social-feeds')} initialOpen={false}>
            <ColorsControl label={__('Colors', 'my-social-feeds')} value={loadMoreBtnColors} onChange={val => setAttributes({ loadMoreBtnColors: val })} defaults={{ color: '#fff', bg: '#4527a4' }} />

            <ColorsControl label={__('Hover Colors', 'my-social-feeds')} value={loadMoreBtnHovColors} onChange={val => setAttributes({ loadMoreBtnHovColors: val })} defaults={{ color: '#fff', bg: '#8344c5' }} />

            <Typography label={__('Typography:', 'my-social-feeds')} value={loadMoreBtnTypo} onChange={val => setAttributes({ loadMoreBtnTypo: val })} defaults={{ fontSize: { desktop: 16, tablet: 15, mobile: 14 } }} produce={produce} />
        </PanelBody>}

        <PanelBody className='bPlPanelBody' title={__('Image', 'my-social-feeds')} initialOpen={false}>
            <PanelRow>
                <Label className=''>{__('Hover Effect:', 'my-social-feeds')}</Label>

                <SelectControl value={imgHoverEffect} onChange={val => setAttributes({ imgHoverEffect: val })} options={imgHoverEffects} />
            </PanelRow>
        </PanelBody>

        {isCaption && <PanelBody className='bPlPanelBody' title={__('Caption', 'my-social-feeds')} initialOpen={false}>
            <PanelRow>
                <Label className=''>{__('Caption Style:', 'my-social-feeds')}</Label>

                <SelectControl value={captionStyle} onChange={val => setAttributes({
                    captionStyle: val,
                    captionBG: 'overlayTop' === val ? { type: 'gradient', gradient: 'linear-gradient(0deg, #0000 30%, #000000d9)' } : 'overlayBottom' === val ? { type: 'gradient', gradient: 'linear-gradient(180deg, #0000 30%, #000000d9)' } : { type: 'solid', color: '#0006' }
                })} options={[...captionStyles, ...captionStylesPro]} />
            </PanelRow>

            <Background label={__('Background:', 'my-social-feeds')} value={captionBG} onChange={val => setAttributes({ captionBG: val })} defaults={{ color: '#0006' }} isImage={false} />

            <Typography label={__('Typography:', 'my-social-feeds')} value={captionTypo} onChange={val => setAttributes({ captionTypo: val })} defaults={{ fontSize: { desktop: 22, tablet: 20, mobile: 18 } }} produce={produce} />

            <ColorControl label={__('Color:', 'my-social-feeds')} value={captionColor} onChange={val => setAttributes({ captionColor: val })} defaultColor='#fff' />
        </PanelBody>}
    </>
}
export default Style;