<template>
	<view>
		<divider></divider>
		<view class="p-5 mx-2">
			<view class="py-2 px-3 position-relative" style="border-left: #FD6801 solid 4rpx;"
			v-for="(item, index) in list" :key='index'>
				<view class="position-relative" style="bottom: 36rpx;">
					<view class="font-md font-weight line-h-md">{{item.msg}}</view>
					<view class="font text-light-muted">{{item.date_time}}</view>
				</view>
				<view class="position-absolute main-text-color font-weight"  
				style="font-size: 100rpx; top: -90rpx; left: -25rpx;">·</view>
			</view>
		</view>
		<divider></divider>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						msg: '湖北省武汉市 江岸区 物流中心湖北省武汉市 江岸区 物流中心湖北省武汉市 江岸区 物流中心',
						date_time: '2020-02-03 02:02:02'
					},
					{
						msg: '出库',
						date_time: '2020-02-02 02:02:02'
					},
					{
						msg: '配货',
						date_time: '2020-02-02 02:02:02'
					},
					{
						msg: '下单',
						date_time: '2020-02-01 02:02:02'
					},
					
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
