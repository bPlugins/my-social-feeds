import { __ } from '@wordpress/i18n';
import { Modal } from '@wordpress/components';

const ProModal = ({ proModalOpen, setProModalOpen }) => proModalOpen && <Modal className='ifbProModal' title='Upgrade to PRO' onRequestClose={() => setProModalOpen(false)}>
	<h3>{__('Explore new features in Pro', 'b-pinterest-feed')}</h3>

	<ul className='features'>
		<li>{__('Show/Hide Pins.', 'b-pinterest-feed')}</li>
		<li>{__('There are four types of layout: Default, Masonry, Slider, and Justified.', 'b-pinterest-feed')}</li>
		<li>{__('Change image ratio.', 'b-pinterest-feed')}</li>
		<li>{__('Popup options for show/hide: Zoom In, Zoom Out, Toggle 1:1, etc.', 'b-pinterest-feed')}</li>
		<li>{__('Set image overlay, transform, and overlay color.', 'b-pinterest-feed')}</li>
		<li>{__('Set typography for Name, About, Count, and button.', 'b-pinterest-feed')}</li>
	</ul>

	<h4 className='text'>{__('To unlock those features! Upgrade to Pro')}</h4>

	<a className='upgradeNow' href='https://bplugins.com/products/social-feed-block/#pricing' target='_blank' rel='noreferrer'>{__('Upgrade Now', 'b-pinterest-feed')}</a>
</Modal>;
export default ProModal;