import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import './assets/css/base.css'
import '@/icons' // icon
ElementUI.Dialog.props.lockScroll.default = false // 打开弹窗防止页面抖动
ElementUI.Dialog.props.closeOnClickModal.default = false // 打开弹窗防止误关
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
