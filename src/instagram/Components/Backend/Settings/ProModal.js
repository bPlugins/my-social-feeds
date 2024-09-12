import { __ } from '@wordpress/i18n';
import { Modal } from '@wordpress/components';

const ProModal = ({ proModalOpen, setProModalOpen }) => {

    return (
        <>
            {proModalOpen && (
                <Modal className='ttpProModal' title={__('Pro Feature', 'tiktok')} onRequestClose={() => setProModalOpen(false)}>

                    <div className='ttpProFeature'>
                        <h3>{__('Unlock Tiktok Player Feature', 'tiktok')}</h3>

                        <a target="_blank" rel="noreferrer" href="https://wptiktokfeed.com/#pricing">{__('Upgrade to Pro', 'tiktok')}</a>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ProModal;