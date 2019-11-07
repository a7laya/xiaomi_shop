<template>
	<view>
		<!-- 排序 | 筛选 头部-->
		<view class="d-flex border-top border-bottom w-100" style="height: 100upx;">
			<view class="flex-1 d-flex j-center a-center font-md"
			v-for="(item,index) in screen.list" :key="index"
			@click="changeSelect(index)">
				<text :class="screen.currentIndex === index ? 'main-text-color' : 'text-light-muted'">{{item.name}}</text>
				<view class="d-flex flex-column">
					<view class="iconfont icon-paixujiantoushang line-h0" :class="(item.status === 1) ? 'main-text-color' : 'text-light-muted'"></view>
					<view class="iconfont icon-paixujiantouxia   line-h0" :class="(item.status === 2) ? 'main-text-color' : 'text-light-muted'"></view>
				</view>
			</view>
			
			<view class="flex-1 d-flex j-center a-center font-md main-text-color"
			@click="showRight = true">
				筛选
			</view>
		</view>
		<scroll-view scroll-y="true" :style="'height:'+windowH+'px'">
			<!-- 结果列表 -->
			<search-list :list="list"></search-list>
		</scroll-view>
		
		<!-- 抽屉组件 -->
		<uni-drawer :visible="showRight" mode="right" @close="showRight = false">
			<card headTitle="服务" :headBorderBottom="false" :headTitleWeight="false">
				<!-- 单选按钮组件 -->
				<zcm-radio-group :label="label" :selected.sync='label.currentIndex'></zcm-radio-group>
			</card>
			
			<!-- 底部按钮 -->
			<view class="d-flex position-fixed bottom-0 right-0 w-100 border-top border-light" style="height: 100upx;">
				<view class="d-flex flex-1 a-center j-center" hover-class="bg-light-secondary">
					<text class="font-md text-muted">重置</text>
				</view>
				<view class="d-flex flex-1 a-center j-center main-bg-color" hover-class="main-bg-hover-color">
					<text class="font-md text-white">确定</text>
				</view>
			</view>
		</uni-drawer>
		
	</view>
</template>

<script>
	import uniDrawer     from '@/components/uni-ui/uni-drawer/uni-drawer.vue'
	import card          from '@/components/common/card.vue'
	// radio-group组件系统已经存在,所以这里前面要加zcm
	import zcmRadioGroup from '@/components/common/zcm-radio-group.vue'
	import searchList    from '@/components/search-list/search-list.vue'
	export default {
		components:{ uniDrawer,card,zcmRadioGroup,searchList },
		data() {
			return {
				windowH: 0,
				showRight: false,
				list: [
					{
						title: "真无线蓝牙耳机",
						cover: "/static/images/demo/demo6.jpg",
						desc:  "雅致简约 / 分体式入耳 / 收纳盒充电 / 蓝牙5.0 / 触控操作",
						price: 99,
						comment_num: 1300,
						good_rate: "98%"
					},
					{
						title: "真无线蓝牙耳机",
						cover: "/static/images/demo/demo6.jpg",
						desc:  "雅致简约 / 分体式入耳 / 收纳盒充电 / 蓝牙5.0 / 触控操作",
						price: 199,
						comment_num: 1300,
						good_rate: "98%"
					},
					{
						title: "真无线蓝牙耳机",
						cover: "/static/images/demo/demo6.jpg",
						desc:  "雅致简约 / 分体式入耳 / 收纳盒充电 / 蓝牙5.0 / 触控操作",
						price: 199,
						comment_num: 1300,
						good_rate: "98%"
					},
					{
						title: "真无线蓝牙耳机",
						cover: "/static/images/demo/demo6.jpg",
						desc:  "雅致简约 / 分体式入耳 / 收纳盒充电 / 蓝牙5.0 / 触控操作",
						price: 199,
						comment_num: 1300,
						good_rate: "98%"
					},
					{
						title: "真无线蓝牙耳机",
						cover: "/static/images/demo/demo6.jpg",
						desc:  "雅致简约 / 分体式入耳 / 收纳盒充电 / 蓝牙5.0 / 触控操作",
						price: 199,
						comment_num: 1300,
						good_rate: "98%"
					},
					{
						title: "真无线蓝牙耳机",
						cover: "/static/images/demo/demo6.jpg",
						desc:  "雅致简约 / 分体式入耳 / 收纳盒充电 / 蓝牙5.0 / 触控操作",
						price: 199,
						comment_num: 1300,
						good_rate: "98%"
					}
				],
				screen:{
					currentIndex: 0,
					list: [
						{ name:'综合', status: 1},
						{ name:'销量', status: 0},
						{ name:'价格', status: 0}
					]
				},
				label:{
					currentIndex: 0,
					list: [
						{ name: '全部' },
						{ name: '选项二' },
						{ name: '选项三' }
					]
				}
			}
		},
		methods: {
			changeSelect(index) {
				let oldIndex = this.screen.currentIndex;
				let oldItem  = this.screen.list[oldIndex]
				// 如果点击的是处于激活状态的按钮 则切换排序顺序
				if (oldIndex == index) {
					return oldItem.status = (oldItem.status == 1 ? 2 : 1)
				}
				
				// 如果点击的是未激活的按钮 则让其处于激活状态
				this.screen.currentIndex = index 
				this.screen.list[index].status = 1
				oldItem.status = 0
			}
		},
		onLoad() {
			// 获取可视区域高度(原生头和底部之外的地方)
			uni.getSystemInfo({
				success:(e) => {
					// 这里得到的高度e.windowheight单位单位是px
					this.windowH = e.windowHeight - uni.upx2px(100);
				}
			})
		}
	}
</script>

<style>
</style>
