<template>
  <div class="ala_table">
    <avue-crud ref="crud" :data="tableData" :option="tableOption">
      <template slot="AC"
                      slot-scope="scope">
              <span>
                <el-tag :color="scope.row.AC">{{scope.row.AC}} </el-tag>&nbsp;&nbsp;
              </span>
            </template>
    </avue-crud>
  </div>
</template>

<script>
import { tableOption } from "@/const/crud/datamon/ala_table.js";
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      tableOption
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style  lang="scss">
.ala_table {
.el-card__body{
    padding: 0
}
.avue-crud__menu{
    display: none;
}
.avue-crud__header{
    margin: 0
}
}
</style>
