import { __ } from '@wordpress/i18n';
import { XIcon, twitterIcon } from './icons';


export const types = [
	{ label: __('Timeline', 'my-social-feeds'), value: 'timeline' },
	{ label: __('Follow Button', 'my-social-feeds'), value: 'follow' },
	{ label: __('Tweet Button', 'my-social-feeds'), value: 'tweet' },
	{ label: __('Hashtag', 'my-social-feeds'), value: 'tag' },
	{ label: __('Video', 'my-social-feeds'), value: 'video' },
	{ label: __('Post', 'my-social-feeds'), value: 'post' },
];
export const themes = [
	{ label: __('Dark', 'my-social-feeds'), value: 'dark' },
	{ label: __('Light', 'my-social-feeds'), value: 'light' }
];
export const twitterIcons = [
	{ label: __('Twitter Icon', 'my-social-feeds'), value: 'tIcon', icon: twitterIcon() },
	{ label: __('X Icon', 'my-social-feeds'), value: 'xIcon', icon: XIcon() }
];
export const yesNoOptions = [
	{ label: __('Yes', 'my-social-feeds'), value: 'yes' },
	{ label: __('No', 'my-social-feeds'), value: 'no' }
];
export const languages = [
	{ label: __('English (default)', 'my-social-feeds'), value: 'en' },
	{ label: __('Arabic', 'my-social-feeds'), value: 'ar' },
	{ label: __('Bengali', 'my-social-feeds'), value: 'bn' },
	{ label: __('Chinese (Simplified)', 'my-social-feeds'), value: 'zh-cn' },
	{ label: __('Chinese (Traditional)', 'my-social-feeds'), value: 'zh-tw' },
	{ label: __('Czech', 'my-social-feeds'), value: 'cs' },
	{ label: __('Danish', 'my-social-feeds'), value: 'da' },
	{ label: __('Dutch', 'my-social-feeds'), value: 'nl' },
	{ label: __('Filipino', 'my-social-feeds'), value: 'fil' },
	{ label: __('Finnish', 'my-social-feeds'), value: 'fi' },
	{ label: __('French', 'my-social-feeds'), value: 'fr' },
	{ label: __('German', 'my-social-feeds'), value: 'de' },
	{ label: __('Greek', 'my-social-feeds'), value: 'el' },
	{ label: __('Hebrew', 'my-social-feeds'), value: 'he' },
	{ label: __('Hindi', 'my-social-feeds'), value: 'hi' },
	{ label: __('Hungarian', 'my-social-feeds'), value: 'hu' },
	{ label: __('Indonesian', 'my-social-feeds'), value: 'id' },
	{ label: __('Italian', 'my-social-feeds'), value: 'it' },
	{ label: __('Japanese', 'my-social-feeds'), value: 'ja' },
	{ label: __('Korean', 'my-social-feeds'), value: 'ko' },
	{ label: __('Malay', 'my-social-feeds'), value: 'msa' },
	{ label: __('Norwegian', 'my-social-feeds'), value: 'no' },
	{ label: __('Persian', 'my-social-feeds'), value: 'fa' },
	{ label: __('Polish', 'my-social-feeds'), value: 'pl' },
	{ label: __('Portuguese', 'my-social-feeds'), value: 'pt' },
	{ label: __('Romanian', 'my-social-feeds'), value: 'ro' },
	{ label: __('Russian', 'my-social-feeds'), value: 'ru' },
	{ label: __('Spanish', 'my-social-feeds'), value: 'es' },
	{ label: __('Swedish', 'my-social-feeds'), value: 'sv' },
	{ label: __('Thai', 'my-social-feeds'), value: 'th' },
	{ label: __('Turkish', 'my-social-feeds'), value: 'tr' },
	{ label: __('Ukrainian', 'my-social-feeds'), value: 'uk' },
	{ label: __('Urdu', 'my-social-feeds'), value: 'ur' },
	{ label: __('Vietnamese', 'my-social-feeds'), value: 'vi' },
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'my-social-feeds') },
	{ name: 'style', title: __('Style', 'my-social-feeds') }
];