const presets = [
	['@babel/env', {
		targets: {
			edge: '17',
			firefox: '60',
			chrome: '67',
			safari: '11.1',
			browsers: '> 0.25%'
		},
		useBuiltIns: 'usage',
	}],
	'@babel/react'
];
const plugins = [
	['import', { libraryName: 'antd-mobile', style: 'css' }], // `style: true` 会加载 less 文件
	'@babel/plugin-transform-arrow-functions',
	'@babel/plugin-transform-block-scoped-functions',
	'@babel/plugin-transform-async-to-generator',
	['@babel/plugin-proposal-decorators', {
		'legacy': true
	}],
	['@babel/plugin-proposal-class-properties', {
		'loose': true
	}],
	'@babel/plugin-proposal-function-sent',
	'@babel/plugin-proposal-export-namespace-from',
	'@babel/plugin-proposal-numeric-separator',
	'@babel/plugin-proposal-throw-expressions',
];
module.exports = {
	presets,
	plugins
};
