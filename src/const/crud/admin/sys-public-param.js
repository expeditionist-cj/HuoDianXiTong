export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 150,
  align: 'center',
  refreshBtn: true,
  showClomnuBtn: false,
  searchSize: 'mini',
  editBtn: true,
  delBtn: true,
  addBtn: true,
  props: {
    label: 'label',
    value: 'value'
  },
  column: [
    {
      label: '名称',
      search: true,
      prop: 'publicName',
      rules: [
        {min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur'},
        {pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, message: '请输入中文、英文、数字包括下划线', trigger: 'blur'}
      ]
    },
    {
      label: '键',
      prop: 'publicKey',
      rules: [
        {required: true, message: '请输入键', trigger: 'blur'},
        {pattern: /^[A-Z_]+$/, message: '请输入大写英文、下划线', trigger: 'blur'}
      ],

    },
    {
      label: '值',
      overHidden: true,
      prop: 'publicValue',
      rules: [
        {required: true, message: '请输入值', trigger: 'blur'}
      ]
    },
    {
      label: '编码',
      prop: 'validateCode',
    },
    {
      width: 150,
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      addVisdiplay: false,
      editDisabled: true,
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    },
    {
      label: '状态',
      prop: 'delFlag',
      width: 80,
      type: 'select',
      dicUrl: '/admin/dict/type/log_type'
    },
    {
      label: '类型',
      prop: 'publicType',
      width: 80,
      type: 'select',
      dicUrl: '/admin/dict/type/param_type',
      rules: [{
        required: true,
        message: '请选择类型',
        trigger: 'blur'
      }]
    },
  ]
}
