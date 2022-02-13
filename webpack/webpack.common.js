import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const commonConfig = {
    entry: {
        main: './client/index.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.html',
            inject: 'body'
        })
    ]
};
