<template>
	<view>
		<view class="d-flex">
			<!-- 左边 w373 h530 -->
			<image :src="resdata.big.src" lazy-load
			style="height: 530upx; width: 373upx; border-right: 2upx solid #F5F5F5;"
			@tap="event(resdata.big)"></image>
			<!-- 右边 w375 h264 边h2 -->
			<view class="d-flex flex-column">
				<image :src="resdata.smalltop.src" lazy-load
				style="height: 264upx; width: 375upx; border-bottom: 2upx solid #F5F5F5;"
				@tap="event(resdata.smalltop)"></image>
				<image :src="resdata.smallbottom.src" lazy-load
				style="height: 264upx; width: 375upx;"
				@tap="event(resdata.smallbottom)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			resdata: Object
		},
		methods:{
			event(obj){
				console.log(obj)
			}
		}
	}
</script>

<style>
</style>
