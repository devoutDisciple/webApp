const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	},
	plugins: [
		new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
			root : path.resolve(__dirname, '../'),
			exclude : 'a.js',
			verbose : true,
			dry : false
		}),
		new CleanWebpackPlugin(path.resolve(__dirname, '../assert'), {
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
					warnings: false,
					drop_debugger: true
				},
				output: {
					comments: false,        //去掉注释
				},
				parse: {
					html5_comments: false
				}
			},
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.env.DEBUG': JSON.stringify(process.env.DEBUG) || JSON.stringify('debug')
		}),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 5, // Must be greater than or equal to one
			minChunkSize: 1000
		}),
		// 打包moment.js的中文，防止local全部打包
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/,/zh-cn/),
		// 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
		new webpack.optimize.OccurrenceOrderPlugin()
	],
	devtool: false
});
