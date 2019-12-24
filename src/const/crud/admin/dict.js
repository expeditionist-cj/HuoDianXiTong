export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  refreshBtn: false,
  showClomnuBtn: false,
  searchSize: 'mini',
  column: [{
    label: '类型',
    prop: 'type',
    'search': true,
    rules: [{
      required: true,
      message: '请输入字典类型',
      trigger: 'blur'
    }]
  }, {
    label: '描述',
    prop: 'description',
    rules: [{
      required: true,
      message: '请输入字典描述',
      trigger: 'blur'
    }]
  }, {
    label: '备注信息',
    prop: 'remarks'
  }, {
    width: 150,
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    addVisdiplay: false,
    editDisabled: true,
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm:ss'
  }]
}


export const tableDictItemOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  refreshBtn: false,
  showClomnuBtn: false,
  searchSize: 'mini',
  column: [{
    label: '类型',
    prop: 'type',
    addDisabled: true,
    editDisabled: true
  }, {
    width: 150,
    label: '数据值',
    prop: 'value',
    rules: [{
      required: true,
      message: '请输入数据值',
      trigger: 'blur'
    }]
  }, {
    label: '标签名',
    prop: 'label',
    rules: [{
      required: true,
      message: '请输入标签名',
      trigger: 'blur'
    }]
  }, {
    label: '描述',
    prop: 'description',
    rules: [{
      required: true,
      message: '请输入字典描述',
      trigger: 'blur'
    }]
  }, {
    label: '排序',
    prop: 'sort',
    type: 'number',
    rules: [{
      required: true,
      message: '请输入排序',
      trigger: 'blur'
    }]
  }, {
    label: '备注信息',
    prop: 'remarks'
  }]
}
