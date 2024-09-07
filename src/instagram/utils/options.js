import { __ } from '@wordpress/i18n';

export const timePeriods = [
	{ label: __('Minutes', 'instagram-feed'), value: 'minutes' },
	{ label: __('Hours', 'instagram-feed'), value: 'hours' },
	{ label: __('Days', 'instagram-feed'), value: 'days' },
	{ label: __('Months', 'instagram-feed'), value: 'months' },
	{ label: __('Years', 'instagram-feed'), value: 'years' }
];

export const imgHoverEffects = [
	{ label: __('Zoom In', 'instagram-feed'), value: 'zoomIn' },
	{ label: __('Zoom Out', 'instagram-feed'), value: 'zoomOut' },
	{ label: __('Rotate In', 'instagram-feed'), value: 'rotateIn' },
	{ label: __('Rotate Out', 'instagram-feed'), value: 'rotateOut' },
	{ label: __('Shine', 'instagram-feed'), value: 'shine' }
];

export const captionStyles = [
	{ label: __('Overlay Top', 'instagram-feed'), value: 'overlayTop' },
	{ label: __('Overlay Center', 'instagram-feed'), value: 'overlayCenter' },
	{ label: __('Overlay Bottom', 'instagram-feed'), value: 'overlayBottom' }
];

export const captionStylesPro = [
	{ label: __('Bottom', 'instagram-feed'), value: 'bottom' }
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'instagram-feed') },
	{ name: 'elements', title: __('Elements', 'instagram-feed') },
	{ name: 'style', title: __('Style', 'instagram-feed') }
];