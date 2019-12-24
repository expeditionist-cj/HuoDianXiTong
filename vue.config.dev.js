const url = 'http://192.168.59.7:9999'
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  publicPath:"./",
  chainWebpack: config => {
    // 忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT'
    })
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
  },
  // 配置转发代理，只在开发环境有效，生产环境中需要在Nginx中配置代理
  devServer: {
    disableHostCheck: true,
    port: 8080,
    proxy: {
      '/auth': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      '/admin': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      },
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
      '/datamon': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/datamon': '/datamon'
        }
      },
      '/job': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/job': '/job'
        }
      }
    }
  }
}
