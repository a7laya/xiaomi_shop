<template>
	<view style="background-color: #F5F5F5;">
		
		<view class="position-relative w-100" style="height: 400rpx;">
			<nothing icon="no_pay" msg="没有待付款订单"></nothing>
		</view>
		
		<!-- 为你推荐 -->
		<view class="text-center main-text-color font-md font-weight pt-2">
			为你推荐
		</view>
		<view class="position-relative d-flex a-center j-center text-secondary p-3">
			<view class="position-absolute px-1" style="background-color: #F5F5F5;z-index: 2;">买的人还买了</view>
			<view class="position-absolute w-100" style="height: 1upx; left: 0; background-color: #DDDDDD;">
				
			</view>
		</view>
		<view class="row j-sb bg-white">
			<commonList v-for="(item,index) in hotList" :key="index" 
			:item="item" :index="index"></commonList>
		</view>
	</view>
</template>

<script>
	import commonList  from '@/components/common/commonList.vue'
	import nothing     from '@/components/common/nothing.vue'
	
	export default {
		components:{ nothing,commonList },
		data() {
			return {
				hotList: [
					{
						cover: "/static/images/demo/list/1.jpg",
						title: "米家空调",
						desc: "1.5匹直流变频",
						price: 1399,
						orginPrice: 2699
					},
					{
						cover: "/static/images/demo/list/2.jpg",
						title: "米家空调",
						desc: "1.5匹直流变频",
						price: 1399,
						orginPrice: 2699
					},
					{
						cover: "/static/images/demo/list/3.jpg",
						title: "米家空调",
						desc: "1.5匹直流变频",
						price: 1399,
						orginPrice: 2699
					},
					{
						cover: "/static/images/demo/list/4.jpg",
						title: "米家空调",
						desc: "1.5匹直流变频",
						price: 1399,
						orginPrice: 2699
					},
					{
						cover: "/static/images/demo/list/5.jpg",
						title: "米家空调",
						desc: "1.5匹直流变频",
						price: 1399,
						orginPrice: 2699
					},
					{
						cover: "/static/images/demo/list/6.jpg",
						title: "米家空调",
						desc: "1.5匹直流变频",
						price: 1399,
						orginPrice: 2699
					}
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
