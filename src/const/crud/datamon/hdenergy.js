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
      width: 200
    },
	  {
      label: '耗电率 (万KWh/t)',
      prop: 'comsumption',
      sortable:true,
      width: 200
    },
	  {
      label: '吸收剂耗用率 (t/万kWh)',
      prop: 'absorbent',
      sortable:true,
      width: 220
    },
	  {
      label: '还原剂耗用率 (t/万kWh)',
      prop: 'reductant',
      sortable:true,
      width: 220
    },
	  {
      label: '统计方式',
      prop: 'way'
    },
  ]
}
export const tableOption_fdl = {
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
      width: 200
    },
	  {
      label: '耗电率 (%)',
      prop: 'comsumption',
      sortable:true,
      width: 200
    },
	  {
      label: '吸收剂耗用率 (t/万KWh)',
      prop: 'absorbent',
      sortable:true,
      width: 240
    },
	  {
      label: '还原剂耗用率 (t/万KWh)',
      prop: 'reductant',
      sortable:true,
      width: 240
    },
	  {
      label: '统计方式',
      prop: 'way'
    },
  ]
}
