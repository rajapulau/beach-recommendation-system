var path              = require('path');
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ngAnnotatePlugin  = require('ng-annotate-webpack-plugin');
require('autoprefixer-loader');
require('json-loader');

const sassLoaders = [
    "css-loader",
    "autoprefixer-loader?browsers=last 2 version",
    "sass-loader?indentedSyntax=sass&includePaths[]=" + path.resolve(__dirname, "./src/scss"),
];

const config = {
    devtool : 'eval',
    entry: {
        bundle: [
            'webpack-dev-server/client?http://localhost:3001',
            'webpack/hot/only-dev-server',
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.coffee']
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        },
        {
            test: /\.json$/,
            loader: "json"
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", sassLoaders.join("!")),
        },
        {
            test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
            loader: "file-loader?name=fonts/[hash:6].[ext]"
        },
        {
            test: /\.(png|jpg|gif)$/,
            loader: "file-loader?name=img/img-[hash:6].[ext]"
        }]
    }
};
module.exports = config;
