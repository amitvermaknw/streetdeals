/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const fileURLToPath = require('url');
// import path from 'path';
// import nodeExternals from 'webpack-node-externals';
// import webpack from 'webpack';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename); // get the name of the directory

const plugins = [
    new MiniCssExtractPlugin({
        filename: "[name].[chunkhash].css"
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // new HtmlWebpackPlugin({
    //     template: './public/index.html'
    // })
]
module.exports = {
    entry: './src/server/index.tsx',
    target: 'node',
    mode: 'production',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'dist/server'),
        filename: 'server.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.svg', '.mjs']
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.(ts|tsx)$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    'postcss-loader'
                ]

            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'assets',
                        publicPath: '/assets',
                    },
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins
};
