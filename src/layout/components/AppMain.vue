<template>
  <section :style="autoHeight" class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
    <!--<go-top />-->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      clientHeight: '',
      autoHeight: {
        height: '',
      },
    }
  },
  computed: {
    key() {
      return this.$route.path
    },
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    },
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`
    }
  },
  methods: {
    //  动态修改container高度
    changeFixed(clientHeight) {
      this.autoHeight.height = clientHeight - 110 + 'px'
    },
  },
}
</script>

<style></style>

<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 155px) !important;
  // height: 395px !important;
  width: 100%;
  padding: 0px 15px 1px;
  position: relative;
  overflow-y: auto;
}
.fixed-header + .app-main {
  margin-top: 50px;
}
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    // padding-right: 15px;
  }
}
</style>
