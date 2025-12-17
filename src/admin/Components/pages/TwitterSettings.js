import { useEffect, useState } from 'react';
import BackBtn from './Elements/BackBtn';
import Table from './Elements/Table';
import { minus, plus } from '../../../utils/icons';

const TwitterSettings = ({ onBack }) => {
    const [names, setNames] = useState({ label: "", value: "" });
    const [allNames, setAllNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInputBox, setShowInputBox] = useState(false);

    // Toggle state
    const [usePostId, setUsePostId] = useState(false);

    useEffect(() => {
        fetchTokens();
    }, []);

    // Fetch Tokens All
    const fetchTokens = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `${msfAuthorization?.ajaxUrl}?action=msfbp-get-twitter-credentials&usePostId=${usePostId}&nonce=${msfAuthorization?.nonce}`
            );
            const data = await res.json();
            console.log(data);

            setAllNames(data?.data || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    // Save Token
    const saveCredentials = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `${msfAuthorization?.ajaxUrl}?action=msfbp-set-twitter-credentials&nonce=${msfAuthorization?.nonce}&label=${names.label}&value=${names?.value}&is_post_id=${usePostId}`
            );

            const data = await res.json();
            console.log(data);

            // Reset fields
            setNames({ label: "", value: "" });

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
                `${msfAuthorization?.ajaxUrl}?action=msfbp-delete-twitter-credentials&nonce=${msfAuthorization?.nonce}&index=${index}`
            );
            const data = await res.json();
            console.log(data);

            if (data?.success) {
                setAllNames((prev) => prev.filter((_, i) => i !== index));
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
                    <h2>Twitter Settings</h2>

                    <button className="ig-add-btn" onClick={() => setShowInputBox(!showInputBox)}>
                        {showInputBox ? minus : plus}
                    </button>

                    {loading && <span className="ig-badge">Loading...</span>}
                </div>

                {/* save token html */}
                {showInputBox && (
                    <> {/* Toggle Button */}
                        <div className="toggle-wrapper" style={{ display: "flex", alignItems: "center", gap: "12px" }} >
                            <label className='twitter-label'> Type : </label>
                            <label>
                                <input
                                    type="radio"
                                    name="twitter_type"
                                    checked={!usePostId}
                                    onChange={() => setUsePostId(false)}
                                />
                                <span>Timeline/Feed</span>
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="twitter_type"
                                    checked={usePostId}
                                    onChange={() => setUsePostId(true)}
                                />
                                <span>Single Post/Video</span>
                            </label>
                        </div>

                        <div className="ig-input-row">

                            {/* Label Field */}
                            <input
                                type="text"
                                className="ig-input"
                                placeholder="Label Here..."
                                value={names.label}
                                onChange={(e) => setNames({ ...names, label: e.target.value })}
                            />

                            {/* Conditional Input Field */}
                            <input
                                type="text"
                                className="ig-input"
                                placeholder={`${usePostId ? "Post ID Here..." : "Username Here..."}`}
                                value={names.value}
                                onChange={(e) => setNames({ ...names, value: e.target.value })}
                            />
                            <button className="ig-btn ig-btn-primary" onClick={saveCredentials}>
                                Save
                            </button>
                        </div></>
                )}
                {!showInputBox &&
                    <Table blockType="twitter" ValueName="User Name/Post Id" tokens={allNames} handleDeleteToken={handleDeleteToken} />}
            </div>
        </div>
    );
};

export default TwitterSettings;
