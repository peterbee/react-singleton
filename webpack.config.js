const path = require('path');
const webpack = require('webpack');

const config = {
	entry: './src/Singleton.js',
	output: {
		filename: './dist/singleton.js',
		path: __dirname,
		pathinfo: true
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: [path.join(__dirname, './src')],
				use: {
					loader: 'babel-loader',
					options: {
						plugins: ['transform-runtime', 'transform-class-properties'],
						presets: ['react', 'env']
					}
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true
		})
	]
};

const prodConfig = Object.assign({}, config);
prodConfig.output = Object.assign({}, config.output, {
	filename: './dist/singleton.min.js',
	pathinfo: false
});

module.exports = [config, prodConfig];
