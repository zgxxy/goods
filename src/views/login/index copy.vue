<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="leftBox">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in 3" :key="item">
            <div>{{ item }}</div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div
        style="width: 1.5px; border-left: 1px #dcdfe6 solid; margin: 0 30px;"
      ></div>
      <div class="rightBox">
        <div class="title">
          <span>
            <img
              src="@/assets/images/log.png"
              alt=""
              style="width: 35px; height: 35px;"
            />
          </span>
          <span>数据云超市</span>
        </div>
        <div class="label">登 录</div>
        <el-form-item prop="id">
          <el-input
            class="inputDeep"
            ref="id"
            v-model="loginForm.id"
            placeholder="账号"
            name="id"
            type="text"
            tabindex="1"
            auto-complete="on"
            clearable
          >
            <svg-icon slot="prefix" icon-class="user" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="inputDeep"
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            clearable
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="password" />
            <svg-icon
              style="margin-right: 10px;"
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              @click="showPwd"
              slot="suffix"
            />
          </el-input>
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          class="loginBtn"
          @click="handleLogin"
        >
          登 录
        </el-button>
        <div>
          <a
            href="javascript:;"
            style="color: #66b1ff; cursor: pointer;"
            @click="forgetPassword"
          >
            找回密码
          </a>
          |
          <router-link style="color: #66b1ff;" to="/register">
            快速注册
          </router-link>
        </div>
      </div>
      <!--
      <div class="tips">
        <a href="javascript:;" @click="forgetPassword">忘记密码</a>
      </div>
      -->
    </el-form>
    <el-button type="primary" class="loginBtn" @click="handleLogin">
      登 录
    </el-button>
    <!-- <div class="footer">
      <div>
        <span>帮助</span>
        <span>隐私</span>
        <span>条款</span>
      </div>
      <span>copyright © 深圳联友科技有限公司</span>
    </div> -->
  </div>
</template>

<script>
import { forgetPassword, login } from '@/api/user'
import store from '@/store'
export default {
  name: 'Login',
  data() {
    const validateUserEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户账号'))
      }
      if (
        !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)
      ) {
        callback(new Error('账号格式有误，请重新输入'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码格式不正确(数字+字母不少于8位)'))
      } else {
        callback()
      }
    }
    // 123456@qq.com  12345678
    return {
      loginForm: {
        id: '',
        password: '',
      },

      loginRules: {
        id: [
          // { required: true, trigger: 'blur', validator: validateUserEmail },
          { required: true, trigger: 'blur', message: '账户名不能为空' },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '密码不能为空',
            validator: validatePassword,
          },
        ],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    //登录
    async handleLogin() {
      let flag = true
      this.$refs.loginForm.validate((valid, item) => {
        if (!valid) {
          flag = false
        }
        if (
          this.loginForm.id != 'CDP2023' &&
          this.loginForm.password != 'Audience@237'
        ) {
          flag = false
          this.$message.error('账号或密码错误！')
        }
      })
      if (flag) {
        this.$router.push('/home')
        // let res = await this.$store.dispatch('user/login', this.loginForm)
        // console.log(res, '登陆返回')
        // if (res) {
        //   this.$router.push('/crowdControl')
        // }
      }
    },

    forgetPassword() {
      console.log('1')
      this.$prompt('请输入你的账号邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确',
      }).then(async ({ value }) => {
        // 向后台发送至你的邮箱
        console.log('id', value)
        await forgetPassword({ id: value })
        this.$message.success('已发送至你的邮箱: ' + value + '请查收！')
      })
    },
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fff;
$light_gray: #fff;
$cursor: #aaa;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    // height: 35px;
    // width: 85%;
    input {
      background: transparent;
      // border: 0px;
      // height: 30px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #aaa !important; //input框输入内容颜色
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 5px;
    // color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
//背景图
#building {
  // background: url('../../assets/images/loginImg.jpg');
  background: #f7edd5;
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
//整体大背景
.login-container {
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  min-height: 100%;
  width: 100%;
  background: #f7edd5;
  overflow: hidden;
  //登录表单框
  .login-form {
    position: relative;
    top: 60px;
    display: flex;
    width: 80%;
    height: 100%;
    padding: 30px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 0 6px 0 #e6d8ca;
  }
  .leftBox {
    flex: 1;
    // background-color: #fffaee;
  }
  .rightBox {
    flex: 1;
    // display: flex;
    // flex-direction: column;
    //大标题
    .title {
      display: flex;
      justify-content: center;
      font-size: 26px;
      color: #3e3939;
      margin: 0px auto 10px auto;
      font-weight: 900;
      :nth-child(1) {
        margin-right: 5px;
      }
    }
    .label {
      // text-align: left;
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  //登录按钮
  .loginBtn {
    width: 150px;
    margin-bottom: 15px;
    height: 40px;
    border-radius: 30px;
    border: none;
    background: #f07451;
    box-shadow: 0 7px 5px -2px #f0dad3;
  }
  //忘记密码
  .tips {
    float: right;
    font-size: 12px;
    color: #aaa;
    margin: 0 10px 10px 0;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  //底部帮助 隐私 条款（暂不使用）
  .footer {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10%;
    text-align: center;
    color: #fff;
  }

  //input框图标
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #909399;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
}
//修改输入框样式
.inputDeep ::v-deep .el-input__inner {
  border-radius: 0; // 去除圆角
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1.3px;
  // border-color: black; //边框的颜色
}
.el-carousel__item {
  // color: #475669;
  font-size: 14px;
  opacity: 0.8;
  // background-color: #fffaee;
  padding: 10px;
}

::v-deep .svg-icon {
  margin-left: 5px;
}
::v-deep .el-form-item__error {
  left: 33px;
}
</style>
