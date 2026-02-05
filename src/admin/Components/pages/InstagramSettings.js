import { __ } from '@wordpress/i18n';
import { useEffect, useState } from 'react';
import BackBtn from './Elements/BackBtn';
import Table from './Elements/Table';
import { minus, plus } from '../../../utils/icons';

const InstagramSettings = ({ onBack, fetchTokens, setLoading, setTokens, tokens, loading }) => {
    const [accessToken, setAccessToken] = useState({ label: "", value: "" });
    const [showInputBox, setShowInputBox] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");


    useEffect(() => {
        fetchTokens();
    }, []);



    // Save Token
    const handleSaveToken = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `${msfAuthorization?.ajaxUrl}?action=msfbp-set-instagram-access-token&nonce=${msfAuthorization?.nonce}&label=${accessToken?.label}&value=${accessToken?.value}`
            );

            const data = await res.json();

            if (data?.success) {
                setSuccessMsg(__('Token saved successfully!', 'my-social-feeds'));
                setAccessToken({ label: "", value: "" });
                fetchTokens();

                // 1 sec পরে input box hide + message hide
                setTimeout(() => {
                    setShowInputBox(false);
                    setSuccessMsg("");
                }, 1000);
            }

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
                    <h2>{__('Instagram Settings', 'my-social-feeds')}</h2>
                    {loading ? <span className="ig-badge"> {__('Loading...', 'my-social-feeds')}</span> :
                        <button className="ig-add-btn" onClick={() => setShowInputBox(!showInputBox)}>
                            {showInputBox ? minus : plus}
                        </button>}
                </div>

                {/* save token html  */}
                {showInputBox &&
                    <div className="ig-input-row">
                        <input type="text" className="ig-input" placeholder="Label Here..." value={accessToken?.label} onChange={(e) => setAccessToken({ ...accessToken, label: e.target.value })} />
                        <p className="ig-help-text"> This name is only for your reference. It helps you identify the token later. </p>

                        <input type="text" className="ig-input" placeholder="Access Token..." value={accessToken?.value} onChange={(e) => setAccessToken({ ...accessToken, value: e.target.value })} />
                        <p className="ig-help-text">
                            Paste your Instagram Access Token here. This token is required to fetch feeds.
                            <a href="https://bplugins.com/docs/social-feed-block/get-access-token" target="_blank" rel="noreferrer"> Learn how to get it. </a>
                        </p>
                        <button className="ig-btn ig-btn-primary" onClick={handleSaveToken}> Save </button>
                        {successMsg && <div className="ig-success-msg">{successMsg}</div>}
                    </div>}
                {!showInputBox && <Table blockType="instagram" ValueName="Access Token" tokens={tokens} handleDeleteToken={handleDeleteToken} />}
            </div>
        </div>
    );
};
export default InstagramSettings;
