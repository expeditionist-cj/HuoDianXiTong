export const tableOption = {
  border: false,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menu:false,
  refreshBtn:false,
  column: [
	  {
      label: '项目',
      prop: 'projectName',
      fixed:true,
      width:120
    },
	  {
      label: '装置',
      prop: 'deviceName'
    },
	  {
      label: '机组编号',
      prop: 'unitName',
    },
	  {
      label: '区域/公司',
      prop: 'regionName',
    },
	  {
      label: '耗电率 (万KWh/t)',
      prop: 'comsumption',
      width:160
    },
	  {
      label: '吸收剂耗用率 (t/t)',
      prop: 'absorbent',
      width:160
    },
	  {
      label: '还原剂耗用率 (t/t)',
      prop: 'reductant',
      width:160
    },
	  {
      label: '统计方式',
      prop: 'way'
    },
  ]
}
