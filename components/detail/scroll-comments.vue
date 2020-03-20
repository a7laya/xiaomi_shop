<template>
	<view>
		<view class="p-2">
			<scroll-view scroll-x class="scroll-row">
				<view class="scroll-row-item rounded bg-light-secondary p-2 mr-2" 
				style="width: 620rpx; height: 380rpx;"
				v-for="(item, index) in resdata" :key="index">
					<!-- 上 -->
					<view class="d-flex j-sb p-1">
						<view class="d-flex flex-row a-center">
							<image :src="item.avatar" 
							style="width: 70rpx;height: 70rpx;" class="rounded-circle mr-1"></image>
							<view class="d-flex flex-column">
								<text class="font-md boder line-h-md">{{item.nickname}}</text>
								<text class="text-light-muted line-h-md">{{item.create_time | formatTime}}</text>
							</view>
						</view>
						<view class="text-light-muted d-flex flex-row a-center">
							<text class="iconfont icon-thumbup font-lg"></text>
							<text>{{item.goods_num}}</text>
						</view>
					</view>
					<!-- 中 -->
					<view class="p-1 font-md boder line-h-md">{{item.context}}</view>
					<!-- 下 -->
					<view class="d-flex flex-row py-1">
						<image :src="item2" class="span24-8 px-1 rounded" 
						style="height: 210rpx;" v-for="(item2,index2) in item.imglist" :key="index2"></image>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 更多评论 -->
		<navigator url="/pages/detail-comment/detail-comment">
			<view class="d-flex flex-row j-center a-center p-2 text-primary " hover-class="bg-light-secondary">
				<view class="font-md">更多评论</view>
				<view class="iconfont icon-jiantou"></view>
			</view>
		</navigator>
	</view>
</template>

<script>
	// 引入时间转化库
	import $T from "@/common/lib/time.js"
	export default {
		props:{
			resdata: Array
		},
		filters: {
			formatTime: function(value) {
				return $T.gettime(value);
			}
		}
	}
</script>

<style>
</style>
