/**
 * Created by bohdan on 04.11.2017.
 */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');

let config = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.jsx', '.json', '.less', '.css', '.jpeg', '.jpg', '.gif', '.png'],
        alias: {
            images: path.resolve(__dirname, 'src/assets/images')
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader', 'postcss-loader'],
                    fallback: 'style-loader',
                })),

            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {
                    loader: 'image-webpack-loader',
                    query: {
                        mozjpeg: {
                            progressive: true,
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        optipng: {
                            optimizationLevel: 4,
                        },
                        pngquant: {
                            quality: '75-90',
                            speed: 3,
                        },
                    },

                }],
                exclude: /node_modules/,
                include: __dirname,
            },
        ],
    },
    stats: {colors: true},
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.css',
            disable: false,
            allChunks: true
        }),

    ],
    devServer: {
        port: process.env.PORT || 8080,
        contentBase: path.resolve(__dirname, './public'),
        historyApiFallback: true,
        open: true
    }

};
if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new UglifyJsPlugin({
            exclude: /node_modules/,
            parallel: true
        }),
        new OptimizeCssAssets()

    )
}
module.exports = config;

