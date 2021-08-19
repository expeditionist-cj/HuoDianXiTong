import moment from 'moment'
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
  title: '报警信息',
  size: "mini",
  page: false,
  column: [{
      label: '报警级别',
      prop: 'lv',
      // minWidth: '160',
      slot: true,
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
      prop: 'plantName',
      // minWidth: 200,
    },
    {
      label: ' 报警名称',
      prop: 'alarmName',
      minWidth: 180,
      formatter(row, value, label, column) {
        return `<div style="text-align:left;">${value.slice(0,20)}${value.length>20? '...' : ''}</div>`
      }
    },
    {
      label: '报警时间',
      prop: 'atime',
      // minWidth: '120',
      formatter(row, value, label, column) {
        return moment(value).format("HH:mm:ss");
      }
    },
  ]
}
