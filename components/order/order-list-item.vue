<template>
	<view class="px-2">
		<view class="d-flex a-center border-bottom border-light-secondary p-2">
			<image :src="order.cover" mode="widthFix" class="rounded flex-shrink"
			style="width: 150rpx; height: 150rpx;" @click.stop="openDetail"></image>
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
	
</template>

<script>
	export default {
		props:{
			order:{
				type: Object,
                default: function(e) {
                    return {}
                }
			}
		},
		methods:{
			openDetail(){
				uni.navigateTo({
					url:'../../pages/detail/detail'
				})
			}
		}
	}
</script>

<style>
</style>
