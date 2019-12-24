export const tableOption = {
  border: true,
  index: true,
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [{
    label: '表名称',
    prop: 'tableName',
    align: 'center',
  }, {
    label: '表注释',
    prop: 'tableComment',
    align: 'center'
  }, {
    label: '索引',
    prop: 'engine',
    align: 'center'
  }, {
    type: 'datetime',
    valueFormat: 'timestamp',
    format: 'yyyy-MM-dd hh:mm:ss',
    label: '创建时间',
    prop: 'createTime',
    align: 'center'
  }]
}

export const formOption = {
  submitText: '生成',
  column: [
    {
      label: '表名称',
      prop: 'tableName',
      disabled: true
    }, {
      label: '包名',
      prop: 'packageName',
      placeholder: '可为空，加载系统默认配置'
    }, {
      label: '作者',
      prop: 'author',
      placeholder: '可为空，加载系统默认配置'
    }, {
      label: '模块',
      prop: 'moduleName',
      placeholder: '可为空，加载系统默认配置'
    }, {
      label: '表前缀',
      prop: 'tablePrefix',
      placeholder: '可为空，加载系统默认配置'
    }, {
        label: 'API文档',
        prop: 'swaggerDoc',
        type: 'select',
        valueDefault: 'true',
        dicData: [{
          label: '生成',
          value: 'true'
        }, {
          label: '不生成',
          value: 'false'
        }]
    },{
      label: '注释',
      prop: 'comments',
      placeholder: '可为空，加载表备注'
    }
  ]
}


export const tableDsOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  column: [
    {
      label: '主键',
      prop: 'id',
      hide: true,
      addVisdiplay: false,
      editVisdiplay: false
    },
    {
      label: '名称',
      prop: 'name'
    },
    {
      label: 'jdbcUrl',
      prop: 'url',
      overHidden: true
    },
    {
      label: '用户名',
      prop: 'username'
    },
    {
      label: '密码',
      prop: 'password'
    },
    {
      label: '创建时间',
      prop: 'createDate',
      addVisdiplay: false,
      editVisdiplay: false,
      overHidden: true
    },
    {
      label: '更新时间',
      prop: 'updateDate',
      overHidden: true,
      addVisdiplay: false,
      editVisdiplay: false
    }
  ]
}
