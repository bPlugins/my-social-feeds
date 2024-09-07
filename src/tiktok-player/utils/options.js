


import { __ } from '@wordpress/i18n';
import { horizontalLine, verticalLine } from './icons';

const options = {

	ratioOpt: [
		{ label: __('16:9 - Landscape', 'tiktok'), value: '16:9' },
		{ label: __('4:3 - Horizontal', 'tiktok'), value: '4:3' },
		{ label: __('1:1 - Square', 'tiktok'), value: '1:1' },
		{ label: __('3:4 - Vertical', 'tiktok'), value: '3:4' },
		{ label: __('9:16 - Potrait', 'tiktok'), value: '9:16' },
	],

	alignSelect: [
		{ label: __('Left', 'tiktok'), value: 'flex-start' },
		{ label: __('Center', 'tiktok'), value: 'center' },
		{ label: __('Right', 'tiktok'), value: 'flex-end' },
	],

	profileStyle: [
		{ label: __('Default', 'tiktok'), value: 'default' },
		{ label: __('Card', 'tiktok'), value: 'card' },
		{ label: __('Compact', 'tiktok'), value: 'compact' },
	],

	feedLayoutOpt: [
		{ label: __('Default', 'tiktok'), value: 'default' },
		{ label: __('Masonry', 'tiktok'), value: 'masonry' },
		{ label: __('Slider', 'tiktok'), value: 'slider' },
	],

	layouts: [
		{ label: __('Vertical', 'tiktok'), value: 'vertical', icon: verticalLine },
		{ label: __('Horizontal', 'tiktok'), value: 'horizontal', icon: horizontalLine }
	],

	generalStyleTabs: [
		{ name: 'general', title: __('General', 'tiktok') },
		{ name: 'style', title: __('Style', 'tiktok') },
		{ name: 'patterns', title: __('Patterns', 'tiktok') }
	],

	pxUnit: (def = 0) => ({ value: 'px', label: 'px', default: def }),
	perUnit: (def = 0) => ({ value: '%', label: '%', default: def }),
	emUnit: (def = 0) => ({ value: 'em', label: 'em', default: def }),
	remUnit: (def = 0) => ({ value: 'rem', label: 'rem', default: def }),
	vwUnit: (def = 0) => ({ value: 'vw', label: 'vw', default: def }),
	vhUnit: (def = 0) => ({ value: 'vh', label: 'vh', default: def }),

	dUnit: (def = 0, value = "px", label) => ({ value, label: label || value, default: def }),
}
export default options;