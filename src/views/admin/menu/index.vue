<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="filter-container">
        <el-button-group>
          <el-button type="primary"
                     v-if="menuManager_btn_add"
                     icon="plus"
                     @click="handlerAdd">添加
          </el-button>
          <el-button type="primary"
                     v-if="menuManager_btn_edit"
                     icon="edit"
                     @click="handlerEdit">编辑
          </el-button>
          <el-button type="primary"
                     v-if="menuManager_btn_del"
                     icon="delete"
                     @click="handleDelete">删除
          </el-button>
        </el-button-group>
      </div>

      <el-row>
        <el-col :span="8"
                style='margin-top:15px;'>
          <el-tree class="filter-tree"
                   node-key="id"
                   highlight-current
                   :data="treeData"
                   :default-expanded-keys="aExpandedKeys"
                   :filter-node-method="filterNode"
                   :props="defaultProps"
                   ref="menutree"
                   @node-click="getNodeData"
                   @node-expand="nodeExpand"
                   @node-collapse="nodeCollapse">
          </el-tree>
        </el-col>
        <el-col :span="16"
                style='margin-top:15px;'>
          <el-card class="box-card">
            <el-form :label-position="labelPosition"
                     label-width="80px"
                     :model="form"
                     :rules="rules"
                     ref="form">
              <el-form-item label="父级节点"
                            prop="parentName">
                <el-input v-model="form.parentName"
                          :disabled="true"
                          placeholder="父级节点"></el-input>
                <input type="hidden" v-model="form.parentId" />
              </el-form-item>
              <el-form-item label="标题"
                            prop="name">
                <el-input v-model="form.name"
                          :disabled="formEdit"
                          placeholder="请输入标题"></el-input>
              </el-form-item>
              <el-form-item label="类型"
                            prop="type">
                <el-select class="filter-item"
                           v-model="form.type"
                           :disabled="formEdit"
                           placeholder="请选择资源请求类型">
                  <el-option v-for="item in  typeOptions"
                             :key="item"
                             :label="item | typeFilter"
                             :value="item"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="权限标识"
                            prop="permission" v-if="form.type === '1'">
                <el-input v-model="form.permission"
                          :disabled="formEdit"
                          placeholder="请输入权限标识"></el-input>
              </el-form-item>
              <el-form-item label="图标" v-if="form.type === '0'"
                            prop="icon">
                <avue-crud-icon-select v-model="form.icon"
                                       :iconList="iconList"
                                       :disabled="formEdit"
                                       placeholder="请输入图标"></avue-crud-icon-select>
              </el-form-item>
              <el-form-item label="排序" v-if="form.type === '0'"
                            prop="sort">
                <el-input type="number"
                          v-model="form.sort"
                          :disabled="formEdit"
                          placeholder="请输入排序"></el-input>
              </el-form-item>
              <el-form-item label="前端组件" v-if="form.type === '0'"
                            prop="component">
                <el-input v-model="form.component"
                          :disabled="formEdit"
                          placeholder="请输入描述"></el-input>
              </el-form-item>
              <el-form-item label="前端地址" v-if="form.type === '0'"
                            prop="component">
                <el-input v-model="form.path"
                          :disabled="formEdit"
                          placeholder="iframe嵌套地址"></el-input>
              </el-form-item>
              <el-form-item label="路由缓冲" v-if="form.type === '0'"
                            prop="component">
                <el-switch v-model="form.keepAlive"
                           :disabled="formEdit"
                           active-color="#13ce66"
                           inactive-color="#ff4949"
                           :active-value='"0"'
                           :inactive-value='"1"'>
                </el-switch>
              </el-form-item>
              <el-form-item v-if="formStatus === 'update'">
                <el-button type="primary"
                           @click="update">更新
                </el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
              <el-form-item v-if="formStatus === 'create'">
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
  import {addObj, delObj, fetchMenuTree, getObj, putObj} from "@/api/admin/menu";
  import {mapGetters} from "vuex";
  import iconList from "@/const/iconList";
  export default {
    // name: "menu",
    data() {
      return {
        iconList: iconList,
        list: null,
        total: null,
        formEdit: true,
        formAdd: true,
        formStatus: "",
        showElement: false,
        typeOptions: ["0", "1"],
        listQuery: {
          name: undefined
        },
        treeData: [],
        oExpandedKey: {
          // key (from tree id) : expandedOrNot boolean
        },
        oTreeNodeChildren: {
          // id1 : [children] (from tree node id1)
          // id2 : [children] (from tree node id2)
        },
        aExpandedKeys: [],
        defaultProps: {
          children: "children",
          label: "name"
        },
        labelPosition: "right",
        form: {
          permission: undefined,
          name: undefined,
          menuId: undefined,
          parentId: undefined,
          parentName: undefined,
          icon: undefined,
          sort: undefined,
          component: undefined,
          type: undefined,
          path: undefined
        },
        currentId: -1,
        currentName: "",
    	currentHasChild: false,
        menuManager_btn_add: false,
        menuManager_btn_edit: false,
        menuManager_btn_del: false,
        rules: {
          name: [{required: true, message: '标题不合法', trigger: 'blur'}],
          type: [{required: true, message: '请选择资源类型', trigger: 'blur'}]
        }
      };
    },
    filters: {
      typeFilter(type) {
        const typeMap = {
          0: "菜单",
          1: "按钮"
        };
        return typeMap[type];
      }
    },
    created() {
      this.getList();
      this.menuManager_btn_add = this.permissions["sys_menu_add"];
      this.menuManager_btn_edit = this.permissions["sys_menu_edit"];
      this.menuManager_btn_del = this.permissions["sys_menu_del"];
    },
    computed: {
      ...mapGetters(["elements", "permissions"])
    },
    methods: {
      getList() {
        fetchMenuTree(this.listQuery).then(response => {
          this.treeData = response.data.data;
        });
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },

      nodeExpand(data) {
        let aChildren = data.children;
        if (aChildren.length > 0) {
          this.oExpandedKey[data.id] = true;
          this.oTreeNodeChildren[data.id] = aChildren;
        }
        this.setExpandedKeys();
      },
      nodeCollapse(data) {
        this.oExpandedKey[data.id] = false;
        // 如果有子节点
        this.treeRecursion(this.oTreeNodeChildren[data.id], oNode => {
          this.oExpandedKey[oNode.id] = false;
        });
        this.setExpandedKeys();
      },
      setExpandedKeys() {
        let oTemp = this.oExpandedKey;
        this.aExpandedKeys = [];
        for (let sKey in oTemp) {
          if (oTemp[sKey]) {
            this.aExpandedKeys.push(parseInt(sKey));
          }
        }
      },
      treeRecursion(aChildren, fnCallback) {
        if (aChildren) {
          for (let i = 0; i < aChildren.length; ++i) {
            let oNode = aChildren[i];
            fnCallback && fnCallback(oNode);
            this.treeRecursion(oNode.children, fnCallback);
          }
        }
      },
      getNodeData(data) {
        if(data.children.length>0){
  		  this.currentHasChild = true;
	  	} else {
	  		this.currentHasChild = false;
	  	}
        if (!this.formEdit) {
          this.formStatus = "update";
        }
        getObj(data.id).then(response => {
          this.form = response.data.data;
          const parnode = this.$refs["menutree"].getNode(data.parentId);
	      if(parnode != null) {
	         this.form.parentName = parnode.label
	      }
        });
        this.currentId = data.id;
        this.currentName = data.name;
        this.showElement = true;
      },
      handlerEdit() {
        if (this.form.menuId) {
          this.formEdit = false;
          this.formStatus = "update";
        }
      },
      handlerAdd() {
        this.resetForm();
        this.formEdit = false;
        this.formStatus = "create";
      },
      handleDelete() {
        if(this.currentId == -1){
  			this.$alert('请选择记录进行删除');
  			return false;
	  	}
	  	if(this.currentHasChild){
	  		this.$alert('该菜单已有子菜单，不能删除');
	  		return false;
	  	}
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          delObj(this.currentId).then(() => {
            this.getList();
            this.currentId = -1
            this.currentName = ""
    	    this.currentHasChild = false
            this.resetForm();
            this.onCancel();
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000
            });
          });
        });
      },
      update() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            putObj(this.form).then(() => {
              this.getList();
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000
              });
            });
          }
        });
      },
      create() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            addObj(this.form).then(() => {
              this.getList();
              this.currentId = -1
              this.currentName = ""
    	      this.currentHasChild = false
    	      this.resetForm()
              this.onCancel()
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success",
                duration: 2000
              });
            });
          }
        });
      },
      onCancel() {
        this.formEdit = true;
        this.formStatus = "";
      },
      resetForm() {
        this.form = {
          permission: undefined,
          name: undefined,
          menuId: undefined,
          parentId: this.currentId,
          parentName: this.currentName,
          icon: undefined,
          sort: undefined,
          component: undefined,
          type: undefined,
          path: undefined
        };
      }
    }
  };
</script>