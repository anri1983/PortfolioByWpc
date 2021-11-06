const path = require('path');
const htmlWPP = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssWebpackPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin');

function optimization(){
    const config = {splitChunks: {
        chunks: 'all',
      }, };
      if(process.env.NODE_ENV !== 'development'){
          config.minimizer = [
           new OptimizeCssWebpackPlugin(),   
           new TerserWebpackPlugin()
          ];
      }
}

module.exports = {
    // context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        portfolio: './src/index.js',
           },
    output: {
        filename: '[name].[contenthash].bundle.js', 
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions:['.js', '.json','.scss','.css','.jpg','.png','.gif', 'ttf'],
        alias:{
            '@assets': path.resolve(__dirname, 'src/assets'),
        }
    },
    optimization: optimization(),
    devServer:{
        port: 9002,
    },
    plugins: [
        new htmlWPP({
            template: './src/index.html',
            minify: {
                collapseWhitespace: process.env.NODE_ENV !== 'development',
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssWebpackPlugin({
            filename:'[name].[contenthash].css', 
        }),
    ],
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssWebpackPlugin.loader,
                    options: {
                        publicPath: '',
                    },
                }, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: [{
                    loader: MiniCssWebpackPlugin.loader,
                    options: {
                        publicPath: '',
                    },
                }, 'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|otf)$/,
                use: ['file-loader'],
            },
        ],
    },
};