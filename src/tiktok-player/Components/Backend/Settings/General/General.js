import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow, TabPanel, TextControl, ToggleControl, SelectControl, RangeControl, Button, __experimentalBoxControl as BoxControl, __experimentalUnitControl as UnitControl, Spinner } from '@wordpress/components';
import { HelpPanel, Label } from '../../../../../../../bpl-tools/Components';
import { BDevice } from '../../../../../../../bpl-tools/Components/Deprecated';
import { BControlPro } from '../../../../../../../bpl-tools/ProControls';

import options from '../../../../utils/options';
const { emUnit, perUnit, pxUnit, dUnit } = options;

const General = ({ attributes, setAttributes, isPremium, setProModalOpen, videosLists, handleCacheClear }) => {
    const { isProfile, isVideos, feedLayoutStyle, videoCoverImage, isLightbox, isLike, isComment, isView, isProfileImg, isBtn, isPopupContent, columns, columnGap, rowGap, videosInfo, isDisplayName, isShareBtn, isFollowing, isFollowers, isTotalLike, isBio, profileCacheT, videoCacheT } = attributes;

    const [feedDevice, setFeedDevice] = useState('desktop');
    const [device, setDevice] = useState('desktop');
    return <>
        <HelpPanel slug="b-tiktok-feed" docsLink="https://wptiktokfeed.com/docs" />

        <PanelBody className='bPlPanelBody ttpPanelBody' title={__('Profile', 'tiktok')} initialOpen={false}>
            {/* Profile  */}
            <BControlPro className={`mt20`} label={__('Profile', 'tiktok')} checked={isProfile}
                onChange={(val) => setAttributes({ isProfile: val })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

            {isProfile && <>
                <ToggleControl label={__('Profile Image', 'tiktok')} className='mt20' checked={isProfileImg}
                    onChange={(val) => { setAttributes({ isProfileImg: val }); }}
                />
                <ToggleControl label={__('Display Name', 'tiktok')} className='mt20' checked={isDisplayName}
                    onChange={(val) => { setAttributes({ isDisplayName: val }); }} />

                <ToggleControl className='mt20' label={__('Share button', 'tiktok')} checked={isShareBtn} onChange={(val) => { setAttributes({ isShareBtn: val }); }} />

                <ToggleControl label={__('Following', 'tiktok')} className='mt20' checked={isFollowing}
                    onChange={(val) => { setAttributes({ isFollowing: val }); }} />

                <ToggleControl label={__('Followers', 'tiktok')} className='mt20' checked={isFollowers}
                    onChange={(val) => { setAttributes({ isFollowers: val }); }} />

                <ToggleControl label={__('Total Like', 'tiktok')} className='mt20' checked={isTotalLike} onChange={(val) => { setAttributes({ isTotalLike: val }); }} />

                <ToggleControl label={__('Biography', 'tiktok')} className='mt20' checked={isBio}
                    onChange={(val) => { setAttributes({ isBio: val }); }} />
            </>}
        </PanelBody>

        <PanelBody className='bPlPanelBody' title={__('Content/Videos', 'tiktok')} initialOpen={false}>

            <BControlPro className={`mt20`} label={__('Videos', 'tiktok')} checked={isVideos} onChange={(val) => setAttributes({ isVideos: val })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

            <BControlPro label={__('View on TikTok', 'tiktok')} className='mt20' checked={isBtn?.viewOn} onChange={(val) => { setAttributes({ isBtn: { ...isBtn, viewOn: val } }); }} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

            <BControlPro label={__('Load More', 'tiktok')} className='mt20' checked={isBtn?.loadMore} onChange={(val) => { setAttributes({ isBtn: { ...isBtn, loadMore: val } }); }} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

            <BControlPro className={`mt20`} label={__('Details in popup', 'tiktok')} checked={isPopupContent?.rightContent} onChange={(val) => setAttributes({ isPopupContent: { ...isPopupContent, rightContent: val } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

            <BControlPro className={`mt20`} label={__('Title', 'tiktok')} checked={videosInfo?.title} onChange={(val) => setAttributes({ videosInfo: { ...videosInfo, title: val } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

            <BControlPro className={`mt20`} label={__('Comment', 'tiktok')} checked={videosInfo?.comment} onChange={(val) => setAttributes({ videosInfo: { ...videosInfo, comment: val } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

            <BControlPro className={`mt20`} label={__('Like', 'tiktok')} checked={videosInfo?.like} onChange={(val) => setAttributes({ videosInfo: { ...videosInfo, like: val } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

            <BControlPro className={`mt20`} label={__('Date', 'tiktok')} checked={videosInfo?.date} onChange={(val) => setAttributes({ videosInfo: { ...videosInfo, date: val } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

            <BControlPro className={`mt20`} label={__('Line', 'tiktok')} checked={videosInfo?.line} onChange={(val) => setAttributes({ videosInfo: { ...videosInfo, line: val } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

        </PanelBody>

        {isVideos && <>
            <PanelBody className='bPlPanelBody' title={__('Layout', 'tiktok')} initialOpen={false}>

                <BControlPro label={__('Layout', 'tiktok')} labelPosition="side" value={feedLayoutStyle} options={options?.feedLayoutOpt} onChange={(val) => { setAttributes({ feedLayoutStyle: val }) }} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={SelectControl} />

                <PanelRow className='mt20'>
                    <Label mt='0'>{__('Feed Per Page', 'tiktok')}</Label>
                    <BControlPro device={feedDevice} onChange={val => setFeedDevice(val)} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={BDevice} />
                </PanelRow>

                <BControlPro value={videosLists[feedDevice]} onChange={val => setAttributes({ videosLists: { ...videosLists, [feedDevice]: val } })} min={1} max={20} step={1} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={RangeControl} />

                {/* Check Slider Layout  */}
                {feedLayoutStyle !== "slider" && <>
                    {/* column Gap  */}
                    <UnitControl className='mt20' label={__('Column Gap:', 'tiktok')} labelPosition='left' value={columnGap} onChange={val => setAttributes({ columnGap: val })} units={[pxUnit(30), perUnit(3), emUnit(2)]} isResetValueOnUnitChange={true} />


                    {/* row Gap  */}
                    <UnitControl className='mt20' label={__('Row Gap:', 'tiktok')} labelPosition='left' value={rowGap} onChange={val => setAttributes({ rowGap: val })} units={[pxUnit(40), perUnit(3), emUnit(2.5)]} isResetValueOnUnitChange={true} />


                    {/* column define option  */}
                    <PanelRow className='mt20'>
                        <Label mt='0'>{__('Columns:', 'tiktok')}</Label>
                        <BDevice device={device} onChange={val => setDevice(val)} />
                    </PanelRow>

                    <RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />
                    {feedLayoutStyle === 'default' &&
                        <BControlPro label={__('Lightbox', 'tiktok')} className='mt20' checked={isLightbox} onChange={(val) => { setAttributes({ isLightbox: val }); }} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />
                    }
                </>}
            </PanelBody>

            <PanelBody className='bPlPanelBody ttpPanelBody' title={__('Video Overly', 'tiktok')} initialOpen={false}>
                <BControlPro label={__('Show Like ', 'tiktok')} className='mt20' checked={isLike}
                    onChange={(val) => { setAttributes({ isLike: val }); }} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

                <BControlPro label={__('Show Comment ', 'tiktok')} className='mt20' checked={isComment}
                    onChange={(val) => { setAttributes({ isComment: val }); }} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

                <BControlPro label={__('Show View ', 'tiktok')} className='mt20' checked={isView}
                    onChange={(val) => { setAttributes({ isView: val }); }} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

            </PanelBody>
        </>}

        {(isVideos && (feedLayoutStyle === 'default' || feedLayoutStyle === 'slider')) &&
            <PanelBody className='bPlPanelBody' title={__('Video Image Aspect Ratio', 'tiktok')} initialOpen={false}>
                <BControlPro className="mt15" label={__('Ratio', 'tiktok')} labelPosition="side" value={videoCoverImage?.ratio} options={options?.ratioOpt} onChange={(val) => {
                    setAttributes({ videoCoverImage: { ...videoCoverImage, ratio: val } })
                }} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={SelectControl} />
            </PanelBody>}

        <PanelBody className='bPlPanelBody' title={__('Cache Time', 'tiktok')} initialOpen={false}>
            <div className="ttpCacheTime">
                {isProfile && <BControlPro className='mt20' label={__('Profile:', 'tiktok')}
                    labelPosition='left' value={profileCacheT} onChange={profileCacheT => {
                        setAttributes({ profileCacheT }); handleCacheClear();
                    }} units={[dUnit(60, 'px', 'Minutes'), dUnit(1, 'em', 'Hours')]} isResetValueOnUnitChange={true} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={UnitControl}
                />}

                {isVideos && <BControlPro className='mt20' label={__('Video:', 'tiktok')} labelPosition='left' value={videoCacheT} onChange={videoCacheT => { setAttributes({ videoCacheT }); handleCacheClear(); }} units={[dUnit(60, 'px', 'Minutes'), dUnit(1, 'em', 'Hours')]} isResetValueOnUnitChange={true} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={UnitControl}
                />}
            </div>

        </PanelBody>
    </>
}
export default General;