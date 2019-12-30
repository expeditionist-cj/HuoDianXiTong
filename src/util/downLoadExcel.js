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
      // link.href =baseUrl+url+"?"+serraliz_obj(obj)
      link.href =url+"?"+serraliz_obj(obj);
      link.target="_self";
      document.body.appendChild(link);
      link.click();
      document.removeChild(link);
     };

     
     // ajax导出报表
     Vue.prototype.excel =function(data,name){
        var blob = new Blob([data], {type: "application/vnd.ms-excel"});
                var objectUrl = URL.createObjectURL(blob);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display:none');
                a.setAttribute('href', objectUrl);
                var filename=`${name}`;
                a.setAttribute('download', filename);
                document.body.removeChild(a);
                a.click();
     }
  }