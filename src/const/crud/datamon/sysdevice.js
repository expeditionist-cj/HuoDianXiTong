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
  editBtn: true,
  menu: false,
  viewBtn:true,
  column: [
    {
      label: '项目',
      prop: 'projectName',
      fixed:true,
      minWidth:'160',
    },
      {
      label: '机组编号',
      prop: 'unitName',
      minWidth:160
    },
      {
      label: '脱硫方式',
      prop: 'deviceConfig',
      minWidth:'160',
    },
      {
      label: '脱硝方式',
      prop: 'deviceWay',
      minWidth:160
    },
      {
      label: '装机容量 (MW)',
      prop: 'capacity',
      minWidth:160,
      sortable:true,
      order:'ascending'
    },
      {
      label: '投运时间',
      prop: 'runTime',
      minWidth:'160',
      sortable:true,
      order:'ascending'
    },
      {
      label: '区域/公司',
      prop: 'regionName',
      minWidth:160
    },
      {
      label: '查看详细',
      prop: 'remark',
      solt: true,
    },
  ]
}
