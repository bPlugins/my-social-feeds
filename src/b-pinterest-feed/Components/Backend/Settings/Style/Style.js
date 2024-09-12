import { useState } from 'react';
import { __ } from "@wordpress/i18n";
import { PanelBody, PanelRow,  ToggleControl, __experimentalBoxControl as BoxControl} from "@wordpress/components";
import { Background, BColor, BDevice, BorderControl, ColorsControl, Label, Typography } from '../../../../../../../Components';
import { produce } from 'immer';

import { BControlPro } from '../../../../../../../Components/Pro';

const Style =({attributes, updateObject, isPremium ,setProModalOpen}) => {
    const [device, setDevice] = useState('desktop');
    const {profileWrapper, image, name, about, countArea, button} = attributes;
    const {background} = profileWrapper;

    return <>
        <PanelBody className="bPlPanelBody" title={__("Profile Wrapper", "bpinterest")} initialOpen={true}>
            <Background className='mb0' label={__('Background:', 'bpinterest')} value={background} onChange={val => updateObject('profileWrapper', 'background', val)} />
        </PanelBody>

        <PanelBody className="bPlPanelBody" title={__("Image", "bpinterest")} initialOpen={false}>
            <BControlPro label={__("Overly", "bpinterest")} checked={image?.isOverly} onChange={val => updateObject("image", "isOverly", val)} isPremium={isPremium} setOpen={setProModalOpen} Component={ToggleControl}/>

            <BControlPro className='mt10' label={__("Transform", "bpinterest")} checked={image?.isTransform} onChange={val => updateObject("image", "isTransform", val)} isPremium={isPremium} setOpen={setProModalOpen} Component={ToggleControl}/>

            <BControlPro className='' label={__('Overly Color', 'bpinterest')} value={image?.overlyColor} onChange={val => updateObject("image", "overlyColor", val)} isPremium={isPremium} setOpen={setProModalOpen} Component={BColor}/>

            <BorderControl className='mt10' label={__('Border', 'bpinterest')} value={image?.border} onChange={(val) => updateObject('image', 'border', val)} />

        </PanelBody>

        <PanelBody className='bPlPanelBody' title={__('Name', 'bpinterest')} initialOpen={false}>
			<BControlPro className='mb10' label={__('Typography', 'bpinterest')} value={name.typo} onChange={(val) => { updateObject('name', 'typo', val) }} produce={produce} isPremium={isPremium} setOpen={setProModalOpen} Component={Typography} />

            <BColor className='' label={__('Color', 'bpinterest')} value={name?.color} onChange={(val) => updateObject('name', 'color', val)} />
        </PanelBody>

        <PanelBody className='bPlPanelBody' title={__('About', 'bpinterest')} initialOpen={false}>
            <BControlPro className='mb10' label={__('Typography', 'bpinterest')} value={about.typo} onChange={(val) => { updateObject('about', 'typo', val) }} produce={produce} isPremium={isPremium} setOpen={setProModalOpen} Component={Typography}/>

            <BColor className='' label={__('Color', 'bpinterest')} value={about?.color} onChange={(val) => updateObject('about', 'color', val)} />
        </PanelBody>

        <PanelBody className='bPlPanelBody' title={__('Count', 'bpinterest')} initialOpen={false}>
            <BControlPro className='mb10' label={__('Typography', 'bpinterest')} value={countArea.typo} onChange={(val) => { updateObject('countArea', 'typo', val) }} produce={produce} isPremium={isPremium} setOpen={setProModalOpen} Component={Typography}/>

            <BColor className='' label={__('Color', 'bpinterest')} value={countArea?.color} onChange={(val) => updateObject('countArea', 'color', val)} />
        </PanelBody>

        <PanelBody className='bPlPanelBody' title={__('Button', 'bpinterest')} initialOpen={false}>
        
            <BControlPro className='mb10' label={__('Typography', 'bpinterest')} value={button.typo} onChange={(val) => { updateObject('button', 'typo', val) }} produce={produce} isPremium={isPremium} setOpen={setProModalOpen} Component={Typography}/>

            <ColorsControl className='mb10' label={__('Colors', 'bpinterest')} value={button?.colors} onChange={(val) => updateObject('button', 'colors', val)} />

            <ColorsControl className='mb10' label={__('Hover Colors', 'bpinterest')} value={button?.hoverColors} onChange={(val) => updateObject('button', 'hoverColors', val)} />

            <PanelRow className='mt0'>
				<Label mt='0'>{__('Padding:', 'bpinterest')}</Label>
				<BDevice device={device} onChange={val => setDevice(val)} />
			</PanelRow>

			<BoxControl values={button.padding[device]} onChange={val => updateObject('button', 'padding', val, device)} />

            <BorderControl className='mt10' label={__('Border', 'bpinterest')} value={button?.border} onChange={(val) => updateObject('button', 'border', val)} />
        </PanelBody>
    </>
}
export default Style;