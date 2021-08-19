 import {
   saveFsRow,
 } from '@/api/report/writeData.js'

 let data = [{
     month: ""
   },
   {
     month: ""
   },
   {
     month: ""
   },
   {
     month: ""
   },
   {
     month: ""
   },
   {
     month: ""
   },
   {
     month: ""
   },
   {
     month: ""
   },
   {
     month: ""
   },
   {
     month: ""
   },
   {
     month: ""
   },
   {
     month: ""
   }
 ];
 export let defHotSettingsMonth = {
   // 数据项
   data: JSON.parse(JSON.stringify(data)),
   // 每列配置
   columns: [{
       data: "month",
       type: "numeric",
       readOnly: true
     },
     {
       data: "heatCapacity",
       type: "numeric"
     },
     {
       data: "svGypsumSales",
       type: "numeric"
     },
     {
       data: "calSulRatio",
       type: "numeric"
     }
   ],
   // placeholder: "请输入数字",
   readOnly: false, // 只读
   headerTooltips: {
     rows: true,
     columns: true,
     onlyTrimmed: false
   },
   // 是否可以隐藏列
   hiddenColumns: true,
   hiddenRows: true,
   colHeaders: true,
   // 设置语言
   language: "zh-CN",
   stretchH: "all",
   width: "50%",
   autoWrapRow: true, // 自动换行
   // height: this.height, // 最大高度
   maxRows: 100, // 最大行数
   manualRowResize: true,
   manualColumnResize: true,
   rowHeaders: false, // 显隐行表头
   //fixedColumnsLeft: 0, //固定左边列数
   // fixedRowsTop: 2, //固定上边列数
   //fixedRowsBottom: 2, // 固定底部列数
   bindRowsWithHeaders: "strict",
   manualColumnMove: false, // 拖拽移动列
   manualRowMove: true, // 拖拽移动行
   allowEmpty: false,
   // 多级表头
   nestedHeaders: [
     [{
         label: "日期",
         colspan: 1
       },
       {
         label: "供热量",
         colspan: 1
       },
       {
         label: "不合格石膏量",
         colspan: 1
       },
       {
         label: "钙硫比",
         colspan: 1
       }
     ],
     ["（月）", "（万吉焦）", "（t）", ""]
   ],
   // mergeCells: [
   //   // 合并
   //    {row: 1, col: 1, rowspan: 3, colspan: 3},  //指定合并，从（1,1）开始行3列3合并成一格
   //    {row: 3, col: 4, rowspan: 2, colspan: 2}
   // ],
   manualColumnFreeze: true,
   contextMenu: true,
   filters: true,
   undo: true,
   redo: true,
   fillHandle: true, // 选中拖拽复制，只针对列
   dropdownMenu: true,
   dropdownMenu: [
     "filter_by_condition",
     "filter_action_bar",
     "filter_by_value",
     "filter_operators"
   ],

   collapsibleColumns: true,
   copyPaste: true, // 允许复制粘贴
   observeChanges: true, // 响应式
   multiColumnSorting: {
     indicator: true
   },
   currentRowClassName: 'rowStyle',
   currentColClassName: 'colStyle',
   //右键效果
   contextMenu: {
     //自定义右键菜单，可汉化，默认布尔值
     items: {
       // row_below: {
       //   name: "添加一行",
       //   callback(key, selection, clickEvent) {
       //     vue.hotSettings.data.push({
       //       id: 22,
       //       flag: "PHP",
       //       currencyCode: "PHP",
       //       currency: "Philippine Peso",
       //       level: 46.3108,
       //       units: "PHP / USD",
       //       asOf: "08/19/2019",
       //       onedChng: 0.0012
       //     });
       //   }
       // },
       // remove_row: {
       //   name: "删除该行数据",
       //   callback() {
       //     alert("你确定要删该行数据");
       //   }
       // },
       // save: {
       //   name: "保存该行数据",
       //   callback(key, selection) {
       //     window.vue.$message("请选择区域和电厂")
       //   }
       // },
       // saveAll: {
       //   name: "保存所有",
       //   callback(key, selection) {
       //     window.vue.$message("请选择区域和电厂")
       //   }
       // },
       // 不能用于多级表头
       // hidden_columns_hide: {
       //   name: "隐藏该列"
       // },
       // hidden_columns_show: {
       //   name: "显示隐藏列"
       // },
       alignment: {
         name: "对齐"
       },
       undo: {
         name: "撤销"
       },
       // redo: {
       //   name: "重做"
       // },
       // make_read_only: {
       //   name: "只读"
       // },
       // clear_column: {
       //   name: "清除列"
       // },
       cut: {
         name: "剪切"
       },
       copy: {
         name: "复制"
       },
       // hidden_rows_hide: {
       //   name: "隐藏行"
       // },
       // hidden_rows_show: {
       //   name: "显示行"
       // },
       // freeze_column: {
       //   name: "冻结列"
       // },
       // unfreeze_column: {
       //   name: "解冻列"
       // },
       // resetState: {
       //   name: "重置",
       //   callback() {
       //     vueInstance.$refs.hotTable.hotInstance.loadData(data);
       //   }
       // }
     }
   }

   // 下拉菜单效果
 }
 export let getHotSettingsTl = (data) => {
   let datas = JSON.parse(JSON.stringify(data))
   let resetData = JSON.parse(JSON.stringify(data));
   let hotSettings = {
     // 数据项
     data: datas,
     // 每列配置
     columns: [{
         data: "month",
         type: "numeric",
         readOnly: true
       },
       {
         data: "heatCapacity",
         type: "numeric"
       },
       {
         data: "svGypsumSales",
         type: "numeric"
       },
       {
         data: "calSulRatio",
         type: "numeric"
       }
     ],
     // placeholder: "请输入数字",
     readOnly: false, // 只读
     headerTooltips: {
       rows: true,
       columns: true,
       onlyTrimmed: false
     },
     // 是否可以隐藏列
     hiddenColumns: true,
     hiddenRows: true,
     colHeaders: true,
     // 设置语言
     language: "zh-CN",
     stretchH: "all",
     width: "50%",
     autoWrapRow: true, // 自动换行
     // height: this.height, // 最大高度
     maxRows: 100, // 最大行数
     manualRowResize: true,
     manualColumnResize: true,
     rowHeaders: false, // 显隐行表头
     //fixedColumnsLeft: 0, //固定左边列数
     // fixedRowsTop: 2, //固定上边列数
     //fixedRowsBottom: 2, // 固定底部列数
     bindRowsWithHeaders: "strict",
     manualColumnMove: false, // 拖拽移动列
     manualRowMove: true, // 拖拽移动行
     allowEmpty: false,
     // 多级表头
     nestedHeaders: [
       [{
           label: "日期",
           colspan: 1
         },
         {
           label: "供热量",
           colspan: 1
         },
         {
           label: "不合格石膏量",
           colspan: 1
         },
         {
           label: "钙硫比",
           colspan: 1
         }
       ],
       ["（月）", "（万吉焦）", "（t）", ""]
     ],
     // mergeCells: [
     //   // 合并
     //    {row: 1, col: 1, rowspan: 3, colspan: 3},  //指定合并，从（1,1）开始行3列3合并成一格
     //    {row: 3, col: 4, rowspan: 2, colspan: 2}
     // ],
     manualColumnFreeze: true,
     contextMenu: true,
     filters: true,
     undo: true,
     redo: true,
     fillHandle: true, // 选中拖拽复制，只针对列
     dropdownMenu: true,
     dropdownMenu: [
       "filter_by_condition",
       "filter_action_bar",
       "filter_by_value",
       "filter_operators"
     ],

     collapsibleColumns: true,
     copyPaste: true, // 允许复制粘贴
     observeChanges: true, // 响应式
     multiColumnSorting: {
       indicator: true
     },
     currentRowClassName: 'rowStyle',
     currentColClassName: 'colStyle',
     //右键效果
     contextMenu: {
       //自定义右键菜单，可汉化，默认布尔值
       items: {
         // row_below: {
         //   name: "添加一行",
         //   callback(key, selection, clickEvent) {
         //     vue.hotSettings.data.push({
         //       id: 22,
         //       flag: "PHP",
         //       currencyCode: "PHP",
         //       currency: "Philippine Peso",
         //       level: 46.3108,
         //       units: "PHP / USD",
         //       asOf: "08/19/2019",
         //       onedChng: 0.0012
         //     });
         //   }
         // },
         // remove_row: {
         //   name: "删除该行数据",
         //   callback() {
         //     alert("你确定要删该行数据");
         //   }
         // },
         save: {
           name: "保存该行数据",
           callback(key, selection) {
             let rowNumber = selection[0].start.row;
             let row = datas[rowNumber];
             saveRow(row);
           }
         },
         // saveAll: {
         //   name: "保存所有",
         //   callback(key, selection) {
         //     let data = JSON.parse(JSON.stringify(datas))
         //     // console.log(data)
         //     let arry = [];
         //     data.forEach(element => {
         //       let { date, heatCapacity, svGypsumSales, calSulRatio, val } = element;
         //       let area = val.split('_')[0]
         //       let plant = val.split('_')[1]
         //       arry.push({ date, heatCapacity, svGypsumSales, calSulRatio, area, plant })
         //     });
         //     window.vue.$store.commit('SET_LOADING', true)
         //     update_all(arry).then(res => {
         //       window.vue.$store.commit('SET_LOADING', false)
         //       if (res.data.msg == "success") {
         //         window.vue.$message({
         //           showClose: true,
         //           message: "更新成功",
         //           type: "success"
         //         });

         //       } else {
         //         return window.vue.$message.error("更新失败");
         //       }
         //     })
         //     // console.log(arry)


         //   }
         // },
         // 不能用于多级表头
         // hidden_columns_hide: {
         //   name: "隐藏该列"
         // },
         // hidden_columns_show: {
         //   name: "显示隐藏列"
         // },
         alignment: {
           name: "对齐"
         },
         undo: {
           name: "撤销"
         },
         // redo: {
         //   name: "重做"
         // },
         // make_read_only: {
         //   name: "只读"
         // },
         // clear_column: {
         //   name: "清除列"
         // },
         cut: {
           name: "剪切"
         },
         copy: {
           name: "复制"
         },
         // hidden_rows_hide: {
         //   name: "隐藏行"
         // },
         // hidden_rows_show: {
         //   name: "显示行"
         // },
         // freeze_column: {
         //   name: "冻结列"
         // },
         // unfreeze_column: {
         //   name: "解冻列"
         // },
         // resetState: {
         //   name: "重置",
         //   callback() {
         //     // vueInstance.$refs.hotTable.hotInstance.loadData(data);
         //     hotSettings.data = resetData;
         //   }
         // }
       }
     }

     // 下拉菜单效果
   }
   return hotSettings
 }
 export let getHotSettingsTx = (data) => {
   let datas = JSON.parse(JSON.stringify(data))
   let resetData = JSON.parse(JSON.stringify(data));
   let hotSettings = {
     // 数据项
     data: datas,
     // 每列配置
     columns: [{
         data: "month",
         type: "numeric",
         readOnly: true
       },
       {
         data: "heatCapacity",
         type: "numeric"
       }
     ],
     // placeholder: "请输入数字",
     readOnly: false, // 只读
     headerTooltips: {
       rows: true,
       columns: true,
       onlyTrimmed: false
     },
     // 是否可以隐藏列
     hiddenColumns: true,
     hiddenRows: true,
     colHeaders: true,
     // 设置语言
     language: "zh-CN",
     stretchH: "all",
     width: "25%",
     autoWrapRow: true, // 自动换行
     // height: this.height, // 最大高度
     maxRows: 100, // 最大行数
     manualRowResize: true,
     manualColumnResize: true,
     rowHeaders: false, // 显隐行表头
     //fixedColumnsLeft: 0, //固定左边列数
     // fixedRowsTop: 2, //固定上边列数
     //fixedRowsBottom: 2, // 固定底部列数
     bindRowsWithHeaders: "strict",
     manualColumnMove: false, // 拖拽移动列
     manualRowMove: true, // 拖拽移动行
     allowEmpty: false,
     // colHeaders: [
     //   "ID",
     //   "Country",
     //   "Code",
     //   "Currency",
     //   "Level",
     //   "Units",
     //   "Date",
     //   "Change",
     // ],
     // 多级表头
     nestedHeaders: [
       [{
           label: "日期",
           colspan: 1
         },
         {
           label: "供热量",
           colspan: 1
         }
       ],
       ["", "（万吉焦）"]
     ],
     // mergeCells: [
     //   // 合并
     //    {row: 1, col: 1, rowspan: 3, colspan: 3},  //指定合并，从（1,1）开始行3列3合并成一格
     //    {row: 3, col: 4, rowspan: 2, colspan: 2}
     // ],
     manualColumnFreeze: true,
     contextMenu: true,
     filters: true,
     undo: true,
     redo: true,
     fillHandle: true, // 选中拖拽复制，只针对列
     dropdownMenu: true,
     dropdownMenu: [
       "filter_by_condition",
       "filter_action_bar",
       "filter_by_value",
       "filter_operators"
     ],

     collapsibleColumns: true,
     copyPaste: true, // 允许复制粘贴
     observeChanges: true, // 响应式
     multiColumnSorting: {
       indicator: true
     },
     currentRowClassName: 'rowStyle',
     currentColClassName: 'colStyle',
     //右键效果
     contextMenu: {
       //自定义右键菜单，可汉化，默认布尔值
       items: {
         // row_below: {
         //   name: "添加一行",
         //   callback(key, selection, clickEvent) {
         //     vue.hotSettings.data.push({
         //       id: 22,
         //       flag: "PHP",
         //       currencyCode: "PHP",
         //       currency: "Philippine Peso",
         //       level: 46.3108,
         //       units: "PHP / USD",
         //       asOf: "08/19/2019",
         //       onedChng: 0.0012
         //     });
         //   }
         // },
         // remove_row: {
         //   name: "删除该行数据",
         //   callback() {
         //     alert("你确定要删该行数据");
         //   }
         // },
         save: {
           name: "保存该行数据",
           callback(key, selection) {
             let rowNumber = selection[0].start.row;
             let row = datas[rowNumber];
             saveRow(row);
           }
         },
         // saveAll: {
         //   name: "保存所有",
         //   callback(key, selection) {
         //     let data = JSON.parse(JSON.stringify(datas))
         //     // console.log(data)
         //     let arry = [];
         //     data.forEach(element => {
         //       let { date, heatCapacity, svGypsumSales, calSulRatio, val } = element;
         //       let area = val.split('_')[0]
         //       let plant = val.split('_')[1]
         //       arry.push({ date, heatCapacity, svGypsumSales, calSulRatio, area, plant })
         //     });
         //     window.vue.$store.commit('SET_LOADING', true)
         //     update_all(arry).then(res => {
         //       window.vue.$store.commit('SET_LOADING', false)
         //       if (res.data.msg == "success") {
         //         window.vue.$message({
         //           showClose: true,
         //           message: "更新成功",
         //           type: "success"
         //         });

         //       } else {
         //         return window.vue.$message.error("更新失败");
         //       }
         //     })
         //   }
         // },
         // 不能用于多级表头
         // hidden_columns_hide: {
         //   name: "隐藏该列"
         // },
         // hidden_columns_show: {
         //   name: "显示隐藏列"
         // },
         alignment: {
           name: "对齐"
         },
         undo: {
           name: "撤销"
         },
         // redo: {
         //   name: "重做"
         // },
         make_read_only: {
           name: "只读"
         },
         // clear_column: {
         //   name: "清除列"
         // },
         cut: {
           name: "剪切"
         },
         copy: {
           name: "复制"
         },
         // hidden_rows_hide: {
         //   name: "隐藏行"
         // },
         // hidden_rows_show: {
         //   name: "显示行"
         // },
         // freeze_column: {
         //   name: "冻结列"
         // },
         // unfreeze_column: {
         //   name: "解冻列"
         // },
         resetState: {
           name: "重置",
           callback() {
             // vueInstance.$refs.hotTable.hotInstance.loadData(data);
             hotSettings.data = resetData;
           }
         }
       }
     }

     // 下拉菜单效果
   }
   return hotSettings
 }
 export let getHotSettingsFs = (data) => {
   let datas = JSON.parse(JSON.stringify(data))
   let resetData = JSON.parse(JSON.stringify(data));
   let hotSettings = {
     // 数据项
     data: datas,
     // 每列配置
     columns: [{
         data: "month",
         type: "numeric",
         readOnly: true
       },
       {
         data: "fsZd",
         type: "numeric"
       },
       {
         data: "fsPh",
         type: "numeric"
       },
       {
         data: "fsCod",
         type: "numeric"
       },
       {
         data: "fsXs",
         type: "numeric"
       },
       {
         data: "fsXf",
         type: "numeric"
       },
       {
         data: "fsAs",
         type: "numeric"
       },
       {
         data: "fsPb",
         type: "numeric"
       },
       {
         data: "fsHg",
         type: "numeric"
       },
       {
         data: "fsCd",
         type: "numeric"
       },
     ],
     // placeholder: "请输入数字",
     readOnly: false, // 只读
     headerTooltips: {
       rows: true,
       columns: true,
       onlyTrimmed: false
     },
     // 是否可以隐藏列
     hiddenColumns: true,
     hiddenRows: true,
     colHeaders: true,
     // 设置语言
     language: "zh-CN",
     stretchH: "all",
     width: "100%",
     autoWrapRow: true, // 自动换行
     // height: this.height, // 最大高度
     maxRows: 100, // 最大行数
     manualRowResize: true,
     manualColumnResize: true,
     rowHeaders: false, // 显隐行表头
     //fixedColumnsLeft: 0, //固定左边列数
     // fixedRowsTop: 2, //固定上边列数
     //fixedRowsBottom: 2, // 固定底部列数
     bindRowsWithHeaders: "strict",
     manualColumnMove: false, // 拖拽移动列
     manualRowMove: true, // 拖拽移动行
     allowEmpty: false,
     // colHeaders: [
     //   "ID",
     //   "Country",
     //   "Code",
     //   "Currency",
     //   "Level",
     //   "Units",
     //   "Date",
     //   "Change",
     // ],
     // 多级表头
     nestedHeaders: [
       [{
           label: "日期",
           colspan: 1
         },
         {
           label: "浊度",
           colspan: 1
         },
         {
           label: "PH值",
           colspan: 1
         },
         {
           label: "COD",
           colspan: 1
         },
         {
           label: "硫化物",
           colspan: 1
         },
         {
           label: "氟化物",
           colspan: 1
         },
         {
           label: "总砷",
           colspan: 1
         },
         {
           label: "总铅",
           colspan: 1
         },
         {
           label: "总汞",
           colspan: 1
         },
         {
           label: "总镉",
           colspan: 1
         },
       ],
       ["月", "(NTU)", "", "(mg/L)", "(mg/L)", "(mg/L)", "(mg/L)", "(mg/L)", "(mg/L)", "(mg/L)"]
     ],
     // mergeCells: [
     //   // 合并
     //    {row: 1, col: 1, rowspan: 3, colspan: 3},  //指定合并，从（1,1）开始行3列3合并成一格
     //    {row: 3, col: 4, rowspan: 2, colspan: 2}
     // ],
     manualColumnFreeze: true,
     contextMenu: true,
     filters: true,
     undo: true,
     redo: true,
     fillHandle: true, // 选中拖拽复制，只针对列
     dropdownMenu: true,
     dropdownMenu: [
       "filter_by_condition",
       "filter_action_bar",
       "filter_by_value",
       "filter_operators"
     ],

     collapsibleColumns: true,
     copyPaste: true, // 允许复制粘贴
     observeChanges: true, // 响应式
     multiColumnSorting: {
       indicator: true
     },
     currentRowClassName: 'rowStyle',
     currentColClassName: 'colStyle',
     //右键效果
     contextMenu: {
       //自定义右键菜单，可汉化，默认布尔值
       items: {
         // row_below: {
         //   name: "添加一行",
         //   callback(key, selection, clickEvent) {
         //     vue.hotSettings.data.push({
         //       id: 22,
         //       flag: "PHP",
         //       currencyCode: "PHP",
         //       currency: "Philippine Peso",
         //       level: 46.3108,
         //       units: "PHP / USD",
         //       asOf: "08/19/2019",
         //       onedChng: 0.0012
         //     });
         //   }
         // },
         // remove_row: {
         //   name: "删除该行数据",
         //   callback() {
         //     alert("你确定要删该行数据");
         //   }
         // },
         save: {
           name: "保存该行数据",
           callback(key, selection) {
             let rowNumber = selection[0].start.row;
             let row = datas[rowNumber];
             saveFsRowData(row);
           }
         },
         // saveAll: {
         //   name: "保存所有",
         //   callback(key, selection) {
         //     let data = JSON.parse(JSON.stringify(datas)) 
         //     window.vue.$store.commit('SET_LOADING', true)
         //     update_fs_all(data).then(res => {
         //       window.vue.$store.commit('SET_LOADING', false)
         //       if (res.data.msg == "success") {
         //         window.vue.$message({
         //           showClose: true,
         //           message: "更新成功",
         //           type: "success"
         //         });

         //       } else {
         //         return window.vue.$message.error("更新失败");
         //       }
         //     })
         //   }
         // },
         // 不能用于多级表头
         // hidden_columns_hide: {
         //   name: "隐藏该列"
         // },
         // hidden_columns_show: {
         //   name: "显示隐藏列"
         // },
         alignment: {
           name: "对齐"
         },
         undo: {
           name: "撤销"
         },
         // redo: {
         //   name: "重做"
         // },
         make_read_only: {
           name: "只读"
         },
         // clear_column: {
         //   name: "清除列"
         // },
         cut: {
           name: "剪切"
         },
         copy: {
           name: "复制"
         },
         // hidden_rows_hide: {
         //   name: "隐藏行"
         // },
         // hidden_rows_show: {
         //   name: "显示行"
         // },
         // freeze_column: {
         //   name: "冻结列"
         // },
         // unfreeze_column: {
         //   name: "解冻列"
         // },
         resetState: {
           name: "重置",
           callback() {
             // vueInstance.$refs.hotTable.hotInstance.loadData(data);
             hotSettings.data = resetData;
           }
         }
       }
     }

     // 下拉菜单效果
   }
   return hotSettings
 }

 // 保存该行数据---脱硫、脱硝
 export let saveRow = (row) => {
  let num = 0;
  Object.keys(row).map((k) => {
    if (
      k == "area" ||
      k == "month" ||
      k == "date" ||
      k == "plant"
    ) {
      return;
    } else {
      if (isNaN(Number(row[k]))) {
        num++;
      } else {
        row[k] = Number(row[k]);
      }
    }
  });
  if (num > 0) {
    return window.vue.$message.error('请填写数字！')
  }
   window.vue.$store.commit('SET_LOADING', true)
   saveFsRow(row).then(res => {
     window.vue.$store.commit('SET_LOADING', false)
     if (res.data.msg == "success") {
       window.vue.$message({
         showClose: true,
         message: "更新成功",
         type: "success"
       });
     } else {
       return window.vue.$message.error("更新失败");
     }
   });
 }
 // 保存该行数据---废水
 export let saveFsRowData = (row) => {
   window.vue.$store.commit('SET_LOADING', true)
   saveFsRow(row).then(res => {
     window.vue.$store.commit('SET_LOADING', false)
     if (res.data.msg == "success") {
       window.vue.$message({
         showClose: true,
         message: "更新成功",
         type: "success"
       });
     } else {
       return window.vue.$message.error("更新失败");
     }
   });
 }
