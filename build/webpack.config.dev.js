const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const config = require('../config/webpackConfig');
const webpackBaseConfig = require('./webpack.config.base');
const _ = require('lodash');
const generateDll = require('../utils/generateDll');

generateDll();

let baseConfig = webpackBaseConfig('development');

//获取npm后面的命令
const commandTarget = process.env.npm_lifecycle_event; // npm run start:build 获取的是start:build
let API_SERVER = config.dev.DEFALUT_SERVER;
if(_.includes(_.toLower(commandTarget), 'local')) API_SERVER = config.dev.LOCAL_SERVER;
if(_.includes(_.toLower(commandTarget), 'test')) API_SERVER = config.dev.TEST_SERVER;
if(_.includes(_.toLower(commandTarget), 'online')) API_SERVER = config.dev.ONLINE_SERVER;

// DEFALUT_SERVER: 'http://localhost:3001/',
// LOCAL_SERVER: 'http://localhost:8888/', // 本地环境地址
// TEST_SERVER: 'http://11.167.253.202:3001/', // 测试环境
// ONLINE_SERVER: 'http://localhost:3001/' //线上环境

console.log(chalk.yellow(`logging: API_SERVER is ${API_SERVER}`));

let devPlugins = [
	new webpack.DllReferencePlugin({
		context: path.resolve(__dirname, '../'),
		// name: '[name]_library',
		manifest: require('../dist/manifest.json'),
	}),
	/*eslint-disable*/
	new webpack.DefinePlugin({
		"process.env.NODE_ENV": JSON.stringify("development"),// 一定要用json.stringify，如果是单引号的'development',不正确，是定义不了process.env.NODE_ENV的
		// "API_SERVER": JSON.stringify(API_SERVER)
	}),
	// new BundleAnalyzerPlugin({ analyzerPort: 8188 }),
	new webpack.NoEmitOnErrorsPlugin(), //允许js出错不中断服务
	new webpack.HotModuleReplacementPlugin(), // 热更新
];

let devConfig = {
	devServer: {
		contentBase: path.resolve(__dirname, '../dist'),
		port: config.dev.port,
		open: config.dev.openBrowser,
		historyApiFallback: true,
		// compress: true,
		proxy: {
			'/': {
				target: API_SERVER,
				changeOrigin: true,
			}
		}
	},
	devtool: 'inline-source-map',
};

devConfig = Object.assign(baseConfig, devConfig);

devConfig.plugins = devConfig.plugins.concat(devPlugins);

module.exports = devConfig;
