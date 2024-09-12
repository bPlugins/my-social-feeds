import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow,   ToggleControl, __experimentalNumberControl as NumberControl, TextControl } from '@wordpress/components';
import { BorderControl, InlineMediaUpload, Label } from '../../../../../../../Components';
import { BControlPro } from '../../../../../../../Components/Pro';

const Elements = ({attributes, setAttributes, isPremium, setProModalOpen, updateObj, isBusiness}) => {

    const { isProfile, profileImg,isFollowBtn, isFollowBtnInFooter, isRemCaptionHash, captionLength, isLoadMore, isCaption, profileInfo} = attributes;
    const { isFollowers, isFollows, isName, name, isBio, bio } = profileInfo || {};

    return <>
        <PanelBody className='bPlPanelBody' title={__('Profile', 'instagram-feed')}>
            <ToggleControl label={__('Show Profile', 'instagram-feed')} checked={isProfile} onChange={val => setAttributes({ isProfile: val })} />

            {isProfile && <>
                {!isBusiness && <>
                    <Label>{__('Profile Photo:', 'instagram-feed')}</Label>
                    <InlineMediaUpload value={profileImg} types={['image']} onChange={val => setAttributes({ profileImg: val })} placeholder={__('Upload Profile Picture', 'instagram-feed')} />
                </>}
                <small className={isBusiness ? 'mt20' : ''}>{__('For business connect, profile photo will show from instagram account!')}</small>

                {/* <ToggleControl className='mt20' label={__('Show Followers Count', 'instagram-feed')} checked={isFollowers} onChange={val => updateObj('profileInfo', 'isFollowers', val)} isPremium={isPremium} Component={ToggleControl} setOpen={setProModalOpen} />

                <ToggleControl className='mt20' label={__('Show Following Count', 'instagram-feed')} checked={isFollows} onChange={val => updateObj('profileInfo', 'isFollows', val)} isPremium={isPremium} Component={ToggleControl} setOpen={setProModalOpen} /> */}

                <BControlPro className='mt20' label={__('Show Name', 'instagram-feed')} checked={isName} onChange={val => updateObj('profileInfo', 'isName', val)} isPremium={isPremium} Component={ToggleControl} setOpen={setProModalOpen} />
                <small>{__('For business connect, name will show from instagram account!')}</small>

                {!isBusiness && <BControlPro value={name} onChange={val => updateObj('profileInfo', 'name', val)} placeholder={__('Enter Name', 'instagram-feed')} isPremium={isPremium} Component={TextControl} setOpen={setProModalOpen} />}

                <BControlPro className='mt20' label={__('Show Biography', 'instagram-feed')} checked={isBio} onChange={val => updateObj('profileInfo', 'isBio', val)} isPremium={isPremium} Component={ToggleControl} setOpen={setProModalOpen} />
                <small>{__('For business connect, biography will show from instagram account!')}</small>

                {!isBusiness && <BControlPro value={bio} onChange={val => updateObj('profileInfo', 'bio', val)} placeholder={__('Enter Biography', 'instagram-feed')} isPremium={isPremium} Component={TextControl} setOpen={setProModalOpen} />}
            </>}
        </PanelBody>


        <PanelBody className='bPlPanelBody' title={__('Follow Button', 'instagram-feed')} initialOpen={false}>
            <ToggleControl label={__('Show Follow Button', 'instagram-feed')} checked={isFollowBtn} onChange={val => setAttributes({ isFollowBtn: val })} />

            {isFollowBtn && <BControlPro className='mt10' label={__('Follow Button In Footer', 'instagram-feed')} checked={isFollowBtnInFooter} onChange={val => setAttributes({ isFollowBtnInFooter: val })} isPremium={isPremium} Component={ToggleControl} setOpen={setProModalOpen} />}
        </PanelBody>


        <PanelBody className='bPlPanelBody' title={__('Caption', 'instagram-feed')} initialOpen={false}>
            <ToggleControl label={__('Show Caption', 'instagram-feed')} checked={isCaption} onChange={val => setAttributes({ isCaption: val })} />

            {isCaption && <>
                <BControlPro className='mt10' label={__('Remove Caption Hashtag', 'instagram-feed')} checked={isRemCaptionHash} onChange={val => setAttributes({ isRemCaptionHash: val })} isPremium={isPremium} Component={ToggleControl} setOpen={setProModalOpen} />

                <PanelRow>
                    <Label className=''>{__('Caption length:', 'instagram-feed')}</Label>
                    <NumberControl value={captionLength} onChange={val => setAttributes({ captionLength: parseInt(val) })} min={0} />
                </PanelRow>
            </>}
        </PanelBody>


        <PanelBody className='bPlPanelBody' title={__('Load More Button', 'instagram-feed')} initialOpen={false}>
            <ToggleControl label={__('Show Load More', 'instagram-feed')} checked={isLoadMore} onChange={val => setAttributes({ isLoadMore: val })} />
        </PanelBody>
    </>
}
export default Elements;