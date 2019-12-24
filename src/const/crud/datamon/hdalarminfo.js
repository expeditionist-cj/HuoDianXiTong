export const tableOption = {
  border: false,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  refreshBtn:true,
  saveBtnTitle:false,
  updateBtn:false,
  addBtn:false,
  editBtn:false,
  menu:false,
  "empty-text":"暂无数据",
  column: [
	  {
      label: '报警时间',
      prop: 'atime'
    },
	  {
      label: '报警系统',
      prop: 'sys'
    },
	  {
      label: '传感器名称',
      prop: 'point'
    },
	  {
      label: '报警值/状态',
      prop: 'info'
    },
	  {
      label: '报警级别',
      prop: 'lv',
      formatter(row,value,label,column){
        if(value == 1){
          return "<div style='color:#ff7795'>紧急</div>"
        }else{
          return "<div style='color:#efc114'>严重</div>"
        }
      }
    },
	  {
      label: '装置',
      prop: 'device'
    },
    {
      label: '机组编号',
      prop: 'unit',
      formatter(row,value,label,column){
        if(value == null){
          return ""
        }
        return `#${value}机组`
      }
    },
	  {
      label: '项目',
      prop: 'plant'
    },
	  {
      label: '区域/公司',
      prop: 'area'
    },
  ]
}
