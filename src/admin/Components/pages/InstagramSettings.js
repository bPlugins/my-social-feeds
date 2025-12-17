import { useEffect, useState } from 'react';
import BackBtn from './Elements/BackBtn';
import Table from './Elements/Table';
import { minus, plus } from '../../../utils/icons';

const InstagramSettings = ({ onBack }) => {
    const [accessToken, setAccessToken] = useState({ label: "", value: "" });
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInputBox, setShowInputBox] = useState(false);

    useEffect(() => {
        fetchTokens();
    }, []);

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

    // Save Token
    const handleSaveToken = async () => {
        // if (!accessToken.trim()) return;

        try {
            setLoading(true);
            const res = await fetch(
                `${msfAuthorization?.ajaxUrl}?action=msfbp-set-instagram-access-token&nonce=${msfAuthorization?.nonce}&label=${accessToken?.label}&value=${accessToken?.value}`
            );
            const data = await res.json();
            setAccessToken({ "label": "", "value": "" });
            fetchTokens();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    // Delete
    const handleDeleteToken = async (index) => {

        try {
            const res = await fetch(
                `${msfAuthorization?.ajaxUrl}?action=msfbp-delete-instagram-access-token&nonce=${msfAuthorization?.nonce}&index=${index}`
            );
            const data = await res.json();
            if (data?.success) {
                setTokens((prev) => prev.filter((_, i) => i !== index));
            }
        } catch (e) {
            console.error(e);
        }


    };

    return (
        <div className="settingsPage ig-settings-wrapper">
            <BackBtn onBack={onBack} />

            <div className="ig-settings-card">
                <div className="ig-settings-header">
                    <h2>Instagram Settings</h2>
                    <button className="ig-add-btn" onClick={() => setShowInputBox(!showInputBox)}>
                        {showInputBox ? <> {minus}</> : <>{plus}</>}
                    </button>
                    {loading && <span className="ig-badge">Loading...</span>}
                </div>

                {/* save token html  */}
                {showInputBox &&
                    <div className="ig-input-row">
                        <input type="text" className="ig-input" placeholder="Label Here..." value={accessToken?.label} onChange={(e) => setAccessToken({ ...accessToken, label: e.target.value })} />

                        <input type="text" className="ig-input" placeholder="Access Token..." value={accessToken?.value} onChange={(e) => setAccessToken({ ...accessToken, value: e.target.value })} />
                        <button className="ig-btn ig-btn-primary" onClick={handleSaveToken}> Save </button>
                    </div>}
                {
                    !showInputBox && <Table blockType="instagram" ValueName="Access Token" tokens={tokens} handleDeleteToken={handleDeleteToken} />

                }

            </div>
        </div>
    );
};

export default InstagramSettings;
