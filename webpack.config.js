const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//提取css到单独文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const CleanCSS = require("clean-css");

module.exports = env => {
  if (!env) {
    env = {}
  }
  let styleLoad = 'vue-style-loader';
  let mode = 'development';
  let plugins = [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './app/views/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ];
  if (env.production) {
    plugins.push(
      //在 webpack 3 及其更低版本中，你需要使用 DefinePlugin：
      /*
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      */
  　   new MiniCssExtractPlugin({
      　  filename: "[name].css",
      　  chunkFilename: "[id].css"
  　　 }),
      new OptimizeCssAssetsPlugin({
        // use clean-css instead of the default cssnano
        cssProcessor: {
          process: (css, options) => new Promise((resolve, reject) => {
            const opts = Object.assign(options.map ? {
              sourceMap: true,
              sourceMapInlineSources: true,
            } : {}, options);

            opts.returnPromise = true;
            const filename = path.basename(opts.to);

            new CleanCSS(opts)
              .minify({
                [filename]: {
                  styles: css,
                  sourceMap: opts.map && opts.map.prev, // probably empty but here just in case
                }
              })
              .then((result) => {
                if (result.warnings) console.warn(result.warnings);

                resolve({
                  css: options.map
                    ? result.styles + `\n/*# sourceMappingURL=${filename}.map */`
                    : result.styles,
                  map: result.sourceMap,
                });
              })
              .catch(reject);
          }),
        },
        cssProcessorOptions: {
          // passing an object will enable source maps OR comment out to disable
          map: {},

          // the actual clean-css options
          level: {
            1: { all: true },
            2: { all: true },
          },
        },
      })
    )
    styleLoad = MiniCssExtractPlugin.loader;
    mode = 'production';
  }
  return {
    entry: ['./app/js/viewport.js', './app/js/main.js'],
    devtool: 'source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
      compress: true,
      port: 2000,
      clientLogLevel: "none",
      quiet: true
    },
    optimization: {
      // minimize: true,
      minimizer: [
        new OptimizeCssAssetsPlugin({
          // use clean-css instead of the default cssnano
          cssProcessor: {
            process: (css, options) => new Promise((resolve, reject) => {
              const opts = Object.assign(options.map ? {
                sourceMap: true,
                sourceMapInlineSources: true,
              } : {}, options);
    
              opts.returnPromise = true;
              const filename = path.basename(opts.to);
    
              new CleanCSS(opts)
                .minify({
                  [filename]: {
                      styles: css,
                      sourceMap: opts.map && opts.map.prev, // probably empty but here just in case
                  }
                })
                .then((result) => {
                  if (result.warnings) console.warn(result.warnings);
    
                  resolve({
                    css: options.map
                      ? result.styles + `\n/*# sourceMappingURL=${filename}.map */`
                      : result.styles,
                    map: result.sourceMap,
                  });
                })
                .catch(reject);
            }),
          },
          cssProcessorOptions: {
            // passing an object will enable source maps OR comment out to disable
            map: {},
    
            // the actual clean-css options
            level: {
              1: { all: true },
              2: { all: true },
            },
          },
        })
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: ['cache-loader', 'html-loader']
        }, 
        {
          test: /\.vue$/,
          use: [
            'cache-loader',
            'vue-loader'
          ]
        }, 
        {
          test: /\.scss$/,
          oneOf: [
            {
            resourceQuery: /module/,
            use: [
              styleLoad,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]',
                  sourceMap: true
                }
              }, {
                loader: 'px2rem-loader',
                options: {
                  remUnit: 40,
                  remPrecision: 8
                }
              },
              {
                loader:'sass-loader',
                options:{
                  sourceMap: true
                }
              }
            ]
            }, 
            {
              use: 
              [
                styleLoad,
                {
                  loader:'css-loader',
                  options:{
                    sourceMap: true
                  }
                },
                {
                  loader: 'px2rem-loader',
                  options: {
                    remUnit: 40,
                    remPrecision: 8
                  }
                },
                {
                  loader:'sass-loader',
                  options:{
                    sourceMap: true
                  }
                }
              ]
            }
          ],
        }, 
        {
          test: /\.css$/,
          use: [styleLoad, {loader:'css-loader',options:{sourceMap: true}}]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: [
        '.js', '.vue', '.json'
      ],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    mode,
    plugins,
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
};