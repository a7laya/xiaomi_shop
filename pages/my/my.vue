<template>
	<view>
		<scroll-view scroll-y="true" class="h-100">
			<!-- 头部banner -->
			<view class="position-relative d-flex a-center w-100">
				<!-- 消息图标 -->
				<view class="position-absolute iconfont icon-62 font-weight font-big text-white" 
				style="top: 40rpx; right: 20rpx; z-index:1000;"></view>
				<!-- 头像昵称会员信息 -->
				<view class="position-absolute w-100 d-flex" 
				style="top: 120rpx; left: 0rpx; height: 155rpx; z-index:1000;"
				@click="navigate('login')">
					<view class="d-flex j-center a-center" style="flex: 4;">
						<!-- 头像 -->
						<image src="/static/images/demo/demo6.jpg" mode="widthFix" 
						style="height: 145rpx;width: 145rpx; border: 5rpx solid #FFFFFF"
						class="rounded-circle"></image>
						<text class="ml-2 text-white font-md font-weight">昵称测试</text>
					</view>
					<view class="d-flex j-end a-end" style="flex: 3.5">
						<view class="d-flex a-center j-center px-3"
						style="height: 70rpx; background-color: #ffc82d; color: #cc7709; border-radius: 35rpx 0 0 35rpx;">
							<text class="iconfont icon-huiyuan font-weight mr-1"></text>
							会员积分 1.99
						</view>
					</view>
				</view>
				<!-- 背景图片 -->
				<image src="/static/images/bg.jpg" style="height: 320rpx;width: 100%;"></image>
			</view>
			
			<!-- 订单模块 -->
			<card>
				<view slot='title' class="d-flex a-center j-sb">
					<text class="font-md font-weight">我的订单</text>
					<view class="d-flex a-center j-center font text-muted">
						<text class="" @click="navigate('order')">全部订单</text>
						<text class="iconfont icon-jiantou"></text>
					</view>
				</view>
				<view class="d-flex a-center">
					<view class="p-3 d-flex a-center j-center flex-column flex-1">
						<text class="iconfont icon-daifukuan font-lg line-h-sm"></text>
						<text>待付款</text>
					</view>
					<view class="p-3 d-flex a-center j-center flex-column flex-1">
						<text class="iconfont icon-daishouhuo font-lg line-h-sm"></text>
						<text>待收货</text>
					</view>
					<view class="p-3 d-flex a-center j-center flex-column flex-1">
						<text class="iconfont icon-pinglun font-lg line-h-sm"></text>
						<text>待评论</text>
					</view>
					<view class="p-3 d-flex a-center j-center flex-column flex-1">
						<text class="iconfont icon-buoumaotubiao46 font-lg line-h-sm"></text>
						<text>退换修</text>
					</view>
				</view>
			</card>
			<!-- 分界线 -->
			<divider></divider>
			<!-- 其他模块 -->
			<uni-list-item title="小米会员" showExtraIcon leftIcon="icon-VIP"     leftIconStyle="color:orange; font-size:40rpx"></uni-list-item>
			<uni-list-item title="会员中心" showExtraIcon leftIcon="icon-huiyuan" leftIconStyle="color:orange; font-size:40rpx"></uni-list-item>
			<uni-list-item title="服务中心" showExtraIcon leftIcon="icon-xihuan"  leftIconStyle="color:red;    font-size:40rpx"></uni-list-item>
			<uni-list-item title="小米之家" showExtraIcon leftIcon="icon-shouye"  leftIconStyle="color:orange; font-size:40rpx"></uni-list-item>
			<uni-list-item title="更多功能" showExtraIcon leftIcon="icon-gengduo" leftIconStyle="color:green;  font-size:40rpx"></uni-list-item>
			<!-- 分界线 -->
			<divider></divider>
			<uni-list-item @click="navigate('user-set')"
			title="更多设置" showExtraIcon leftIcon="icon-shezhi"  leftIconStyle="color:gray;   font-size:40rpx"></uni-list-item>
		</scroll-view>
	</view>
</template>

<script>
	import card        from "@/components/common/card.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	export default {
		components:{ uniListItem,card },
		data() {
			return {
				
			}
		},
		methods: {
			navigate(path){
				if(!path) return
				uni.navigateTo({
					url:`/pages/${path}/${path}`
				})
			}
		}
	}
</script>

<style>

</style>
