import webpackBaseConfig from './webpack.base.config';
import merge from 'webpack-merge';
import { Configuration } from 'webpack';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';

const smp = new SpeedMeasurePlugin();

const webpackConfig: Configuration = {
  mode: 'production',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  optimization: {
    minimize: false,
  },
  // devtool: 'source-map',
};

const webpackDevConfig = smp.wrap(webpackConfig as any) as Configuration;

const finalWebpackDevConfig = merge(webpackBaseConfig, webpackDevConfig);

export default finalWebpackDevConfig;
