import { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import defineProcess from './define-process';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { EnvEnum } from './constants';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const resolve = (relativePath: string): string => {
  return path.resolve(__dirname, relativePath);
};

const VARIABLE_LESS_PATH = '../src/variable.less';

const isQa = process.env.ENV === EnvEnum.QA;

const webpackBaseConfig: Configuration = {
  entry: {
    index: resolve('../src/main.tsx'),
    background: resolve('../src/background/index.ts'),
    'content-script': resolve('../src/content-script/index.ts'),
    'content-script-style': resolve('../src/content-script/index.less'),
  },
  output: {
    path: resolve('../dist'),
    // filename: '[name].[contenthash:8].bundle.js',
    filename: '[name].js',
    // filename({ chunk }) {
    //   let ext = 'js';
    //   let name = '[name]';
    //   if (chunk?.name) {
    //     if (['content-script-style'].includes(chunk.name)) {
    //       ext = 'css';
    //       name = chunk.name.replace(/-style/, '');
    //     }
    //   }
    //   return `${name}.${ext}`;
    // },
    clean: true,
    // 禁止webpack使用es5以上特性
    // environment: {
    //     arrowFunction: false,
    //     const: false,
    //     optionalChaining: false,
    //     templateLiteral: false,
    //     destructuring: false,
    //     forOf: false,
    // },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|jsx)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(less|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          {
            loader: 'css-loader',
            // options: {
            //     modules: {
            //         localIdentName: '[name]__[local]--[hash:base64:5]'
            //     }
            // }
          },
          'postcss-loader',
          'less-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: resolve(VARIABLE_LESS_PATH),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // filename: 'index.html',
      template: resolve('../index.html'),
    }),
    new DefinePlugin({
      ...defineProcess,
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name]${isQa ? '' : '.[contenthash:8]'}.css`,
      // filename: 'css/[name].[contenthash:8].css'
    }),
    new CopyWebpackPlugin({
      patterns: ['public', 'src/manifest.json'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('../src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  // externals: {
  //     react: 'React',
  // },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      minSize: 30000,
      cacheGroups: {
        'react-lib': {
          minChunks: 1,
          name: 'react-lib',
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)/,
          priority: 1,
        },
        // common: {
        //   minSize: 1,
        //   name: 'common',
        //   test: /[\\/]src[\\/]components/,
        //   minChunks: 1,
        // },
      },
    },
  },
};

export default webpackBaseConfig;
