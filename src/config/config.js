export default {
    install: function (Vue, options) {
      Vue.prototype.configData = {
      //   testmenuUrl: 'http://172.16.1.90:8080',
      //   testUrl: 'http://172.16.1.90:8080',
        testmenuUrl: 'http://172.16.1.90:8080',
        testUrl: 'http://172.16.1.90:8080',
      }
    },
    upload(){
      let url = {
          test:"http://172.16.1.90:8080/",
          formal:"http://222.180.196.228:8001/",
          YS:"http://183.64.62.154:9096/"
      }
      return url['test']
    }
  }
  