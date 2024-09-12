import { __ } from '@wordpress/i18n';
import { Modal } from '@wordpress/components';

const ProModal = ({ proModalOpen, setProModalOpen }) => proModalOpen && <Modal className='ifbProModal' title='Upgrade to PRO' onRequestClose={() => setProModalOpen(false)}>
	<h3>{__('Explore new features in Pro', 'instagram-feed')}</h3>

	<ul className='features'>
		<li>{__('Videos per page', 'tiktok-feed')}</li>
		<li>{__('Show Hide Video Overly like,share and view', 'tiktok-feed')}</li>
		<li>{__('Video overly icon style', 'tiktok-feed')}</li>
		<li>{__('Share button text change', 'tiktok-feed')}</li>
		<li>{__('Share button style', 'tiktok-feed')}</li>
		<li>{__('Cache time set profile and video', 'tiktok-feed')}</li>
		<li>{__('Profile 3 layout', 'tiktok-feed')}</li> 
		<li>{__('Profile name style', 'tiktok-feed')}</li>
		<li>{__('Info style', 'tiktok-feed')}</li>
		<li>{__('Load more button text change', 'tiktok-feed')}</li> 
		 
	</ul>

	<h4 className='text'>{__('To unlock those features! Upgrade to Pro')}</h4>

	{/* <a className='upgradeNow' href='https://bplugins.com/products/social-feed-block/#pricing' target='_blank' rel='noreferrer'>{__('Upgrade Now', 'instagram-feed')}</a> */}
</Modal>;
export default ProModal;