import { __ } from '@wordpress/i18n';
import { useEffect, useState } from "react";
import InstagramSettings from './pages/InstagramSettings';
import TikTokSettings from './pages/TikTokSettings';
import { instagram, tiktok } from '../../utils/icons';


const Settings = (props) => {
    const [screen, setScreen] = useState("main");
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState([]);

    const tabs = [
        { name: "Instagram", icon: instagram("#000"), screen: "instagram", accounts: tokens.length },
        { name: "TikTok", icon: tiktok("#000"), screen: "tiktok", accounts: accounts.length },
    ];

    // Fetch Tokens All 
    const fetchTokens = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `${msfAuthorization?.ajaxUrl}?action=msfbp-get-instagram-access-token&nonce=${msfAuthorization?.nonce}`
            );
            const data = await res.json();
            setTokens(data?.data || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchAccounts = async () => {
        setLoading(true);
        const res = await fetch(`${accountInformation.ajaxUrl}?action=ttp_get_accounts&nonce=${accountInformation.nonce}`);
        const json = await res.json();
        setAccounts(json.data || []);
        console.log(json.data);

        setLoading(false);
    };

    useEffect(() => {
        fetchTokens();
        fetchAccounts();
    }, []);

    const instagramProps = {
        tokens,
        setTokens,
        loading,
        setLoading,
        fetchTokens
    }

    const tiktokProps = {
        accounts,
        setAccounts,
        loading,
        setLoading,
        fetchAccounts
    }

    return (
        <div className="bPlDashboardBox configureMain">
            <h1 className='header_title'>{__('Accounts', 'my-social-feeds')}</h1>
            {screen === "main" && (
                <div className="tabSmartGrid">
                    {tabs.map((tab) => (
                        <div key={tab.name} className="smartCard" onClick={() => setScreen(tab.screen)}>

                            <div className="cardTopRight">
                                {tab.accounts > 0 ? (
                                    <>
                                        <span className="statusChip connected">
                                            {__('Connected', 'my-social-feeds')}
                                        </span>
                                        <span className="accountCountBadge">{tab.accounts}</span>
                                    </>
                                ) : (
                                    <span className="statusChip notConnected">
                                        {__('Not connected', 'my-social-feeds')}
                                    </span>
                                )}
                            </div>

                            <div className="cardIcon">{tab.icon}</div>
                            <h3>{tab.name}</h3>
                            <p>{__('Click to configure your', 'my-social-feeds')} {tab.name} {__('account.', 'my-social-feeds')}</p>

                        </div>
                    ))}
                </div>
            )}

            {screen === "instagram" && (
                <InstagramSettings {...instagramProps} onBack={() => setScreen("main")} />
            )}
            {screen === "tiktok" && (
                <TikTokSettings {...tiktokProps} props={props} onBack={() => setScreen("main")} />
            )}
        </div>
    );
};
export default Settings;


export function getDataParamsFromUrl() {

    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('isCloseModal');


    return dataParam ? dataParam : null;

}