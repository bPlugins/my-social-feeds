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
                    <p>No access tokens saved yet.</p>
                </div>
            ) : (
                <table className="ig-token-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Label</th>
                            {blockType === "twitter" && <th>Type</th>}
                            <th>{ValueName}</th>
                            <th className="ig-actions-col">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tokens.map((token, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>

                                <td className="ig-token-cell">
                                    <span title={token?.label}>{token?.label}</span>
                                </td>

                                {blockType === "twitter" && (
                                    <td className="ig-token-cell">
                                        {token?.isPostId ? (
                                            <div className="msf_username_status">
                                                Single Post/Video
                                            </div>
                                        ) : (
                                            <div className="msf_postId_status">
                                                Timeline/Feed
                                            </div>
                                        )}
                                    </td>
                                )}

                                <td className="ig-token-cell">
                                    <span title={token?.value}>
                                        {shortToken(token?.value)}
                                    </span>
                                </td>

                                <td className="ig-actions-col">
                                    <button
                                        onClick={() => openModal(index)}
                                        className="ig-btn-delete"
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal */}
            {showModal && (
                <div className="ig-modal-overlay">
                    <div className="ig-modal">
                        <h3>Confirm Delete</h3>
                        <p>
                            Are you sure you want to delete this item?
                            This action cannot be undone.
                        </p>

                        <div className="ig-modal-actions">
                            <button
                                onClick={closeModal}
                                className="ig-btn-cancel"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="ig-btn-confirm"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Table;
