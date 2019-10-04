<template>
	<view>
		<!-- 轮播图组件 -->
		<swiper indicator-dots autoplay :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item>
		</swiper>
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
	
</style>
