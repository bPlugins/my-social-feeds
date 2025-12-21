import { useEffect, useState } from 'react';
import BackBtn from './Elements/BackBtn';
import fb_prompt from '../../../utils/functions';
import { generateString } from '../../../tiktok-player/utils/functions';
import { tiktok } from '../../../utils/icons';

const TikTokSettings = ({ onBack }) => {
    const [authorized, setAuthorized] = useState();
    const { href, origin, pathname } = window.location;

    const state = generateString(15);
    const pageUrl = `${origin}/wp-admin?page=my-social-feeds`;

    const url = `https://api.bplugins.com/tiktok-landing/?state=${state}&redirect_url=${pageUrl}&isCloseModal=lbb_auth_modal`;

    const tiktokPrompt = () => fb_prompt(url, 850, 520, function () {
        getAuthorized();
    });

    useEffect(() => {
        getAuthorized();
    }, []);

    const handleUnauthorized = async () => {

        try {
            const response = await fetch(`${ttpData.ajaxUrl}?action=ttp_tiktok_clear&nonce=${ttpData?.nonce}&action_type=unauthorized`);
            await response.json();
            getAuthorized();

        } catch (error) {
            console.log('error', error);
        }
    }

    const getAuthorized = async () => {
        try {
            const response = await fetch(`${ttpData.ajaxUrl}?action=ttp_tiktok_isAuthorized&nonce=${ttpData?.nonce}`);
            const data = await response.json();
            setAuthorized(data?.data?.isAuthorized);

        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <div className="settingsPage ig-settings-wrapper">
            <BackBtn onBack={onBack} />
            <div className="ig-settings-card">
                <div className="ig-settings-header">
                    <h2>TikTok Account </h2>

                    {authorized ? <button className="ig-btn-tiktok" onClick={handleUnauthorized}> <span className="ig-btn-icon"> {tiktok("#fff")} </span> Logout </button> : <button className="ig-btn-tiktok" onClick={tiktokPrompt}> <span className="ig-btn-icon"> {tiktok("#fff")} </span> Connect TikTok Account </button>}
                </div>
            </div>
        </div>
    );
};
export default TikTokSettings;