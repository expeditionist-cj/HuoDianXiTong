<template>
  <div class="container" ref="write_data">
    <div class="div__tool-wrap">
      <div class="select__wrap">
        <div>选择时间：</div>
        <div>
          <el-date-picker
            v-model="time"
            align="right"
            type="month"
            placeholder="选择日期"
            size="small"
            :clearable="false"
            :editable="false"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </div>
      <div style="margin-left: 20px; display: flex; align-items: center">
        <span>区域/项目：</span>
        <cascade
          @onMyCascader="onMyCascader"
          :showAll="false"
          :showUnit="false"
          :showSys="false"
        ></cascade>
      </div>
      <div>
        <BtnList
          style="width: 20%"
          :showRest="false"
          btnStyle="textAlign:left;margin-left:32px"
          @check="checkDay"
        />
      </div>
    </div>

    <HotTable
      v-loading="loading"
      ref="hotTable"
      :height="height"
      :settings="hotSettings"
    ></HotTable>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import cascade from "@/components/selectOrg/index11.vue";
import Zeroclipboard from "zeroclipboard";
import Handsontable from "handsontable";
import { HotTable } from "@handsontable/vue";
import "handsontable/languages/zh-CN";
import { update, add, saveAllData } from "@/api/report/produce_fill.js";
import { getData, getLmtHour } from "../../../api/report/writeData";
import moment from "moment";

const hotPlungin = {};
let vueInstance = null;
let data = [
  {
    date: "1",
  },
];
export default {
  name: "handsometable-basic",
  props: {
    height: {
      type: Number,
      default: 600,
    },
  },
  data() {
    return {
      loading: false,
      time: Date.now(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      query: {
        year: moment(Date.now()).year().toString(),
        month: moment(Date.now()).month() + 1,
        area: "",
        plant: "",
      },
      plantCn: "",
      resetData: [], // 用于保存修改之前的数据
      hotSettings: {
        // 数据项
        data: JSON.parse(JSON.stringify(data)),
        // 每列配置
        columns: [
          {
            data: "day",
            type: "numeric",
            readOnly: true,
          },
          {
            data: "absBuyDay",
            type: "numeric",
          },
          {
            data: "absCanUse",
            type: "numeric",
          },
          {
            data: "absUseDay",
            type: "numeric",
          },
          {
            data: "redBuyDay",
            type: "numeric",
          },
          {
            data: "redCanUse",
            type: "numeric",
          },
          {
            data: "redUseDay",
            type: "numeric",
          },
          {
            data: "gypOutputDay",
            type: "numeric",
          },
          {
            data: "synUseDay",
            type: "numeric",
          },
          // 系统进水量（t）
          {
            data: "fsWaterInAmt",
            type: "numeric",
          },
          // 系统处理量（t）
          {
            data: "effTaDay",
            type: "numeric",
          },
          // 投运时间（h）
          {
            data: "effRunDay",
            type: "numeric",
          },
          {
            data: "fsQyhg",
            type: "numeric",
          },
          {
            data: "fsXnj",
            type: "numeric",
          },
          {
            data: "fsZnj",
            type: "numeric",
          },
          {
            data: "fsYjl",
            type: "numeric",
          },
          {
            data: "fsClsn",
            type: "numeric",
          },
          // 高效絮凝剂
          {
            data: "floUseDay",
            type: "numeric",
          },
          {
            data: "remark",
            type: "text",
          },
        ],
        // placeholder: "请输入数字",
        readOnly: false, // 只读
        headerTooltips: {
          rows: true,
          columns: true,
          onlyTrimmed: false,
        },
        manualColumnResize: true, //是否可以手动修改列的宽度
        colWidths: [
          100, 100, 150, 100, 100, 150, 100, 100, 100, 150, 150, 150, 150, 150,
          150, 150, 150, 150, 200,
        ],
        // 是否可以隐藏列
        hiddenColumns: true,
        hiddenRows: true,
        colHeaders: true,
        // 设置语言
        language: "zh-CN",
        stretchH: "all",
        width: "100%",
        autoWrapRow: false, // 自动换行
        // height: this.height, // 最大高度
        maxRows: 100, // 最大行数
        manualRowResize: true,
        manualColumnResize: true,
        rowHeaders: false, // 显隐行表头
        //fixedColumnsLeft: 0, //固定左边列数
        // fixedRowsTop: 2, //固定上边列数
        //fixedRowsBottom: 2, // 固定底部列数
        bindRowsWithHeaders: "strict",
        manualColumnMove: false, // 拖拽移动列
        manualRowMove: true, // 拖拽移动行
        allowEmpty: false,
        // colHeaders: [
        //   "ID",
        //   "Country",
        //   "Code",
        //   "Currency",
        //   "Level",
        //   "Units",
        //   "Date",
        //   "Change",
        // ],
        // 多级表头
        nestedHeaders: [
          [
            {
              label: "日期",
              colspan: 1,
            },
            {
              label: "吸收剂采购量",
              colspan: 2,
            },
            {
              label: "吸收剂耗量",
              colspan: 1,
            },
            {
              label: "还原剂采购量",
              colspan: 2,
            },
            {
              label: "还原剂耗量",
              colspan: 1,
            },
            {
              label: "石膏出库量",
              colspan: 1,
            },
            {
              label: "增效剂添加量",
              colspan: 1,
            },
            {
              label: "废水系统",
              colspan: 9,
            },
            {
              label: "其他情况说明",
              colspan: 1,
            },
          ],
          [
            "（天）",
            "本日（t）",
            "当前库存使用天数",
            "本日（t）",
            "本日（t）",
            "当前库存使用天数",
            "本日（t）",
            "本日（t）",
            "本日（kg）",
            "系统进水量（t）",
            "系统处理量（t）",
            "投运时间（h）",
            "氢氧化钙（kg）",
            "絮凝剂（kg）",
            "助凝剂（kg）",
            "有机硫（kg）",
            "次氯酸钠（kg）",
            "高效絮凝剂（kg）",
            "",
          ],
        ],
        // mergeCells: [
        //   // 合并
        //    {row: 1, col: 1, rowspan: 3, colspan: 3},  //指定合并，从（1,1）开始行3列3合并成一格
        //    {row: 3, col: 4, rowspan: 2, colspan: 2}
        // ],
        manualColumnFreeze: true,
        contextMenu: true,
        filters: true,
        undo: true,
        redo: true,
        fillHandle: true, // 选中拖拽复制，只针对列
        dropdownMenu: true,
        dropdownMenu: [
          "filter_by_condition",
          "filter_action_bar",
          "filter_by_value",
          "filter_operators",
        ],
        // cells(row, col, prop) {
        //   let cellProperties = {};
        //   // const identity = vueInstance.identity;
        //   let today = new Date().getDate();
        //   // if (identity == "ROLE_ADMIN") {
        //   //   return cellProperties;
        //   // } else {
        //   const eightOclock = vueInstance.eightOclock;
        //   console.log(eightOclock, 999);
        //   let now = new Date();
        //   let data = vueInstance.hotSettings.data;
        //   if (data[row]) {
        //     if (data[row].day < today - 1) {
        //       cellProperties.readOnly = true;
        //     } else if (now - eightOclock <= 0) {
        //       cellProperties.readOnly = false;
        //     } else {
        //       cellProperties.readOnly = true;
        //     }
        //   }
        //   return cellProperties;

        //   // }
        // },
        collapsibleColumns: true,
        copyPaste: true, // 允许复制粘贴
        observeChanges: true, // 响应式
        multiColumnSorting: {
          indicator: true,
        },
        currentRowClassName: "rowStyle",
        currentColClassName: "colStyle",
        //右键效果
        contextMenu: {
          //自定义右键菜单，可汉化，默认布尔值
          items: {
            // row_below: {
            //     name: "添加一行",
            //     callback(key, selection, clickEvent) {
            //         vue.hotSettings.data.push({
            //             id: 22,
            //             flag: "PHP",
            //             currencyCode: "PHP",
            //             currency: "Philippine Peso",
            //             level: 46.3108,
            //             units: "PHP / USD",
            //             asOf: "08/19/2019",
            //             onedChng: 0.0012
            //         });
            //     }
            // },
            // remove_row: {
            //     name: "删除该行数据",
            //     callback() {
            //         alert("你确定要删该行数据");
            //     }
            // },
            save: {
              name: "保存该行数据",
              callback(key, selection) {
                if (!vueInstance.$store.state.writeData.selectOptions.plant) {
                  return vueInstance.$message("请选择区域和电厂");
                }
                let rowNumber = selection[0].start.row;
                let rowData = vueInstance.hotSettings.data[rowNumber];
                
                let num = 0;
                Object.keys(rowData).map((k) => {
                  if (
                    k == "area" ||
                    k == "areaCode" ||
                    k == "dt" ||
                    k == "plant" ||
                    k == "plantCn" ||
                    k == "remark" 
                  ) {
                    return;
                  } else {
                    if (isNaN(Number(rowData[k]))) {
                      num++;
                    } else {
                      rowData[k] = Number(rowData[k]);
                    }
                  }
                });
                if(num>0) {
                  return vueInstance.$message.error('请填写数字！')
                }
                rowData = { ...rowData, ...vueInstance.params };
                if (!rowData.id) {
                  vueInstance.addAddr(rowData);
                } else {
                  vueInstance.updateAddr(rowData);
                }
              },
            },
            // saveAll: {
            //   name: "保存所有",
            //   callback(key, selection) {
            //     if (!vueInstance.$store.state.writeData.selectOptions.plant) {
            //       return vueInstance.$message("请选择区域和电厂");
            //     }
            //     let rowData = vueInstance.hotSettings.data;
            //     // console.log({...vueInstance.params})
            //     rowData.forEach((element, index, arr) => {
            //       arr[index] = { ...element, ...vueInstance.params };
            //     });
            //     // console.log(rowData)
            //     vueInstance.doSaveAll(rowData);
            //   }
            // },
            // 不能用于多级表头
            // hidden_columns_hide: {
            //     name: "隐藏该列"
            // },
            // hidden_columns_show: {
            //     name: "显示隐藏列"
            // },
            alignment: {
              name: "对齐",
            },
            undo: {
              name: "撤销",
            },
            // redo: {
            //     name: "重做"
            // },
            // make_read_only: {
            //   name: "只读"
            // },
            // clear_column: {
            //     name: "清除列"
            // },
            cut: {
              name: "剪切",
            },
            copy: {
              name: "复制",
            },
            // hidden_rows_hide: {
            //     name: "隐藏行"
            // },
            // hidden_rows_show: {
            //     name: "显示行"
            // },
            // freeze_column: {
            //     name: "冻结列"
            // },
            // unfreeze_column: {
            //     name: "解冻列"
            // },
            // resetState: {
            //   name: "重置",
            //   callback() {
            //     // console.log(vueInstance.resetData)
            //     vueInstance.$refs.hotTable.hotInstance.loadData(
            //       vueInstance.resetData
            //     );
            //   }
            // }
          },
        },
        // afterOnCellMouseDown  (event,coords,td) {

        //     td.style.width = 1000;
        //     console.log(event,coords,td,999);
        // },
        stretchH: "last", // 根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
        // 下拉菜单效果
      },
      pcode: "",
      rcode: "",
      params: {},
      // eightOclock: new Date(
      //   new Date(new Date().toLocaleDateString()).getTime() + 8 * 60 * 60 * 1000
      // ),
    };
  },
  components: { HotTable, cascade },
  computed: {
    ...mapGetters(["isCollapse"]),
  },
  beforeCreate() {
    // this.identity = this.$store.state.writeData.identity;
    this.identity = JSON.parse(
      sessionStorage.getItem("user")
    ).writeData.identity; //从session中获取用户角色

    vueInstance = this;
    window.vue = this;
  },
  created() {
    this.plantCn = JSON.parse(sessionStorage.getItem("user")).user.projectName;
  },
  async mounted() {
    await getLmtHour().then((res) => {
      let prmDays = Math.abs(res.data.data.prmDays);
      vueInstance.prmDays = prmDays;
      let { lmtHour, lmtMinite } = res.data.data;
      let time = moment().format(
        "YYYY-MM-DD " + lmtHour + ":" + lmtMinite + ":00"
      );
      vueInstance.eightOclock = new Date(time);
      vueInstance.now = new Date();
      vueInstance.canUpdateTime = moment()
        .subtract(vueInstance.prmDays, "days")
        .format("YYYY-MM-DD");
      if (vueInstance.now - vueInstance.eightOclock > 0) {
        vueInstance.canUpdateTime = moment(vueInstance.canUpdateTime)
          .add(1, "day")
          .format("YYYY-MM-DD");
      }
    });
    vueInstance.hotSettings.cells = function (row, col, prop) {
      let cellProperties = {};
      let data = vueInstance.hotSettings.data;
      if (data[row]) {
        if (data[row].dt < vueInstance.canUpdateTime) {
          cellProperties.readOnly = true;
        } else {
          cellProperties.readOnly = false;
        }
      }
      return cellProperties;
    };
    if (this.$store.state.writeData.selectOptions.plant) {
      this.query.area = this.$store.state.writeData.selectOptions.area;
      this.query.plant = this.$store.state.writeData.selectOptions.plant;
      this.getData();
    } else {
      delete this.query.area;
      delete this.query.plant;
    }
  },
  watch: {
    // plant(value) {
    //   this.query.area = this.area;
    //   this.query.plant = value;
    //   this.getData();
    // },
    isCollapse(value) {
      let dom =
        document.getElementsByClassName("div__tool-wrap")[0].offsetWidth;
      if (value) {
        this.hotSettings.width = dom + 180;
      } else {
        this.hotSettings.width = dom - 180;
      }
    },
    time(value) {
      this.query.year = moment(value).year().toString();
      this.query.month = moment(value).month() + 1;

      vueInstance.time = moment(value).format("YYYY-MM");
    },
  },
  activated() {
    if (this.$store.state.writeData.selectOptions.plant) {
      this.query.area = this.$store.state.writeData.selectOptions.area;
      this.query.plant = this.$store.state.writeData.selectOptions.plant;
      this.getData();
    } else {
      delete this.query.area;
      delete this.query.plant;
    }
  },
  methods: {
    updateAddr(row) {
      this.loading = true;
      update(row)
        .then((res) => {
          this.loading = false;
          let data = res.data;
          if (data.code == 0) {
            window.vue.$message.success("更新成功");
            this.getData();
          } else {
            window.vue.$message.error("更新失败");
          }
        })
        .catch((err) => {
          this.getData();
          this.loading = false;
          // console.log(err);
        });
    },
    addAddr(row) {
      this.loading = true;
      add(row)
        .then((res) => {
          this.loading = false;
          let data = res.data;
          if (data.code == 0) {
            window.vue.$message.success("更新成功");
            this.getData();
          } else {
            window.vue.$message.error("更新失败");
          }
        })
        .catch((err) => {
          this.getData();
          this.loading = false;
          // console.log(err);
        });
    },
    doSaveAll(data) {
      this.loading = true;
      saveAllData(data)
        .then((res) => {
          this.loading = false;
          let data = res.data;
          if (data.code == 0) {
            window.vue.$message.success("更新成功");
            this.getData();
          } else {
            window.vue.$message.error("更新失败");
          }
        })
        .catch((err) => {
          this.getData();
          this.loading = false;
          // console.log(err);
        });
    },
    getData() {
      console.log(this.query, 1999);
      this.loading = true;
      getData(this.query)
        .then((res) => {
          this.loading = false;
          let data = res.data.data.list;
          data.forEach((element) => {
            element.day = new Date(element.dt).getDate();
          });
          let currentMonth = moment(Date.now()).month() + 1;
          let selectMonth = moment(this.time).month() + 1;
          let yesterDay = moment(Date.now()).format("DD");
          if (selectMonth == currentMonth) {
            data = data.slice(0, yesterDay);
          }
          this.params = {
            area: this.query.area,
            areaCode: this.query.area,
            plant: this.query.plant,
            plantCn: this.plantCn,
          };
          this.hotSettings.data = data;
          // 限制值班员只读、只能保存单行的权限
          // let col = this.hotSettings.columns;

          // if (
          //   this.identity == "ROLE_SPECIALIST" ||
          //   this.identity == "ROLE_ADMIN" ||
          //   this.identity == "ROLE_Analysiser" ||
          //   this.identity == "ROLE_Supervisor"
          // ) {
          //   col.forEach(ele => {
          //     if (ele.data == "day") {
          //       ele.readOnly = true;
          //     } else {
          //       ele.readOnly = false;
          //     }
          //   });
          // } else if (this.identity == "ROLE_WATCHER") {
          //   this.hotSettings.cells = (row, col) => {
          //     let cellProperties = {};
          //     // console.log(vueInstance.hotSettingsTx.data);
          //     if (vueInstance.hotSettings.data[row].id) {
          //       // 存在id
          //       cellProperties.readOnly = true;
          //     }
          //     return cellProperties;
          //   };
          // } else {
          //   col.forEach(ele => {
          //     ele.readOnly = true;
          //   });
          // }
          // this.hotSettings.columns = col;
        })
        .catch((err) => {
          this.loading = false;
          // console.log(err);
        });
    },
    checkDay() {
      if (!this.$store.state.writeData.selectOptions.plant) {
        return this.$message("请选择区域和电厂");
      } else {
        this.query.area = this.$store.state.writeData.selectOptions.area;
        this.query.plant = this.$store.state.writeData.selectOptions.plant;
      }
      this.getData();
    },
    onMyCascader(data) {
      if (!data.area || !data.plant) {
        return this.$message("请选择区域和电厂");
      }
      this.query.area = data.area;
      this.query.plant = data.plant;
      this.getData();

      // area = data.name.split("/")[0];
      this.plantCn = data.name.split("/")[1];
      //   this.checkList();
    },

    // changeData() {
    //   this.hotSettings.data.splice(0, 1);
    // },
    // 重置
    // resetState() {
    //   console.log(data);
    //   this.$refs.hotTable.hotInstance.loadData(data);
    // },
    // 导出不能导出多级表头
    // downloadExcel() {
    //   let exportPlugin = this.$refs.hotTable.hotInstance.getPlugin(
    //     "exportFile"
    //   );
    //   exportPlugin.downloadFile("csv", {
    //     bom: false,
    //     columnDelimiter: ",",
    //     columnHeaders: true,
    //     exportHiddenColumns: true,
    //     exportHiddenRows: true,
    //     fileExtension: "csv",
    //     filename: "Handsontable-CSV-file_[YYYY]-[MM]-[DD]",
    //     mimeType: "text/csv",
    //     rowDelimiter: "\r\n",
    //     rowHeaders: true,
    //     nestedHeaders: true
    //   });
    // }
  },
  destroyed() {
    window.vue = null;
  },
};
</script>
<style scoped lang="less">
.container {
  padding: 0 20px;
}
.div__tool-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  margin-bottom: 10px;
  .select__wrap {
    height: 42px;
    line-height: 42px;
    display: flex;
    // width: 100%;
  }
}
</style>
<style lang="scss">
.handsontable .rowStyle {
  background: rgba(64, 158, 255, 0.27);
}
.handsontable .colStyle {
  background: rgba(64, 158, 255, 0.27);
}
</style>