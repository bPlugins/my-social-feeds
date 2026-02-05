import { __ } from '@wordpress/i18n';
import { useState } from "react";
import { shortToken } from "../../../../utils/functions";

const Table = ({ tokens, handleDeleteToken, blockType, ValueName }) => {
    const [showModal, setShowModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const openModal = (index) => {
        setDeleteIndex(index);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setDeleteIndex(null);
    };

    const confirmDelete = () => {
        handleDeleteToken(deleteIndex);
        closeModal();
    };

    return (
        <div className="ig-table-wrapper">

            {tokens.length === 0 ? (
                <div className="ig-empty-state">
                    <p>
                        {__("No account has been added yet. Please add one by clicking the ", "my-social-feeds")}
                        {blockType === "tiktok" ? <b>button.</b> : <b>+ icon.</b>}

                    </p>
                </div>

            ) : (
                <table className="ig-token-table">
                    <thead>
                        <tr>
                            <th>{blockType === "tiktok" ? "Name" : "#"}</th>
                            <th>{blockType === "tiktok" ? "Account Id" : "Label"}</th>
                            {blockType === "twitter" && <th>{__('Type', 'my-social-feeds')}</th>}
                            <th>{ValueName}</th>
                            <th className="ig-actions-col">{__('Actions', 'my-social-feeds')}</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tokens.map((token, index) => {
                            const shortLabel = blockType === "tiktok" ? shortToken(token?.account_id) : token?.label || shortToken(token?.value);
                            const tokenshort = blockType === "tiktok" ? new Date(token.created_at * 1000).toLocaleString() : shortToken(token?.value);

                            return (
                                <tr key={index}>
                                    <td>{blockType === "tiktok" ? token?.display_name : index + 1}</td>

                                    <td className="ig-token-cell"> <span title={shortLabel}>{shortLabel}</span> </td>

                                    {blockType === "twitter" && (
                                        <td className="ig-token-cell">
                                            {token?.isPostId ? <div className="msf_username_status"> {__('Single Post/Video', 'my-social-feeds')}
                                            </div> : <div className="msf_postId_status"> {__('Timeline/Feed', 'my-social-feeds')} </div>}
                                        </td>
                                    )}
                                    <td className="ig-token-cell"> <span title={tokenshort}> {tokenshort} </span> </td>
                                    <td className="ig-actions-col">
                                        <button onClick={() => openModal(blockType === 'tiktok' ? token?.account_id : index)}
                                            className="ig-btn-delete" > 🗑 {__('Delete', 'my-social-feeds')} </button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}

            {/* Modal */}
            {showModal && (
                <div className="ig-modal-overlay">
                    <div className="ig-modal">
                        <h3>{__('Confirm Delete', 'my-social-feeds')}</h3>
                        <p> {__('Are you sure you want to delete this item? This action cannot be undone.', 'my-social-feeds')}
                        </p>
                        <div className="ig-modal-actions">
                            <button onClick={closeModal} className="ig-btn-cancel">{__('Cancel', 'my-social-feeds')}</button>
                            <button onClick={confirmDelete} className="ig-btn-confirm">{__('OK', 'my-social-feeds')}</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Table;
