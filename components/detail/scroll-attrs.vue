<template>
	<view>
		<scroll-view scroll-x class="scroll-row" >
			<view class="scroll-row-item" style="width: 170rpx; height: 130rpx;"
			v-for="(item,index) in resdata" :key="index">
				<view class="d-flex flex-column j-center a-center">
					<view class="iconfont line-h-sm" :class="item.icon"></view>
					<view class=" line-h-sm">{{item.title}}</view>
					<view class="font-sm text-light-muted line-h-sm">
						{{item.desc}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:{
			resdata: Array
		}
	}
</script>

<style>
</style>
