<template>
	<view>
		<view style="width: 372.5upx;">
			<image :src="item.cover" lazy-load></image>
			<view class="px-2">
				<view class="font-md">{{item.title}}</view>
				<text class="d-block font text-light-muted">{{item.desc}}</text>
				<view class="d-flex my-1">
					<!-- 价格组件 -->
					<price>{{item.price}}</price>
					<!-- 原价 -->
					<view class="font-sm text-light-muted line-through ml-2 a-self-end line-h">
						￥{{item.orginPrice}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			item: Object,
			index: Number
		}
	}
</script>

<style>
</style>
