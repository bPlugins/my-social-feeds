import { __ } from '@wordpress/i18n';
import { verticalLineIcon, horizontalLineIcon } from './icons';

export const effectOpt = [
	{ label: __('Default', 'my-social-feeds'), value: 'none' },
	{ label: __('Fade', 'my-social-feeds'), value: 'fade' },
	{ label: __('Cards', 'my-social-feeds'), value: 'cards' },
	{ label: __('Flip', 'my-social-feeds'), value: 'flip' },
	{ label: __('Coverflow', 'my-social-feeds'), value: 'coverflow' },
	{ label: __('Cube', 'my-social-feeds'), value: 'cube' },
]

export const ratioOpt = [
	{ label: __('16:9 - Landscape', 'my-social-feeds'), value: '16:9' },
	{ label: __('4:3 - Horizontal', 'my-social-feeds'), value: '4:3' },
	{ label: __('1:1 - Square', 'my-social-feeds'), value: '1:1' },
	{ label: __('3:4 - Vertical', 'my-social-feeds'), value: '3:4' },
	{ label: __('9:16 - Potrait', 'my-social-feeds'), value: '9:16' },
]

export const layoutOpt = [
	{ label: 'Default', value: 'default' },
	{ label: 'Masonry', value: 'masonry' },
	{ label: 'Carousel', value: 'slider' },
	{ label: 'Justified', value: 'justified' },
]

export const layouts = [
	{ label: __('Vertical', 'my-social-feeds'), value: 'vertical', icon: verticalLineIcon },
	{ label: __('Horizontal', 'my-social-feeds'), value: 'horizontal', icon: horizontalLineIcon }
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'my-social-feeds') },
	{ name: 'style', title: __('Style', 'my-social-feeds') }
];