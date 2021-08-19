<template>
  <div class="grid-content bg-purple tree-box">
    <el-tree class="departmentTree"
             :data="passTreeData"
             :props="treeProps"
             node-key="id"
             accordion
             ref="plantree"
             show-checkbox
             :check-strictly="istrue"
             :default-expanded-keys="defaultKeys"
             @node-click="handleNodeClick"
             @check="handleClick"
             :render-content="renderContents"
             :default-checked-keys="checkedKey"
             :checkedKey="checkedKey"
             :expandAll = "expandAll"
    >
    </el-tree>
  </div>
</template>

<script>
/*
  *左侧机构选择组件封装,目前仅适用单选情况
  *props 详情见代码
  *events node-change ：fun(data)
  * */
export default {
  name: "orgTree",
  data() {
    return {
      chosedDevice: null,
      treeProps: {
        label: "name",
        children: "childs"
      },
      istrue: true,
      passTreeData:[]
    //   treeData:[]
    };
  },
  props: {
    defaultKeys: {
      //默认展开项id
      type: Array,
      default: () => [2, 3, 4, 5, 92]
    },
    treeData: {
        type:Array,
        default: () => []
    },
    canGroup: {
      //公司可选
      type: Boolean,
      default: true
    },
    canCompany: {
      //片区可选
      type: Boolean,
      default: true
    },
    canPowerplant: {
      //电厂可选
      type: Boolean,
      default: true
    },
    canUnit: {
      //机组可选
      type: Boolean,
      default: true
    },
    canFgd: {
      //装置可选
      type: Boolean,
      default: true
    },
    show_cat: {
      type: String,
      default: ""
    },
    show_info:{
      type: String,
      default: ""
    },
    checkedKey:{
        type :Array,
        default: ()=>[]
    },
    expandAll:{
        type : Boolean,
        default :false
    }
  },
  created() {
    let arry = this.treeData.length || JSON.parse(sessionStorage.getItem("myOrgTrees"));
            this.jichen(arry);
            this.setDisabled(arry);
            this.rebuild_tree_data(arry[0], this.show_cat);
            this.passTreeData = arry;
  },
  watch: {
    chosedDevice() {
      let _self = this;
      _self.$emit("node-change", _self.chosedDevice);
    },
    treeData(val,oldval){
        this.jichen(val);
        this.setDisabled(val);
        this.rebuild_tree_data(val[0], this.show_cat);
        this.passTreeData = [...val]
    }
  },
  computed:{
  },
  mounted() {
            
  },
  methods: {
    //树形菜单单选
    handleClick(data) {
      this.handleNodeClick(data);
    },
    /*********下方为树的相关操作***********/
    handleNodeClick: function(data) {
      let _self = this;
      let keyArry = this.$refs.plantree.getCheckedKeys();
      keyArry.forEach((item, index) => {
        this.$refs.plantree.setChecked(item, false);
      });
      if (!data.disabled) {
        this.$refs.plantree.setChecked(data, true);
        _self.$set(_self.$data, "chosedDevice", data);
      }
    },
    renderContents: function(h, { node, data, store }) {
      return this.$createElement("span", {}, [
        this.$createElement("i", {
          class: { treeLabelIcon: true, iconfont: true, "icon-yancong": true }
        }),
        this.$createElement(
          "span",
          {
            class: { treeLabelText: true }
          },
          node.data.name
        )
      ]);
    },
    //电厂数禁用状态设置
    setDisabled(arry) {
      let _self = this;
      arry.forEach((item, index) => {
        if (item.reltablename === "org_group_info" && !_self.canGroup) {
          item.disabled = true;
        } else if (
          item.reltablename === "org_company_info" &&
          !_self.canCompany
        ) {
          item.disabled = true;
        } else if (
          item.reltablename === "org_powerplant_info" &&
          !_self.canPowerplant
        ) {
          item.disabled = true;
        } else if (item.reltablename === "org_unit_info" && !_self.canUnit) {
          item.disabled = true;
        } else if (item.reltablename === "org_fgd_info" && !_self.canFgd) {
          item.disabled = true;
        }
        if (item.childs) {
          _self.setDisabled(item.childs);
        }
      });
    },
    //电厂，机组  参数name向下继承
    jichen(arr) {
      let _self = this;
      arr.forEach(function(val1, index) {
        if (val1.childs) {
          if (val1.reltablename === "org_group_info") {
            //当前节点为公司
            val1.childs.forEach(function(val2, index) {
              val2.propGroup = val1.name;
            });
          } else if (val1.reltablename === "org_company_info") {
            //当前节点为区域
            val1.childs.forEach(function(val2, index) {
              val2.propCompany = val1.name;
              val2.propGroup = val1.propGroup;
            });
          } else if (val1.reltablename === "org_powerplant_info") {
            //当前节点为电厂
            val1.childs.forEach(function(val2, index) {
              val2.propPowerplant = val1.name;
              val2.propGroup = val1.propGroup;
              val2.propCompany = val1.propCompany;
            });
          } else if (val1.reltablename === "org_unit_info") {
            //当前节点为机组
            val1.childs.forEach(function(val2, index) {
              val2.propUnitName = val1.name;
              val2.propGroup = val1.propGroup;
              val2.propCompany = val1.propCompany;
              val2.propPowerplant = val1.propPowerplant;
            });
          }
          _self.jichen(val1.childs);
        }
      });
    },
    // str:'片区'，“电厂”，“机组”，“装置”
    // longOrgcode :length
    rebuild_tree_data(data, str) {
      if (!str) {
        return false;
      }
      let leng = "";
      switch (str) {
        case "片区":
          {
            leng = 10;
          }
          break;
        case "电厂":
          {
            leng = 15;
          }
          break;
        case "机组":
          {
            leng = 20;
          }
          break;
        default: {
          leng = 25;
        }
      }
      if (data.childs) {
        data.childs.forEach((item, index) => {
          if (item.longOrgcode.length > leng) {
            data.childs = null;
          } else {
            this.rebuild_tree_data(item, str);
          }
        });
      }
    },
    // 设定指定的电厂可选
  }
};
</script>

<style scoped>
.tree-box {
  position: relative;
  font-size: 12px;
}
</style>
