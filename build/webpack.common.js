const HtmlWebpackPlugin = require('html-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const path = require('./path');

module.exports = {
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules'],
        alias: {
            '@src': path.src
        }
    },
    entry: {
        app: path.entry
    },
    output: {
        path: path.output,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['thread-loader', 'babel-loader'],
                include: path.src
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/assets/images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/assets/media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/assets/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.template,
            title: 'react-template'
        }),
        new AntdDayjsWebpackPlugin()
    ]
};
