const path = require('path');
const webpack = require('webpack');
const config = require('../config/webpackConfig');
const baseColorConfig = require('../config/themeConfig');
const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanCSSPlugin = require('less-plugin-clean-css');
const HappyPack = require('happypack');
const chalk = require('chalk');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const COMMON_0_CSS = new ExtractTextPlugin('common.0.css', {allChunks: true});
const COMMON_1_CSS = new ExtractTextPlugin('common.1.css', {allChunks: true});
const COMMON_0_LESS = new ExtractTextPlugin('app.0.css', {allChunks: true});
const COMMON_1_LESS = new ExtractTextPlugin('app.1.css', {allChunks: true});

const happyThreadPoolLength = os.cpus().length;

const getRealPath = (temPath) => {
	return path.resolve(__dirname, temPath);
};

const node_modules = getRealPath('../node_modules');

module.exports = (env = 'development') => {
	// env = 'production' || 'development'
	env = env === 'development';
	console.info(chalk.yellow(`logging: env = ${env}`));
	let options = {
		minimize: !env,
		sourceMap: env,
	};
	let configuration = {
		// entry: ['babel-polyfill', getRealPath('../src/main.js')],
		entry: getRealPath('../src/main.js'),
		output: {
			path: getRealPath('../dist'),
			filename: 'bundle.js',
			publicPath: env ? config.dev.publicPath : config.prod.publicPath,
		},
		module: {
			rules: [{
				test: /\.js$/,
				exclude: node_modules,
				use: [{
					loader: 'babel-loader',
					options: {
						cacheDirectory:  env, // When set, the given directory will be used to cache the results of the loader
					}
				}],
			},
			{
				test: /\.css$/,
				include: node_modules,
				use: COMMON_0_CSS.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: options
						}
					]
				})
			},
			{
				test: /\.css$/,
				exclude: node_modules,
				use: COMMON_1_CSS.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: options
						},
						{
							loader: 'postcss-loader'
						}
					]
				})
			},
			{
				test: /\.less$/,
				include: node_modules,
				use: COMMON_0_LESS.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: options
						},
						{
							loader: 'less-loader',
							options: {
								javascriptEnabled: true,
								sourceMap: options.sourceMap,
								modifyVars: baseColorConfig, // 改变antd的默认颜色
								plugins: [
									new CleanCSSPlugin({ advanced: true }),// 用于压缩css
								]
							},
						}
					]
				})
			},
			{
				test: /\.less$/,
				exclude: node_modules,
				use: COMMON_1_LESS.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: options
						},
						{
							loader: 'postcss-loader'
						},
						{
							loader: 'less-loader',
							options: {
								javascriptEnabled: true,
								sourceMap: options.sourceMap,
								plugins: [
									new CleanCSSPlugin({ advanced: true })// 用于压缩css
								]
							},
						}
					]
				})
			},
			{
				test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: '1024',
							name: '[path][name].[ext]',
							outputPath: 'img/'
						}
					},
				]
			}
			],
		},
		resolve: {
			extensions: ['.js', '.jsx', '.less', '.json', 'css'],
			// alias: {
			// 	$config: getRealPath('../config/config'),
			// }
		},
		plugins: [
			COMMON_0_CSS,
			COMMON_1_CSS,
			COMMON_0_LESS,
			COMMON_1_LESS,
			new HappyPack({
				//如何处理 用法和loader 的配置一样
				loaders: ['babel-loader'],
				threads: happyThreadPoolLength
			}),
			new HtmlWebpackPlugin({
				title: 'HybridCluster',
				template: getRealPath('../index.html'),
				filename: 'index.html',
				hash: true,
				minify: true
			}),
			// 打包moment.js的中文，防止local全部打包
			new webpack.ContextReplacementPlugin(/moment[/\\]locale$/,/zh-cn/)
		]
	};
	return configuration;
};
