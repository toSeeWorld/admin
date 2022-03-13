<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form
          label-position="left"
          label-width="80px"
          :model="formLogin"
          :rules="rules"
          size="small"
          ref="formLogin"
        >
          <!-- $refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。 -->
          <el-form-item label="账号" prop="name">
            <el-input v-model="formLogin.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formLogin.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="login"
              >登录</el-button
            >
            <el-button size="small" @click="resetForm">取消</el-button>
          </el-form-item>
          <el-form-item>
            <router-link to="/register">
              <el-button size="small"
                >没有账号，立即注册<i
                  class="el-icon-arrow-right el-icon--right"
                ></i
              ></el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script type="text/javascript">
import { signin } from "../../api/index";
import {mapMutations} from 'vuex'
export default {
  data() {
    let checkUserName = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("账户不能为空!"));
      } else {
        cb(); // 将判断传递给后面
      }
    };
    let checkPassword = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("密码不能为空!"));
      } else {
        cb();
      }
    };
    return {
      formLogin: {
        name: "",
        password: "",
        checkPassword: "",
      },
      rules: {
        name: [{ validator: checkUserName, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations('user',['setUserName','setUserAdmin']),
    // 向登录接口发起请求
    login() {
      let user = this.formLogin;
      let formData = {
        name: user.name,
        password: user.password,
      };
      // 表单验证
      this.$refs["formLogin"].validate((valid) => {
        if (valid) {
          // 通过验证之后才请求登录接口
          signin(formData).then(({result}) => {
            console.log('isAdmin',result.isAdmin);
            this.setUserName(result.name)
            this.setUserAdmin(result.isAdmin)
            sessionStorage.setItem("ririxue-isLogin",JSON.stringify(result))
            this.$router.push("/");
          });
        } else {
          this.$message.error("表单验证失败!");
          return false;
        }
      });
    },
    // 表单重置
    resetForm() {
      console.log("session");
      this.$refs["formLogin"].resetFields();
    },
  },
};
</script>