import webpackBaseConfig from './webpack.base.config';
import merge from 'webpack-merge';
import { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const plugins: any[] = [];

if (process.env.ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin());
}

const webpackProdConfig: Configuration & Record<string, any> = {
  mode: 'production',
  plugins,
  // stats: {
  //     errorDetails: true,
  // },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false, // delete license file
      }),
      // new CssMinimizerWebpackPlugin({}),
    ],
  },
};

const finalWebpackProdConfig: Configuration = merge(webpackBaseConfig, webpackProdConfig);
export default finalWebpackProdConfig;
