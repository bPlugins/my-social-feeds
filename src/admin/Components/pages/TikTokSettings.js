import { __ } from '@wordpress/i18n';
import { useEffect, useState } from 'react';
import BackBtn from './Elements/BackBtn';
import fb_prompt from '../../../utils/functions';
import { generateString } from '../../../tiktok-player/utils/functions';
import { tiktok } from '../../../utils/icons';
import Table from './Elements/Table';


const TikTokSettings = ({ onBack, props, fetchAccounts, loading, setLoading, accounts }) => {

    const { isPremium } = props;
    const nonce = ttpData?.dataGet;
    const state = generateString(12);
    // const slug = 'isPremium ? `/wp-admin?page=my-social-feeds` : `/wp-admin/tools.php?page=my-social-feeds`';
    const slug = '/wp-admin/edit.php?post_type=msfbp';
    // const redirect = `${location.origin}${slug}&isCloseModal=lbb_auth_modal&nonce=${nonce}`;
    // const connectUrl = `https://api.bplugins.com/tiktok-landing/?state=${state}&redirect_url=${redirect}`;
    const redirectRaw = `${location.origin}/wp-admin/edit.php?post_type=msfbp&page=my-social-feeds&isCloseModal=lbb_auth_modal&nonce=${nonce}`;

    const redirect = encodeURIComponent(redirectRaw);
    const connectUrl = `https://api.bplugins.com/tiktok-landing/?state=${state}&redirect_url=${redirect}`;

    const connect = () => fb_prompt(connectUrl, 850, 720, fetchAccounts);

    const removeAccount = async (id) => {
        setLoading(true);
        await fetch(`${ttpData.ajaxUrl}?action=ttp_remove_account`, {
            method: 'POST',
            body: new URLSearchParams({ account_id: id }),
        });
        fetchAccounts();
        setLoading(false);
    };

    useEffect(() => {
        fetchAccounts();
    }, []);



    return (
        <div className="settingsPage ig-settings-wrapper">
            <BackBtn onBack={onBack} />

            <div className="ig-settings-card">
                <div className="ig-settings-header">
                    <h2>{__('TikTok Accounts', 'my-social-feeds')}</h2>

                    {loading ? <span className="ig-badge">{__('Loading...', 'my-social-feeds')}</span> : <button className="ig-btn-tiktok" onClick={connect}> <span className="ig-btn-icon">{tiktok('#fff')}</span> {__('Add TikTok Account', 'my-social-feeds')}</button>}

                    {/* <button className="ig-btn-tiktok" onClick={connect}> <span className="ig-btn-icon">{tiktok('#fff')}</span>Add TikTok Account</button> */}
                </div>
                <Table tokens={accounts} handleDeleteToken={removeAccount} blockType="tiktok" ValueName={"connected at"} />
            </div>
        </div>
    );
};
export default TikTokSettings;

export function getDataParamsFromUrl() {

    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('isCloseModal');


    return dataParam ? dataParam : null;

}