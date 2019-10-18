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
			// 监听App.vue的uni.$emit('index', data)中转过来的数据
			uni.$on('index', e => {
				console.log('分类页的e:', e)
				this.text = e.data
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
