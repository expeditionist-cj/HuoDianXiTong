export const tableOption = {
  border: false,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  refreshBtn: true,
  saveBtnTitle: false,
  updateBtn: false,
  addBtn: false,
  editBtn: false,
  menu: false,
  "empty-text": "暂无数据",
  column: [{
      label: '报警级别',
      prop: 'lv',
      formatter(row, value, label, column) {
        if (value == 1) {
          return "<div style='color:#ff7795'>紧急</div>"
        } else {
          return "<div style='color:#efc114'>重要</div>"
        }
      }
    },
    {
      label: '项目',
      prop: 'plant'
    },

    {
      label: '报警名称',
      prop: 'alarm_name'
    },
    // {
    //   label: '报警值类型',
    //   prop: 'valType',
    //   formatter(row, value, label, column) {
    //     if (value == "cal") {
    //       return "计算量"
    //     } else if (value == "ax") {
    //       return "模拟量"
    //     } else if (value == "dx") {
    //       return "开关量"
    //     }
    //   }
    // },
    {
      label: '报警信息',
      prop: 'info',
      formatter(row, value, label, column) {
        let str = value;
        return `<div title='${str}'>${str.toString().slice(0,25)}${str.toString().length>25 ? "...": ""}</div>`
      }
    },
    {
      label: '报警时间',
      prop: 'atime'
    },
    {
      label: '装置',
      prop: 'device',
      formatter(row, value, label, column) {
        if (value == "S") {
          return "脱硫"
        } else if (value == "N") {
          return "脱硝"
        }
      }
    },
    {
      label: '机组编号',
      prop: 'unit',
      // formatter(row,value,label,column){
      //   if(value == null){
      //     return ""
      //   }
      //   return `#${value}机组`
      // }
    },

    {
      label: '区域/公司',
      prop: 'area'
    },
  ]
}
