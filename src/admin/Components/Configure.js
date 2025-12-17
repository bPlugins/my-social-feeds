import { useState } from "react";
import InstagramSettings from './pages/InstagramSettings';
import TikTokSettings from './pages/TikTokSettings';
import PinterestSettings from './pages/PinterestSettings';
import TwitterSettings from './pages/TwitterSettings';
import { instagram, pinterest, tiktok, twitter } from '../../utils/icons';

const Configure = () => {
    const [screen, setScreen] = useState("main");

    const tabs = [
        { name: "Instagram", icon: instagram("#000"), screen: "instagram" },
        { name: "TikTok", icon: tiktok("#000"), screen: "tiktok" },
        { name: "Pinterest", icon: pinterest("#000"), screen: "pinterest" },
        { name: "Twitter", icon: twitter("#000"), screen: "twitter" },
    ];

    return (
        <div className="bPlDashboardBox configureMain">
            {screen === "main" && (
                <div className="tabSmartGrid">
                    {tabs.map((tab) => (
                        <div
                            key={tab.name}
                            className="smartCard"
                            onClick={() => setScreen(tab.screen)}
                        >
                            <div className="cardIcon">{tab.icon}</div>
                            <h3>{tab.name}</h3>
                            <p>Click to configure your {tab.name} account.</p>
                        </div>
                    ))}
                </div>
            )}

            {screen === "instagram" && (
                <InstagramSettings onBack={() => setScreen("main")} />
            )}
            {screen === "tiktok" && (
                <TikTokSettings onBack={() => setScreen("main")} />
            )}
            {screen === "pinterest" && (
                <PinterestSettings onBack={() => setScreen("main")} />
            )}
            {screen === "twitter" && (
                <TwitterSettings onBack={() => setScreen("main")} />
            )}
        </div>
    );
};

export default Configure;
