<template>
	<view>
		<!-- 需支付的金额 -->
		<view class="d-flex flex-column a-center j-center py-5">
			<text class="text-light-muted font-md">支付金额</text>
			<price priceSize='font-lg' unitSize='font-md'>38.00</price>
		</view>
		
		<!-- 支付方式选择 -->
		<view class="px-3">
			<label>
				<uni-list-item leftIcon="icon-zhifubao1 text-primary" showExtraIcon title="支付宝支付" note="推荐使用支付宝支付"
				leftIconStyle='font-size:80rpx'>
					<radio slot='right' color="#FD6801" value="1"></radio>
				</uni-list-item>
			</label>
			<label>
				<uni-list-item leftIcon="icon-weixin text-success" showExtraIcon title="支付宝支付" 
				leftIconStyle='font-size:80rpx'>
					<radio slot='right' color="#FD6801" value="2"></radio>
				</uni-list-item>
			</label>
			<view class="w-100 main-bg-color py-2 text-center text-white font-md rounded mt-2" hover-class="main-bg-hover-color"
			@click="payResult">
				确认支付
			</view>
		</view>
	</view>
</template>

<script>
	// 载入组件
	import price       from "@/components/common/price.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	
	export default {
		components:{ price,uniListItem },
		data() {
			return {
				
			}
		},
		methods: {
			payResult(){
				uni.navigateTo({
					url:"../pay-result/pay-result"
				})
			}
		}
	}
</script>

<style>

</style>
