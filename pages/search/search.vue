<template>
	<view>
		<!-- 热门搜索卡片 -->
		<card headTitle="热门搜索" bodyCover="/static/images/demo/search-banner.png"></card>
		
		<!-- 多色按钮 -->
		<view class="pl-2 mb-2">
			<color-tag :color="true" :item="item" v-for="(item, index) in hot" :key="index"></color-tag>
		</view>
		
		<!-- 常用分类 -->
		<card headTitle="常用分类" :bodyPadding="true" :headBorderBottom="false">
			<color-tag :color="false" :item="item" v-for="(item, index) in cate" :key="index"></color-tag>
		</card>
		
		<!-- 分割线 -->
		<divider></divider>
		
		<!-- 搜索记录 -->
		<card headTitle="搜索记录" :headBorderBottom="true">
			<uni-list-item title="小米" :showArrow="false"></uni-list-item>
			<uni-list-item title="小米" :showArrow="false"></uni-list-item>
		</card>
	</view>
</template>

<script>
	import card        from '@/components/common/card.vue'
	import colorTag    from '@/components/search/color-tag.vue'
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	export default {
		components:{
			card,
			colorTag,
			uniListItem
		},
		data() {
			return {
				hot: [
					{ name: "领券中心" },
					{ name: "Redmi K20" },
					{ name: "RedmiBook 14" },
					{ name: "智能积木 越野四驱车" },
					{ name: "手环 腕带" }
				],
				cate: [
					{ name: "耳机" },
					{ name: "手机" },
					{ name: "音箱" },
					{ name: "手表" },
					{ name: "配件" },
					{ name: "网关/传感器" },
					{ name: "健康" },
					{ name: "酷玩" }
				]
			}
		},
		onNavigationBarButtonTap(e) {
			// 点击了右边的搜索按钮
			if(e.index === 0) uni.navigateTo({
				url: '../search-list/search-list'
			})
		},
		methods: {
		}
	}
</script>

<style>

</style>
