<template>
	<view>
		<view class="main-bg-color text-white p-4 d-flex a-end j-sb" style="height: 300rpx;">
			<view class="mb-3">
				<view class="font-lg">卖家已发货</view>
				<view class="font-md text-light">还有3天11时自动确认</view>
			</view>
			<view class="iconfont icon-daishouhuo line-h mb-3" style="font-size: 100rpx;"></view>
		</view>
		<view class="p-3">
			<view class="font-lg d-flex a-center text-dark">腊鸭<text class="ml-2 text-light-muted font-md">135****1234</text></view>
			<view class="font-md text-light-muted">广州省 广州市 白云区 XXXXXXXXXX</view>
		</view>
		<divider></divider>
		<!-- 订单内商品列表 -->
		<order-list-item :order="item" v-for="(item,index) in order_items" :key='index'></order-list-item>
		<divider></divider>
		<!-- 订单价格 -->
		<uni-list-item title="商品总价" disabled><view slot='right'>￥102.01</view></uni-list-item>
		<uni-list-item title="快递" disabled><view slot='right'>￥10.00</view></uni-list-item>
		<uni-list-item title="优惠券" disabled><view slot='right'>-￥20</view></uni-list-item>
		<uni-list-item >
			<text class="main-text-color font-md font-weight">实际付款</text>
			<view slot='right'><price priceSize='font-md' unitSize='font'>110</price></view>
		</uni-list-item>
		<divider></divider>
		<!-- 订单信息 -->
		<card headTitleWeight headTitle="订单信息">
			<uni-list-item><text class="text-dark">订单编号</text><view slot='right'><text class="text-light-muted">123456789</text></view></uni-list-item>
		</card>
		
	</view>
</template>

<script>
	import orderListItem from "@/components/order/order-list-item.vue"
	import uniListItem   from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import price         from "@/components/common/price.vue"
	import card          from "@/components/common/card.vue"
	export default {
		components:{orderListItem,uniListItem,price,card},
		data() {
			return {
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
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
