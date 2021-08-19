'use strict'// 引入scp2
var client = require('scp2');
console.log('开始自动上传!')
client.scp('./dist/', //默认打包的路径
    {
        'host': '192.168.4.26',
        'port': '22',
        'username': 'root',
        'password': 'admin@123',
        'path': '/usr/share/nginx/html'
    }
    , err => {
        if (!err) { console.log('项目发布完毕!') } else { console.log('err', err) }
    })
