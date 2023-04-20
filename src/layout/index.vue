<template>
  <div style="height: 100vh; overflow-y: hidden;">
    <!-- 顶部固定部分 -->
    <div class="main">
      <div class="header">
        <h1>
          <el-image
            style="width: 40px; height: 40px;"
            :src="require('@/assets/images/logo.svg')"
          ></el-image>
          <span>数据云超市</span>
        </h1>
        <div class="user">
          <router-link active-class="active" to="/login">登录</router-link>
          <router-link active-class="active" to="/register">注册</router-link>
        </div>
      </div>
      <div
        style="
          background-color: #f0f2f3;
          height: 10px;
          box-shadow: 0px 1px 3px 0.5px rgba(39, 85, 145, 0.12) inset;
        "
      ></div>
      <div class="searchBox">
        <span>联友数据生态</span>
        <el-input
          placeholder="请输入"
          v-model="searchInput"
          class="searchInput"
          @keyup.enter.native="search"
          style="width: 60%;"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="search"
          ></i>
        </el-input>
      </div>
    </div>
    <!-- 组件内容 -->
    <div class="content">
      <!--<router-view />-->
      <app-main />
    </div>
    <!--
    <div class="footer">
      <div>
        <span>帮助</span>
        <span>隐私</span>
        <span>条款</span>
      </div>
      <span>copyright © 深圳联友科技有限公司</span>
    </div>
    -->
  </div>
</template>

<script>
import { AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
export default {
  name: 'Layout',
  components: {
    AppMain,
  },
  mixins: [ResizeMixin],
  computed: {
    // sidebar() {
    //   return this.$store.state.app.sidebar
    // },
    // device() {
    //   return this.$store.state.app.device
    // },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      }
    },
  },
  data() {
    return {
      searchInput: '',
    }
  },
  methods: {
    search() {
      this.$message.info(`${this.searchInput}`)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.main {
  /*吸顶效果*/
  position: sticky;
  position: -webkit-sticky; //!*兼容 -webkit 内核的浏览器*!
  top: 0px;
  background-color: #fff;
  margin-bottom: 20px;
  z-index: 999;
}
.header {
  display: flex;
  line-height: 52px;
  justify-content: space-between;
  height: 50px;
  padding: 0 10px;
  // box-shadow: 0px 0px 15px 0px rgba(39, 85, 145, 0.12);
}
h1 {
  display: flex;
  align-items: center;
  font-size: 16px;
}
.user {
  :nth-child(n) {
    margin-right: 8px;
  }
}

.active {
  color: #608bd2;
  pointer-events: none;
  opacity: 1;
}
.searchBox {
  height: 50px;
  margin: 15px;
  // padding: 10px;
  border: 1px dashed #dedede;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-right: 10px;
    font-weight: 900;
  }
}
.content {
  display: flex;
  width: 100%;
  height: 100%;
}
.footer {
  padding-bottom: 10px;
  text-align: center;
}
/deep/ .searchInput .el-input__inner {
  border-radius: 35px;
  border: 1px solid #839bd2;
  height: 35px;
  padding: 10px;
}
/deep/ .searchInput .el-input__icon {
  line-height: 23px;
  color: #839bd2;
}
</style>
