const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");//清理dist

const devMode = process.env.NODE_ENV !== 'production';
// 在node中，有全局变量process表示的是当前的node进程。
// process.env包含着关于系统环境的信息。
// NODE_ENV是用户一个自定义的变量，在webpack中它的用途是来判断当前是生产环境或开发环境。
// 我们可以通过 cross-env 将 NODE_ENV=development 写入 npm run dev的指令中，从而注入NODE_ENV变量。

module.exports = {
  //入口
  entry: {
    app: './src/index.js'
  },
  module:{
    rules:[
        //处理css
        {
          test:/\.(sc|c|sa)ss$/,
          // use: ExtractTextPlugin.extract({
          //   fallback: "style-loader",
          //   use: "css-loader"
          // }),
          use: [
              devMode?'style-loader':{
                  loader:MiniCssExtractPlugin.loader,
                  options: {
                      publicPath: '../'
                  }
              },
              {
                  loader:'css-loader',
                  options:{
                      sourceMap:true,
                  }
              },
              'postcss-loader',
              {
                  loader: 'sass-loader',
                  options:{
                      sourceMap:true,
                  }
              }
              
          ]
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: ['images:src']
            }
          }
        },
        {
          //处理图片
          test: /\.(png|svg|jpg|gif|webp)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[name].[contenthash:7].[ext]',
                outputPath: 'images/',
                // publicPath:"../dist/images/"
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              }
            },
          ]
        },
        {
          //bable 
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
              cacheDirectory:true
            }
          }
        }
      ]
  },
  // 单独提取css文件
  plugins:[
    new ExtractTextPlugin("css/index.css"),  //这里的/css/index.css 是分离后的路径
    //清理dist
    new CleanWebpackPlugin(),
    //处理html
    new HtmlWebpackPlugin({
        title:"webpack学习",
        minify: {
            collapseWhitespace: true, // 移除空格
            removeAttributeQuotes: false, // 不移除引号
            removeComments: true // 移除注释
        },
        filename: 'index.html',
        template: path.resolve(__dirname,'./src/index.html')
    }),
    // new MiniCssExtractPlugin({
    //   filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
    //   chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
    // }),
  ],
  performance: {
      hints: "warning", // 枚举
      maxAssetSize: 30000000, // 整数类型（以字节为单位）
      maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
      assetFilter: function(assetFilename) {
        // 提供资源文件名的断言函数
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
      
      }
  }
//   devServer: {
//     contentBase: "./dist",//本地服务器所加载的页面所在的目录
//     historyApiFallback: true,//不跳转
//     host:'0.0.0.0',
//     port:8080,
//     hot:true,
//     inline: true,//实时刷新
//     hot:true,//Enable webpack's Hot Module Replacement feature
//     compress:true,//Enable gzip compression for everything served
//     overlay: true, //Shows a full-screen overlay in the browser
//     stats: "errors-only" ,//To show only errors in your bundle
//     open:true, //When open is enabled, the dev server will open the browser.
//     proxy: {
//         "/api": {
//             target: "http://localhost:3000",
//             pathRewrite: {"^/api" : ""}
//         }
//     }//重定向
//  }
}