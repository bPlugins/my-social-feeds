import BackBtn from './Elements/BackBtn';
import fb_prompt from '../../../utils/functions';
import { useEffect } from 'react';
import { generateString } from '../../../tiktok-player/utils/functions';
import { tiktok } from '../../../utils/icons';

const TikTokSettings = ({ onBack }) => {

    const { href, origin, pathname } = window.location;

    const state = generateString(15);
    const pageUrl = `${origin}/wp-admin?page=my-social-feeds`

    const url = `https://api.bplugins.com/tiktok-landing/?state=${state}&redirect_url=${pageUrl}&isCloseModal=lbb_auth_modal`;

    const tiktokPrompt = () => fb_prompt(url, 850, 520, function () {
        console.log('cb');
    });


    useEffect(() => {
        const authorized = ttpData?.tiktokAuthorized;
        console.log(authorized);

    }, []);

    return (
        <div className="settingsPage ig-settings-wrapper">
            <BackBtn onBack={onBack} />
            <div className="ig-settings-card">
                <div className="ig-settings-header">
                    <h2>TikTok Account </h2>
                    <button className="ig-btn-tiktok" onClick={tiktokPrompt}> <span className="ig-btn-icon"> {tiktok("#fff")} </span> Connect TikTok Account </button>
                </div>
            </div>
        </div>
    );
};
export default TikTokSettings;