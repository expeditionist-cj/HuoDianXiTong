const DIC = {
  vaild: [{
    label: '否',
    value: '0'
  }, {
    label: '是',
    value: '1'
  }]
}

const LEVELDIC = {
  vaild: [{
    label: '1级',
    value: 1
  }, {
    label: '2级',
    value: 2
  }, {
    label: '3级',
    value: 3
  }]
}

const SMSDIC = {
  vaild: [{
    label: '本级',
    value: '0'
  }, {
    label: '上级',
    value: '1'
  }, {
    label: '上级及本级',
    value: '2'
  }]
}

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  viewBtn: true,
  labelWidth: 120,
  addBtn:true,
  excelBtn:true,
  column: [
    {
      label: '报警策略名称',
      prop: 'configName',
      align: 'center',
      sortable: true,
      rules: [{
        required: true,
        message: '请输入报警策略名称',
        trigger: 'blur'
      }]
    },
    {
      label: '报警级别',
      prop: 'alarmLevel',
      type: 'select',
      dicData: LEVELDIC.vaild,
      rules: [{
        required: true,
        message: '请输入报警级别',
        trigger: 'blur'
      }]
    },
    {
      label: '是否弹窗',
      prop: 'isWindow',
      type: 'select',
      dicData: DIC.vaild,
      rules: [{
        required: true,
        message: '请选择是否弹窗',
        trigger: 'blur'
      }]
    },
    {
      label: '弹窗间隔(分钟)',
      prop: 'windowInterval',
      hide: true,
      type: 'number',
      rules: [{
        required: true,
        message: '请选择弹窗间隔',
        trigger: 'blur'
      }]
    },
    {
      label: '是否短信提醒',
      prop: 'isSms',
      type: 'select',
      dicData: DIC.vaild,
      rules: [{
        required: true,
        message: '请选择是否短信提醒',
        trigger: 'blur'
      }]
    },
    {
      label: '短信提醒人',
      prop: 'smsRule',
      type: 'select',
      hide: true,
      dicData: SMSDIC.vaild,
      rules: [{
        required: true,
        message: '请选择短信提醒人',
        trigger: 'blur'
      }]
    },
    {
      label: '报警颜色',
      prop: 'alarmColor',
      hide: false,
      // formslot: true,
      formslot:true,
      slot: false,
    },
    //  {
    //   label: '创建时间',
    //   prop: 'createTime',
    //   type: 'datetime',
    //   format: 'yyyy-MM-dd HH:mm',
    //   valueFormat: 'yyyy-MM-dd HH:mm:ss',
    //   editVisdiplay: false,
    //   addVisdiplay: false,
    //   viewVisdiplay: false,
    // }
  ]
}
