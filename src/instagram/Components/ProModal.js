import { __ } from '@wordpress/i18n';
import { Modal } from '@wordpress/components';

const ProModal = ({ proModalOpen, setProModalOpen }) => proModalOpen && <Modal className='ifbProModal' title='Upgrade to PRO' onRequestClose={() => setProModalOpen(false)}>
	<h3>{__('Explore new features in Pro', 'instagram-feed')}</h3>

	<ul className='features'>
		<li>&emsp;<strong>{__('Popup: ', 'instagram-feed')}</strong>{__('Show feed details in the popup modal.', 'instagram-feed')}</li>

		<li>&emsp;<strong>{__('Name: ', 'instagram-feed')}</strong>{__('Show Name in profile area.', 'instagram-feed')}</li>

		<li>&emsp;<strong>{__('Biography: ', 'instagram-feed')}</strong>{__('Show Biography in profile area.', 'instagram-feed')}</li>

		<li>&emsp;<strong>{__('Follow Button: ', 'instagram-feed')}</strong>{__('Set Follow button in footer area.', 'instagram-feed')}</li>

		<li>&emsp;<strong>{__('Profile Photo: ', 'instagram-feed')}</strong>{__('Set different Profile Photo size in popup area.', 'instagram-feed')}</li>

		<li>&emsp;<strong>{__('Caption: ', 'instagram-feed')}</strong>{__('Remove Caption hashtag', 'instagram-feed')}</li>

		<li>&emsp;<strong>{__('Username: ', 'instagram-feed')}</strong>{__('Change username color', 'instagram-feed')}</li>

		<li>&emsp;<strong>{__('Name: ', 'instagram-feed')}</strong>{__('Change name color', 'instagram-feed')}</li>

		<li>&emsp;<strong>{__('Biography: ', 'instagram-feed')}</strong>{__('Change biography color', 'instagram-feed')}</li>

		<li>&emsp;<strong>{__('Follow Button: ', 'instagram-feed')}</strong>{__('Colors set follow button', 'instagram-feed')}</li>
	</ul>

	<h4 className='text'>{__('To unlock those features! Upgrade to Pro')}</h4>

	<a className='upgradeNow' href='https://bplugins.com/products/social-feed-block/#pricing' target='_blank' rel='noreferrer'>{__('Upgrade Now', 'instagram-feed')}</a>
</Modal>;
export default ProModal;