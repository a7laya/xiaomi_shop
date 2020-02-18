<template>
	<view class="px-5">
		<view class="py-5 d-flex flex-column a-center j-center" style="height: 400rpx;">
			<view class="iconfont icon-shoujiduihao line-h" style="font-size: 120rpx; color: #FD6801;"></view>
			<view class="font-lg">支付成功</view>
		</view>
		<navigator url="../order-detail/order-detail">
			<view class="w-100 main-bg-color py-2 text-center text-white font-md rounded mb-5" hover-class="main-bg-hover-color">
				查看订单
			</view>	
		</navigator>
		
		<view class="w-100 py-2 text-center font-md rounded border" hover-class="bg-light-secondary">
			返回首页
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
