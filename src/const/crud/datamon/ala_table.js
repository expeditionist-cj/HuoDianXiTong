export const tableOption = {
    border: false,
    index: false,
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
    emptyText: '暂无报警信息',
    title:'报警信息',
    size:"mini",
    page:false,
    column: [
      {
        label: '电厂',
        prop: 'PLANT',
        fixed: true,
        // minWidth: '160',
      },
      {
        label: '报警设备',
        prop: 'ED',
        // minWidth: 160,
      },
      {
        label: '报警时刻',
        prop: 'CT',
        // minWidth: 160,
  
      },
      {
        label: '报警值/状态',
        prop: 'AV',
        minWidth: '120',
      },
      {
        label: '报警级别', 
        prop: 'AL',
        // minWidth: '160',
        slot:true,
      },

    ]
  }