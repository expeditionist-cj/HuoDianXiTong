export const tableOption = {
  border: false,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  refreshBtn: false,
  saveBtnTitle: false,
  updateBtn: false,
  addBtn: false,
  editBtn: false,
  menu: false,
  // selection:true,
  "empty-text": "暂无数据",
  column: [
    {
      label: '选择',
      prop: 'configId',
      fixed: true,
      minWidth: '80',
      solt: true,
    },
    {
      label: '报警级别',
      prop: 'alarmLevel', 
      fixed: true,
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
      prop: 'plantName'
    },
    
    // {
    //   label: '系统',
    //   prop: 'SYS',
    //   minWidth: 160
    // },
    
    {
      label: '报警名称',
      prop: 'alarmName', 
    },
    {
      label: '报警点类型',
      prop: 'valTypeName', 
       
    },
    {
      label: '报警值/状态',
      prop: 'alarmInfo',
      minWidth: 200,

    },
    {
      label: '报警开始时间',
      prop: 'stime',
      minWidth: '160',
    },
    {
      label: '报警结束时间',
      prop: 'etime',
      minWidth: 160
    },
    {
      label: '装置',
      prop: 'deviceName'
    },
    {
      label: '机组',
      prop: 'unitName',
      
    },
    {
      label: '区域',
      prop: 'areaName'
    },
    
    
    
    // {
    //   label: '关联曲线',
    //   prop: 'GN',
    //   width:0
    // },
  ]
}
