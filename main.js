import Vue from 'vue'
import App from './App'
// 引入Vuex
import store from './store'
// 引入封装好的request请求
import request from "./common/lib/request.js"

// 设定Vuex
Vue.prototype.$store = store

// 设定request
Vue.prototype.$H = request

Vue.config.productionTip = false

// 引入全局组件
// 引入分割线组件
import divider from "@/components/common/divider.vue"
Vue.component('divider', divider)
// 引入全局加动画组件
import loading from "@/components/common/loading.vue"
Vue.component('loading', loading)

import loadingPlus   from '@/components/common/mixin/loading-plus.vue'
Vue.component('loading-plus', loadingPlus)

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
