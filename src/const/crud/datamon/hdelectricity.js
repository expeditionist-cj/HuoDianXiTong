export const tableOption = {
  border: false,
  stripe:false,
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
      fixed:true
    },
	  {
      label: '装置',
      prop: 'deviceName',
      fixed:true
    },
	  {
      label: '机组编号',
      prop: 'unitName',
      fixed:true
    },
	  {
      label: '区域/公司',
      prop: 'regionName'
    },
	  {
      label: '发电量 (万KWh)',
      prop: 'GEN_CAPACITY',
      sortable:true,
      width: 200
    },
	  {
      label: '上网电量 (万KWh)',
      prop: 'ELE_CAPACITY',
      sortable:true,
      width:200
    },
	  {
      label: '统计方式',
      prop: 'way'
    },
  ]
}
