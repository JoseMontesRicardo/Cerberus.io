const path = require('path');
const glob = require('glob');
const nodeExternals = require('webpack-node-externals');


module.exports = {
	target: 'node',//node config
	externals: [nodeExternals()],//ignore node_modules
	entry: {
		path: glob.sync('./src/**/*.ts'),
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist2')
	}
};