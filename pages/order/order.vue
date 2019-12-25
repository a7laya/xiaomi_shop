<template>
	<view style="background-color: #F5F5F5;">
		
		<!-- 选项卡 -->
		<view class="d-flex j-center a-center bg-white w-100 border-top border-light-secondary">
			<view class="flex-1 d-flex j-center a-center py-2"
			:class="tabIndex === index ? 'tab-active' : 'text-light-muted'"
			v-for="(item,index) in tabBars" :key="index" @click="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		
		<!-- 订单列表 -->
		<block v-for="(tab,tabI) in tabBars" :key="tabI">
			<view class="position-relative" v-show="tabI === tabIndex">
				<!-- 有订单 -->
				<template v-if="tab.list.length > 0">
					<block v-for="(item,index) in tab.list" :key="index">
						<order-list :item="item" :index="index"></order-list>
					</block>
				</template>
				
				<!-- 订单为空 -->
				<template v-else>
					<nothing :icon="tab.nothing" :msg="tab.msg"></nothing>
				</template>
			</view>
			
		</block>
		
		
		
		
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
	import orderList   from '@/components/order/order-list.vue'
	
	export default {
		components:{ nothing,commonList,orderList },
		data() {
			return {
				tabIndex: 0,
				tabBars:[
					{ 
						name:"全部", id:0, nothing:"no_pay", msg:"没有订单",
						list:[
							{
								create_time: "2019-12-12 12:12",
								status: "已发货",
								order_items: [
									{
										cover: "/static/images/demo/demo6.jpg",
										title: "小米8",
										pprice: 1999.00,
										attrs: "金色",
										num: 1
									},
									{
										cover: "/static/images/demo/demo6.jpg",
										title: "小米8",
										pprice: 1999.00,
										attrs: "黑色",
										num: 2
									}
								],
								total_num: 3,
								total_price: 5997.00
							},
							{
								create_time: "2019-12-12 12:12",
								status: "已发货",
								order_items: [
									{
										cover: "/static/images/demo/demo6.jpg",
										title: "小米8",
										pprice: 1999.00,
										attrs: "金色",
										num: 1
									},
									{
										cover: "/static/images/demo/demo6.jpg",
										title: "小米8",
										pprice: 1999.00,
										attrs: "黑色",
										num: 2
									}
								],
								total_num: 3,
								total_price: 5997.00
							}
						],
					},
					{ name:"待付款", id:1, nothing:"no_pay", msg:"没有待付款订单",list:[] },
					{ name:"待发货", id:2, nothing:"no_receiving", msg:"没有待发货订单",list:[] },
					{ name:"待评价", id:3, nothing:"no_comment", msg:"没有待评价订单",list:[] },
				],
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
		computed:{
			
		},
		methods: {
			// 切换选项卡
			changeTab(index) {
				this.tabIndex = index
			}
		}
	}
</script>

<style>
.tab-active{
	border-bottom: 5rpx solid #FD6801 !important;
	color: #FD6801 !important;
	/* margin-bottom: -5rpx; */
}
</style>
