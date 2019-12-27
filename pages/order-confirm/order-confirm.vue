<template>
	<view style="background-color: #F5F5F5; min-height: 100%;">
		<!-- 地址选择 -->
		<view class="d-flex j-center a-center px-4 main-bg-color" 
		hover-class="main-bg-hover-color" style="height: 250rpx;"
		@click="openPathList">
			<!-- 左:信息 -->
			<view v-if="path">
				<view class="text-white font-lg font-weight d-flex a-center">
					{{path.name}} {{path.phone}}
					<view v-if="path.isDefault" class="border border-white rounded px-2 ml-2">默认</view>
				</view>
				<view class="text-light">
					{{path.path}} {{path.detailPath}}
				</view>
			</view>
			<view v-else>
				<view class="text-white font-lg font-weight d-flex a-center">
					请选择收货地址
				</view>
			</view>
			<!-- 右:箭头 -->
			<view class="iconfont icon-jiantou ml-auto text-light"></view>
		</view>
		
		<!-- 订单信息 -->
		<view class="bg-white" style="border-radius: 25rpx 25rpx 0 0; margin-top: -25rpx; overflow: hidden;">
			<uni-list-item>
				<view class="d-flex a-center w-100" style="height: 100rpx;">
					<image src="/static/images/demo/demo6.jpg" style="height: 100rpx; width: 100rpx;" class="rounded mr-1"></image>
					<image src="/static/images/demo/demo6.jpg" style="height: 100rpx; width: 100rpx;" class="rounded mr-1"></image>
					<image src="/static/images/demo/demo6.jpg" style="height: 100rpx; width: 100rpx;" class="rounded mr-1"></image>
				</view>
				<view slot="rightContent">共13件</view>
			</uni-list-item>
			<uni-list-item title="商品总价" :showArrowIcon="false">
				<view slot="rightContent"><price color="text-dark" unitSize="22">200</price></view>
			</uni-list-item>
			<uni-list-item title="运费" :showArrowIcon="false">
				<view slot="rightContent">包邮</view>
			</uni-list-item>
			<uni-list-item title="优惠券">
				<view slot="rightContent" class="text-light-muted">无可用</view>
			</uni-list-item>
			<uni-list-item :showArrowIcon="false">
				<view class="main-text-color font-md">
					小计
				</view>
				<view slot="rightContent"><price unitSize="22">200</price></view>
			</uni-list-item>
			<divider></divider>
			
			<uni-list-item title="发票" widthExtra="40%" @click="openOrderInvoice">
				<view slot="rightContent">电子发票-个人</view>
			</uni-list-item>
		</view>
		<!-- 占位符 -->
		<view style="height: 100rpx;"></view>
		<!-- 底部按钮-去付款 -->
		<view class="position-fixed w-100 bottom-0 left-0 d-flex j-end a-center bg-white"
		style="height: 100rpx;">
			<text class="font-md font-weight mr-2">合计:</text>
			<price>200.00</price>
			<view class="main-bg-color px-2 py-1 mx-2 text-white font-md font-weight"
			hover-class="main-bg-hover-color"
			style="border-radius: 30rpx">
			去付款
			</view>
		</view>
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import price       from "@/components/common/price.vue"
	import { mapGetters } from "vuex"
	export default {
		components:{ uniListItem,price },
		data() {
			return {
				path:false
			}
		},
		computed:{
			...mapGetters(['defaultPath'])
		},
		methods: {
			openPathList(){
				uni.navigateTo({
					url:"/pages/user-path-list/user-path-list?type=choose"
				})
			},
			openOrderInvoice(){
				uni.navigateTo({
					url:"/pages/order-invoice/order-invoice"
				})
			}
		},
		onLoad() {
			// 获取默认收货地址 注意通过filter得到的结果defaultPath是个数组
			if(this.defaultPath.length){
				this.path = this.defaultPath[0]
			}
			
			// 开启监听选择地址事件
			uni.$on('choosePath', res=>{
				this.path = res
			})
		},
		onUnload(){
			// 关闭监听收货地址
			uni.$off('choosePath', res=>{
				console.log('关闭监听收货地址', res);
			})
		}
	}
</script>

<style>
page{
	/* background-color: #FD6801; */
}
</style>
