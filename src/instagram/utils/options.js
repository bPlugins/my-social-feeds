import { __ } from '@wordpress/i18n';
import { instagram, pinterest, tiktok, twitter } from '../../utils/icons';

export const timePeriods = [
	{ label: __('Minutes', 'my-social-feeds'), value: 'minutes' },
	{ label: __('Hours', 'my-social-feeds'), value: 'hours' },
	{ label: __('Days', 'my-social-feeds'), value: 'days' },
	{ label: __('Months', 'my-social-feeds'), value: 'months' },
	{ label: __('Years', 'my-social-feeds'), value: 'years' }
];

export const imgHoverEffects = [
	{ label: __('Zoom In', 'my-social-feeds'), value: 'zoomIn' },
	{ label: __('Zoom Out', 'my-social-feeds'), value: 'zoomOut' },
	{ label: __('Rotate In', 'my-social-feeds'), value: 'rotateIn' },
	{ label: __('Rotate Out', 'my-social-feeds'), value: 'rotateOut' },
	{ label: __('Shine', 'my-social-feeds'), value: 'shine' }
];

export const captionStyles = [
	{ label: __('Overlay Top', 'my-social-feeds'), value: 'overlayTop' },
	{ label: __('Overlay Center', 'my-social-feeds'), value: 'overlayCenter' },
	{ label: __('Overlay Bottom', 'my-social-feeds'), value: 'overlayBottom' }
];

export const captionStylesPro = [
	{ label: __('Bottom', 'my-social-feeds'), value: 'bottom' }
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'my-social-feeds') },
	{ name: 'elements', title: __('Elements', 'my-social-feeds') },
	{ name: 'style', title: __('Style', 'my-social-feeds') }
];

export const blockTypeOpt = [
	{ label: 'Instagram', value: 'bpifb/my-social-feeds', icon: instagram("#000") },
	{ label: 'TikTok', value: 'ttp/tiktok-player', icon: tiktok("#000") },
	{ label: 'Pinterest', value: 'bpf/b-pinterest-feed', icon: pinterest("#000") },
	{ label: 'Twitter', value: 'etf/twitter-feed', icon: twitter("#000") }

]