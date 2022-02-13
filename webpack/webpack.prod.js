import path from 'path';
import { commonConfig } from './webpack.common.js';
import { merge } from 'webpack-merge';

export default merge(commonConfig, {
    mode: 'production',
    output: {
        path: path.resolve('dist'),
        filename: '[name].[contenthash].bundle.js'
    }
});
