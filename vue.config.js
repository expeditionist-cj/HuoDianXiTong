// const url = 'http://192.168.59.7:9999';
const url = "http://183.64.62.154:9999";
const urlXR = "http://192.168.1.142:9999";
const env = process.env;
const path = require('path')
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: "./",
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
      // 智能助手
      '/smartassist': {
          target: url,
          ws: true,
          pathRewrite: {
            '^/smartassist': '/smartassist'
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
