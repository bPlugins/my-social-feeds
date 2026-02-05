import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow, TabPanel, TextControl, ToggleControl, SelectControl, RangeControl, Button, __experimentalBoxControl as BoxControl, __experimentalUnitControl as UnitControl, Spinner, Panel } from '@wordpress/components';
import { HelpPanel, Label } from '../../../../../../../bpl-tools/Components';
import { BDevice } from '../../../../../../../bpl-tools/Components/Deprecated';
import { BControlPro } from '../../../../../../../bpl-tools/ProControls';
import InsertFeeds from '../../../../../../src/utils/InsertFeeds';

import options from '../../../../utils/options';
const { emUnit, perUnit, pxUnit, dUnit } = options;

const General = ({ attributes, setAttributes, isPremium, setProModalOpen, videosLists, handleCacheClear, clientId, accounts, loading }) => {
    const { isProfile, isVideos, feedLayoutStyle, videoCoverImage, isLightbox, isLike, isComment, isView, isProfileImg, isBtn, isPopupContent, columns, columnGap, rowGap, videosInfo, isDisplayName, isShareBtn, isFollowing, isFollowers, isTotalLike, isBio, profileCacheT, videoCacheT, selectedAccountId, authorized } = attributes;

    const [feedDevice, setFeedDevice] = useState('desktop');
    const [device, setDevice] = useState('desktop');

    return <>
        <HelpPanel slug="b-tiktok-feed" docsLink="https://wptiktokfeed.com/docs" />

        <InsertFeeds blockType={"ttp/tiktok-player"} clientId={clientId} />

        <PanelBody className='bPlPanelBody' title={__('Select Account', 'my-social-feeds')}>
            {accounts?.length > 0 && <div className='ttpAuthorization'>

                <SelectControl value={selectedAccountId || ''}
                    options={[
                        { label: __('Choose Account', 'my-social-feeds'), value: '' },
                        ...accounts.map(acc => ({
                            label: acc.display_name || acc.account_id,
                            value: acc.account_id,
                        })),]} onChange={(value) => { setAttributes({ selectedAccountId: value, }); }} />

                <div className="cacheArea">
                    <Button className='ttpAuthBtn' disabled={loading} onClick={handleCacheClear}>
                        {__('Clear Cache', 'my-social-feeds')} {loading && <h3 className='wppLoading'><Spinner /></h3>} </Button>
                </div>
            </div>}

        </PanelBody>
        <PanelBody className='bPlPanelBody ttpPanelBody' title={__('Profile', 'my-social-feeds')} initialOpen={false}>
            {/* Profile  */}
            <ToggleControl className={`mt20`} label={__('Profile', 'my-social-feeds')} checked={isProfile} onChange={(val) => setAttributes({ isProfile: val })} />

            {isProfile && <>
                <ToggleControl label={__('Profile Image', 'my-social-feeds')} className='mt20' checked={isProfileImg}
                    onChange={(val) => { setAttributes({ isProfileImg: val }); }}
                />
                <ToggleControl label={__('Display Name', 'my-social-feeds')} className='mt20' checked={isDisplayName}
                    onChange={(val) => { setAttributes({ isDisplayName: val }); }} />

                <ToggleControl className='mt20' label={__('Share button', 'my-social-feeds')} checked={isShareBtn} onChange={(val) => { setAttributes({ isShareBtn: val }); }} />

                <ToggleControl label={__('Following', 'my-social-feeds')} className='mt20' checked={isFollowing}
                    onChange={(val) => { setAttributes({ isFollowing: val }); }} />

                <ToggleControl label={__('Followers', 'my-social-feeds')} className='mt20' checked={isFollowers}
                    onChange={(val) => { setAttributes({ isFollowers: val }); }} />

                <ToggleControl label={__('Total Like', 'my-social-feeds')} className='mt20' checked={isTotalLike} onChange={(val) => { setAttributes({ isTotalLike: val }); }} />

                <ToggleControl label={__('Biography', 'my-social-feeds')} className='mt20' checked={isBio}
                    onChange={(val) => { setAttributes({ isBio: val }); }} />
            </>}
        </PanelBody>

        <PanelBody className='bPlPanelBody' title={__('Content/Videos', 'my-social-feeds')} initialOpen={false}>

            <ToggleControl className={`mt20`} label={__('Videos', 'my-social-feeds')} checked={isVideos} onChange={(val) => setAttributes({ isVideos: val })} />

            <BControlPro label={__('View on TikTok', 'my-social-feeds')} className='mt20' checked={isBtn?.viewOn} onChange={(val) => { setAttributes({ isBtn: { ...isBtn, viewOn: val } }); }} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

            <ToggleControl label={__('Load More', 'my-social-feeds')} className='mt20' checked={isBtn?.loadMore} onChange={(val) => { setAttributes({ isBtn: { ...isBtn, loadMore: val } }); }} />

            <BControlPro className={`mt20`} label={__('Details in popup', 'my-social-feeds')} checked={isPopupContent?.rightContent} onChange={(val) => setAttributes({ isPopupContent: { ...isPopupContent, rightContent: val } })} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />

            <ToggleControl className={`mt20`} label={__('Title', 'my-social-feeds')} checked={videosInfo?.title} onChange={(val) => setAttributes({ videosInfo: { ...videosInfo, title: val } })} />

            <ToggleControl className={`mt20`} label={__('Comment', 'my-social-feeds')} checked={videosInfo?.comment} onChange={(val) => setAttributes({ videosInfo: { ...videosInfo, comment: val } })} />

            <ToggleControl className={`mt20`} label={__('Like', 'my-social-feeds')} checked={videosInfo?.like} onChange={(val) => setAttributes({ videosInfo: { ...videosInfo, like: val } })} />

            <ToggleControl className={`mt20`} label={__('Date', 'my-social-feeds')} checked={videosInfo?.date} onChange={(val) => setAttributes({ videosInfo: { ...videosInfo, date: val } })} />

            <ToggleControl className={`mt20`} label={__('Line', 'my-social-feeds')} checked={videosInfo?.line} onChange={(val) => setAttributes({ videosInfo: { ...videosInfo, line: val } })} />
        </PanelBody>

        {isVideos && <>
            <PanelBody className='bPlPanelBody' title={__('Layout', 'my-social-feeds')} initialOpen={false}>

                <BControlPro label={__('Layout', 'my-social-feeds')} labelPosition="side" value={feedLayoutStyle} options={options?.feedLayoutOpt} onChange={(val) => { setAttributes({ feedLayoutStyle: val }) }} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={SelectControl} />

                <PanelRow className='mt20'>
                    <Label mt='0'>{__('Feed Per Page', 'my-social-feeds')}</Label>
                    <BDevice device={feedDevice} onChange={val => setFeedDevice(val)} />
                </PanelRow>

                <RangeControl value={videosLists[feedDevice]} onChange={val => setAttributes({ videosLists: { ...videosLists, [feedDevice]: val } })} min={1} max={20} step={1} />

                {/* Check Slider Layout  */}
                {feedLayoutStyle !== "slider" && <>
                    {/* column Gap  */}
                    <UnitControl className='mt20' label={__('Column Gap:', 'my-social-feeds')} labelPosition='left' value={columnGap} onChange={val => setAttributes({ columnGap: val })} units={[pxUnit(30), perUnit(3), emUnit(2)]} isResetValueOnUnitChange={true} />


                    {/* row Gap  */}
                    <UnitControl className='mt20' label={__('Row Gap:', 'my-social-feeds')} labelPosition='left' value={rowGap} onChange={val => setAttributes({ rowGap: val })} units={[pxUnit(40), perUnit(3), emUnit(2.5)]} isResetValueOnUnitChange={true} />


                    {/* column define option  */}
                    <PanelRow className='mt20'>
                        <Label mt='0'>{__('Columns:', 'my-social-feeds')}</Label>
                        <BDevice device={device} onChange={val => setDevice(val)} />
                    </PanelRow>

                    <RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />
                    {feedLayoutStyle === 'default' &&
                        <BControlPro label={__('Lightbox', 'my-social-feeds')} className='mt20' checked={isLightbox} onChange={(val) => { setAttributes({ isLightbox: val }); }} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={ToggleControl} />
                    }
                </>}
            </PanelBody>

            <PanelBody className='bPlPanelBody ttpPanelBody' title={__('Video Overly', 'my-social-feeds')} initialOpen={false}>
                <ToggleControl label={__('Show Like ', 'my-social-feeds')} className='mt20' checked={isLike} onChange={(val) => { setAttributes({ isLike: val }); }} />

                <ToggleControl label={__('Show Comment ', 'my-social-feeds')} className='mt20' checked={isComment} onChange={(val) => { setAttributes({ isComment: val }); }} />

                <ToggleControl label={__('Show View ', 'my-social-feeds')} className='mt20' checked={isView}
                    onChange={(val) => { setAttributes({ isView: val }); }} i />

            </PanelBody>
        </>}

        {(isVideos && (feedLayoutStyle === 'default' || feedLayoutStyle === 'slider')) &&
            <PanelBody className='bPlPanelBody' title={__('Video Image Aspect Ratio', 'my-social-feeds')} initialOpen={false}>
                <SelectControl className="mt15" label={__('Ratio', 'my-social-feeds')} labelPosition="side" value={videoCoverImage?.ratio} options={options?.ratioOpt} onChange={(val) => {
                    setAttributes({ videoCoverImage: { ...videoCoverImage, ratio: val } })
                }} />
            </PanelBody>}

        <PanelBody className='bPlPanelBody' title={__('Cache Time', 'my-social-feeds')} initialOpen={false}>
            <div className="ttpCacheTime">
                {isProfile && <BControlPro className='mt20' label={__('Profile:', 'my-social-feeds')}
                    labelPosition='left' value={profileCacheT} onChange={profileCacheT => {
                        setAttributes({ profileCacheT }); handleCacheClear();
                    }} units={[dUnit(60, 'px', 'Minutes'), dUnit(1, 'em', 'Hours')]} isResetValueOnUnitChange={true} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={UnitControl}
                />}

                {isVideos && <BControlPro className='mt20' label={__('Video:', 'my-social-feeds')} labelPosition='left' value={videoCacheT} onChange={videoCacheT => { setAttributes({ videoCacheT }); handleCacheClear(); }} units={[dUnit(60, 'px', 'Minutes'), dUnit(1, 'em', 'Hours')]} isResetValueOnUnitChange={true} isPremium={isPremium} setIsProModalOpen={setProModalOpen} Component={UnitControl}
                />}
            </div>
        </PanelBody>
    </>
}
export default General;