
import { useState } from 'react';
import { __ } from "@wordpress/i18n";
import { PanelBody, PanelRow, TextControl, ToggleControl, SelectControl, RangeControl, __experimentalUnitControl as UnitControl, __experimentalNumberControl as NumberControl, Button } from "@wordpress/components";
import { effectOpt, layoutOpt, ratioOpt } from '../../../../utils/options';
import { Label } from '../../../../../../../bpl-tools/Components';
import { BDevice } from '../../../../../../../bpl-tools/Components/Deprecated';
import { emUnit, perUnit, pxUnit } from '../../../../../../../bpl-tools/utils/options';
import { BControlPro } from '../../../../../../../bpl-tools/ProControls';

import InsertFeeds from '../../../../../utils/InsertFeeds';

const General = ({ attributes, updateObject, getData, setAttributes, isPremium, setProModalOpen, clientId, allNames }) => {
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

		<PanelBody className="bPlPanelBody addRemoveItems editItem" title={__("Account Information", "my-social-feeds")} initialOpen={true}>

			{/* <SelectControl label={__('User Name:', 'my-social-feeds')} labelPosition='side' options={[{ label: "Select Name", value: '' }, ...allNames]} value={userName} onChange={(val) => updateObject('accountInfo', 'userName', val)} /> */}

			<TextControl className='' label={__("User Name", 'my-social-feeds')} labelPosition={__('top', 'my-social-feeds')} value={userName} placeholder={__('Enter Your User Name', 'my-social-feeds')}
				onChange={(val) => updateObject('accountInfo', 'userName', val)} />

			<TextControl className='' label={__('Board Name', 'my-social-feeds')} labelPosition={__('top', 'my-social-feeds')} value={boardName} placeholder={__('Enter Your BoardName', 'my-social-feeds')} onChange={(val) => updateObject('accountInfo', 'boardName', val)} />

			<Button className='authorBtn' onClick={getData}>Fetch</Button>
		</PanelBody>

		<PanelBody className="bPlPanelBody" title={__("Elements", "my-social-feeds")} initialOpen={false}>

			<ToggleControl label={__("Profile", "my-social-feeds")} checked={isProfile} onChange={val => updateObject("elements", "isProfile", val)} />

			<ToggleControl className='mt10' label={__("Pins", "my-social-feeds")} checked={isPins} onChange={val => updateObject("elements", "isPins", val)} />

			{isProfile && <>
				<ToggleControl className='mt10' label={__("Image", "my-social-feeds")} checked={isImage} onChange={val => updateObject("elements", "isImage", val)} />
				<ToggleControl className='mt10' label={__("Name", "my-social-feeds")} checked={isName} onChange={val => updateObject("elements", "isName", val)} />
				<ToggleControl className='mt10' label={__("About", "my-social-feeds")} checked={isDesc} onChange={val => updateObject("elements", "isDesc", val)} />
				<ToggleControl className='mt10' label={__("Follower count", "my-social-feeds")} checked={isFollower} onChange={val => updateObject("elements", "isFollower", val)} />
				<ToggleControl className='mt10' label={__("Pin count", "my-social-feeds")} checked={isPin} onChange={val => updateObject("elements", "isPin", val)} />
				<ToggleControl className='mt10' label={__("Follower Button", "my-social-feeds")} checked={isBtn} onChange={val => updateObject("elements", "isBtn", val)} />
			</>}
		</PanelBody>

		<PanelBody className="bPlPanelBody" title={__("Layout", "my-social-feeds")} initialOpen={false}>
			<BControlPro label={__("Select", "my-social-feeds")} value={layout} options={layoutOpt} onChange={(val) => setAttributes({ layout: val })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={SelectControl} />

			{(isPins && (layout === 'default' || layout === 'slider')) &&
				<SelectControl className="mt15" label={__('Ratio', 'my-social-feeds')} labelPosition="side" value={pinCoverImage?.ratio} options={ratioOpt} onChange={(val) => { updateObject("pinCoverImage", "ratio", val) }} />
			}

			{/* column define option  */}
			<PanelRow className='mt10'>
				<Label mt='0'>{__('Columns:', 'my-social-feeds')}</Label>
				<BDevice device={device} onChange={val => setDevice(val)} />
			</PanelRow>

			<RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />

			{/* column Gap  */}
			<UnitControl className='mt20' label={__('Column Gap:', 'my-social-feeds')} labelPosition='left' value={columnGap} onChange={val => setAttributes({ columnGap: val })} units={[pxUnit(30), perUnit(3), emUnit(2)]} isResetValueOnUnitChange={true} />

			{/* row Gap  */}
			{layout != 'slider' && <UnitControl className='mt20' label={__('Row Gap:', 'my-social-feeds')} labelPosition='left' value={rowGap} onChange={val => setAttributes({ rowGap: val })} units={[pxUnit(40), perUnit(3), emUnit(2.5)]} isResetValueOnUnitChange={true} />}
		</PanelBody>

		<PanelBody className="bPlPanelBody" title={__("Lightbox", "my-social-feeds")} initialOpen={false}>

			<ToggleControl className='mt10' label={__("Info Bar", "my-social-feeds")} checked={infobar} onChange={val => setAttributes({ fancyApps: { ...fancyApps, left: { ...left, infobar: val } } })} />

			<ToggleControl className='mt10' label={__("Zoom In", "my-social-feeds")} checked={zoomIn} onChange={val => setAttributes({ fancyApps: { ...fancyApps, middle: { ...middle, zoomIn: val } } })} />

			<ToggleControl className='mt10' label={__("Zoom Out", "my-social-feeds")} checked={zoomOut} onChange={val => setAttributes({ fancyApps: { ...fancyApps, middle: { ...middle, zoomOut: val } } })} />

			<BControlPro className='mt10' label={__("Toggle1to1", "my-social-feeds")} checked={toggle1to1} onChange={val => setAttributes({ fancyApps: { ...fancyApps, middle: { ...middle, toggle1to1: val } } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

			<BControlPro className='mt10' label={__("RotateCCW", "my-social-feeds")} checked={rotateCCW} onChange={val => setAttributes({ fancyApps: { ...fancyApps, middle: { ...middle, rotateCCW: val } } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

			<BControlPro className='mt10' label={__("RotateCW", "my-social-feeds")} checked={rotateCW} onChange={val => setAttributes({ fancyApps: { ...fancyApps, middle: { ...middle, rotateCW: val } } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

			<BControlPro className='mt10' label={__("FlipX", "my-social-feeds")} checked={flipX} onChange={val => setAttributes({ fancyApps: { ...fancyApps, middle: { ...middle, flipX: val } } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

			<BControlPro className='mt10' label={__("FlipY", "my-social-feeds")} checked={flipY} onChange={val => setAttributes({ fancyApps: { ...fancyApps, middle: { ...middle, flipY: val } } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

			<ToggleControl className='mt10' label={__("Slide show", "my-social-feeds")} checked={slideshow} onChange={val => setAttributes({ fancyApps: { ...fancyApps, right: { ...right, slideshow: val } } })} />

			<ToggleControl className='mt10' label={__("Thumbs", "my-social-feeds")} checked={thumbs} onChange={val => setAttributes({ fancyApps: { ...fancyApps, right: { ...right, thumbs: val } } })} />

			<ToggleControl className='mt10' label={__("Close", "my-social-feeds")} checked={close} onChange={val => setAttributes({ fancyApps: { ...fancyApps, right: { ...right, close: val } } })} />
		</PanelBody>

		{layout === "slider" && <PanelBody className="bPlPanelBody" title={__("Carousel", "my-social-feeds")} initialOpen={false}>

			<SelectControl label={__('Effect', "my-social-feeds")} value={effect} options={effectOpt} onChange={val => updateObject("slider", "effect", val)} />

			<ToggleControl className='' label={__("Loop", "my-social-feeds")} checked={isLoop} onChange={val => updateObject("slider", "isLoop", val)} />

			<ToggleControl className='mt10' label={__("Auto Play", "my-social-feeds")} checked={isAutoPlay} onChange={val => updateObject("slider", "isAutoPlay", val)} />

			{isAutoPlay && <NumberControl className='mt10' label={__("Duration", "my-social-feeds")} isShiftStepEnabled={true} shiftStep={10} value={autoPlayDelay} onChange={val => updateObject("slider", "autoPlayDelay", val)} />}

			<ToggleControl className='mt10' label={__("Mouse Wheel", "my-social-feeds")} checked={isMouseWheel} onChange={val => updateObject("slider", "isMouseWheel", val)} />

			{/* <ToggleControl className='mt10' label={__("Grab Cursor", "my-social-feeds")} checked={isGrabCursor} onChange={val => updateObject("slider", "isGrabCursor", val)}/> */}
		</PanelBody>}

	</>
}
export default General;