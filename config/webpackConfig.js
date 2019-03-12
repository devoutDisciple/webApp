module.exports = {
	dev: {
		port: 8002,
		publicPath: '/',
		openBrowser: false,
		DEFALUT_SERVER: 'http://localhost:3001/',
		LOCAL_SERVER: 'http://localhost:8888/', // 本地环境地址
		TEST_SERVER: 'http://30.40.36.40:8888/', // 测试环境 高云山机器地址  http://30.40.36.40:8888
		ONLINE_SERVER: 'http://localhost:3001/' //线上环境
	},
	prod: {
		publicPath: '../dist/',
		API_SERVER: 'http://100.81.3.1:8888/'
	}
};
