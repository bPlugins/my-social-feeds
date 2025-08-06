import { __ } from '@wordpress/i18n';
import { Modal } from '@wordpress/components';

import './ProModal.scss';

const proBlocks = ['B TikTok Feeds', 'Instagram Feeds', 'B Pinterest Feeds'];

const ProModal = ({ isProModal, setIsProModal, block, children }) => {
	const restBlocks = proBlocks.filter(b => b !== block).map((b, i) => (proBlocks.length > 2 && i === proBlocks.length - 2) ? `and ${b}` : b).join(', ')

	return isProModal && <Modal className='bBlocksProModal' title={<Title />} onRequestClose={() => setIsProModal(false)}>
		<h3>Enhance your experience with Pro features of the <span>{block}</span> block</h3>

		<ul className='features'>
			{children}
		</ul>

		<h4 className='text'>Also, upgrade to the pro versions of <span>{restBlocks}</span> blocks <br /> to access advanced features and enhance your website with more functionalities.</h4>

		<UpgradeBtn />
	</Modal>
}
export default ProModal;

const UpgradeBtn = () => <a className='upgradeNow' href='https://bplugins.com/products/my-social-feeds/#pricing' target='_blank' rel='noreferrer'>{__('Upgrade Now', 'my-social-feeds')}</a>

const Title = () => <>
	{__('Upgrade to My Social Feeds Pro for advanced features', 'my-social-feeds')}
	<UpgradeBtn />
</>