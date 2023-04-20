<template>
  <div class="login-container">
    <div id="building"></div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
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
      </div>
      <div class="content">
        <div class="label">注册</div>
        <el-form-item prop="phone">
          <el-input
            ref="phone"
            v-model="loginForm.phone"
            placeholder="手机号"
            name="phone"
            type="text"
            tabindex="1"
            auto-complete="on"
            clearable
          >
            <svg-icon slot="prefix" icon-class="user" />
          </el-input>
        </el-form-item>
        <el-form-item prop="verificationCode">
          <div style="display: flex; align-items: center;">
            <el-input
              ref="verificationCode"
              v-model="loginForm.verificationCode"
              placeholder="6位短信验证码"
              name="verificationCode"
              tabindex="2"
              clearable
              @keyup.enter.native="register"
              style="width: 60%; margin-left: 33px;"
            >
              <svg-icon slot="prefix" icon-class="guide" />
            </el-input>
            <el-button
              v-if="codeShow"
              class="verificationBtn"
              type="primary"
              @click="sendCode"
            >
              发送验证码
            </el-button>
            <el-button v-if="!codeShow" class="verificationBtn">
              {{ count }}秒后重试
            </el-button>
          </div>
        </el-form-item>
        <el-form-item prop="password" v-show="passwordShow">
          <el-input
            ref="password"
            v-model="loginForm.password"
            placeholder="密码，至少输入8位，字母/数字组合"
            name="password"
            :type="passwordType"
            tabindex="3"
            auto-complete="on"
            clearable
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
          class="registerBtn"
          @click="register"
        >
          注册
        </el-button>
        <div style="margin-bottom: 15px; height: 40px;">
          已有账号，
          <router-link style="color: #66b1ff;" to="/login">
            直接登录
          </router-link>
        </div>
      </div>
      <!--
      <div class="tips">
        <a href="javascript:;" @click="forgetPassword">忘记密码</a>
      </div>
      -->
    </el-form>
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
// import { validUser } from '@/utils/validate'
import { forgetPassword, login } from '@/api/user'
// import store from '@/store'
export default {
  name: 'Login',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户账号'))
      }
      if (
        !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          value,
        )
      ) {
        callback(new Error('账号格式有误，请重新输入'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('密码格式不正确(数字+字母不少于8位)'))
      } else {
        callback()
      }
    }
    const validateVerificationCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'))
      }
      if (!/^\d{6}$/.test(value)) {
        callback(new Error('验证码格式错误'))
      } else {
        callback()
      }
    }
    // 123456@qq.com  12345678
    return {
      passwordShow: false, //显示设置密码输入框
      codeShow: true, //显示获取验证码按钮（false：60s倒计时
      count: '', //倒计时计数
      verificationCode: null, //验证码
      loginForm: {
        phone: '',
        verificationCode: '',
        password: '',
      },
      loginRules: {
        phone: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePhone,
            message: '请输入手机号',
          },
        ],
        verificationCode: [
          {
            required: true,
            trigger: 'blur',
            // message: '请输入验证码',
            validator: validateVerificationCode,
          },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入密码',
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
    //密码显示-隐藏切换
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
    //获取验证码
    sendCode() {
      let res = Math.random().toFixed(6).slice(-6)
      //60s后重新获取
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.codeShow = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.codeShow = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
      this.verificationCode = res
      this.passwordShow = true
      this.$message.info(res)
    },
    //注册
    async register() {
      this.$refs.loginForm.validate((valid, item) => {
        //显示密码输入
        if (!this.passwordShow) {
          this.passwordShow = true
          return
        }
        if (valid) {
          if (this.loginForm.verificationCode == this.verificationCode) {
            this.$message.success('账号注册成功！')
            this.$router.push('/login')
          } else {
            this.$message.error('验证码错误请重新输入！')
          }
        } else {
          this.$message.warning('请完善表单！')
        }
      })
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
        console.log('email', value)
        await forgetPassword({ email: value })
        this.$message.success('已发送至你的邮箱: ' + value + '请查收！')
      })
    },
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    // height: 35px;
    width: 85%;

    input {
      //   background: transparent;
      //   border: 0px;
      //   height: 30px;
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
//背景图
#building {
  background: url('../../assets/images/loginImg.jpg');
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
//整体大背景
.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: #f5f7fa;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 60px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  //发送验证码按钮
  .verificationBtn {
    margin-left: 10px;
    height: 40px;
  }
  //注册按钮
  .registerBtn {
    width: 85%;
    margin-bottom: 15px;
    height: 40px;
    border-radius: 30px;
    border: none;
    background-image: linear-gradient(75deg, #91ffff 0, #6681f5 100%);
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
  //全部标题
  .title-container {
    display: flex;
    flex-direction: column;
    align-items: center; //侧轴居中
    justify-content: center; //主轴居中
    // color: #3e3939;
    // margin: 0px auto 10px auto;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #201b4f;
    background-image: linear-gradient(180deg, #404040 0, #1e1e1e 100%),
      linear-gradient(126deg, #201b4f 15%, #0b0930 100%);
    border-radius: 12px 12px 0 0;
    box-shadow: 0 2px 7px 0 #211b4f;
  }
  //大标题
  .title {
    display: flex;
    font-size: 26px;
    // color: #3e3939;
    color: #fff;
    margin: 0px auto 10px auto;
    font-weight: 900;
    :nth-child(1) {
      margin-right: 5px;
    }
  }
  .content {
    background: #fff;
    border-radius: 0 0 12px 12px;
    // box-shadow: 0px 1px 3px 0.5px #211b4f;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
    padding-top: 15px;
  }
  .label {
    text-align: center;
    font-weight: 900;
    font-size: 16px;
    margin-bottom: 10px;
  }
}
::v-deep .svg-icon {
  margin-left: 5px;
}
::v-deep .el-form-item__error {
  left: 33px;
}
</style>
