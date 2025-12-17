import { __ } from '@wordpress/i18n';
import { XIcon, twitterIcon } from './icons';


export const types = [
	{ label: __('Timeline', 'easy-twitter'), value: 'timeline' },
	{ label: __('Follow Button', 'easy-twitter'), value: 'follow' },
	{ label: __('Tweet Button', 'easy-twitter'), value: 'tweet' },
	{ label: __('Hashtag', 'easy-twitter'), value: 'tag' },
	{ label: __('Video', 'easy-twitter'), value: 'video' },
	{ label: __('Post', 'easy-twitter'), value: 'post' },
];
export const themes = [
	{ label: __('Dark', 'easy-twitter'), value: 'dark' },
	{ label: __('Light', 'easy-twitter'), value: 'light' }
];
export const twitterIcons = [
	{ label: __('Twitter Icon', 'easy-twitter'), value: 'tIcon', icon: twitterIcon() },
	{ label: __('X Icon', 'easy-twitter'), value: 'xIcon', icon: XIcon() }
];
export const yesNoOptions = [
	{ label: __('Yes', 'easy-twitter'), value: 'yes' },
	{ label: __('No', 'easy-twitter'), value: 'no' }
];
export const languages = [
	{ label: __('English (default)', 'easy-twitter'), value: 'en' },
	{ label: __('Arabic', 'easy-twitter'), value: 'ar' },
	{ label: __('Bengali', 'easy-twitter'), value: 'bn' },
	{ label: __('Chinese (Simplified)', 'easy-twitter'), value: 'zh-cn' },
	{ label: __('Chinese (Traditional)', 'easy-twitter'), value: 'zh-tw' },
	{ label: __('Czech', 'easy-twitter'), value: 'cs' },
	{ label: __('Danish', 'easy-twitter'), value: 'da' },
	{ label: __('Dutch', 'easy-twitter'), value: 'nl' },
	{ label: __('Filipino', 'easy-twitter'), value: 'fil' },
	{ label: __('Finnish', 'easy-twitter'), value: 'fi' },
	{ label: __('French', 'easy-twitter'), value: 'fr' },
	{ label: __('German', 'easy-twitter'), value: 'de' },
	{ label: __('Greek', 'easy-twitter'), value: 'el' },
	{ label: __('Hebrew', 'easy-twitter'), value: 'he' },
	{ label: __('Hindi', 'easy-twitter'), value: 'hi' },
	{ label: __('Hungarian', 'easy-twitter'), value: 'hu' },
	{ label: __('Indonesian', 'easy-twitter'), value: 'id' },
	{ label: __('Italian', 'easy-twitter'), value: 'it' },
	{ label: __('Japanese', 'easy-twitter'), value: 'ja' },
	{ label: __('Korean', 'easy-twitter'), value: 'ko' },
	{ label: __('Malay', 'easy-twitter'), value: 'msa' },
	{ label: __('Norwegian', 'easy-twitter'), value: 'no' },
	{ label: __('Persian', 'easy-twitter'), value: 'fa' },
	{ label: __('Polish', 'easy-twitter'), value: 'pl' },
	{ label: __('Portuguese', 'easy-twitter'), value: 'pt' },
	{ label: __('Romanian', 'easy-twitter'), value: 'ro' },
	{ label: __('Russian', 'easy-twitter'), value: 'ru' },
	{ label: __('Spanish', 'easy-twitter'), value: 'es' },
	{ label: __('Swedish', 'easy-twitter'), value: 'sv' },
	{ label: __('Thai', 'easy-twitter'), value: 'th' },
	{ label: __('Turkish', 'easy-twitter'), value: 'tr' },
	{ label: __('Ukrainian', 'easy-twitter'), value: 'uk' },
	{ label: __('Urdu', 'easy-twitter'), value: 'ur' },
	{ label: __('Vietnamese', 'easy-twitter'), value: 'vi' },
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'easy-twitter') },
	{ name: 'style', title: __('Style', 'easy-twitter') }
];