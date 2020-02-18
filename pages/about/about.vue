<template>
	<view>
		<view class="d-flex a-center j-center flex-column py-5 my-3">
			<image src="../../static/tabbar/indexSelected.png" mode="widthFix"
			style="width: 100rpx;height:100rpx;"></image>
			<text class="text-light-muted font-md">XXX商城 1.0.0</text>
		</view>
		<view class="bg-white">
		<uni-list-item title="版本更新"></uni-list-item>
		<uni-list-item title="版本更新"></uni-list-item>
		<uni-list-item title="版本更新"></uni-list-item>
		<uni-list-item title="版本更新"></uni-list-item>
		<uni-list-item title="版本更新"></uni-list-item>
		<uni-list-item title="版本更新"></uni-list-item>
		<uni-list-item title="版本更新"></uni-list-item>
			
		</view>
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	export default {
		components:{uniListItem},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
page{
	background-color: #F5F5F5;
}
</style>
