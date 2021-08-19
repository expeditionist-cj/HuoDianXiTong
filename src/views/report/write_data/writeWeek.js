import {
  update_de_ems,
  update_de_all
} from "@/api/report/de_ems";
import {
  update_all
} from "@/api/report/nx_ems";

let data = [{
    date: '1'
  },
  {
    date: '2'
  },
  {
    date: '3'
  },
  {
    date: '4'
  },
  {
    date: '5'
  },
  {
    date: '6'
  },
  {
    date: '1'
  },
  {
    date: '2'
  },
  {
    date: '3'
  },
  {
    date: '4'
  },
  {
    date: '5'
  },
  {
    date: '6'
  },
  {
    date: '1'
  },
  {
    date: '2'
  },
  {
    date: '3'
  },
  {
    date: '4'
  },
  {
    date: '5'
  },
  {
    date: '6'
  },
  {
    date: '1'
  },
  {
    date: '2'
  },
  {
    date: '3'
  },
  {
    date: '4'
  },
  {
    date: '5'
  },
  {
    date: '6'
  },
  {
    date: '1'
  },
  {
    date: '2'
  },
  {
    date: '3'
  },
  {
    date: '4'
  },
  {
    date: '5'
  },
  {
    date: '6'
  },

]
export let defHotSettingsWeek = {
  // 数据项
  data: JSON.parse(JSON.stringify(data)),
  // 每列配置
  columns: [{
      data: "day",
      type: "numeric",
      readOnly: true
    },
    {
      data: "absBuyDay",
      type: "numeric"
    },
    {
      data: "absCanUse",
      type: "numeric"
    },
    {
      data: "absUseDay",
      type: "numeric"
    },
    {
      data: "redBuyDay",
      type: "numeric"
    },
    {
      data: "redCanUse",
      type: "numeric"
    },
    {
      data: "redUseDay",
      type: "numeric"
    },
    {
      data: "gypOutputDay",
      type: "numeric"
    },
    {
      data: "synUseDay",
      type: "numeric"
    },
    {
      data: "effTaDay",
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
  width: "100%",
  autoWrapRow: true, // 自动换行
  // height: this.height, // 最大高度
  maxRows: 100, // 最大行数
  manualRowResize: true,
  manualColumnResize: true,
  rowHeaders: false, // 显隐行表头
  //fixedColumnsLeft: 0, //固定左边列数
  // fixedRowsTop: 2, //固定上边列数
  // fixedRowsBottom: 2, // 固定底部列数
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
        label: "吸收剂纯度",
        colspan: 1
      },
      {
        label: "#1装置耗电量",
        colspan: 1
      },
      {
        label: "#2装置耗电量",
        colspan: 1
      },
      {
        label: "#1分摊电量",
        colspan: 1
      },
      {
        label: "#2分摊电量",
        colspan: 1
      },
      {
        label: "工业水耗量",
        colspan: 1
      },
      {
        label: "工艺水耗量",
        colspan: 1
      },
      {
        label: "脱硫耗汽量",
        colspan: 1
      },
      {
        label: "脱硫耗气量",
        colspan: 1
      }
    ],
    [
      "（天）",
      "%",
      "万KWh",
      "万KWh",
      "万KWh",
      "万KWh",
      "（t）",
      "（t）",
      "（t）",
      "（t）"
    ]
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
      //     name: "保存该行数据",
      //     callback(key, selection) {
      //         window.vue.$message("请选择区域和电厂")
      //     }
      // },
      // saveAll: {
      //     name: "保存所有",
      //     callback(key, selection) {
      //         window.vue.$message("请选择区域和电厂")
      //     }
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
      //     name: "只读"
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
      //     name: "重置",
      //     callback() {
      //         // vueInstance.$refs.hotTable.hotInstance.loadData(data);
      //         // hotSettings.data = resetData;
      //     }
      // }
    }
  }

  // 下拉菜单效果
}

//  脱硫表设置参数配置
export let getHotSettingsTl = (data, unitList, queryTl) => {
  let col = getTlColumn(unitList)
  let nes = getTlNestedHeaders(unitList);
  let datas = JSON.parse(JSON.stringify(data))
  let resetData = JSON.parse(JSON.stringify(data));
  let hotSettings = {
    // 数据项
    data: datas,
    // 每列配置
    columns: col,
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
    // fixedRowsBottom: 2, // 固定底部列数
    bindRowsWithHeaders: "strict",
    // manualColumnMove: false, // 拖拽移动列
    // manualRowMove: true, // 拖拽移动行
    allowEmpty: false,
    // 多级表头
    nestedHeaders: nes,
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
    // fillHandle: true, // 选中拖拽复制，只针对列
    dropdownMenu: true,
    dropdownMenu: [
      "filter_by_condition",
      "filter_action_bar",
      "filter_by_value",
      "filter_operators"
    ],
    // cells(row, col) {
    //     let cellProperties = {};
    //     console.log(datas[row]);
    //     if (datas[row].id) {
    //         // 存在id
    //         cellProperties.readOnly = true;
    //     }
    //     return cellProperties;
    // },
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
            // console.log(rowNumber, "save this row");
            let row = datas[rowNumber];
            updateTlAddr(row, queryTl)
          }
        },
        saveAll: {
          name: "保存所有",
          callback(key, selection) {
            let data = JSON.parse(JSON.stringify(datas))
            data.forEach(ele => {
              ele.limestone_powder_purity = null;
              ele.carbide_slag_purity = null;
              ele.day = ele.date;
              ele.point_code = queryTl.pointCode;
              ele.year = queryTl.year;
              ele.month = queryTl.month;
              delete ele.date
            })
            // console.log(data)

            // console.log(queryTl)
            update_tl_all(data)
          }
        },
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
        //     name: "只读"
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
        //     name: "重置",
        //     callback() {
        //         // vueInstance.$refs.hotTableTl.hotInstance.loadData(resetData);
        //         hotSettings.data = resetData;
        //     }
        // }
      }
    }

    // 下拉菜单效果
  }
  return hotSettings
}
//  脱硝表设置参数配置
export let getHotSettingsTx = (data, unitList, queryTx) => {
  let datas = JSON.parse(JSON.stringify(data))
  let col = getTxColumn(unitList)
  let nes = getTxNestedHeaders(unitList);
  let resetData = JSON.parse(JSON.stringify(data))
  let hotSettings = {
    // 数据项
    data: datas,
    // 每列配置
    columns: col,
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
    nestedHeaders: nes,
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
    // cells() {
    //     return {};
    // },
    // cells(row, col) {
    //     let cellProperties = {};
    //     // console.log(datas[row]);
    //     if (datas[row].id) {
    //         // 存在id
    //         cellProperties.readOnly = true;
    //     }
    //     return cellProperties;
    // },
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
            updateTxAddr(row, queryTx)
          }
        },
        saveAll: {
          name: "保存所有",
          callback(key, selection) {
            let data = JSON.parse(JSON.stringify(datas))
            let arry = []
            data.forEach(element => {
              delete element.ya_cd;
              delete element.ns_zd;
              arry.push({
                ...queryTx,
                day: element.day,
                data: element
              })
            });
            update_tx_all(arry)
          }
        },
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
        //     name: "只读"
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
        //     name: "重置",
        //     callback() {
        //         // vueInstance.$refs.hotTableTx.hotInstance.loadData(resetData);
        //         hotSettings.data = resetData;
        //     }
        // }
      }
    }

    // 下拉菜单效果
  }
  return hotSettings
}


//周报 脱硫字段绑定
export let getTlColumn = (unitList) => {
  let arr1 = [{
      data: "date",
      type: "text",
      readOnly: true
    },
    {
      data: "purity",
      type: "numeric"
    }
  ]
  let arr2 = [];
  let arr3 = [];
  for (var i = 0; i < unitList.length; i++) {
    arr2.push({
      data: unitList[i] + "_power",
      type: "numeric"
    })
    arr3.push({
      data: unitList[i] + "_share",
      type: "numeric"
    })
  }
  let arr4 = [{
      data: "industrial_water",
      type: "numeric"
    },
    {
      data: "process_water",
      type: "numeric"
    },
    // {
    //   data: unitList[0] + "_gypsum_output",
    //   type: "numeric"
    // },
    {
      data: "steam_comsumption",
      type: "numeric"
    },
    {
      data: "air_consumption",
      type: "numeric"
    },

  ]
  let arry = [...arr1, ...arr2, ...arr3, ...arr4];
  // console.log(arry)
  return arry
}
//周报 脱硫表头
export let getTlNestedHeaders = (unitList) => {
  let arr1 = [{
      label: "日期",
      colspan: 1
    },
    {
      label: "吸收剂纯度",
      colspan: 1
    }
  ]
  let arr2 = []
  let arr3 = [];
  for (var i = 0; i < unitList.length; i++) {
    arr2.push({
      label: unitList[i] + "装置耗电量",
      colspan: 1
    })
    arr3.push({
      label: unitList[i] + "分摊电量",
      colspan: 1
    })
  }
  let arr4 = [{
      label: "工业水耗量",
      colspan: 1
    },
    {
      label: "工艺水耗量",
      colspan: 1
    },
    // {
    //   label: "石膏产量",
    //   colspan: 1
    // },
    {
      label: "脱硫耗汽量",
      colspan: 1
    },
    {
      label: "脱硫耗气量",
      colspan: 1
    },
  ]
  let arry1 = [...arr1, ...arr2, ...arr3, ...arr4]
  let arr5 = [
    "（天）",
    "%",
  ]
  let arr6 = []
  let arr7 = []
  for (var j = 0; j < unitList.length; j++) {
    arr6[j] = "万KWh"
    arr7[j] = "万KWh"
  }
  let arr8 = [
    "（t）",
    "（t）",
    "（t）",
    "（t）"
  ]
  let arry2 = [...arr5, ...arr6, ...arr7, ...arr8]
  // console.log([[...arry1], [...arry2]])
  return [
    [...arry1],
    [...arry2]
  ]
}


// 周报 脱硝字段绑定
export let getTxColumn = (unitList) => {
  let arr1 = [{
      data: "day",
      type: "text",
      readOnly: true
    },
    {
      data: 'cd',
      type: "numeric"
    }
  ]
  let arr2 = [];
  let arr3 = [{
    data: "gy_dh",
    type: "numeric"
  }, ]
  let arr4 = [];
  for (var i = 0; i < unitList.length; i++) {
    arr2.push({
      data: unitList[i] + "_dh",
      type: "numeric"
    })
    arr4.push({
      data: unitList[i] + "_ft",
      type: "numeric"
    })
  }
  let arr5 = [{
      data: "gys",
      type: "numeric"
    },
    {
      data: "cys",
      type: "numeric"
    },
    {
      data: "hql",
      type: "numeric"
    },
    {
      data: "gas",
      type: "numeric"
    }
  ]
  let arry = [...arr1, ...arr2, ...arr3, ...arr4, ...arr5];
  // console.log(arry)
  return arry
}

//周报 脱硝表头
export let getTxNestedHeaders = (unitList) => {
  let arr1 = [{
      label: "日期",
      colspan: 1,
      readonly: true
    },
    {
      label: "还原剂纯度",
      colspan: 1
    }
  ]
  let arr2 = [];
  let arr3 = [{
    label: "公用系统电耗",
    colspan: 1
  }]
  let arr4 = [];
  for (var i = 0; i < unitList.length; i++) {
    arr2.push({
      label: unitList[i] + "装置耗电量",
      colspan: 1
    })
    arr4.push({
      label: unitList[i] + "分摊电量",
      colspan: 1
    })
  }
  let arr5 = [{
      label: "工业水耗量",
      colspan: 1
    },
    {
      label: "除盐水耗量",
      colspan: 1
    },
    {
      label: "蒸汽耗量",
      colspan: 1
    },
    {
      label: "蒸气耗量",
      colspan: 1
    },
  ]
  let arry1 = [...arr1, ...arr2, ...arr3, ...arr4, ...arr5]
  let arr6 = [
    "（天）",
    "%",
  ]
  let arr7 = []
  let arr8 = []
  for (var j = 0; j < unitList.length; j++) {
    arr7[j] = "万KWh"
    arr8[j] = "万KWh"
  }
  let arr9 = [
    "（t）",
    "（t）",
    "（t）",
    "（t）",
    "（t）"
  ]
  let arry2 = [...arr6, ...arr7, '万KWh', ...arr8, ...arr9]
  // console.log([[...arry1], [...arry2]])
  return [
    [...arry1],
    [...arry2]
  ]
}



// 修改脱硫耗用表  -- 保存单行
let updateTlAddr = (row, queryTl) => {
  let data = JSON.parse(JSON.stringify(row));
  data.point_code = queryTl.pointCode;
  data.year = queryTl.year;
  data.month = queryTl.month;
  data.day = data.date;
  delete data.date;
  for (var key in data) {
    if (data[key] == "") {
      data[key] = null;
    }
  }
  let num = 0;
  Object.keys(data).map((k) => {
    if (
      k == "year" ||
      k == "month" ||
      k == "day" ||
      k == "point_code"
    ) {
      return;
    } else {
      if (isNaN(Number(data[k]))) {
        num++;
      } else {
        data[k] = Number(data[k]);
      }
    }
  });
  if (num > 0) {
    return window.vue.$message.error('请填写数字！')
  }
  // if (!data.id) {
  //   return window.vue.$message.error(`请先填写日报`);
  // } else {
  window.vue.$store.commit('SET_LOADING', true)
  update_de_ems({
    data: JSON.stringify(data)
  }).then(res => {
    window.vue.$store.commit('SET_LOADING', false)
    let msg = res.data.code;
    if (msg == 0) {
      window.vue.$message.success("更新成功");
      window.vue.$nextTick(() => {
        window.vue.get_de_ems()
      })
    } else {
      window.vue.$message.error("更新失败");
    }
  });
  // }
}
// 修改脱硫耗用表 -- 保存所有
let update_tl_all = (data) => {
  let arr = []
  data.forEach(ele => {
    if (ele.id) {
      arr.push(ele)
    }
  })
  let datas = JSON.parse(JSON.stringify(arr))
  let num = 0;
  datas.forEach(ele => {
    Object.keys(ele).map(key => {
      if (
        key == "year" ||
        key == "month" ||
        key == "day" ||
        key == "point_code"
      ) {
        return;
      }
      if (ele[key] === "") {
        ele[key] = null;
      } else {
        if (isNaN(Number(ele[key]))) {
          num++;
        } else {
          ele[key] = Number(ele[key]);
        }
      }
    })
  })
  if (num > 0) {
    return window.vue.$message.error('请填写数字！')
  }
  window.vue.$store.commit('SET_LOADING', true)
  update_de_all({
    data: JSON.stringify(datas)
  }).then(res => {
    window.vue.$store.commit('SET_LOADING', false)
    let code = res.data.code;
    // console.log(code)
    if (code == "0") {
      window.vue.$message.success("更新成功");
      window.vue.$nextTick(() => {
        window.vue.get_de_ems()
      })
    } else {
      window.vue.$message.error("更新失败");
    }
  })
}
// 修改脱硝耗用表 -- 保存单行
let updateTxAddr = (row, queryTx) => {
  let mid = JSON.parse(JSON.stringify(row));
  let day = mid.day;
  for (var key in mid) {
    if (mid[key] === "") {
      mid[key] = null;
    }
  }
  let num = 0;
  Object.keys(mid).map((k) => {
    if (
      k == "unit_info"
    ) {
      return;
    } else {
      if (isNaN(Number(mid[k]))) {
        num++;
      } else {
        mid[k] = Number(mid[k]);
      }
    }
  });
  if (num > 0) {
    return window.vue.$message.error('请填写数字！')
  }
  // if (!mid.id) {
  //   return window.vue.$message.error(`请先填写日报`);
  // } else {
  window.vue.$store.commit('SET_LOADING', true)
  update_all([{
    projectCode: queryTx.projectCode,
    year: queryTx.year,
    month: queryTx.month,
    day: day,
    data: mid
  }]).then(res => {
    window.vue.$store.commit('SET_LOADING', false)
    let msg = res.data.data;
    if (msg == "success") {
      window.vue.$message.success("更新成功");
      window.vue.$nextTick(() => {
        window.vue.get_nx_ems()
      })

    } else {
      window.vue.$message.error("更新失败");
    }
  });
  // }
}

// 修改脱硝耗用表 -- 保存所有
let update_tx_all = (data) => {
  let arr = []
  data.forEach(ele => {
    if (ele.data.id) {
      arr.push(ele)
    }
  })
  let num = 0;
  arr.forEach(ele => {
    let mid = ele.data;
    Object.keys(mid).map(k => {
      if (
        k == "unit_info"
      ) {
        return;
      } else {
        if (isNaN(Number(mid[k]))) {
          num++;
        } else {
          mid[k] = Number(mid[k]);
        }
      }
    })
  })
  if (num > 0) {
    return window.vue.$message.error('请填写数字！')
  }
  window.vue.$store.commit('SET_LOADING', true)
  update_all(arr).then(res => {
    window.vue.$store.commit('SET_LOADING', false)
    let msg = res.data.data;
    if (msg == "success") {
      window.vue.$message.success("更新成功");
      window.vue.$nextTick(() => {
        window.vue.get_nx_ems()
      })
    } else {
      window.vue.$message.error("更新失败");
    }
  })
}
