import { __ } from '@wordpress/i18n';
import { verticalLineIcon, horizontalLineIcon } from './icons';

export const effectOpt = [
	{ label: __('Default', 'bpinterest'), value: 'none' },
	{ label: __('Fade', 'bpinterest'), value: 'fade' },
	{ label: __('Cards', 'bpinterest'), value: 'cards' },
	{ label: __('Flip', 'bpinterest'), value: 'flip' },
	{ label: __('Coverflow', 'bpinterest'), value: 'coverflow' },
	{ label: __('Cube', 'bpinterest'), value: 'cube' },
]

export const ratioOpt = [
	{ label: __('16:9 - Landscape', 'bpinterest'), value: '16:9' },
	{ label: __('4:3 - Horizontal', 'bpinterest'), value: '4:3' },
	{ label: __('1:1 - Square', 'bpinterest'), value: '1:1' },
	{ label: __('3:4 - Vertical', 'bpinterest'), value: '3:4' },
	{ label: __('9:16 - Potrait', 'bpinterest'), value: '9:16' },
]

export const layoutOpt = [
	{ label: 'Default', value: 'default' },
	{ label: 'Masonry', value: 'masonry' },
	{ label: 'Carousel', value: 'slider' },
	{ label: 'Justified', value: 'justified' },
] 

export const layouts = [
	{ label: __('Vertical', 'bpinterest'), value: 'vertical', icon: verticalLineIcon },
	{ label: __('Horizontal', 'bpinterest'), value: 'horizontal', icon: horizontalLineIcon }
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'bpinterest') },
	{ name: 'style', title: __('Style', 'bpinterest') }
];