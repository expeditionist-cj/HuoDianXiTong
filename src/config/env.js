// 配置编译环境和线上环境之间的切换

const env = process.env;
let timestamp = Date.parse(new Date());
let baseUrl = '';
// 图表库为avue和sca2套地址
let iconfontVersion = ['567566_qo5lxgtishg', '667895_92fjyfrcqpr']
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`
let codeUrl = `${window.location.origin}/code`
let actUrl = `${window.location.origin}/act/modeler.html?modelId=`
let craftUrl = "";
let scoketUrl = ""; // websocket，首页报警管理的websocket

// 定义智能助手的报警socket地址
let ass_soc_url = "";
// 工艺流程图地址
// 预生产地址： http://183.64.62.154:8099
let getCraftUrl = {
  craftUrlDev(xml) {
    let url = window.location.href.split(".")[2];
    let ip = undefined;
    if (url == 4) {
        ip = "192.168.4.19:8099"
    } else {
      // ip = "192.168.2.24:8099"
        ip = "172.16.1.2:8099"
    }
    // return `http://172.16.0.88:8099/direct?user=admin&password=e10adc3949ba59abbe56e057f20f883e&filePath=${xml}&showToolbar=false&view=view`
    return `http://${ip}/direct?user=admin&password=e10adc3949ba59abbe56e057f20f883e&filePath=${xml}&showToolbar=false&view=view`
  },
  craftUrlPro(xml) {
    let url = window.location.href.split(".")[2];
    let ip = undefined;
    if (url == 4) {
        ip = "192.168.4.19:8099"
    } else {
        // ip = "192.168.2.24:8099"
        ip = "172.16.1.2:8099"
    }
    // return `http://172.16.0.88:8099/direct?user=admin&password=e10adc3949ba59abbe56e057f20f883e&filePath=${xml}&showToolbar=false&view=view`
    return `http://${ip}/direct?user=admin&password=e10adc3949ba59abbe56e057f20f883e&filePath=${xml}&showToolbar=false&view=view`
  }
} 
// 首页报警管理websocket
let getSocketUrl = {
  dev: `ws://192.168.59.8:5007/websocket/`,
  // dev: `ws://192.168.59.8:6001/websocket/alarm/${timestamp}`,
  // pro: `ws://192.168.4.26:6001/websocket/alarm/${timestamp}`,
  pro: `ws://192.168.4.19:5007/websocket/`
}
if (env.NODE_ENV == 'development') {
  craftUrl = getCraftUrl.craftUrlDev;
  scoketUrl = getSocketUrl.dev;
  baseUrl = "http://183.64.62.154:9999";
  ass_soc_url = "ws://192.168.59.7:6002";
} else if (env.NODE_ENV == 'production') {
  craftUrl = getCraftUrl.craftUrlPro;
  scoketUrl = getSocketUrl.pro;
  baseUrl = "http://183.64.62.154:9999";
  ass_soc_url = env.VUE_APP_socket
} else if (env.NODE_ENV == 'test') {
  craftUrl = getCraftUrl.craftUrlPro;
  scoketUrl = getSocketUrl.dev;
  baseUrl = "http://183.64.62.154:9999";
  ass_soc_url = env.VUE_APP_socket
} 
export {
  baseUrl,
  actUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl,
  env,
  craftUrl,
  scoketUrl,
  ass_soc_url
}
