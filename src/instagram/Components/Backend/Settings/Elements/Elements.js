import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow, ToggleControl, __experimentalNumberControl as NumberControl, TextControl } from '@wordpress/components';
import { InlineMediaUpload, Label } from '../../../../../../../bpl-tools/Components';
import { BControlPro } from '../../../../../../../bpl-tools/ProControls';

const Elements = ({ attributes, setAttributes, isPremium, setProModalOpen, updateObj, isBusiness }) => {

    const { isProfile, profileImg, isFollowBtn, isFollowBtnInFooter, isRemCaptionHash, captionLength, isLoadMore, isCaption, profileInfo } = attributes;
    const { isFollowers, isFollows, isName, name, isBio, bio } = profileInfo || {};

    return <>
        <PanelBody className='bPlPanelBody' title={__('Profile', 'my-social-feeds')}>
            <ToggleControl label={__('Show Profile', 'my-social-feeds')} checked={isProfile} onChange={val => setAttributes({ isProfile: val })} />

            {isProfile && <>
                {!isBusiness && <>
                    <Label>{__('Profile Photo:', 'my-social-feeds')}</Label>
                    <InlineMediaUpload value={profileImg} types={['image']} onChange={val => setAttributes({ profileImg: val })} placeholder={__('Upload Profile Picture', 'my-social-feeds')} />
                </>}
                <small className={isBusiness ? 'mt20' : ''}>{__('For business connect, profile photo will show from instagram account!', 'my-social-feeds')}</small>

                <BControlPro className='mt20' label={__('Show Name', 'my-social-feeds')} checked={isName} onChange={val => updateObj('profileInfo', 'isName', val)} isPremium={isPremium} Component={ToggleControl} setIsProModalOpen={setProModalOpen} />
                <small>{__('For business connect, name will show from instagram account!', 'my-social-feeds')}</small>

                {!isBusiness && <BControlPro value={name} onChange={val => updateObj('profileInfo', 'name', val)} placeholder={__('Enter Name', 'my-social-feeds')} isPremium={isPremium} Component={TextControl} setIsProModalOpen={setProModalOpen} />}

                <BControlPro className='mt20' label={__('Show Biography', 'my-social-feeds')} checked={isBio} onChange={val => updateObj('profileInfo', 'isBio', val)} isPremium={isPremium} Component={ToggleControl} setIsProModalOpen={setProModalOpen} />
                <small>{__('For business connect, biography will show from instagram account!', 'my-social-feeds')}</small>

                {!isBusiness && <BControlPro value={bio} onChange={val => updateObj('profileInfo', 'bio', val)} placeholder={__('Enter Biography', 'my-social-feeds')} isPremium={isPremium} Component={TextControl} setIsProModalOpen={setProModalOpen} />}
            </>}
        </PanelBody>


        <PanelBody className='bPlPanelBody' title={__('Follow Button', 'my-social-feeds')} initialOpen={false}>
            <ToggleControl label={__('Show Follow Button', 'my-social-feeds')} checked={isFollowBtn} onChange={val => setAttributes({ isFollowBtn: val })} />

            {isFollowBtn && <ToggleControl className='mt10' label={__('Follow Button In Footer', 'my-social-feeds')} checked={isFollowBtnInFooter} onChange={val => setAttributes({ isFollowBtnInFooter: val })} />}
        </PanelBody>


        <PanelBody className='bPlPanelBody' title={__('Caption', 'my-social-feeds')} initialOpen={false}>
            <ToggleControl label={__('Show Caption', 'my-social-feeds')} checked={isCaption} onChange={val => setAttributes({ isCaption: val })} />

            {isCaption && <>
                <BControlPro className='mt10' label={__('Remove Caption Hashtag', 'my-social-feeds')} checked={isRemCaptionHash} onChange={val => setAttributes({ isRemCaptionHash: val })} isPremium={isPremium} Component={ToggleControl} setIsProModalOpen={setProModalOpen} />

                <PanelRow>
                    <Label className=''>{__('Caption length:', 'my-social-feeds')}</Label>
                    <NumberControl value={captionLength} onChange={val => setAttributes({ captionLength: parseInt(val) })} min={0} />
                </PanelRow>
            </>}
        </PanelBody>


        <PanelBody className='bPlPanelBody' title={__('Load More Button', 'my-social-feeds')} initialOpen={false}>
            <ToggleControl label={__('Show Load More', 'my-social-feeds')} checked={isLoadMore} onChange={val => setAttributes({ isLoadMore: val })} />
        </PanelBody>
    </>
}
export default Elements;