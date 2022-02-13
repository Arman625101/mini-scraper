import path from 'path';
import { commonConfig } from './webpack.common.js';
import { merge } from 'webpack-merge';

export default merge(commonConfig, {
    mode: 'development',
    output: {
        path: path.resolve('dist'),
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(path.dirname(''), 'dist'),
            watch: true
        }
    }
});
