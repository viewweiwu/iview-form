import Vue from 'vue'
import App from './App'
import iView from 'iview'
import ElementUI from 'element-ui'
import VueHighlightJS from 'vue-highlight.js'
import 'iview/dist/styles/iview.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'highlight.js/styles/ocean.css'

Vue.use(iView)
Vue.use(ElementUI)
Vue.use(VueHighlightJS)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app-container',
  components: { App },
  template: '<App/>'
})