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
      prop: 'GN',
      fixed: true,
      minWidth: '80',
      solt: true,
    },
    {
      label: '报警传感器',
      prop: 'ptName',
      fixed: true,
      minWidth: '160',
    },
    {
      label: '传感器名称',
      prop: 'dt',
      minWidth: 160,
      formatter(row, value, label, column) {
        switch (value) {
          case 0:
           return "<div style='color:'>模拟量</div>"
            break;
          case 1:
              return "<div style='color:'>开关量</div>"
            break;
          case 2:
              return "<div style='color:'>短整型</div>"
            break;
          case 3:
              return "<div style='color:'>长整型</div>"
            break;
          default:
              return  "<div style='color:'>双精度</div>"
            break;
        }
      }
    },
    {
      label: '报警值/状态',
      prop: 'AV',
      minWidth: 160,

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
      label: '报警级别',
      prop: 'lv',
      minWidth: '160',
      formatter(row, value, label, column) {
        if (value == 1) {
          return "<div style='color:#ff7795'>紧急</div>"
        } else {
          return "<div style='color:#efc114'>严重</div>"
        }
      }
    },
    {
      label: '系统',
      prop: 'sys',
      minWidth: 160
    },

    {
      label: '装置',
      prop: 'dvc'
    },
    {
      label: '机组编号',
      prop: 'unit',
    },
    {
      label: '项目',
      prop: 'plant'
    },
    {
      label: '区域',
      prop: 'area'
    },
    // {
    //   label: '关联曲线',
    //   prop: 'GN',
    //   width:0
    // },
  ]
}
