<template>
	<view>
		<text>{{text}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: 123456
			}
		},
		onLoad() {
			this.text = getApp().globalData.text
			// 监听App.vue的uni.$emit('index', data)中转过来的数据
			uni.$on('index', e => {
				console.log('分类页的e:', e)
				this.text = e.data
			})
			
			// 通过uni.getStorage() 来获取nvue页面进行的本地存储
			let data = uni.getStorageSync('index')
			console.log('本地存储的index==>', data);
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
