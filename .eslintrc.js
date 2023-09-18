module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020, // Allows parsing of ECMAScript version (2020 is the latest)
		sourceType: 'module', // Allows using imports
		ecmaFeatures: {
			jsx: true, // React .JSX-files support
		},
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['./src'],
				],
				extensions: ['.js', '.ts', '.tsx'],
			},
		},
		react: {
			version: 'detect',
		},
		polyfills: [
			'Promise',
			'URL',
			'URLSearchParams',
		],
	},
	extends: [
		'airbnb',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:compat/recommended',
		'plugin:sonarjs/recommended',
	],
	overrides: [
		{
			files: ['*.js'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off', // Allow using const a = require('module') for .js files
			},
		},
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'no-underscore-dangle': [
					'error',
					{
						allow: [
							'__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
						],
					},
				],
				'react/jsx-props-no-multi-spaces': 'off',
			},
		},
	],
	plugins: [
		'@typescript-eslint',
		'react',
	],
	rules: {
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': ['error'],

		'no-console': 'off', // allow console.log for better debugging
		'arrow-body-style': 'off', // allow block body (denoted by curly braces) for better debugging
		indent: ['error', 'tab'], // Force tabs for idents
		'no-tabs': 'off', // Allow using tabs
		'linebreak-style': 'off', // Both Windows and Linux linebreak support
		'implicit-arrow-linebreak': 'off', // Allow arrow function bodies on both same line and new line
		'max-len': ['error', { code: 150, tabWidth: 4 }],

		'import/prefer-default-export': 'off', // Don't force default export for files containing one export only
		'import/no-default-export': 'error', // Don't use default export as it is not always clear and readable
		'import/extensions': [
			'error',
			'never',
			{
				'.png': 'always',
				'.svg': 'always',
			},
		],
		'import/order': [
			'error', {
				pathGroups: [
					{
						pattern: 'react',
						group: 'external',
						position: 'before',
					},
					{
						pattern: '*',
						group: 'external',
						position: 'after',
					},
					{
						pattern: '**.(s?)css',
						group: 'external',
						position: 'after',
					},
					{
						pattern: '**.(s?)css',
						group: 'internal',
						position: 'after',
					},
				],
			},
		],

		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-indent': ['error', 'tab', { checkAttributes: true, indentLogicalExpressions: true }],
		'react/jsx-props-no-multi-spaces': 'off', // Allow blank line between component props
		'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'react/require-default-props': 'off',
		'react/destructuring-assignment': 'off',
		'jsx-a11y/no-static-element-interactions': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',
		'react/jsx-one-expression-per-line': 'off',
		'jsx-a11y/label-has-associated-control': [
			'error',
			{
				labelComponents: [],
				labelAttributes: [],
				controlComponents: [],
				assert: 'either',
				depth: 25,
			},
		], // Allow input to be outside a label
		'jsx-a11y/anchor-has-content': 'off',
		'jsx-a11y/anchor-is-valid': 'off',

		'lines-between-class-members': [
			'error',
			'always', {
				exceptAfterSingleLine: true,
			},
		],
		'unicode-bom': 'off',
		'no-shadow': 'off', // Adds support for TypeScript's this parameters and global augmentation

	},
};
