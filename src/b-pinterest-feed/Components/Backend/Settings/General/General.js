
import { useState } from 'react';
import { __ } from "@wordpress/i18n";
import { PanelBody, PanelRow, TabPanel, TextControl, ToggleControl, SelectControl, CheckboxControl, RadioControl, RangeControl, __experimentalUnitControl as UnitControl, __experimentalNumberControl as NumberControl, Button, Dashicon, ToolbarGroup, ToolbarButton, __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { effectOpt, layoutOpt, ratioOpt } from '../../../../utils/options';
import { Label } from '../../../../../../../bpl-tools/Components';
import { BDevice } from '../../../../../../../bpl-tools/Components/Deprecated';
import { emUnit, perUnit, pxUnit } from '../../../../../../../bpl-tools/utils/options';

import { BControlPro } from '../../../../../../../bpl-tools/ProControls';

import InsertFeeds from '../../../../../utils/InsertFeeds';

const General = ({ attributes, updateObject, getData, setAttributes, isPremium, setProModalOpen, clientId }) => {
	const [device, setDevice] = useState('desktop');

	const { accountInfo, elements, layout, columns, columnGap, rowGap, pinCoverImage, fancyApps, slider } = attributes;
	const { userName, boardName } = accountInfo;
	const { isProfile, isPins, isImage, isName, isDesc, isFollower, isPin, isBtn } = elements;
	const { left, middle, right } = fancyApps;
	const { infobar } = left;
	const { zoomIn, zoomOut, toggle1to1, rotateCCW, rotateCW, flipX, flipY } = middle;
	const { slideshow, thumbs, close } = right;
	const { isLoop, isAutoPlay, autoPlayDelay, isMouseWheel, effect, isGrabCursor } = slider;

	return <>

		<InsertFeeds blockType={'bpf/b-pinterest-feed'} clientId={clientId} />

		<PanelBody className="bPlPanelBody addRemoveItems editItem" title={__("Account Information", "bpinterest")} initialOpen={true}>
			<TextControl className='' label={__("User Name", 'bpinterest')} labelPosition={__('top', 'bpinterest')} value={userName} placeholder={__('Enter Your User Name', 'bpinterest')}
				onChange={(val) => updateObject('accountInfo', 'userName', val)} />

			<TextControl className='' label={__('Board Name', 'bPinterest')} labelPosition={__('top', 'bpinterest-feed')} value={boardName} placeholder={__('Enter Your BoardName', 'bpinterest')} onChange={(val) => updateObject('accountInfo', 'boardName', val)} />

			<Button className='authorBtn' onClick={getData}>Fetch</Button>
		</PanelBody>

		<PanelBody className="bPlPanelBody" title={__("Elements", "bpinterest")} initialOpen={false}>

			<ToggleControl label={__("Profile", "bpinterest")} checked={isProfile} onChange={val => updateObject("elements", "isProfile", val)} />

			<BControlPro className='mt10' label={__("Pins", "bpinterest")} checked={isPins} onChange={val => updateObject("elements", "isPins", val)} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

			{isProfile && <>
				<ToggleControl className='mt10' label={__("Image", "bpinterest")} checked={isImage} onChange={val => updateObject("elements", "isImage", val)} />
				<ToggleControl className='mt10' label={__("Name", "bpinterest")} checked={isName} onChange={val => updateObject("elements", "isName", val)} />
				<ToggleControl className='mt10' label={__("About", "bpinterest")} checked={isDesc} onChange={val => updateObject("elements", "isDesc", val)} />
				<ToggleControl className='mt10' label={__("Follower count", "bpinterest")} checked={isFollower} onChange={val => updateObject("elements", "isFollower", val)} />
				<ToggleControl className='mt10' label={__("Pin count", "bpinterest")} checked={isPin} onChange={val => updateObject("elements", "isPin", val)} />
				<ToggleControl className='mt10' label={__("Follower Button", "bpinterest")} checked={isBtn} onChange={val => updateObject("elements", "isBtn", val)} />
			</>}
		</PanelBody>

		<PanelBody className="bPlPanelBody" title={__("Layout", "bpinterest")} initialOpen={false}>
			<BControlPro label={__("Select", "bpinterest")} value={layout} options={layoutOpt} onChange={(val) => setAttributes({ layout: val })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={SelectControl} />

			{(isPins && (layout === 'default' || layout === 'slider')) &&
				<BControlPro className="mt15" label={__('Ratio', 'bpinterest')} labelPosition="side" value={pinCoverImage?.ratio} options={ratioOpt} onChange={(val) => { updateObject("pinCoverImage", "ratio", val) }} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={SelectControl} />
			}

			{/* column define option  */}
			<PanelRow className='mt10'>
				<Label mt='0'>{__('Columns:', 'bpinterest')}</Label>
				<BDevice device={device} onChange={val => setDevice(val)} />
			</PanelRow>

			<RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />

			{/* column Gap  */}
			<UnitControl className='mt20' label={__('Column Gap:', 'tiktok')} labelPosition='left' value={columnGap} onChange={val => setAttributes({ columnGap: val })} units={[pxUnit(30), perUnit(3), emUnit(2)]} isResetValueOnUnitChange={true} />

			{/* row Gap  */}
			{layout != 'slider' && <UnitControl className='mt20' label={__('Row Gap:', 'tiktok')} labelPosition='left' value={rowGap} onChange={val => setAttributes({ rowGap: val })} units={[pxUnit(40), perUnit(3), emUnit(2.5)]} isResetValueOnUnitChange={true} />}
		</PanelBody>

		<PanelBody className="bPlPanelBody" title={__("Lightbox", "bpinterest")} initialOpen={false}>

			<ToggleControl className='mt10' label={__("Info Bar", "bpinterest")} checked={infobar} onChange={val => setAttributes({ fancyApps: { ...fancyApps, left: { ...left, infobar: val } } })} />

			<BControlPro className='mt10' label={__("Zoom In", "bpinterest")} checked={zoomIn} onChange={val => setAttributes({ fancyApps: { ...fancyApps, middle: { ...middle, zoomIn: val } } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

			<BControlPro className='mt10' label={__("Zoom Out", "bpinterest")} checked={zoomOut} onChange={val => setAttributes({ fancyApps: { ...fancyApps, middle: { ...middle, zoomOut: val } } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

			<BControlPro className='mt10' label={__("Toggle1to1", "bpinterest")} checked={toggle1to1} onChange={val => setAttributes({ fancyApps: { ...fancyApps, middle: { ...middle, toggle1to1: val } } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

			<BControlPro className='mt10' label={__("RotateCCW", "bpinterest")} checked={rotateCCW} onChange={val => setAttributes({ fancyApps: { ...fancyApps, middle: { ...middle, rotateCCW: val } } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

			<BControlPro className='mt10' label={__("RotateCW", "bpinterest")} checked={rotateCW} onChange={val => setAttributes({ fancyApps: { ...fancyApps, middle: { ...middle, rotateCW: val } } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

			<BControlPro className='mt10' label={__("FlipX", "bpinterest")} checked={flipX} onChange={val => setAttributes({ fancyApps: { ...fancyApps, middle: { ...middle, flipX: val } } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

			<BControlPro className='mt10' label={__("FlipY", "bpinterest")} checked={flipY} onChange={val => setAttributes({ fancyApps: { ...fancyApps, middle: { ...middle, flipY: val } } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

			<ToggleControl className='mt10' label={__("Slide show", "bpinterest")} checked={slideshow} onChange={val => setAttributes({ fancyApps: { ...fancyApps, right: { ...right, slideshow: val } } })} />

			<BControlPro className='mt10' label={__("Thumbs", "bpinterest")} checked={thumbs} onChange={val => setAttributes({ fancyApps: { ...fancyApps, right: { ...right, thumbs: val } } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

			<ToggleControl className='mt10' label={__("Close", "bpinterest")} checked={close} onChange={val => setAttributes({ fancyApps: { ...fancyApps, right: { ...right, close: val } } })} />
		</PanelBody>

		{layout === "slider" && <PanelBody className="bPlPanelBody" title={__("Carousel", "bpinterest")} initialOpen={false}>

			<SelectControl label={__('Effect', "bpinterest")} value={effect} options={effectOpt} onChange={val => updateObject("slider", "effect", val)} />

			<ToggleControl className='' label={__("Loop", "bpinterest")} checked={isLoop} onChange={val => updateObject("slider", "isLoop", val)} />

			<ToggleControl className='mt10' label={__("Auto Play", "bpinterest")} checked={isAutoPlay} onChange={val => updateObject("slider", "isAutoPlay", val)} />

			{isAutoPlay && <NumberControl className='mt10' label={__("Duration", "bpinterest")} isShiftStepEnabled={true} shiftStep={10} value={autoPlayDelay} onChange={val => updateObject("slider", "autoPlayDelay", val)} />}

			<ToggleControl className='mt10' label={__("Mouse Wheel", "bpinterest")} checked={isMouseWheel} onChange={val => updateObject("slider", "isMouseWheel", val)} />

			{/* <ToggleControl className='mt10' label={__("Grab Cursor", "bpinterest")} checked={isGrabCursor} onChange={val => updateObject("slider", "isGrabCursor", val)}/> */}
		</PanelBody>}

	</>
}
export default General;