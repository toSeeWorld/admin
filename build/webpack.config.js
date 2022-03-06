// webpack.config.js

const path = require('path');
// const chalk = require("chalk");
// const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production', // 开发模式
    entry: path.resolve(__dirname, '../src/main.js'),    // 入口文件
    output: {
        filename: '[name].[hash:8].js',      // 打包后的文件名称
        path: path.resolve(__dirname, '../dist')  // 打包后的目录
    },
    performance: {
        hints: false
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        proxy: {
            // '/resource': {
            //     changeOrigin: true,
            //     target: 'http://localhost:6998',
            // },
            // '/upload': {
            //     changeOrigin: true,
            //     target: 'http://localhost:6998',
            // },
            '*': {
                changeOrigin: true,
                target: 'http://localhost:6998',
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // options: vueLoaderConfig
            },
            {
                test: /\.(css|scss|sass)$/,
                use: ["style-loader", "css-loader", 'sass-loader'], //从右向左解析
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset",
                generator: {
                    filename: "static/img/[name].[hash:7].[ext]",
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            favicon: path.resolve(__dirname, '../public/bitbug_favicon.ico')
        }),
        new CleanWebpackPlugin(),
        // new ProgressBarPlugin({
        //     format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
        // }),
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        }
    },
}
