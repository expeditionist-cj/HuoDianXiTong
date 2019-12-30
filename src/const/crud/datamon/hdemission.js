export const tableOption = {
  border: false,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menu:false,
  column: [
	  {
      label: '项目',
      prop: 'projectName',
    },
	  {
      label: '装置',
      prop: 'deviceName'
    },
	  {
      label: '机组编号',
      prop: 'unitName'
    },
	  {
      label: '区域/公司',
      prop: 'regionName'
    },
	  {
      label: '入口浓度均值(mg/Nm3)',
      prop: 'INLET_FLOW',
      sortable:true,
      minWidth:180,
    },
	  {
      label: '出口浓度均值 (mg/Nm3)',
      prop: 'OUTLET_FLOW',
      sortable:true,
      minWidth:180,
    },
	  {
      label: '减排量 (t)',
      prop: 'EMISSION_FLOW',
      sortable:true,
      minWidth:100,
    },
	  {
      label: '统计方式',
      prop: 'way'
    }
  ]
}
