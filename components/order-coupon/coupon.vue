<template>
	<view class="bg-white rounded border border-light-secondary d-flex j-start a-center mb-3">
		<view class="d-flex px-3 flex-1 flex-column j-center">
			<text :class="item.disabled && !item.staus ? 'text-light-muted' : ''" class="font-lg">{{item.title}}</text>
			<text class="font text-light-muted">{{item.start_time}}~{{item.end_time}}</text>
		</view>
		<view :class="item.disabled && !item.staus ? 'bg-secondary' : 'main-bg-color'" class="d-flex flex-column a-center j-center text-white" style="width: 220rpx; height: 200rpx;">
			<view class="font-lg line-h">{{item.price}}<text class="font">元</text></view>
			<view class="font line-h-lg">{{item.desc}}</view>
			<view :class="item.disabled && !item.staus ? 'text-muted' : 'main-text-color'" class="px-2 rounded bg-white main-text-color font" hover-class="bg-light">
				{{item.status ? "去使用" : "已失效"}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item: Object,
			index: Number
		}
	}
</script>

<style>
</style>
