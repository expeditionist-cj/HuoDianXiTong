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
        <mySelect @onCheck="onCheck" :year="query.year" :month="query.month" />
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
import Zeroclipboard from "zeroclipboard";
import Handsontable from "handsontable";
import { HotTable } from "@handsontable/vue";
import "handsontable/languages/zh-CN";
import { getData, updateData } from "@/api/report/extraWrite.js";
import moment from "moment";
import mySelect from "./mySelect";

const hotPlungin = {};
let vueInstance = null;
let data = [
  {
    date: "1",
  },
  {
    date: "2",
  },
  {
    date: "3",
  },
  {
    date: "4",
  },
  {
    date: "5",
  },
  {
    date: "6",
  },
  {
    date: "1",
  },
  {
    date: "2",
  },
  {
    date: "3",
  },
  {
    date: "4",
  },
  {
    date: "5",
  },
  {
    date: "6",
  },
  {
    date: "1",
  },
  {
    date: "2",
  },
  {
    date: "3",
  },
  {
    date: "4",
  },
  {
    date: "5",
  },
  {
    date: "6",
  },
];
export default {
  name: "extra-writeDay",
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
        plant: "",
        unit: "",
      },
      resetData: [], // 用于保存修改之前的数据
      hotSettings: {
        // 数据项
        data: JSON.parse(JSON.stringify(data)),
        // 每列配置
        columns: [
          {
            data: "days",
            type: "numeric",
            readOnly: true,
          },
          {
            data: "genPower",
            type: "numeric",
          },
          {
            data: "inSo2Cv",
            type: "numeric",
          },
          {
            data: "outSo2Cv",
            type: "numeric",
          },
          {
            data: "inNoxCv",
            type: "numeric",
          },
          {
            data: "outNoxCv",
            type: "numeric",
          },
          {
            data: "inDustAvg",
            type: "numeric",
          },
          {
            data: "outDustAvg",
            type: "numeric",
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
        colWidths: [150, 150, 150, 150, 150, 150, 150, 150],
        // 是否可以隐藏列
        hiddenColumns: true,
        hiddenRows: true,
        colHeaders: true,
        // 设置语言
        language: "zh-CN",
        stretchH: "all",
        width: "100%",
        autoWrapRow: true, // 自动换行
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
              label: "发电量",
              colspan: 1,
            },
            {
              label: "入口SO₂浓度折算值",
              colspan: 1,
            },
            {
              label: "出口SO₂浓度折算值",
              colspan: 1,
            },
            {
              label: "入口NOx浓度折算值",
              colspan: 1,
            },
            {
              label: "出口NOx浓度折算值",
              colspan: 1,
            },
            {
              label: "入口粉尘浓度折算值",
              colspan: 1,
            },
            {
              label: "出口粉尘浓度折算值",
              colspan: 1,
            },
          ],
          [
            "（天）",
            "万KWh",
            "(mg/Nm³)",
            "(mg/Nm³)",
            "(mg/Nm³)",
            "(mg/Nm³)",
            "(mg/Nm³)",
            "(mg/Nm³)",
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
        // cells(row, col) {
        //   console.log(1);
        //     let cellProperties = {};
        //     // console.log(data[row]);
        //     if (data[row].id) {
        //         // 存在id
        //         cellProperties.readOnly = true;
        //     }
        //     return cellProperties;
        // },
        collapsibleColumns: true,
        copyPaste: true, // 允许复制粘贴
        observeChanges: true, // 响应式
        multiColumnSorting: {
          indicator: true,
        },
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
                let rowNumber = selection[0].start.row;
                let midData = JSON.parse(
                  JSON.stringify(vueInstance.hotSettings.data[rowNumber])
                );
                let obj = {
                  inDustCv: midData.inDustAvg,
                  outDustCv: midData.outDustAvg,
                };
                let rowData = JSON.parse(
                  JSON.stringify({ ...obj, ...midData })
                );
                delete rowData.inDustAvg;
                delete rowData.outDustAvg;
                if (!rowData.day) {
                  return vueInstance.$message.error("日期不能为空，请先查询！");
                } else {
                  rowData.day = rowData.day + " 00:00:00";
                }
                delete rowData.days;
                let num = 0;
                Object.keys(rowData).map((k) => {
                  if (
                    k == "unitCode" ||
                    k == "areaCode" ||
                    k == "day" ||
                    k == "plantCode" ||
                    k == "id"
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
                if (num > 0) {
                  return vueInstance.$message.error("请填写数字！");
                }
                rowData = { ...rowData, ...vueInstance.params };
                // let bool = true;
                // Object.keys(rowData).map((ele) => {
                //   if (!rowData[ele]) {
                //     bool = false;
                //   }
                // });

                if (!rowData.genPower) {
                  return vueInstance.$message.error("发电量不能为空");
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

        // 下拉菜单效果
      },
      pcode: "",
      rcode: "",
      params: {},
      identity: "",
      area: "",
    };
  },
  components: { HotTable, mySelect },
  computed: {
    ...mapGetters(["isCollapse"]),
  },
  created() {},
  mounted() {
    vueInstance = this;
    window.vue = this;
  },
  watch: {
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
    },
  },
  methods: {
    onCheck(value) {
      let { area, plant, unit } = value;
      this.query.plant = plant;
      this.query.unit = unit;
      this.area = area;
      this.getData();
    },
    // 查询
    getData() {
      if (!this.query.unit) {
        return this.$message.error("请先选择机组！");
      } else {
        this.loading = true;
        getData(this.query).then((res) => {
          this.loading = false;
          let data = res.data.data;
          data.forEach((element) => {
            element.days = new Date(element.day).getDate();
          });
          // let currentMonth = moment(Date.now()).month();
          // let selectMonth = moment(this.time).month();
          // let currentDay = new Date().getDate();
          // if (selectMonth == currentMonth) {
          //   data = data.slice(0, currentDay);
          // }
          this.params = {
            // areaCode: this.area,
            unitCode: this.query.unit,
            plantCode: this.query.plant,
          };
          this.hotSettings.data = data;
        });
      }
    },
    // 更新
    updateAddr(data) {
      this.loading = true;
      updateData(data).then((res) => {
        this.loading = false;
        let data = res.data;
        if (data.code == 0) {
          window.vue.$message.success("更新成功");
          this.getData();
        } else {
          window.vue.$message.error("更新失败");
        }
      });
    },
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