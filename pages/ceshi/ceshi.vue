<template>
	<view>
		<button type="primary" @click="xiugai">修改首页数据</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			xiugai(){
				// 获取所有页面信息 - 数组
				let pages = getCurrentPages()
				// 获取首页信息 - 数组第一个
				let index = pages[0].$getAppWebview()
				// 通过首页的页面id,向首页发送信息
				plus.webview.postMessageToUniNView({res:'ceshi'},index.id)
				// 返回首页
				uni.navigateBack()
			}
		}
	}
</script>

<style>

</style>
