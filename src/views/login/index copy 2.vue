<template>
  <div
    class="login-container"
    :style="{
      background: detailShow ? '#fff' : '#f7edd5',
    }"
  >
    <Transition name="slide-up" mode="out-in" v-if="!detailShow">
      <div class="login-box" key="login">
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
            style="
              width: 1.5px;
              border-left: 1px #dcdfe6 solid;
              margin: 0 30px;
            "
          ></div>
          <Transition name="slide" mode="out-in">
            <div class="rightBox" v-if="loginShow" key="isLogin">
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
                    :icon-class="
                      passwordType === 'password' ? 'eye' : 'eye-open'
                    "
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
                  style="color: #409eff; cursor: pointer;"
                  @click="forgetPassword"
                >
                  找回密码
                </a>
                |
                <span
                  style="color: #409eff; cursor: pointer;"
                  @click="loginShow = false"
                >
                  快速注册
                </span>
              </div>
            </div>
            <div class="rightBox" v-else key="isRegister">
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
              <div class="label">注 册</div>
              <el-form-item prop="phone">
                <el-input
                  class="inputDeep"
                  ref="phone"
                  v-model="loginForm.phone"
                  placeholder="手机号"
                  name="phone"
                  type="text"
                  tabindex="3"
                  auto-complete="on"
                  clearable
                >
                  <svg-icon slot="prefix" icon-class="user" />
                </el-input>
              </el-form-item>
              <el-form-item prop="verificationCode">
                <div style="display: flex;">
                  <el-input
                    class="inputDeep"
                    ref="verificationCode"
                    v-model="loginForm.verificationCode"
                    placeholder="6位短信验证码"
                    name="verificationCode"
                    tabindex="4"
                    clearable
                    @keyup.enter.native="register"
                  >
                    <svg-icon slot="prefix" icon-class="guide" />
                  </el-input>
                  <el-button
                    v-if="codeShow"
                    class="verificationBtn"
                    type="text"
                    @click="sendCode"
                  >
                    发送验证码
                  </el-button>
                  <el-button
                    type="text"
                    v-if="!codeShow"
                    class="verificationBtn"
                  >
                    {{ count }}秒后重试
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item prop="password" v-show="passwordShow">
                <el-input
                  class="inputDeep"
                  ref="password"
                  v-model="loginForm.password"
                  placeholder="密码，至少输入8位，字母/数字组合"
                  name="password"
                  :type="passwordType"
                  tabindex="2"
                  auto-complete="on"
                  clearable
                >
                  <svg-icon slot="prefix" icon-class="password" />
                  <svg-icon
                    style="margin-right: 10px;"
                    :icon-class="
                      passwordType === 'password' ? 'eye' : 'eye-open'
                    "
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
                注 册
              </el-button>
              <div style="">
                已有账号，
                <span
                  style="color: #409eff; cursor: pointer;"
                  @click="loginShow = true"
                >
                  直接登录
                </span>
              </div>
            </div>
          </Transition>
        </el-form>
        <div class="goDetail" @click="detailShow = true" key="detail">
          点击查看详情
          <!-- require('@/assets/images/down.png') -->
          <el-image
            style="width: 50px; height: 50px;"
            :src="require('@/assets/images/down1.gif')"
          ></el-image>
        </div>
      </div>
    </Transition>

    <Transition name="slide-down" mode="out-in" v-else>
      <div class="detail-box">
        <el-button type="primary" class="goLogin" @click="detailShow = false">
          返回登录页
        </el-button>
        <div>826826</div>
      </div>
    </Transition>

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
      if (value.length < 8) {
        callback(new Error('密码格式不正确(数字+字母不少于8位)'))
      } else {
        callback()
      }
    }
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
      detailShow: false, //显示详情页
      loginShow: true, //显示登录
      passwordShow: false, //显示设置密码输入框
      codeShow: true, //显示获取验证码按钮（false：60s倒计时
      count: '', //倒计时计数
      verificationCode: null, //验证码
      loginForm: {
        id: '',
        password: '',
        phone: '',
        verificationCode: '',
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
    //获取验证码
    sendCode() {
      this.$refs.loginForm.validate((valid, item) => {
        if (item.phone) {
          this.$message.warning('请输入手机号！')
        } else {
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
        }
      })
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
        // console.log(res, '登录返回')
        // if (res) {
        //   this.$router.push('/crowdControl')
        // }
      }
    },

    forgetPassword() {
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

<style lang="scss" scoped>
//整体大背景
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  width: 100%;
  // background: #f7edd5;
  .login-box {
    // position: absolute;
    // top: 60px;
    width: 80%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    //登录表单框
    .login-form {
      display: flex;
      padding: 30px;
      margin-bottom: 20px;
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
    //发送验证码按钮
    .verificationBtn {
      position: relative;
      top: 12px;
      margin-left: 10px;
      height: 40px;
    }
    //查看详情按钮
    .goDetail {
      display: flex;
      flex-direction: column;
      align-items: center;
      opacity: 0.2;
      font-size: 14px;
      color: #333;
      cursor: pointer;
    }
    .goDetail:hover {
      opacity: 0.7;
      font-size: 16px;
      color: #333;
    }
  }
  .detail-box {
  }
  //返回登录页按钮
  .goLogin {
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 999;
  }
  //产品介绍页动画设置
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: all 0.5s ease-out;
  }
  .slide-down-enter-from {
    opacity: 0;
    transform: translateY(100%);
  }
  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }
  //login页动画设置
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.5s ease;
  }
  .slide-up-enter-from {
    opacity: 0;
    transform: translateY(-100%);
  }
  .slide-up-leave-to {
    opacity: 0;
    transform: translateY(800px);
  }
  //登录-注册动画设置
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s ease;
  }
  .slide-enter-from {
    opacity: 0;
    transform: translatex(50%);
  }
  .slide-leave-to {
    opacity: 0;
    transform: translatex(-10%);
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
  ::v-deep .el-input {
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
//轮播图
.el-carousel__item {
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
