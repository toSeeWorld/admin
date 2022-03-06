import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import './styles/index.scss' // global css
import store from './store/index'
import router from './router/index'
Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
