const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: "development",
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, './build/'),
        // filename: "bundle-[chunkhash].js"
        filename: 'ui.js'
    },
    watchOptions: {
        aggregateTimeout: 800,
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',// 与 MiniCssExtractPlugin.loader 冲突 
                    'css-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader",  // creates style nodes from JS strings
                    'css-loader',    // translates CSS into CommonJS
                    'less-loader',     // compiles Less to CSS
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ttf|woff|eot)$/,
                use: [
                    'url-loader',
                    {
                        loader: 'image-webpack-loader',
                        // options: {
                        //     limit: 1000 * 100    //不加限制图片过大会直接打到build下 导致找不到图片文件
                        // }
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // filename: "[name].[chunkhash:8].css",
            filename: 'ui.css',
            chunkFilename: "[id].css"
        }),
        //  new HtmlWebpackPlugin({
        //     title: 'webpack',
        //     template: './index.html'
        // }),
        new CleanWebpackPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.ProvidePlugin({
            'React': 'react',
            'ReactDOM': 'react-dom'
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist_vendor/react.manifest.json')
        }),
    ],

    resolve: {
        extensions: [".js", ".jsx", ".json", ".css"]
    }
}