const path = require('path');
const _ = require('lodash');
const chalk = require('chalk');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// var CompressionWebpackPlugin = require('compression-webpack-plugin');// 开启gzip压缩
// const config = require('../config/webpackConfig');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//获取npm后面的命令
const commandTarget = process.env.npm_lifecycle_event; // npm run start:build 获取的是start:build
let startAnalyzer = _.includes(_.toLower(commandTarget), 'analyzer');
console.log(chalk.yellow(`logging: the project is openning analyzer, the startAnalyzer is ${startAnalyzer}`));
const getRealPath = (temPath) => {
	return path.resolve(__dirname, temPath);
};

let plugins = [
	new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
		root : path.resolve(__dirname, '../'),
		exclude : 'a.js',
		verbose : true,
		dry : false
	}),
	new UglifyJSPlugin({
		sourceMap: false,
		cache: false,
		uglifyOptions: {
			compress: {
				drop_console: true,
				warnings: false
			},
			output: {
				comments: false,        //去掉注释
			},
			parse: {
				html5_comments: false
			}
		},
	}),
	/*eslint-disable*/
	new webpack.DefinePlugin({
		"process.env.NODE_ENV": JSON.stringify("production"),
		// "API_SERVER": JSON.stringify(config.prod.API_SERVER)
	}),
	new webpack.optimize.LimitChunkCountPlugin({
		maxChunks: 5, // Must be greater than or equal to one
		minChunkSize: 1000
    }),
    new CopyWebpackPlugin([
		{ from: getRealPath('../node_modules/react/umd/react.production.min.js'), to: getRealPath('../dist/react.production.min.js') },
		{ from: getRealPath('../node_modules/react-dom/umd/react-dom.production.min.js'), to: getRealPath('../dist/react-dom.production.min.js') },
	]),
	// new CompressionWebpackPlugin(),
	// 打包moment.js的中文，防止local全部打包
	new webpack.ContextReplacementPlugin(/moment[/\\]locale$/,/zh-cn/),
	// 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
	new webpack.optimize.OccurrenceOrderPlugin()
]


module.exports = merge(webpackBaseConfig('production'), {
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	},
	plugins: startAnalyzer ? [...plugins, new BundleAnalyzerPlugin({
		analyzerPort: 8288,
		reportFilename: "hello.html"
	})] : plugins,
	devtool: false
});
