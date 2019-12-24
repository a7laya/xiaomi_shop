<template>
	<view>
		<view style="height: 100rpx;"></view>
		<view class="d-flex bg-white position-fixed left-0 bottom-0 w-100" style="height: 100rpx;">
			<view class="d-flex flex-1 flex-column j-center a-center" hover-class="bg-light-secondary">
				<view class="iconfont icon-xihuan text-muted line-h"></view>
				<view>收藏</view>
			</view>
			<view class="d-flex flex-1 flex-column j-center a-center" hover-class="bg-light-secondary">
				<view class="iconfont icon-gouwuche text-muted line-h"></view>
				<view @click="toCart">购物车</view>
			</view>
			<view class="d-flex j-center a-center font-md main-bg-color text-white" hover-class="main-bg-hover-color"
			style="flex: 2.5;" @tap="$emit('show')">
				加入购物车
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			
		},
		methods: {
			toCart() {
				console.log(1234);
				uni.switchTab({
					url:'/pages/cart/cart'
				})
			}
		}
	}
</script>

<style>
</style>
