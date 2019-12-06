<template>
	<view>
		
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from "vuex"
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			// console.log(this.$store.state.list);
			// console.log("2=>",this.newList);
			// console.log("3=>",this.list);
			
			// console.log(this.$store.getters.activeList);
			// console.log("4=>",this.activeList);
			// console.log("5=>",this.noactiveList);
			// console.log("6=>",JSON.stringify(this.getList));
			// console.log("7=>",this.getById2(5));
			// this.$store.commit('inc') // mutation里面函数的调用commit
			// this.inc()
			// this.inc(11)
			// this.$store.dispatch('asyncInc')
			this.asyncInc(100)
			// console.log(this.$store.state.cart.list);
			// console.log(this.newList);
		},
		computed:{
			...mapState({
				list: state => state.cart.list,
				// list: 'list'
				newList({cart}) {
					return cart.list.filter(v => v.status)
				}
			}),
			...mapState(['list']),
			...mapGetters(['activeList','noactiveList','getList','getById','getById2'])
		},
		methods: {
			...mapMutations(['inc']),
			...mapActions(['asyncInc'])
		}
	}
</script>

<style>

</style>
