import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow, TabPanel, RangeControl, ToggleControl, SelectControl, __experimentalUnitControl as UnitControl, __experimentalNumberControl as NumberControl, Dashicon, CheckboxControl, TextControl } from '@wordpress/components';
import { BtnGroup, Label } from '../../../../../../../bpl-tools/Components';
import { BDevice } from '../../../../../../../bpl-tools/Components/Deprecated';
import { emUnit, perUnit, pxUnit } from '../../../../../../../bpl-tools/utils/options';
import { blockTypeOpt, timePeriods } from '../../../../utils/options';
import { remLocal } from '../../../../not_used/services';
import { BControlPro } from '../../../../../../../bpl-tools/ProControls';
import { useSelect, dispatch } from "@wordpress/data";
import InsertFeeds from '../../../../../utils/InsertFeeds';

const General = ({ attributes, setAttributes, setProModalOpen, setPageNumber, isPremium, clientId, tokens }) => {

    const { accessToken, itemVisible, isPopup, isLink, isLinkNewTab, columns, columnGap, rowGap, cacheTime,
        cacheTimePeriod, cId, blockType } = attributes;

    // const slug = isPremium ? '/wp-admin?page=my-social-feeds#/settings' : '/wp-admin/tools.php?page=my-social-feeds#/settings';
    const slug = '/wp-admin/edit.php?post_type=msfbp&page=my-social-feeds-settings#/settings';
    const redirect = `${location.origin}${slug}`;


    const insertBlockType = (type) => {
        const block = wp.blocks.createBlock(type);
        // return dispatch("core/block-editor").insertBlock(block, 0, clientId);
        return dispatch('core/block-editor').replaceBlock(clientId, block);
    };



    const [device, setDevice] = useState('desktop');
    return <>
        <PanelBody className='bPlPanelBody help' title={__('Help', 'my-social-feeds')} initialOpen={false}>
            <div className='helpItem'>
                <a href='https://bblockswp.com/docs/my-social-feeds-block/' target='_blank' rel='noreferrer'><Dashicon icon='book' />{__('Read Documentation', 'my-social-feeds')}</a>
            </div>

            <div className='helpItem rateUs'>
                <a href='https://wordpress.org/support/plugin/social-feed-block/reviews/#new-post' target='_blank' rel='noreferrer'>
                    <span><Dashicon icon='star-filled' />{__('Would you please rate us?', 'my-social-feeds')}</span>
                    <span>{__('We are new and we need your help to grow!🙏', 'my-social-feeds')}</span>
                </a>
            </div>
        </PanelBody>

        {/* <PanelBody className='bPlPanelBody' title={__('Select Social Feeds', 'my-social-feeds')} initialOpen={false}>
            <BtnGroup value={blockType} onChange={(val) => insertBlockType(val)} options={blockTypeOpt} isIcon={true} size='default' />
        </PanelBody> */}

        <InsertFeeds blockType={blockType} clientId={clientId} />

        <PanelBody className='bPlPanelBody' title={__('Instagram Settings', 'my-social-feeds')}>

            {/* {!allAccLoading && allAccounts?.length ? <div className='ifbAccounts'>
                {allAccounts?.map((account, index) => {
                    const { user_id, connectType = 'personal' } = account;

                    return <div className='ifbProfileNameWrap' key={index}>
                        {user_id && <CheckboxControl checked={hasIdInAccounts(accounts, user_id)} onChange={(val) => setAttributes({ accounts: val ? [...accounts, { user_id, connectType }] : accounts.filter(a => a.user_id !== user_id) })} />}

                        <ProfileName account={account} />
                    </div>
                })}
            </div> : null} */}
            {/* <div className='msfHelpLine'>

                <Label className='mb5'>{__('Access Token:', 'my-social-feeds')}</Label>
                <a href='https://www.youtube.com/watch?v=9zLjvdAV60A' target='_blank' rel='noreferrer'>{__('Help', 'my-social-feeds')}</a>
            </div> */}
            {/* <TextControl value={accessToken[0]} onChange={val => setAttributes({ accessToken: [val] })} /> */}

            <SelectControl label={__('Choose Account:', 'my-social-feeds')} options={[{ label: "Select Account", value: '' }, ...tokens]} value={accessToken[0]} onChange={val => setAttributes({ accessToken: [val] })} />

            <p className="ig-help-text"> Select an account or create multiple accounts from Instagram Settings. <a href={redirect} target="_blank" rel="noreferrer" > Create an account </a> </p>


            <PanelRow className='ifbCacheTimeRow mt20'>
                <Label className=''>{__('Cache Time:', 'my-social-feeds')}</Label>

                <NumberControl value={cacheTime} onChange={val => {
                    setAttributes({ cacheTime: parseInt(val) });
                    remLocal(`ifbData-${cId}`);
                }} />

                <SelectControl value={cacheTimePeriod} onChange={val => {
                    setAttributes({ cacheTimePeriod: val });
                    remLocal(`ifbData-${cId}`);
                }} options={timePeriods} />
            </PanelRow>
        </PanelBody>

        <PanelBody className='bPlPanelBody' title={__('Layout Settings', 'my-social-feeds')} initialOpen={false}>
            <Label className='mb5'>{__('Item Visible:', 'my-social-feeds')}</Label>
            <RangeControl value={itemVisible} onChange={val => {
                setAttributes({ itemVisible: val });
                setPageNumber(1);
            }} min={1} max={100} step={1} />


            <PanelRow className='mt20'>
                <Label className='mb5'>{__('Columns:', 'my-social-feeds')}</Label>
                <BDevice device={device} onChange={val => setDevice(val)} />
            </PanelRow>
            <RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />

            <UnitControl className='mt20' label={__('Column Gap:', 'my-social-feeds')} labelPosition='left' value={columnGap} onChange={val => setAttributes({ columnGap: val })} units={[pxUnit(), perUnit(), emUnit()]} />

            <UnitControl className='mt20' label={__('Row Gap:', 'my-social-feeds')} labelPosition='left' value={rowGap} onChange={val => setAttributes({ rowGap: val })} units={[pxUnit(), perUnit(), emUnit()]} />
        </PanelBody>

        <PanelBody className='bPlPanelBody' title={__('Features', 'my-social-feeds')} initialOpen={false}>
            <BControlPro label={__('Enable Popup', 'my-social-feeds')} checked={isPopup} onChange={val => setAttributes({ isPopup: val })} isPremium={isPremium} Component={ToggleControl} setIsProModalOpen={setProModalOpen} />
            <small>{__('Gallery Item link will not work if popup is enabled! Link will be in the popup area.')}</small>

            {!isPopup && <>
                <ToggleControl className='mt20' label={__('Enable Gallery Item Link', 'my-social-feeds')} checked={isLink} onChange={val => setAttributes({ isLink: val })} />

                {isLink && <ToggleControl className='mt10' label={__('Gallery Item Link in New Tab', 'my-social-feeds')} checked={isLinkNewTab} onChange={val => setAttributes({ isLinkNewTab: val })} />}
            </>}
        </PanelBody>
    </>
}
export default General;