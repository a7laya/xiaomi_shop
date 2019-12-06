import Vue from 'vue'
import App from './App'
// 引入Vuex
import store from './store'

// 引入Vuex
Vue.prototype.$store = store

Vue.config.productionTip = false

// 引入全局组件
// 引入分割线组件
import divider from "@/components/common/divider.vue"
Vue.component('divider', divider)
// 引入全局加动画组件
import loading from "@/components/common/loading.vue"
Vue.component('loading', loading)

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
