module.exports = {
	settings: {
		react: {
			version: 'detect'
		}
	},
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	globals: {
		wp: 'readonly',
		jQuery: 'readonly',
		Fancybox: 'readonly',
		Swiper: 'readonly',
		ttpLayer: 'readonly',
		ttpData: 'readonly',
		ttpPatters: 'readonly',
		ifbLocal: 'readonly',
		bPinterestData: 'readonly',
		MiniMasonry: 'readonly',
		justifiedGallery: 'readonly',
		msfAuthorization: 'readonly',
		msfbppipecheck: 'readonly'
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: [
		'react'
	],
	rules: {
		'func-names': 'off',
		'no-console': 'warn',
		'no-unused-vars': 'warn',
		'react/jsx-filename-extension': [
			1, { 'extensions': ['.js', '.jsx'] }
		],
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/display-name': 'off',
		'no-process-exit': 'off',
		'no-unsafe-optional-chaining': 'off',
		'object-shorthand': 'warn',
		'class-methods-use-this': 'off',
	}
}