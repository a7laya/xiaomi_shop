import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 引入全局组件

import divider from "@/components/common/divider.vue"
import price   from "@/components/common/price.vue"

Vue.component('divider', divider)
Vue.component('price', price)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
