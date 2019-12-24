export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  viewBtn: true,
  column: [{
    label: 'ID',
    prop: 'id',
    hide: true,
    addVisdiplay: false,
    editDisabled: true
  },
  {
    label: '类型',
    prop: 'type',
    type: 'select',
    dicUrl: '/admin/dict/type/social_type',
    search: true,
    rules: [{
      required: true,
      message: '请选择类型',
      trigger: 'blur'
    }]
  },
  {
    label: '描述',
    prop: 'remark'
  },
  {
    label: 'appId',
    prop: 'appId',
    overHidden: true,
    rules: [{
      required: true,
      message: '请输入appId',
      trigger: 'blur'
    }]
  },
  {
    label: 'appSecret',
    prop: 'appSecret',
    overHidden: true,
    rules: [{
      required: true,
      message: '请输入appSecret',
      trigger: 'blur'
    }]
  },
  {
    label: '回调地址',
    prop: 'redirectUrl',
    hide: true,
    rules: [{
      required: true,
      message: '请输入回调地址',
      trigger: 'blur'
    }]
  },
  {
    valueFormat: 'timestamp',
    format: 'yyyy-MM-dd hh:mm:ss',
    label: '创建时间',
    prop: 'createTime',
    align: 'center',
    addVisdiplay: false,
    editDisabled: true
  }
  ]
}
