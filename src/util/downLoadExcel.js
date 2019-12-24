/*
*封装函数 downLoadFile.js
*params:  
*data:二进制文件
*/
import {baseUrl } from "../config/env";
import {serraliz_obj} from "./util"
export  const install = function (Vue, options){
    Vue.prototype.downloadFile =function(url,obj){
    //   let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href =baseUrl+url+"?"+serraliz_obj(obj)
    //   link.setAttribute('download', '脱硫.xlsx')
      document.body.appendChild(link)
      link.click()
     };
  }