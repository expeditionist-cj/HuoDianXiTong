<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <template>
        <el-tabs @tab-click="switchTab">
          <el-tab-pane label="信息管理" name="userManager" />
          <el-tab-pane label="密码管理" name="passwordManager" />
        </el-tabs>
      </template>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form
              :model="ruleForm2"
              :rules="rules2"
              ref="ruleForm2"
              label-width="100px"
              v-if="switchStatus === 'userManager'"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  type="text"
                  v-model="ruleForm2.username"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input
                  v-model="ruleForm2.phone"
                  placeholder="验证码登录使用"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')"
                  >提交
                </el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>

            <!-- 密码管理 -->
            <el-form
              :model="ruleForm2"
              :rules="rules2"
              ref="ruleForm2"
              label-width="100px"
              v-if="switchStatus === 'passwordManager'"
              class="demo-ruleForm"
            >
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="ruleForm2.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newpassword1">
                <el-input
                  type="password"
                  v-model="ruleForm2.newpassword1"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item style="display:none"  label="确认密码" prop="age">
                <el-input v-model="ruleForm2.age"></el-input>
              </el-form-item>

              <el-form-item label="确认密码" prop="newpassword2">
                <el-input type="password" v-model="ruleForm2.newpassword2"></el-input>
              </el-form-item>

              <!-- 提交 -->
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')"
                  >提交
                </el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import { openWindow } from "@/util/util";
import { mapState } from "vuex";
import store from "@/store";
import request from "@/router/axios";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (this.ruleForm2.newpassword2 !== "") {
        if (value !== this.ruleForm2.newpassword1) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      } else {
        callback(new Error("确认密码不能为空"));
      }
    };
    var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };

    return {
      switchStatus: "",
      avatarUrl: "",
      show: false,
      headers: {
        Authorization: "Bearer " + store.getters.access_token
      },
      ruleForm2: {
        username: "",
        password: "",
        newpassword1: "",
        newpassword2: "",
        avatar: "",
        phone: "",
        age:""
      },
      ruleForm1:{
        username: "",
        password: "",
      },
      rules2: {
      	phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {validator: checkPhone, trigger: 'blur'}
        ],
        
        password: [
          {
            required: true,
            min: 6,
            message: "原密码不能为空且不少于6位",
            trigger: "blur"
          }
        ],
        
        newpassword1: [
          {
            required: true,
            min: 6,
            message: "新密码不能为空且不少于6",
            trigger: "blur",
            // validator: validatePass
          }
        ],
        newpassword2: [
          {
            required: true,
            min: 6,
            // message: "密码不能为空且不少于6",
            trigger: "blur",
            validator: validatePass
          }
        ],
        age: [
          {
            required: false,
            min: 6,
            // message: "密码不能为空且不少于6",
            trigger: "blur",
            // validator: validatePass
          }
        ],
      }
    };
  },
  created() {
    this.ruleForm2.username = this.userInfo.username;
    this.ruleForm2.phone = this.userInfo.phone;
    this.ruleForm2.avatar = this.userInfo.avatar;
    this.switchStatus = "userManager";
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    switchTab(tab) {
      if (tab.name === "userManager") {
      }
      this.switchStatus = tab.name;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          request({
            url: "/admin/user/edit",
            method: "put",
            data: this.ruleForm2
          })
            .then(response => {
              if (response.data.data) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 2000
                });
                // 修改密码之后强制重新登录
                if (this.switchStatus === "passwordManager") {
                  this.$store.dispatch("LogOut").then(() => {
                    location.reload(); // 为了重新实例化vue-router对象 避免bug
                  });
                }
              } else {
                this.$message({
                  message: response.data.msg,
                  type: "error",
                  duration: 2000
                });
              }
            })
            .catch(() => {
              this.$message({
                message: "修改失败",
                type: "error",
                duration: 2000
              });
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClick(thirdpart) {
      let appid, client_id, redirect_uri, url;
      redirect_uri = encodeURIComponent(
        window.location.origin + "/#/authredirect"
      );
      if (thirdpart === "wechat") {
        appid = "wxd1678d3f83b1d83a";
        url =
          "https://open.weixin.qq.com/connect/qrconnect?appid=" +
          appid +
          "&redirect_uri=" +
          redirect_uri +
          "&state=WX-BIND&response_type=code&scope=snsapi_login#wechat_redirect";
      } else if (thirdpart === "tencent") {
        client_id = "101322838";
        url =
          "https://graph.qq.com/oauth2.0/authorize?response_type=code&state=QQ-BIND&client_id=" +
          client_id +
          "&redirect_uri=" +
          redirect_uri;
      } else if (thirdpart === "gitee") {
        client_id =
          "8fc54e0e76e7842cf767c3ae3b9fdc48c03cefed27aa565ff7b2a39d142d9892";
        url =
          "https://gitee.com/oauth/authorize?response_type=code&state=GITEE--BIND&client_id=" +
          client_id +
          "&redirect_uri=" +
          redirect_uri;
      } else if (thirdpart === "osc") {
        client_id = "neIIqlwGsjsfsA6uxNqD";
        url =
          "https://www.oschina.net/action/oauth2/authorize?response_type=code&client_id=" +
          client_id +
          "&state=OSC-BIND&redirect_uri=" +
          redirect_uri;
      }
      openWindow(url, thirdpart, 540, 540);
    },
    handleAvatarSuccess(res, file) {
      this.avatarUrl = URL.createObjectURL(file.raw);
      this.ruleForm2.avatar = res.data.bucketName + "-" + res.data.fileName;
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px !important;
  color: #8c939d !important;
  width: 178px !important;
  height: 178px !important;
  line-height: 178px !important;
  text-align: center !important;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
