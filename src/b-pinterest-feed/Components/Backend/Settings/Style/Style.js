import { useState } from 'react';
import { __ } from "@wordpress/i18n";
import { PanelBody, PanelRow, ToggleControl, __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { Background, ColorControl, ColorsControl, Label, Typography } from '../../../../../../../bpl-tools/Components';
import { BDevice, BorderControl } from '../../../../../../../bpl-tools/Components/Deprecated';
import { produce } from 'immer';

import { BControlPro } from '../../../../../../../bpl-tools/ProControls';

const Style = ({ attributes, updateObject, isPremium, setProModalOpen }) => {
    const [device, setDevice] = useState('desktop');
    const { profileWrapper, image, name, about, countArea, button } = attributes;
    const { background } = profileWrapper;

    return <>
        <PanelBody className="bPlPanelBody" title={__("Profile Wrapper", "my-social-feeds")} initialOpen={true}>
            <Background className='mb0' label={__('Background:', 'my-social-feeds')} value={background} onChange={val => updateObject('profileWrapper', 'background', val)} />
        </PanelBody>

        <PanelBody className="bPlPanelBody" title={__("Image", "my-social-feeds")} initialOpen={false}>
            <ToggleControl label={__("Overly", "my-social-feeds")} checked={image?.isOverly} onChange={val => updateObject("image", "isOverly", val)} />

            <ToggleControl className='mt10' label={__("Transform", "my-social-feeds")} checked={image?.isTransform} onChange={val => updateObject("image", "isTransform", val)} />

            <ColorControl className='' label={__('Overly Color', 'my-social-feeds')} value={image?.overlyColor} onChange={val => updateObject("image", "overlyColor", val)} />

            <BorderControl className='mt10' label={__('Border', 'my-social-feeds')} value={image?.border} onChange={(val) => updateObject('image', 'border', val)} />

        </PanelBody>

        <PanelBody className='bPlPanelBody' title={__('Name', 'my-social-feeds')} initialOpen={false}>
            <Typography className='mb10' label={__('Typography', 'my-social-feeds')} value={name.typo} onChange={(val) => { updateObject('name', 'typo', val) }} produce={produce} />

            <ColorControl className='' label={__('Color', 'my-social-feeds')} value={name?.color} onChange={(val) => updateObject('name', 'color', val)} />
        </PanelBody>

        <PanelBody className='bPlPanelBody' title={__('About', 'my-social-feeds')} initialOpen={false}>
            <Typography className='mb10' label={__('Typography', 'my-social-feeds')} value={about.typo} onChange={(val) => { updateObject('about', 'typo', val) }} produce={produce} />

            <ColorControl className='' label={__('Color', 'my-social-feeds')} value={about?.color} onChange={(val) => updateObject('about', 'color', val)} />
        </PanelBody>

        <PanelBody className='bPlPanelBody' title={__('Count', 'my-social-feeds')} initialOpen={false}>
            <Typography className='mb10' label={__('Typography', 'my-social-feeds')} value={countArea.typo} onChange={(val) => { updateObject('countArea', 'typo', val) }} produce={produce} />

            <ColorControl className='' label={__('Color', 'my-social-feeds')} value={countArea?.color} onChange={(val) => updateObject('countArea', 'color', val)} />
        </PanelBody>

        <PanelBody className='bPlPanelBody' title={__('Button', 'my-social-feeds')} initialOpen={false}>
            <Typography className='mb10' label={__('Typography', 'my-social-feeds')} value={button.typo} onChange={(val) => { updateObject('button', 'typo', val) }} produce={produce} />

            <ColorsControl className='mb10' label={__('Colors', 'my-social-feeds')} value={button?.colors} onChange={(val) => updateObject('button', 'colors', val)} />

            <ColorsControl className='mb10' label={__('Hover Colors', 'my-social-feeds')} value={button?.hoverColors} onChange={(val) => updateObject('button', 'hoverColors', val)} />

            <PanelRow className='mt0'>
                <Label mt='0'>{__('Padding:', 'my-social-feeds')}</Label>
                <BDevice device={device} onChange={val => setDevice(val)} />
            </PanelRow>

            <BoxControl values={button.padding[device]} onChange={val => updateObject('button', 'padding', val, device)} />

            <BorderControl className='mt10' label={__('Border', 'my-social-feeds')} value={button?.border} onChange={(val) => updateObject('button', 'border', val)} />
        </PanelBody>
    </>
}
export default Style;