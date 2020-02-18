<template>
	<view class="" @click="openDetail">
		<divider></divider>
		<view class="bg-white">
			<!-- 头部 -->
			<view class="d-flex j-sb a-center p-2 border-bottom border-light-secondary">
				<text class="text-light-muted font-md">{{item.create_time}}</text>
				<text class="main-text-color font-md">{{item.status}}</text>
			</view>
			<!-- 身体 -->
			<order-list-item :order="order" v-for="(order, orderIndex) in item.order_items" :key="orderIndex"></order-list-item>
			<!-- 底部 -->
			<view class="d-flex flex-column a-end j-center p-2">
				<view class="py-1">
					共{{item.total_num}}件商品, 合计: ￥{{item.total_price}}
				</view>
				<view class="py-1 d-flex">
					<view class="px-2 py-1 border rounded text-secondary mr-2" hover-class="bg-light-secondary"
					@click.stop="openAfterSale">
						申请售后
					</view>
					<view class="px-2 py-1 border rounded text-secondary mr-2" hover-class="bg-light-secondary"
					@click.stop="openLogistics">
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
	import orderListItem from "@/components/order/order-list-item.vue"
	export default {
		components:{orderListItem},
		props:{
			item:{
				type: Object,
                default: function(e) {
                    return {}
                }
			},
			index: Number
		},
		methods:{
			// 查看订单详情
			openDetail(){
				uni.navigateTo({
					url:'../../pages/order-detail/order-detail'
				})
			},
			// 查看物流详情
			openLogistics(){
				uni.navigateTo({
					url:'../../pages/logistics-detail/logistics-detail'
				})
			},
			// 打开申请售后
			openAfterSale(){
				uni.navigateTo({
					url:'../../pages/after-sale/after-sale'
				})
			}
			
		}
	}
</script>

<style>
</style>
