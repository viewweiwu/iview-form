import Vue from 'vue'
import App from './App'
import iView from 'iview'
import ElementUI from 'element-ui'
import 'iview/dist/styles/iview.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(iView)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app-container',
  components: { App },
  template: '<App/>'
})