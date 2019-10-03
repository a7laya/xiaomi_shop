<template>
	<view>
		<scroll-view scroll-x="true" >
			<view style='width:200upx; border: 1px solid red' >1</view>
			<view style='width:200upx; border: 1px solid red' >2</view>
			<view style='width:200upx; border: 1px solid red' >3</view>
			<view style='width:200upx; border: 1px solid red' >4</view>
			<view style='width:200upx; border: 1px solid red' >5</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				show: false
			}
		}, 
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
