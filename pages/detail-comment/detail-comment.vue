<template>
	<view>
		<!-- 评价概览 -->
		<view class="p-2">
			<!-- 评价数量及满意率 -->
			<view class="d-flex a-center py-2 border-bottom border-light-secondary">
				<text class="text-muted">用户评价 (3425)</text>
				<text class="main-text-color ml-auto mr-1">93.8%</text>
				<text class="text-muted">满意</text>
			</view>
			<!-- 评价标签 -->
			<view class="d-flex flex-wrap" style="margin-right: -20rpx;">
				<view class="px-2 py border border-light-secondary rounded text-muted mr-2 mt-2 label-bg"
				:class="index === labelIndex ? 'active' : ''"
				@click="changeLabel(index)"
				v-for="(item,index) in labelList" :key="index">{{item.name}} {{item.num}}</view>
			</view>
		</view>
		<!-- 分割线 -->
		<divider></divider>
		<!-- 评价内容 -->
		<view class="p-2 d-flex a-start border-bottom border-light-secondary">
			<!-- 头像 flex-shrink不受挤压 -->
			<image src="/static/images/demo/demo6.jpg" mode="widthFix"
			style="width: 90rpx; height: 90rpx;" class="rounded flex-shrink"></image>
			<!-- 评价 -->
			<view class="pl-2 flex-1">
				<!-- 昵称和评级 -->
				<view class="d-flex a-center w-100 j-sb">
					<text class="text-primary font-md font-weight">昵称123</text>
					<view class="iconfont icon-xihuan main-text-color">
						<text class="pl-1">超爱</text>
					</view>
				</view>
				<!-- 评价内容 -->
				<view class="font-md line-h-md mt-1">
					非常好
				</view>
				<!-- 图片 -->
				<view class="row">
					<view class="span24-8 pr pb">
						<image src="/static/images/demo/cate_08.png" mode="widthFix"
						style="height: 200rpx;width: 200rpx;"></image>
					</view>
					<view class="span24-8 pr pb">
						<image src="/static/images/demo/cate_08.png" mode="widthFix"
						style="height: 200rpx;width: 200rpx;"></image>
					</view>
					<view class="span24-8 pr pb">
						<image src="/static/images/demo/cate_08.png" mode="widthFix"
						style="height: 200rpx;width: 200rpx;"></image>
					</view>
					<view class="span24-8 pr pb">
						<image src="/static/images/demo/cate_08.png" mode="widthFix"
						style="height: 200rpx;width: 200rpx;"></image>
					</view>
					<view class="span24-8 pr pb">
						<image src="/static/images/demo/cate_08.png" mode="widthFix"
						style="height: 200rpx;width: 200rpx;"></image>
					</view>
					<view class="span24-8 pr pb">
						<image src="/static/images/demo/cate_08.png" mode="widthFix"
						style="height: 200rpx;width: 200rpx;"></image>
					</view>
				</view>
				<!-- 日期 点赞 评论 -->
				<view class="d-flex a-center w-100 font text-light-muted">
					<text>2019-09-10</text>
					<text class="ml-auto mr">0</text>
					<text class="iconfont icon-thumbup text-muted font-lg"></text>
					<text class="ml-4 mr">1</text>
					<text class="iconfont icon-pinglun text-muted font-lg"></text>
				</view>
				<!-- 客服回复 -->
				<view class="bg-light-secondary rounded p-2 d-flex a-center flex-wrap mt-1">
					<text class="main-text-color">官方回复:</text>
					官方回复123456
					<view class="iconfont icon-thumbup text-muted ml-1 font-lg line-h-md">
						<text class="text-light-muted font">赞客服 260</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import divider from "@/components/common/divider.vue"
	export default {
		components:{  },
		data() {
			return {
				labelIndex: 0,
				labelList: [
					{ name: "全部", num:100 },
					{ name: "有图", num:10 },
					{ name: "非常喜欢", num:12 },
					{ name: "拍照好", num:33 },
					{ name: "手感很棒", num:12 },
					{ name: "效果很好", num:2 },
					{ name: "性能很棒", num:9 }
				]
			}
		},
		methods: {
			changeLabel(index) {
				this.labelIndex = index
			}
		}
	}
</script>

<style>
.label-bg{
	background-color: #fee;
	color: #7B6D6C;
	border-color: #F4E0E1;
}
.label-bg.active{
	background-color: #FF6B01!important;
	color: #FFFFFF!important;
	border-color: #DE7232!important;
}
</style>
