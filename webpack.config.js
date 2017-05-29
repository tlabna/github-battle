var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js',
		// Sets base path for all assets
		publicPath: '/'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
		]
	},
	// Allows us to request urls from browser
	devServer: {
		historyApiFallback: true
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'app/index.html'
	})]
};
