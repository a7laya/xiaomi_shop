export default {
	state: {
		number: 1,
		list: [
			{
				id:1,
				name:"商品1",
				status: false,
				num:1
			},
			{
				id:2,
				name:"商品2",
				status: true,
				num:10
			},
			{
				id:3,
				name:"商品3",
				status: false,
				num:15
			},
			{
				id:4,
				name:"商品4",
				status: true,
				num:3
			},
			{
				id:5,
				name:"商品5",
				status: true,
				num:5
			},
			{
				id:6,
				name:"商品6",
				status: true,
				num:6
			}
		]
	},
	// 相当于计算属性computed
	getters: {
		activeList2: (state) => {
			return state.list.filter(v => v.status)
		},
		noactiveList2: (state) => {
			return state.list.filter(v => v.status === false)
		},
		getList2: (state, getters) => {
			return getters.activeList.filter(v => v.num > 5)
		},
		getById2: (state) => (id) => {
			// return state.list.filter( v => v.id === id)
			return 'cart2_getter'+id
		}
	},
	// 同步方法 和methods差不多
	mutations: {
		inc(state,n) {
		console.log('cart2_mutations',n)
			state.number += n
		}
	},
	// 异步方法
	actions: {
		asyncInc({ commit,state },n) {
			console.log('cart2_actions',n);
			setInterval(()=>{
				// 相当于this.$store.commit()
				commit('inc',n)
				console.log(state.number);
			},2000)
		}
	}
}