var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
	// Add polyfill so Promises and other
	// methods are supported on older browsers
	entry: ['babel-polyfill', 'whatwg-fetch', './app/index.js'],
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

// We set NODE_ENV to production in package.json 
// so that we can check it's state in webpack.config.js
if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		// Create new instace of webpack.DefinePlugin
		new webpack.DefinePlugin({
			// Set property on process.env
			'process.env': {
				// We do this so we set NODE_ENV to production
				// in our compiled code that webpack will compile
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
		// Add new instance of webpack.optimize
		// Call UglifyJsPlugin to minify our code
		new webpack.optimize.UglifyJsPlugin()
	);
}

module.exports = config;