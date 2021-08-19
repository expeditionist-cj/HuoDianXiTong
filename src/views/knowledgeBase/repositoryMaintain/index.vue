<template>
  <Card cardStyles="margin-bottom:16px;padding:12px 32px;">
    <div
      class="wrap repositoryMaintain"
      style="overflow-y: auto;"
      :style="{height: (changeScreenHeight - 60) + 'px'}"
    >
      <div style="display:flex;" paneWidth="240px">
        <el-tree
          style="width: 20%;"
          default-expand-all
          slot="left"
          :expand-on-click-node="false"
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span class="tool-box" v-if="data.text !== '知识库'">
              <i title="修改" class="el-icon-edit i" @click.stop="edit(data)"></i>
              <i title="删除" class="el-icon-delete i" @click.stop="delTree(data)"></i>
              <i title="添加" class="el-icon-circle-plus-outline i" @click.stop="addTree(data)"></i>
            </span>
          </span>
        </el-tree>
        <div slot="right" style="width: 80%;" class="realStates-content">
          <div class="nav">
            <span>知识库</span>
            <span>{{par_text}}</span>
            <span>{{text}}</span>
            <span>{{detailText}}</span>
          </div>
          <div class="tool-box">
            <span @click="clickAdd">
              <i class="el-icon-circle-plus-outline i"></i>
              <span>添加</span>
            </span>
            <span @click="clickModify">
              <i class="el-icon-edit i"></i>
              <span>修改</span>
            </span>
            <span @click="clickDel">
              <i class="el-icon-delete i"></i>
              <span>删除</span>
            </span>
            <span class="ipt-box" @keyup.enter="keyup">
              <el-input placeholder="搜索问题" v-model="question">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
              </el-input>
            </span>
          </div>
          <!-- :height='changeScreenHeight - 220 ' -->
          <el-table
            :data="tableData"
            class="table-kownlege"
            tooltip-effect="light"
            style="width:100%"
            highlight-current-row
            size="small"
            ref="multipleTableUser"
            @select="sigleSelect"
            border
            stripe
            @selection-change="handleSelectionChange"
            header-row-class-name="headerRowStyle"
          >
            <el-table-column align="center" type="index"></el-table-column>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column align="center" min-width="260" label="标题">
              <template slot-scope="scope">
                <el-button
                  @click="getTitleDetail(scope.row)"
                  type="text"
                  size="small"
                >{{scope.row.title}}</el-button>
                <!-- <span>{{scope.row.title}}</span> -->
              </template>
            </el-table-column>
            <el-table-column align="center" label="上传时间" prop="create_time" min-width="200"></el-table-column>
            <el-table-column align="center" label="来源" min-width="200" prop="source"></el-table-column>
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
      </div>
      <el-dialog @close="closeEdit" :title="title" :visible.sync="dialogFormVisible" class="dialog">
        <ul class="head clearfix">
          <li class="fl title">
            <i>*</i>标题
          </li>
          <li class="ipt fl">
            <el-input v-model="document.ipt1" placeholder="请输入内容"></el-input>
          </li>
        </ul>
        <ul class="head clearfix">
          <li class="fl title">
            <i>*</i>内容
          </li>
          <li class="ipt fl">
            <!-- <quill-editor v-model="document.ipt2"
                ref="myQuillEditor"
                class="content"
                :options="editorOption"
                >
            </quill-editor>-->
            <!-- <vue-editor v-model="document.ipt2"></vue-editor> -->
            <!-- <myVueEditor :content="document.ipt2" ></myVueEditor> -->
            <VueRichEditor v-model="document.ipt2" id="vuericheditor" />
          </li>
        </ul>
        <ul class="head clearfix">
          <li class="fl title">来源</li>
          <li class="ipt fl source">
            <el-select v-model="document.ipt3" placeholder="请选择" @change="changeBig">
              <el-option
                v-for="item in document.option3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li class="positionTilte">描述</li>
          <li class="position">
            <el-input v-model="document.ipt4" placeholder="请输入内容"></el-input>
          </li>
        </ul>
        <ul class="head clearfix">
          <li class="fl title">大类</li>
          <li class="ipt fl source">
            <el-select v-model="document.ipt5" placeholder="请选择" @change="changeBig">
              <el-option
                v-for="item in document.option5"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li class="positionTilte">小类</li>
          <li class="position">
            <el-select v-model="document.ipt6" placeholder="请选择">
              <el-option
                v-for="item in document.option6"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
        </ul>
        <ul class="head jj clearfix">
          <li class="fl title">维护人</li>
          <li class="ipt fl">
            <el-input v-model="document.ipt7"></el-input>
          </li>
          <li class="positionTilte">上传时间</li>
          <li class="position">
            <el-date-picker
              v-model="document.ipt8"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            ></el-date-picker>
          </li>
        </ul>
        <el-upload
          class="upload-demo"
          :action="url"
          :headers="header"
          :on-change="onFileChange"
          multiple
          ref="upload"
          :file-list="fileList"
          :on-preview="downloadFiles"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :auto-upload="false"
        >
          <el-button size="small" v-if="!isReadOnly" type="primary">点击上传附件</el-button>
          <div v-else>附件：</div>
          <div
            slot="tip"
            v-if="!isReadOnly"
            class="el-upload__tip"
          >只支持PDF、DOC、DOCX、XLS、XLSX、PPT、PPTX等文件格式</div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" v-if="!isReadOnly" @click="KnowledgeBaseConfirm">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑修改提示 -->
      <el-dialog :title="popData.title" :visible.sync="popData.popShow" width="400px">
        <el-input v-model="popData.ipt" placeholder="请输入内容"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="popData.popShow = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </Card>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import config from "@/config/config.js";
import { VueEditor } from "vue2-editor";
//import myVueEditor from 'my-vue-editor'
import { VueRichEditor } from "vue-rich-editor";
import {
  delRepository,
  addRepository,
  updateRepository,
  getTree,
  getTable,
  remFile,
  querySrc,
  queryCategoryByPid,
  addBase,
  updateBase,
  deleteBase,
  getDetail,
  uploadFile,
  downloadFile,
} from "@/api/repository/repository.js";
export default {
  components: {
    quillEditor,
    VueEditor,
    VueRichEditor,
    // myVueEditor
  },
  data() {
    return {
      config: {
        // 接口地址
        uploadUrl: "",
        // form 里的 filename
        uploadName: "",
        // 其他参数
        uploadParams: {},
        // 上传成功回调
        uploadCallback: (data) => {
          return "blob:https://fiddle.jshell.net/00a0b0b4-d19a-4860-9796-137692aef36f";
        },
        // 上传失败回调, 可选
        uploadFailed: (err) => {
          console.log(err);
        },
      },
      header: {
        token: sessionStorage.getItem("access_token"),
        uid: sessionStorage.getItem("uid"),
      },
      treeData: [],
      defaultProps: {
        label: "text",
        children: "children",
      },
      url: config.upload() + "transfer/upload",
      par_text: "",
      text: "",
      detailText: "",
      question: "",
      tableData: [],
      catalogId: "",
      currentPage: 1,
      pageSize: 15,
      total: 0,
      multipleSelection: [], // table 列表选择内容
      title: "添加知识库文档",
      dialogFormVisible: false,
      editorOption: {},
      document: {
        ipt1: "", // 标题
        ipt2: "", // 内容
        ip3: "", // 来源
        option3: [],
        ipt4: "", // 描述
        ipt5: "", // 大类
        // 大类选型
        option5: [],
        ipt6: "", //小类
        // 小类选项
        option6: [],
        ipt7: "", // 维护人
        ipt8: "", // 上传时间
      },
      popData: {
        popShow: false,
        ipt: "",
        title: "修改",
      },
      // 点击树形菜单的tree
      clickData: {},
      fileList: [],
      attachments: [],
      isReadOnly: false,
    };
  },
  computed: {
    changeScreenHeight() {
      return 800;
    },
  },
  mounted() {
    this.getTreeData();
    this.queryCategoryByParentId(0).then((res) => {
      res.forEach((item) => {
        this.document.option5.push({
          label: item.category_name,
          value: item.id,
        });
      });
    });
    this.querySource();
  },
  watch: {},
  methods: {
    onFileChange(file, fileList) {
      this.attachments = [];
      let formdata = new FormData();
      formdata.append("file", file.raw);
      uploadFile(formdata).then((res) => {
        fileList.forEach((item) => {
          this.attachments.push({
            fileType: item.raw.type,
            orginalName: item.raw.name,
            serverAddr:
              "192.168.59.8:4000/file/" +
              res.data.data.bucketName +
              "-" +
              res.data.data.fileName,
            serverLocalAddr:
              res.data.data.bucketName + "-" + res.data.data.fileName,
          });
        });
      });
    },
    downloadFiles(file) {
      console.log(file);
      let url = file.response.data.serverAddr;
      var a = document.createElement("a"); // 创建a标签
      document.body.appendChild(a);
      a.setAttribute("download", file.response.data.orginalName); // download属性
      a.setAttribute("href", "http://" + url); // href链接
      a.click(); //
      document.body.removeChild(a);
    },
    // 修改分类
    edit(data) {
      this.popData.popShow = true;
      this.popData.ipt = data.text;
      this.popData.title = "修改";
      this.clickData = data;
    },
    // 新增分类
    addTree(data) {
      this.popData.popShow = true;
      this.popData.ipt = "";
      this.popData.title = "新增";
      this.clickData = data;
    },
    async delTree(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteCatalog(Number(data.id));
      });
    },
    // 删除数据
    async deleteCatalog(id) {
      let {
        data,
        data: { code },
      } = await delRepository({
        id,
      });
      if (code == 0) {
        this.getTreeData();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      } else {
        console.log("删除失败");
      }
    },
    // 确认修改或新增
    async confirm() {
      let fullName = this.clickData.node.full_name.replace(
        this.clickData.text,
        this.popData.ipt
      );
      if (this.popData.title == "修改") {
        this.updataTree(
          this.clickData.id,
          this.clickData.parentId,
          this.popData.ipt,
          fullName
        );
      } else {
        this.addCatalog(this.clickData.parentId, this.popData.ipt, fullName);
      }
    },
    // 新增分类
    async addCatalog(parentId, categoryName, fullName) {
      let {
        data,
        data: { code },
      } = await addRepository({
        parentId,
        categoryName,
        fullName,
      });
      if (code == 0) {
        this.getTreeData();
        this.popData.popShow = false;
        this.popData.ipt = "";
      } else {
        console.log("新增失败");
      }
    },
    // 更新分类
    async updataTree(id, parentId, categoryName, fullName) {
      let {
        data,
        data: { code },
      } = await updateRepository({
        id,
        parentId,
        categoryName,
        fullName,
      });
      if (code == 0) {
        this.getTreeData();
        this.popData.popShow = false;
        this.popData.ipt = "";
      } else {
        console.log("修改失败");
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
    // 点击树形菜单节点
    handleNodeClick(data) {
      this.par_text = "";
      this.text = "";
      if (
        data.text == "知识库" ||
        data.text == "基础知识" ||
        data.text == "规章规程" ||
        data.text == "案例" ||
        data.text == "智库"
      ) {
        return false;
      }
      this.catalogId = data.id;
      this.currentPage = 1;
      this.pageSize = 15;
      if (!data.children.length) {
        this.par_text = ">" + data.parentText;
        this.text = ">" + data.text;
      } else {
        this.text = ">" + data.text;
      }
      this.getTableData(this.catalogId, this.question, 15, 1);
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
    //设置列表的单选
    sigleSelect(selection, row) {
      this.$refs.multipleTableUser.clearSelection();
      this.$refs.multipleTableUser.toggleRowSelection(row, "selected");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // treeData 树形菜单数据
    async getTreeData() {
      let {
        data,
        data: { code },
      } = await getTree();
      if (code == 0) {
        this.treeData = [data.data];
      } else {
        console.log("知识库树形菜单数据获取失败");
      }
    },
    // 关闭弹窗清空数据
    closeEdit() {
      this.document.ipt1 = "";
      this.document.ipt2 = "";
      this.document.ipt3 = "";
      this.document.ipt4 = "";
      this.document.ipt5 = "";
      this.document.ipt6 = "";
      this.document.ipt7 = "";
      this.document.ipt8 = "";
      this.attachments = [];
      this.fileList = [];
      this.$refs.upload.clearFiles();
    },
    // tableData 列表数据获取
    async getTableData(catalogId, searchText, pageSize, pageNum) {
      let {
        data,
        data: { code },
      } = await getTable({
        catalogId,
        searchText,
        size: pageSize,
        current: pageNum,
      });
      if (code == 0) {
        this.tableData = data.data.records;
        this.total = data.data.total;
      }
    },
    // 删除文件
    async removeFile(filename) {
      let {
        data,
        data: { code },
      } = await remFile(filename);
      if (code == 0) {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      } else {
        console.log("删除失败");
      }
    },
    file_ero(data) {
      console.log(data);
    },
    handleRemove(file, fileList) {
      if (this.title == "查看知识库详情") {
        return this.$message.error("查看详情界面无法删除附件！");
      }
      this.removeFile(file.response.data.serverLocalAddr);
      this.attachments = [];
      fileList.forEach((item) => {
        this.attachments.push({
          fileType: item.response.data.fileType,
          orginalName: item.response.data.orginalName,
          serverAddr: item.response.data.serverAddr,
          serverLocalAddr: item.response.data.serverLocalAddr,
        });
      });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 知识库添加
    clickAdd() {
      this.dialogFormVisible = true;
      this.title = "添加知识库文档";
      // this.document.ipt7 = sessionStorage.getItem("username");
      this.document.ipt7 = "";
    },
    // 数据来源
    async querySource() {
      let {
        data,
        data: { code },
      } = await querySrc();
      if (code == 0) {
        data.data.forEach((item) => {
          this.document.option3.push({
            label: item.value,
            value: item.id,
          });
        });
      }
    },
    // 知识库文档新增和修改确认操作
    KnowledgeBaseConfirm() {
      if (
        !this.document.ipt1 ||
        !this.document.ipt2 ||
        !this.document.ipt3 ||
        !this.document.ipt4 ||
        !this.document.ipt5 ||
        !this.document.ipt6 ||
        !this.document.ipt7
      ) {
        this.$message.error("请输入完整信息");
        return false;
      }
      if (this.attachments.length) {
        if (!this.document.ipt8) {
          this.$message.error("请选择上传时间");
          return false;
        }
      }
      let [expertKnowledgeBase, attachments] = [{}, []];
      expertKnowledgeBase.title = this.document.ipt1.trim();
      expertKnowledgeBase.content = this.document.ipt2;
      expertKnowledgeBase.summary = "";
      expertKnowledgeBase.sourceId = this.document.ipt3;
      expertKnowledgeBase.desc = this.document.ipt4;
      expertKnowledgeBase.topCategoryId = this.document.ipt5;
      expertKnowledgeBase.categoryId = this.document.ipt6;
      expertKnowledgeBase.userName = this.document.ipt7;
      expertKnowledgeBase.createTime = this.document.ipt8;
      if (this.title == "添加知识库文档") {
        this.addKnowledgeBase(expertKnowledgeBase, this.attachments).then(
          () => {
            this.dialogFormVisible = false;
          }
        );
      } else {
        expertKnowledgeBase.id = this.multipleSelection[0].id;
        this.updateKnowledgeBase(expertKnowledgeBase, this.attachments).then(
          () => {
            this.dialogFormVisible = false;
          }
        );
      }
    },
    // 获取大类数据和小类数据
    async queryCategoryByParentId(parentId) {
      let {
        data,
        data: { code },
      } = await queryCategoryByPid({
        parentId,
      });
      if (code == 0) {
        return data.data;
      } else {
        console.log("获取大类或小类失败");
      }
    },
    // 切换大类选择小类
    async changeBig(id) {
      await this.queryCategoryByParentId(id).then((res) => {
        this.document.option6 = [];
        this.document.ipt6 = "";
        res.forEach((item) => {
          this.document.option6.push({
            label: item.category_name,
            value: item.id,
          });
        });
      });
    },
    // 添加知识文档
    async addKnowledgeBase(expertKnowledgeBase, attachments) {
      let {
        data,
        data: { code },
      } = await addBase({
        expertKnowledgeBase,
        attachments,
      });
      if (code == 0) {
        this.$message({
          type: "success",
          message: "新增成功!",
        });
      } else {
        console.log("新增失败");
      }
    },
    // 修改知识库
    async updateKnowledgeBase(expertKnowledgeBase, attachments) {
      let {
        data,
        data: { code },
      } = await updateBase({
        expertKnowledgeBase,
        attachments,
      });
      if (code == 0) {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
      } else {
        console.log("修改失败");
      }
    },
    // 删除点击
    clickDel() {
      if (!this.multipleSelection.length) {
        this.$message.error("请选择要删除的内容");
        return false;
      }
      let id = this.multipleSelection[0].id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteKnowledgeBase(id).then(() => {
          this.tableData.forEach((item, index) => {
            if (id == item.id) {
              this.tableData.splice(index, 1);
            }
          });
        });
      });
    },
    // 删除知识库记录
    async deleteKnowledgeBase(id) {
      let {
        data,
        data: { code },
      } = await deleteBase({
        id,
      });
      if (code == 0) {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      } else {
        this.$message.error("删除失败");
      }
    },
    // 点击修改按钮，知识库修改
    async clickModify() {
      if (!this.multipleSelection.length) {
        this.$message.error("请选择要修改的内容！！！");
        return false;
      }
      this.isReadOnly = false;
      this.title = "修改知识库文档";
      this.dialogFormVisible = true;
      let data = await this.getDetailData(this.multipleSelection[0].id);
      this.document.ipt1 = data.title;
      this.document.ipt2 = data.content;
      this.document.ipt3 = data.source_id;
      this.document.ipt4 = data.sourcedec;
      this.document.ipt5 = data.top_category_id;
      this.document.ipt7 = data.user_name;
      this.document.ipt8 = data.create_time;
      this.changeBig(data.top_category_id).then(() => {
        this.document.ipt6 = data.category_id;
      });
      data.attachments.forEach((item) => {
        let obj = {
          response: {
            data: {},
          },
        };
        obj.name = item.file_name;
        obj.url = item.file_path_nginx;
        obj.response.data.id = item.id;
        obj.response.data.fileType = item.file_type;
        obj.response.data.orginalName = item.file_name;
        obj.response.data.serverAddr = item.file_path_nginx;
        obj.response.data.serverLocalAddr = item.file_path_server;
        this.fileList.push(obj);
      });
      this.fileList.forEach((item) => {
        this.attachments.push({
          fileType: item.response.data.fileType,
          orginalName: item.response.data.orginalName,
          serverAddr: item.response.data.serverAddr,
          serverLocalAddr: item.response.data.serverLocalAddr,
        });
      });
    },
    // 点击标题查看详情
    async getTitleDetail(val) {
      this.title = "查看知识库详情";
      this.isReadOnly = true;
      this.dialogFormVisible = true;
      let { id } = val;
      let data = await this.getDetailData(id);
      this.document.ipt1 = data.title;
      this.document.ipt2 = data.content;
      this.document.ipt3 = data.source_id;
      this.document.ipt4 = data.sourcedec;
      this.document.ipt5 = data.top_category_id;
      this.document.ipt7 = data.user_name;
      this.document.ipt8 = data.create_time;
      this.changeBig(data.top_category_id).then(() => {
        this.document.ipt6 = data.category_id;
      });
      data.attachments.forEach((item) => {
        let obj = {
          response: {
            data: {},
          },
        };
        obj.name = item.file_name;
        obj.url = item.file_path_nginx;
        obj.response.data.id = item.id;
        obj.response.data.fileType = item.file_type;
        obj.response.data.orginalName = item.file_name;
        obj.response.data.serverAddr = item.file_path_nginx;
        obj.response.data.serverLocalAddr = item.file_path_server;
        this.fileList.push(obj);
      });
      this.fileList.forEach((item) => {
        this.attachments.push({
          fileType: item.response.data.fileType,
          orginalName: item.response.data.orginalName,
          serverAddr: item.response.data.serverAddr,
          serverLocalAddr: item.response.data.serverLocalAddr,
        });
      });
    },
    // 获取知识详情数据
    async getDetailData(id) {
      let {
        data,
        data: { code },
      } = await getDetail({
        id,
      });
      if (code == 0) {
        return data.data;
      }
    },
  },
};
</script>


<style lang="less" scoped>
.wrap {
  * {
    box-sizing: border-box;
  }
  background: #fff;
  .el-tree {
    font-size: 14px;
    .tool-box {
      margin-left: 10px;
      margin-bottom: 20px;
      .i {
        margin-right: 5px;
        &:hover {
          color: red;
        }
      }
    }
  }
  .realStates-content {
    padding: 20px 20px 0 20px;
    .nav {
      text-align: left;
      margin-bottom: 10px;
    }
    .tool-box {
      margin-bottom: 20px;
      text-align: left;
      font-size: 14px;
      position: relative;
      span {
        margin-right: 20px;
        span {
          cursor: pointer;
        }
      }
      .ipt-box {
        display: inline-block;
        width: 600px;
        position: absolute;
        right: 0;
        top: -8px;
      }
    }
  }
  .dialog {
    text-align: left;
    .head {
      text-align: left;
      margin-bottom: 10px;
      position: relative;
      .title {
        width: 12%;
        height: 40px;
        padding: 0 10px;
        line-height: 40px;
        text-align: right;
        i {
          color: red;
          margin-right: 5px;
        }
      }
      .ipt {
        width: 88%;
      }
      .positionTilte {
        height: 40px;
        line-height: 40px;
        position: absolute;
        top: 0;
        right: 220px;
      }
      .position {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  .upload-demo {
    padding: 0 20px;
  }
}
</style>
<style lang="less">
.el-pager li {
  background: #fff !important;
}
.headerRowStyle {
  .el-checkbox__inner {
    display: none !important;
  }
}
.repositoryMaintain {
  .el-dialog {
    width: 650px;
  }
  .jj {
    .el-input {
      width: 214px;
    }
  }
  .position {
    .el-input {
      width: 214px;
    }
  }
  .source {
    .el-input {
      width: 214px;
    }
  }
}
.dialog {
  background-color: transparent !important;
}
</style>

