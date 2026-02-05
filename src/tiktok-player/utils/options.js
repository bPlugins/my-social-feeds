


import { __ } from '@wordpress/i18n';
import { horizontalLine, verticalLine } from './icons';

const options = {

	ratioOpt: [
		{ label: __('16:9 - Landscape', 'my-social-feeds'), value: '16:9' },
		{ label: __('4:3 - Horizontal', 'my-social-feeds'), value: '4:3' },
		{ label: __('1:1 - Square', 'my-social-feeds'), value: '1:1' },
		{ label: __('3:4 - Vertical', 'my-social-feeds'), value: '3:4' },
		{ label: __('9:16 - Potrait', 'my-social-feeds'), value: '9:16' },
	],

	alignSelect: [
		{ label: __('Left', 'my-social-feeds'), value: 'flex-start' },
		{ label: __('Center', 'my-social-feeds'), value: 'center' },
		{ label: __('Right', 'my-social-feeds'), value: 'flex-end' },
	],

	profileStyle: [
		{ label: __('Default', 'my-social-feeds'), value: 'default' },
		{ label: __('Card', 'my-social-feeds'), value: 'card' },
		{ label: __('Compact', 'my-social-feeds'), value: 'compact' },
	],

	feedLayoutOpt: [
		{ label: __('Default', 'my-social-feeds'), value: 'default' },
		{ label: __('Masonry', 'my-social-feeds'), value: 'masonry' },
		{ label: __('Slider', 'my-social-feeds'), value: 'slider' },
	],

	layouts: [
		{ label: __('Vertical', 'my-social-feeds'), value: 'vertical', icon: verticalLine },
		{ label: __('Horizontal', 'my-social-feeds'), value: 'horizontal', icon: horizontalLine }
	],

	generalStyleTabs: [
		{ name: 'general', title: __('General', 'my-social-feeds') },
		{ name: 'style', title: __('Style', 'my-social-feeds') },
		{ name: 'patterns', title: __('Patterns', 'my-social-feeds') }
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