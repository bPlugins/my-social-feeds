import { useEffect, useState } from 'react';
import BackBtn from './Elements/BackBtn';
import Table from './Elements/Table';
import { minus, plus } from '../../../utils/icons';

const PinterestSettings = ({ onBack }) => {
    const [names, setNames] = useState({ label: "", value: "" });
    const [allNames, setAllNames] = useState([]);
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
                `${msfAuthorization?.ajaxUrl}?action=msfbp-get-pinterest-credentials&nonce=${msfAuthorization?.nonce}`
            );
            const data = await res.json();
            setAllNames(data?.data || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    // Save Token
    const saveCredentials = async () => {
        // if (!accessToken.trim()) return;
        try {
            setLoading(true);
            const res = await fetch(
                `${msfAuthorization?.ajaxUrl}?action=msfbp-set-pinterest-credentials&nonce=${msfAuthorization?.nonce}&label=${names?.label}&value=${names?.value}`
            );
            const data = await res.json();
            setNames({ "label": "", "value": "" });
            console.log(data);

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
                `${msfAuthorization?.ajaxUrl}?action=msfbp-delete-pinterest-credentials&nonce=${msfAuthorization?.nonce}&index=${index}`
            );
            const data = await res.json();
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
                    <h2> Pinterest Settings</h2>
                    <button className="ig-add-btn" onClick={() => setShowInputBox(!showInputBox)}>
                        {showInputBox ? <> {minus}</> : <>{plus}</>}
                    </button>
                    {loading && <span className="ig-badge">Loading...</span>}
                </div>

                {/* save token html  */}
                {showInputBox &&
                    <div className="ig-input-row">
                        <input type="text" className="ig-input" placeholder="Label Here..." value={names?.label} onChange={(e) => setNames({ ...names, label: e.target.value })} />

                        <input type="text" className="ig-input" placeholder="Username Here..." value={names.value} onChange={(e) => setNames({ ...names, value: e.target.value })} />

                        <button className="ig-btn ig-btn-primary" onClick={saveCredentials}> Save </button>
                    </div>}
                {
                    !showInputBox && <Table blockType="pinterest" ValueName="User Name" tokens={allNames} handleDeleteToken={handleDeleteToken} />

                }

            </div>
        </div>
    );
};

export default PinterestSettings;
