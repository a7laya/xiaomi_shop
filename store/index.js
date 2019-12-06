import Vue  from "vue"
import Vuex from "vuex"
import cart from "@/store/modules/cart.js"
import cart2 from "@/store/modules/cart2.js"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		cart,cart2
	}
})