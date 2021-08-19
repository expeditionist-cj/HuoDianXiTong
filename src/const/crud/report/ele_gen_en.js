export const tableOption = {
  border: true,
  index: false,
  indexLabel: '序号',
  stripe: false,
  menuAlign: 'center',
  align: 'center',
  expandLevel: 3,
  tree: true,
  // menu: false,
  menuWidth: 120,
  delBtn: false,
  editBtn: false,
  refreshBtn: false,
  addBtn: false,
  // size:"small",
  height: 600,
  column: [{
      label: '日期',
      prop: 'projectName',
      fixed: true,
      width: 120
    },
    {
      label: '#1机组',
      children: [{
          label: '日期1',
          prop: 'q',
          minWidth: 120
        },
        {
          label: '日期2',
          prop: 'a',
          minWidth: 120
        },
        {
          label: '日期3',
          prop: 'b',
          minWidth: 120
        },
        {
          label: '日期4',
          prop: 'qc',
          minWidth: 120
        },
        {
          label: '日期2',
          prop: 'a',
          minWidth: 120
        },
        {
          label: '日期3',
          prop: 'b',
          minWidth: 120
        },
        {
          label: '日期4',
          prop: 'qc',
          minWidth: 120
        },
      ]
    },
    {
      label: '#2机组',
      children: [{
          label: '日期1',
          prop: 'q',
          minWidth: 120
        },
        {
          label: '日期2',
          prop: 'a',
          minWidth: 120
        },
        {
          label: '日期3',
          prop: 'b',
          minWidth: 120
        },
        {
          label: '日期4',
          prop: 'qc',
          minWidth: 120
        },
        {
          label: '日期1',
          prop: 'q',
          minWidth: 120
        },
        {
          label: '日期2',
          prop: 'a',
          minWidth: 120
        },
        {
          label: '日期3',
          prop: 'b',
          minWidth: 120
        },
        {
          label: '日期4',
          prop: 'qc',
          minWidth: 120
        },
      ]
    },
  ]
}
