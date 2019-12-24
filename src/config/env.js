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
let scoketUrl =""; // websocket
let getCraftUrl = {
  craftUrlDev(xml) {
    return `http://183.64.62.154:8099/direct?user=admin&password=e10adc3949ba59abbe56e057f20f883e&filePath=${xml}&showToolbar=false&view=view`
  },
  craftUrlPro(xml) {
    return `http://183.64.62.154:8099/direct?user=admin&password=e10adc3949ba59abbe56e057f20f883e&filePath=${xml}&showToolbar=false&view=view`
  }
}
let getSocketUrl = {
  dev:`ws://172.16.3.213:6001/alarmWs/${timestamp}`,
  pro:`ws://183.64.62.154:9999/alarmWs/${timestamp}`
}

if (env.NODE_ENV == 'development') {
  craftUrl = getCraftUrl.craftUrlDev;
  scoketUrl = getSocketUrl.dev;
  baseUrl = "http://183.64.62.154:9999";
} else if (env.NODE_ENV == 'production') {
  craftUrl = getCraftUrl.craftUrlPro;
  scoketUrl = getSocketUrl.pro;
  baseUrl = "http://183.64.62.154:9999";
} else if (env.NODE_ENV == 'test') {

}
export {
  baseUrl,
  actUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl,
  env,
  craftUrl,
  scoketUrl
}
