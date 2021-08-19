const url = 'http://192.168.59.8:9999';
 
//const url = "http://183.64.62.154:9999";
const urlXR = "http://192.168.1.142:9999";
const env = process.env;
const path = require('path');
const extractTextCss = require('extract-text-webpack-plugin'); // 把css提取为单独的文件
const pro = require("./webpack.pro.js");
const dev = require('./webpack.dev.js');
const merge = require('webpack-merge');
const config = require('./webpack.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: "./",
  // 修改打包后js文件名
  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
      filename: `js/[name].version=1.0.js`,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                "presets": [
                  [
                    "@babel/preset-env",
                    {
                      targets: {
                        browsers: [">1%"]
                      }
                    }
                  ]
                ]
              },
            },
            {
              loader: './loader/removeConsole', // 自己编写的loader，去掉js里的console.log
            }
          ]
        },
      ]
    },
    // 修改打包后css文件名
    plugins: [
      new MiniCssExtractPlugin({
        filename: `css/[name].version=1.0.css`,
      })
    ]
  },
  chainWebpack: config => {
    // 忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT'
    });
    // 添加生产环境和开发环境的打包配置
    if (process.env.NODE_ENV === 'production') {

    } else {
      // 为开发环境修改配置...
    }
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  // 配置转发代理，只在开发环境有效，生产环境中需要在Nginx中配置代理
  devServer: {
    disableHostCheck: false,
    port: 8080,
    proxy: {
      // 登陆
      '/auth': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      // 系统菜单
      '/admin': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      },
      // 验证码
      '/code': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/code': '/code'
        }
      },
      '/gen': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/gen': '/gen'
        }
      },
      // 关键指标
      '/datamonitor': {
        target: url,
        // target:"http://192.168.1.142:9999",
        ws: true,
        pathRewrite: {
          '^/datamonitor': '/datamonitor'
        }
      },
      // 生产监控
      '/productmonitor': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/productmonitor': '/datamonitor'
        }
      },
      // 报警管理
      '/alraminfo': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/alraminfo': '/datamonitor'
        }
      }, 
      '/job': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/job': '/job'
        },
      },
    }
  }
}
