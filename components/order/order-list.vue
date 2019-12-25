<template>
	<view class="">
		<divider></divider>
		<view class="bg-white">
			<!-- 头部 -->
			<view class="d-flex j-sb a-center p-2 border-bottom border-light-secondary">
				<text class="text-light-muted font-md">{{item.create_time}}</text>
				<text class="main-text-color font-md">{{item.status}}</text>
			</view>
			<!-- 身体 -->
			<view class="px-2">
				<view class="d-flex a-center border-bottom border-light-secondary p-2"
				v-for="(order, orderIndex) in item.order_items" :key="orderIndex">
					<image :src="order.cover" mode="widthFix" class="rounded flex-shrink"
					style="width: 150rpx; height: 150rpx;"></image>
					<view class="d-flex flex-column a-start j-center ml-2">
						<text class="font-md">{{order.title}}</text>
						<text class="text-light-muted">{{order.attrs}}</text>
					</view>
					<view class="d-flex flex-column a-end j-center ml-auto">
						<text class="text-light-muted">￥{{order.pprice}}</text>
						<text class="text-light-muted">×{{order.num}}</text>
					</view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="d-flex flex-column a-end j-center p-2">
				<view class="py-1">
					共{{item.total_num}}件商品, 合计: ￥{{item.total_price}}
				</view>
				<view class="py-1 d-flex">
					<view class="px-2 py-1 border rounded text-secondary mr-2" hover-class="bg-light-secondary">
						查看物流
					</view>
					<view class="px-2 py-1 border rounded text-secondary" hover-class="bg-light-secondary">
						确认收货
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type: Object,
                default: function(e) {
                    return {}
                }
			},
			index: Number
		}
	}
</script>

<style>
</style>
