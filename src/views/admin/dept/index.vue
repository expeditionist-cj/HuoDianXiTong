<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="filter-container">
        <el-button-group>
          <el-button type="primary"
                     v-if="deptManager_btn_add"
                     icon="plus"
                     @click="handlerAdd">添加
          </el-button>
          <el-button type="primary"
                     v-if="deptManager_btn_edit"
                     icon="edit"
                     @click="handlerEdit">编辑
          </el-button>
          <el-button type="primary"
                     v-if="deptManager_btn_del"
                     icon="delete"
                     @click="handleDelete">删除
          </el-button>
        </el-button-group>
      </div>

      <el-row>
        <el-col :span="8"
                style='margin-top:15px;'>
          <el-tree class="filter-tree"
                   :data="treeData"
                   node-key="id"
                   highlight-current
                   :props="defaultProps"
                   :filter-node-method="filterNode"
                   @node-click="getNodeData"
                   default-expand-all>
          </el-tree>
        </el-col>
        <el-col :span="16"
                style='margin-top:15px;'>
          <el-card class="box-card">
            <el-form :label-position="labelPosition"
                     label-width="80px"
                     :rules="rules"
                     :model="form"
                     ref="form">
              <el-form-item label="父级节点"
                            prop="parentName">
                <el-input v-model="form.parentName" 
                          readonly
                          placeholder="父级节点"></el-input>
              </el-form-item>
              <el-form-item label="部门名称"
                            prop="name">
                <el-input v-model="form.name"
                          :disabled="formEdit"
                          placeholder="请输入名称"></el-input>
              </el-form-item>
              <el-form-item label="部门编码"
                            prop="deptCode">
                <el-input v-model="form.deptCode"
                          :disabled="formEdit"
                          placeholder="请输入编码"></el-input>
              </el-form-item>
              <el-form-item label="排序"
                            prop="orderNum">
                <el-input type="number"
                          v-model="form.sort"
                          :disabled="formEdit"
                          placeholder="请输入排序"></el-input>
              </el-form-item>
              <el-form-item label="简介"
                            prop="remark">
                <el-input type="textarea" v-model="form.remark"
                          :disabled="formEdit"
                          placeholder="请输入简介"></el-input>
              </el-form-item>
              <el-form-item v-if="formStatus == 'update'">
                <el-button type="primary"
                           @click="update">更新
                </el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
              <el-form-item v-if="formStatus == 'create'">
                <el-button type="primary"
                           @click="create">保存
                </el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
  import {addObj, delObj, fetchTree, getObj, putObj} from '@/api/admin/dept'
  import {mapGetters} from 'vuex'

  export default {
    name: 'dept',
    data() {
      return {
        list: null,
        total: null,
        formEdit: true,
        formAdd: true,
        formStatus: '',
        typeOptions: ['0', '1'],
        methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
        listQuery: {
          name: undefined
        },
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules: {
          name: [
            {required: true, message: '请输入部门名称', trigger: 'blur'},{min: 2,max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
          ],
          deptCode: [
            {required: true, message: '请输入部门编码', trigger: 'blur'},{min: 2,max: 20, message: '长度在2 到 20 个字符', trigger: 'blur'}
          ]
        },
        labelPosition: 'right',
        form: {
          name: undefined,
          deptCode: undefined,
          orderNum: undefined,
          remark: undefined,
          parentId: undefined,
          parentName: undefined
        },
        currentId: 0,
        currentName: "",
        currentHasChild: false,
        deptManager_btn_add: false,
        deptManager_btn_edit: false,
        deptManager_btn_del: false
      }
    },
    created() {
      this.getList()
      this.deptManager_btn_add = this.permissions['sys_dept_add']
      this.deptManager_btn_edit = this.permissions['sys_dept_edit']
      this.deptManager_btn_del = this.permissions['sys_dept_del']
    },
    computed: {
      ...mapGetters([
        'elements',
        'permissions'
      ])
    },
    methods: {
      getList() {
        fetchTree(this.listQuery).then(response => {
          this.treeData = response.data.data
        })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      getNodeData(data) {
        if(data.children.length>0){
    		this.currentHasChild = true;
    	} else {
    		this.currentHasChild = false;
    	}
        if (!this.formEdit) {
          this.formStatus = 'update'
        }
        getObj(data.id).then(response => {
          this.form = response.data.data
        })
        this.currentId = data.id
        this.currentName = data.name
      },
      handlerEdit() {
        if (this.form.deptId) {
          this.formEdit = false
          this.formStatus = 'update'
        }
      },
      handlerAdd() {
        this.resetForm()
        this.formEdit = false
        this.formStatus = 'create'
      },
      handleDelete() {
        if(this.currentId == 0){
    		this.$alert('请选择记录进行删除');
    		return false;
    	}
    	if(this.currentHasChild){
    		this.$alert('该部门已有子部门，不能删除');
    		return false;
    	}
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj(this.currentId).then(() => {
            this.getList()
            this.resetForm()
            this.onCancel()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
        })
      },
      update() {
        this.$refs.form.validate((valid) => {
          if (!valid) return
          putObj(this.form).then(() => {
            this.getList()
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        })

      },
      create() {
        this.$refs.form.validate((valid) => {
          if (!valid) return
          addObj(this.form).then(() => {
            this.getList()
            this.resetForm()
            this.onCancel()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        })
      },
      onCancel() {
        this.formEdit = true
        this.formStatus = ''
        this.currentId = 0
        this.currentName = ""
        this.currentHasChild = false
        this.$refs["form"].resetFields()	
        this.resetForm()
      },
      resetForm() {
        this.form = {
          name: undefined,
          deptId: undefined,
          deptCode: undefined,
          parentId: this.currentId,
          parentName: this.currentName,
          orderNum: undefined,
          remark: undefined
        }
      }
    }
  }
</script>

