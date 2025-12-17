import BackBtn from './Elements/BackBtn';
import fb_prompt from '../../../utils/functions';

const TikTokSettings = ({ onBack }) => {

    const url = 'https://api.bplugins.com/tiktok-landing/?state=TqrNe2i1ztkqS2D&redirect_url=http://dev.local/wp-admin/admin.php?page=my-social-feedsdsafas#/configure';
    const tiktokPrompt = () => fb_prompt(url, 850, 520, function () {

    });

    return (
        <div className="settingsPage">
            <BackBtn onBack={onBack} /><h2>TikTok Settings</h2><button onClick={tiktokPrompt}>Connect TikTok Account
            </button>
        </div>
    );
};
export default TikTokSettings;
