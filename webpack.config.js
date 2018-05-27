const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = function () {
    var config = {};
    config.entry = {
        app: './src/index.tsx'
    };

    const extractTextPlugin = new ExtractTextPlugin({
        allChunks: true,
        filename: "[name].[contenthash].css"
    });

    config.output = {
        path: __dirname + '/build',
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    };
    config.devServer = {
        stats: 'minimal',
        inline: true,
        publicPath: '/',
        port: 9001
    };

    config.module = {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/,

            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader", options: {
                            minimize: true,
                            modules: true,
                            localIdentName: '[name]__[local]__[hash]'
                        }
                    },
                    {
                        loader: 'postcss-loader', options: { sourceMap: true }
                    },
                    {
                        loader: "sass-loader", options: { sourceMap: true }
                    }
                    ],
                    fallback: 'style-loader'
                })
            }
        ]
    };

    config.plugins = [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body'
        }),
        new WebpackCleanupPlugin(),
        extractTextPlugin,
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/i,
            options: {
                postcss: {
                    plugins: [require('autoprefixer')()]
                }
            }
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            fileName: '[name].[chunkhash].js',
            minChunks: ({ resource }) => (
                resource !== undefined &&
                resource.indexOf('node_modules') !== -1
            ),
        })
    ];

    /* if (!isDev) {
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: true }));
        config.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }));
    } */

    config.resolve = {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        mainFiles: ['index']
    };

    return config;
}();