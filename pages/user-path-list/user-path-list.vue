<template>
	<view>
		<uni-swipe-action :options="options2" 
		@click="bindClick($event,index)" 
		v-for="(item, index) in list" :key="index">
			<uni-list-item @click="navigate('user-path-edit',index)">
				<view class="text-secondary">
					<view class="d-flex a-center">
						<text class="main-text-color">{{item.name}}</text>
						<text>{{item.phone}}</text>
						<text class="main-text-color" v-if="item.isDefault">[默认]</text>
					</view>
					<view class="">{{item.path}}</view>
					<view class="">{{item.detailPath}}</view>
				</view>
			</uni-list-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import uniSwipeAction from "@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue"
	// 引入vuex 
	import {mapState,mapMutations} from "vuex"
	export default {
		components:{uniListItem,uniSwipeAction},
		data() {
			return {
				
				options2: [
					{
						text: '修改',
						style: {
							backgroundColor: '#FD6801'
						}
					}, 
					{
						text: '删除',
						style: {
							backgroundColor: 'RED'
						}
					},
				]
			}
		},
		computed:{
			...mapState({
				list: state => state.path.list
			})
		},
		methods: {
			...mapMutations(['createPath','delPath']),
			navigate(path,i){
				if(!path) return
				let obj = JSON.stringify({
					index: i,
					item: this.list[i]
				})
				
				uni.navigateTo({
					url:`/pages/${path}/${path}?data=${obj}`
				})
			},
			// i地址list下标
			bindClick(e, i) {
				switch (e.index){
					case 0: // 修改
						let obj = JSON.stringify({
							index: i,
							item: this.list[i]
						})
						setTimeout(() => {
							uni.navigateTo({
							url:'/pages/user-path-edit/user-path-edit?data=' + obj
							})
						}, 50)
						break;
					case 1: // 删除
						uni.showModal({
							content: '是否删除该地址',
							success: res => {
								if (res.confirm) {
									this.delPath(i);
									uni.showToast({
										title: '删除成功'
									});
								}
							}
						});
						break;
				}
			}
		},
		// 监听导航栏按钮点击+
		onNavigationBarButtonTap(e) {
			if(e.index === 0){
				this.navigate('user-path-edit')
			}
		}
	}
</script>

<style>

</style>
