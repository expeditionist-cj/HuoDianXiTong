import {getDetails} from '@/api/admin/user'

var validateUsername = (rule, value, callback) => {
  getDetails(value).then(response => {
    if (window.boxType === 'edit') callback()
    let result = response.data.data
    if (result !== null) {
      callback(new Error('用户名已经存在'))
    } else {
      callback()
    }
  })
};

var validateMobilePhone = (rule, value, callback) => {
   if (value === '') {
      callback(new Error('手机号不可为空'));
   } else {
    if (value !== '') { 
        var reg=/^1[3456789]\d{9}$/;
        if(!reg.test(value)){
          callback(new Error('请输入有效的手机号码'));
        }
     }
      callback();
   }
};

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  column: [{
    fixed: true,
    label: '用户名',
    prop: 'username',
    editDisabled: true,
    solt: true,
    search: true,
    span: 24,
    rules: [{
      required: true,
      message: '请输入用户名'
    },
      {
        min: 2,
        max: 20,
        message: '长度在2 到 20 个字符',
        trigger: 'blur'
      },
      {validator: validateUsername, trigger: 'blur'}
    ]
  }, {
    label: '密码',
    prop: 'password',
    type: 'password',
    value: '',
    hide: true,
    showClomnu: false,
    span: 24,
    rules: [{
      min: 6,
      max: 20,
      message: '长度在 6 到 20 个字符',
      trigger: 'blur'
    }]
  }, {
    label: '所属部门',
    prop: 'deptId',
    formsolt: true,
    solt: true,
    span: 24,
    hide: true,
    rules: [{
      required: true,
      message: '请选择部门',
      trigger: 'change'
    }]
  }, 
  {
    label: '手机号',
    prop: 'phone',
    type: 'tel',
    value: '',
    span: 24,
    rules: [{validator: validateMobilePhone, trigger: 'blur'}]
  }, 
  {
    label: '角色',
    prop: 'role',
    formsolt: true,
    solt: true,
    overHidden: true,
    span: 24,
    rules: [{
      required: true,
      message: '请选择角色',
      trigger: 'blur'
    }]
  }, {
    label: '状态',
    prop: 'lockFlag',
    type: 'select',
    solt: true,
    span: 24,
    rules: [{
      required: true,
      message: '请选择状态',
      trigger: 'blur'
    }],
    dicData: [{
      label: '有效',
      value: '0'
    }, {
      label: '锁定',
      value: '9'
    }]
  }, {
    width: 180,
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    editDisabled: true,
    addVisdiplay: false,
    span: 24
  }]
}
