<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/crowdControl"
      >
        <img v-if="logo" :src="logo1" class="sidebar-logo1" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link
        v-else
        key="expand"
        class="sidebar-logo-link"
        to="/crowdControl"
      >
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <!--<h1 class="sidebar-title">{{ title }}</h1>-->
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: 'Audience',
      // logo: require('../../../assets/images/log.png'),
      logo: require('../../../assets/images/lanyou.png'),
      logo1: require('../../../assets/images/log.png'),
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #e9f2ff;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    //logo--菜单展开时
    & .sidebar-logo {
      width: 100px;
      height: 32px;
      vertical-align: middle;
      // margin-right: 12px;
    }
    //logo--菜单收起时
    & .sidebar-logo1 {
      width: 35px;
      height: 35px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 12px;
      font-family: Avenir, PingFang SC, SourceHanSansCN, Arial, Helvetica,
        sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
