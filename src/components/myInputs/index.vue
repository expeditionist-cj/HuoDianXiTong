<template>
  <div>
    <div class="inputs">
      <span>{{ label }}({{ unit }}):</span>
      <el-input size="small" :disabled="disabled" class="__input" v-model="row[att]" @input="onIpt" oninput="value=value.replace(/[^\d.]/g,'');"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: () => {
        return "";
      }
    },
    unit: {
      type: String,
      default: () => {
        return "";
      }
    },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    val: 0,
    att: "",
    disabled: false
  },
  data() {
    return {};
  },
  computed: {
    row() {
      return this.$store.state.nx_ems.row;
    }
  },
  methods: {
    onIpt(val) {
      
      this.row[this.att] = val;
      if (/ya_hl/.test(this.att)) {
        this.row["ya_hj"] = this.add_att(this.list, "ya_hl");
        this.row["hyj_hj"] =
          this.trs_data(this.row["ya_hj"]) + this.trs_data(this.row["ns_hj"]);
      } else if (/ns_hl/.test(this.att)) {
        this.row["ns_hj"] = this.add_att(this.list, "ns_hl");
        this.row["hyj_hj"] =
          this.trs_data(this.row["ya_hj"]) + this.trs_data(this.row["ns_hj"]);
      } else if (/dh/.test(this.att)) {
        this.row["dh_hj"] = this.add_att(this.list, "dh");
        this.row["zdh"] =
          this.trs_data(this.row["dh_hj"]) + this.trs_data(this.row["ft_hj"]);
      } else if (/ft/.test(this.att)) {
        this.row["ft_hj"] = this.add_att(this.list, "ft");
        this.row["zdh"] =
          this.trs_data(this.row["dh_hj"]) + this.trs_data(this.row["ft_hj"]);
      } else if (/limestone_powder_consum/.test(this.att)) {
        this.row["sum_limestone_powder_consum"] = this.add_att(
          this.list,
          "limestone_powder_consum"
        );
        this.row["sumhl"] =
          this.trs_data(this.row["sum_limestone_powder_consum"]) +
          this.trs_data(this.row["sum_carbide_slag_consum"]);
      } else if (/carbide_slag_consum/.test(this.att)) {
        this.row["sum_carbide_slag_consum"] = this.add_att(
          this.list,
          "carbide_slag_consum"
        );
        this.row["sumhl"] =
          this.trs_data(this.row["sum_limestone_powder_consum"]) +
          this.trs_data(this.row["sum_carbide_slag_consum"]);
      } else if (/power/.test(this.att)) {
        this.row["sum_power"] = this.add_att(this.list, "power");
        this.row["sumdh"] =
          this.trs_data(this.row["sum_power"]) +
          this.trs_data(this.row["sum_share"]);
      } else if (/share/.test(this.att)) {
        this.row["sum_share"] = this.add_att(this.list, "share");
        this.row["sumdh"] =
          this.trs_data(this.row["sum_power"]) +
          this.trs_data(this.row["sum_share"]);
      } else if (/industrial_water/.test(this.att)) {
        this.row["sum_water"] =
          parseFloat( this.trs_data(this.row["industrial_water"]) )+
          parseFloat( this.trs_data(this.row["process_water"]));
      } else if (/process_water/.test(this.att)) {
        this.row["sum_water"] =
         parseFloat( this.trs_data(this.row["industrial_water"]) )+
          parseFloat( this.trs_data(this.row["process_water"]));
      } else if (/gypsum_output/.test(this.att)) {
        this.row["sum_gypsum_output"] = this.add_att(
          this.list,
          "gypsum_output"
        );
      }
    },
    // 拼凑字段
    add_att(list, str) {
      let num = 0;
      list.forEach(ele => {
        num +=
          this.row[`${ele}_${str}`] == undefined
            ? 0
            : this.row[`${ele}_${str}`] * 1;
      });
      return num;
    },
    // 将null转换成0
    trs_data(data) {
      return data == undefined ? 0 : data;
    }
  }
};
</script>

<style scoped>
.inputs {
  width: 250px;
  height: 40px;
  font-size: 8px;
  text-align: right;
}
.__input {
  width: 100px;
  height: 14px;
  margin-left: 20px;
}
</style>
