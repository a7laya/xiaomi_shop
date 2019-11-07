<template>
	<view>
		<view class="row border-bottom p-2 border-light-secondary animated fadeIn" v-for="(item,index) in list" :key="index">
			<view class="span-6">
				<image :src="item.cover" mode="widthFix" class="w-100"></image>
			</view>
			<view class="span-14 pl-3 d-flex flex-column">
				<view class="font-md font-weight">{{item.title}}</view>
				<view class="font text-light-muted line-h-md mb-2">{{item.desc}}</view>
				<price>{{item.price}}</price>
				<view class="font-sm text-light-muted line-h-md">{{item.comment_num}} 条评论  {{item.good_rate}}满意</view>
			</view>
		</view>
	</view>
</template>

<script>
	import price from "@/components/common/price.vue"
	export default {
		props:{
			list: Array
		},
		components:{
			price
		}
	}
</script>

<style>
</style>
