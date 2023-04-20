<template>
  <div id="wrap" :style="{ height: screenHeight + 'px' }">
    <div id="main" :style="{ top: nowTop + 'px' }">
      <ul id="pageUl" type="circle">
        <li
          v-for="(item, index) in pageNum"
          :key="'pageUlLi' + index"
          :id="'pageUlLi' + index"
          class="pageUlLi"
          :class="{ active: curIndex == index + 1 }"
          @click="toPage(index + 1)"
        >
          &nbsp;
        </li>
      </ul>
      <div
        v-for="(item, index) in pageNum"
        :key="'pageUlLi' + index"
        :id="'page' + index"
        class="page"
      >
        <slot :name="'slot' + (index + 1)"></slot>
      </div>
      <div class="goFirst" v-show="backTop && curIndex != 1" @click="toPage(1)">
        <img
          src="@/assets/images/goTop1.svg"
          style="width: 35px; height: 35px;"
        />
        <div>
          返回首页
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    //总页数
    pageNum: {
      type: Number,
      default: 0,
    },
    //是否显示返回首页按钮
    backTop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      screenWeight: 0, // 屏幕宽度
      screenHeight: 0, // 屏幕高度
      index: 1, // 用于判断翻页
      curIndex: 1, // 当前页的index
      startTime: 0, // 翻屏起始时间
      endTime: 0, // 上一次翻屏结束时间
      nowTop: 0, // 翻屏后top的位置
      main: Object,
      obj: Object,
    }
  },
  mounted() {
    this.screenWeight = document.documentElement.clientWidth
    this.screenHeight = document.documentElement.clientHeight
    this.main = document.getElementById('main')
    this.obj = document.getElementsByTagName('div')
    for (let i = 0; i < this.obj.length; i++) {
      if (this.obj[i].className == 'page') {
        this.obj[i].style.height = this.screenHeight + 'px'
      }
    }
    this.pageNum = document.querySelectorAll('.page').length
    // 浏览器兼容
    if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
      document.addEventListener('DOMMouseScroll', this.scrollFun, false)
    } else if (document.addEventListener) {
      document.addEventListener('mousewheel', this.scrollFun, false)
    } else if (document.attachEvent) {
      document.attachEvent('onmousewheel', this.scrollFun)
    } else {
      document.onmousewheel = this.scrollFun
    }
  },
  methods: {
    scrollFun(event) {
      this.startTime = new Date().getTime()
      // mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
      // DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动
      let delta = event.detail || -event.wheelDelta
      // 如果当前滚动开始时间和上次滚动结束时间的差值小于1s，则不执行翻页动作，这样做是为了实现类似节流的效果
      if (this.startTime - this.endTime > 1000) {
        if (
          delta > 0 &&
          parseInt(this.main.offsetTop) >=
            -(this.screenHeight * (this.pageNum - 2))
        ) {
          // 向下滚动
          this.index++
          this.toPage(this.index)
        } else if (delta < 0 && parseInt(this.main.offsetTop) < 0) {
          // 向上滚动
          this.index--
          this.toPage(this.index)
        }
        // 本次翻页结束，记录结束时间，用于下次判断
        this.endTime = new Date().getTime()
      }
    },
    // 翻页
    toPage(index) {
      if (index != this.curIndex) {
        let delta = index - this.curIndex
        this.nowTop = this.nowTop - delta * this.screenHeight
        this.curIndex = index
        this.index = index
      }
    },
  },
}
</script>
<style lang="scss" scoped>
html,
body {
  height: 100%;
}

body,
ul,
li,
a,
p,
div {
  /*慎删*/
  padding: 0px;
  margin: 0px;
}

#wrap {
  overflow: hidden;
  width: 100%;
}

#main {
  position: relative;
  transition: top 0.8s;
}

.page {
  /*谨删*/
  width: 100%;
  margin: 0;
}

#pageUl {
  position: fixed;
  right: 10px;
  bottom: 50%;
}
//当前页点颜色
.active {
  color: #f07451;
}
.goFirst {
  position: fixed;
  right: 50px;
  bottom: 50px;
  font-size: 12px;
  //   color: #3259ce;
  color: #f07451;
  opacity: 0.3;
  z-index: 999;
  cursor: pointer;
}
.goFirst:hover {
  opacity: 0.8;
}
</style>
