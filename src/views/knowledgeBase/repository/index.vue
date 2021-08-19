<template>
  <div
    v-loading="loading"
    class="wrap repository"
    :class="[chooseColor.name]"
    style="overflow-y: hidden;"
    :style="{height: (changeScreenHeight - 60) + 'px'}"
  >
    <ul class="header clearfix">
      <li class="fl" @keyup.enter="keyup">
        <el-input placeholder="搜索问题" v-model="question">
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="search"
            :style="{color:chooseColor.bgColors,cursor:'pointer'}"
          ></i>
        </el-input>
      </li>
      <li class="fr" style="text-align:right;padding-right:20px;">
        <!-- <el-popover
                popper-class="que_ans"
                    placement="left"
                    width="1000"
                    height='500'
                    trigger="click">
                    <iframe style="width:1000px;height:500px;border:1px solid #d6c3c3"  src="http://demo.faqrobot.net/robot/chat2_elecast.html?jid=5733&sourceId=0&sysNum=15405210508113131" frameborder="0" ></iframe>
                    <el-button slot="reference" plain class="btn" :style="{background:chooseColor.bgColors}" >智能问答</el-button>
        </el-popover>-->
        <el-button
          plain
          class="btn"
          :style="{background:chooseColor.bgColors}"
          @click="iframeShow=true"
        >智能问答</el-button>
      </li>
    </ul>
    <div paneWidth="180px">
      <el-tree slot="left" :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      <div slot="right" class="realStates-content" style="position:relative">
        <div class="nav">
          <span :style="{color:chooseColor.bgColors}">知识库</span>
          <span :style="{color:chooseColor.bgColors}">{{par_text}}</span>
          <span :style="{color:chooseColor.bgColors}">{{text}}</span>
          <span :style="{color:chooseColor.bgColors}">{{detailText}}</span>
        </div>
        <div v-show="!detailShow">
          <el-table
            :data="tableData"
            tooltip-effect="light"
            style="width:100%"
            size="small"
            :row-style="rowClass"
            :height="changeScreenHeight - 220 "
            border
            stripe
          >
            <el-table-column align="center" type="index"></el-table-column>
            <el-table-column align="center" label="标题">
              <template slot-scope="scope">
                <span
                  title="点击查看详情"
                  style="cursor: pointer;"
                  @click="clickItem(scope.row.id)"
                >{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="上传时间" prop="create_time"></el-table-column>
            <el-table-column align="center" label="来源" prop="source"></el-table-column>
          </el-table>
          <div class="page-box">
            <el-pagination
              @prev-click="handlePre"
              @next-click="handleNext"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[15, 30, 45]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
        <detail
          v-if="detailShow"
          @controlDetailShow="controlDetailShow"
          :id="detailId"
          @changeDetailText="changeDetailText"
        ></detail>
      </div>
    </div>
  </div>
</template>
<script>
import orgTree from "@/components/orgTree/index.vue";
import detail from "@/components/showKnowleger/index.vue";
export default {
  data() {
    return {
      question: "",
      treeData: [],
      defaultProps: {
        label: "text",
        children: "children",
      },
      tableData: [],
      catalogId: "",
      par_text: "",
      text: "",
      detailText: "",
      currentPage: 1,
      pageSize: 15,
      total: 0,
      detailShow: false,
      detailId: "",
      iframeShow: false, // iframe 显示影藏
      loading: false,
      timer: "",
      // drag div
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
  },
  components: {
    orgTree,
    detail,
  },
  mounted() {
    // this.getTreeData();
  },
  methods: {
    onResize: function (x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function (x, y) {
      this.x = x;
      this.y = y;
    },
    closeIframe() {
      this.iframeShow = false;
    },
    handleNodeClick(data) {
      this.detailShow = false;
      this.detailText = "";
      clearTimeout(this.timer);
      if (
        data.text == "知识库" ||
        data.text == "基础知识" ||
        data.text == "规章规程" ||
        data.text == "案例" ||
        data.text == "智库"
      ) {
        return false;
      }
      this.par_text = "";
      this.text = "";
      this.catalogId = data.id;
      this.currentPage = 1;
      this.pageSize = 15;
      if (!data.children.length) {
        this.par_text = ">" + data.parentText;
        this.text = ">" + data.text;
      } else {
        this.text = ">" + data.text;
      }
      this.loading = true;
      this.getTableData(this.catalogId, this.question, 15, 1).then(() => {
        this.timer = setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    clickItem(a) {
      this.detailShow = true;
      this.detailId = a;
    },
    changeDetailText(a) {
      this.detailText = ">" + a;
    },
    rowClass(row, index) {
      if (row.rowIndex % 2 != 0) {
        return { "background-color": "#e8eaec" };
      }
    },
    search() {
      this.currentPage = 1;
      this.pageSize = 15;
      this.getTableData("", this.question, 15, 1);
    },
    keyup() {
      this.search();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getTableData(
        this.question ? "" : this.catalogId,
        this.question,
        size,
        this.currentPage
      );
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getTableData(
        this.question ? "" : this.catalogId,
        this.question,
        this.pageSize,
        page
      );
    },
    handleNext(page) {
      this.currentPage = page;
      this.getTableData(
        this.question ? "" : this.catalogId,
        this.question,
        this.pageSize,
        page
      );
    },
    handlePre(page) {
      this.currentPage = page;
      this.getTableData(
        this.question ? "" : this.catalogId,
        this.question,
        this.pageSize,
        page
      );
    },
    controlDetailShow(a) {
      this.detailShow = a;
      this.detailText = "";
    },
    // treeData 树形菜单数据
    async getTreeData() {
      let {
        data,
        data: { code },
      } = await this.http.get("intelligentoperation/knowledgebase/catalogtree");
      if (code == 0) {
        this.treeData = [data.data];
      } else {
        console.log("知识库树形菜单数据获取失败");
      }
    },
    // tableData 列表数据获取
    async getTableData(catalogId, searchText, pageSize, pageNum) {
      let {
        data,
        data: { code },
      } = await this.http.get("intelligentoperation/knowledgebase/page", {
        params: {
          catalogId,
          searchText,
          pageSize,
          pageNum,
        },
      });
      if (code == 0) {
        this.tableData = data.data.list;
        this.total = data.data.total;
      }
    },
  },
  computed: {
    chooseColor() {
      return {}
    },
    changeScreenHeight() {
      return 400
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang="less">
.repository {
  .bind_blue .active {
    background-color: #409eff36 !important;
  }
  .headerRowStyle {
    th {
      background-color: #f5f7fa !important;
    }
  }
  .el-pager li {
    background: #fff !important;
  }
  .el-popover el-popper {
    height: 512px !important;
  }
  .ql-toolbar.ql-snow + .ql-container.ql-snow {
    border-top: 1px solid #ccc !important;
  }
  .ql-toolbar.ql-snow {
    display: none;
  }
}
.que_ans {
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0);
  // height:0;
}
</style>

<style lang="less" scoped>
.bind_blue .active {
  background-color: #010f1d36 !important;
}
.wrap {
  * {
    box-sizing: border-box;
  }
  .icon-wrap {
    //   position: absolute;
    //   left:80%
  }

  //overflow: hidden;
  iframe {
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 0px;
    width: 100%;
    height: 100%;
    //z-index: 30000;
    //position: absolute;
    // top:0;
    // left:0;
  }
  background: #fff;
  & > ul {
    padding: 10px;
    background: #f2f2f2;
    li {
      width: 50%;
      .btn {
        color: #fff;
      }
    }
  }
  .realStates-content {
    text-align: left;
    padding: 20px;
    .nav {
      margin-bottom: 10px;
    }
    .down {
      border-bottom-width: 1px;
      border-bottom-style: solid;
    }
    .page-box {
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>


