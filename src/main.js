import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import './styles/index.scss' // global css
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from './store/index'
import router from './router/index'
import './utils/permission'
Vue.use(VueQuillEditor)

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')

function ajax(url,cb){}
Promise.wrap = function(fn){
  return function(){
    let args = [].slice.call(arguments)
    return new Promise((resolve,reject)=>{
      fn.apply(null,args.concat(function(err,data){
        if(err){
          reject(err)
        }
        else {
          resolve(data)
        }
      }))
    })
  }
}