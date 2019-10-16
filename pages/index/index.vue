<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x class='scroll-row border-bottom px-2' style="height: 80rpx;"
		:scroll-into-view="scrollinto" 
		scroll-with-animation="true">
			<view class="scroll-row-item px-2" 
			style="width: 80rpx; line-height: 80rpx;"
			v-for="(item,index) in tabBars" :key='index'
			:class="tabIndex === index ? 'main-text-color border-bottom' : ''"
			:id="'tab' + index"
			@tap="changeTab(index)">
				<text class="font-md">{{item.name}}</text>
			</view>
		</scroll-view>
		
		<!--scrollview要加上height才能滚动 并且要和swiper的height保持一致 -->
		<swiper :duration="150" :current="tabIndex" :style="'height: ' + windowHeight + 'px;'" 
		@change="onChangeTab">
			<swiper-item v-for="(item, index) in newsitems" :key="index">
				<scroll-view scroll-y="true" :style="'height: ' + windowHeight + 'px;'"
				@scrolltolower="loadMore(index)">
					<block v-for="(list, listIndex) in item.list" :key="listIndex">
						<!-- 轮播图 -->
						<template v-if="list.type === 'swiper'">
							<swiper-image :resdata="list.data"></swiper-image>
						</template>
						
						<!-- 首页分类 -->
						<template v-else-if="list.type === 'indexNavs'">
							<index-nav :resdata="list.data"></index-nav>
							<divider></divider>
						</template>
						
						<!-- 三图广告 -->
						<template v-else-if="list.type === 'threeAdvs'">
							<three-adv :resdata="list.data"></three-adv>
							<divider></divider>
						</template>
						
						<!-- 大图广告 -->
						<template v-else-if="list.type === 'oneAdv'">
							<card :headTitle="list.data.title" :bodyCover="list.data.cover"></card>
						</template>
						
						<!-- 公共列表组件 -->
						<template v-else-if="list.type === 'commonList'">
							<view class="row j-sb">
								<block v-for="(item2,index2) in list.data" :key="index2">
									<commonList :item="item2" :index="index2"></commonList>
								</block>
							</view>
						</template>
					</block>
					
					<!-- 上拉加载更多 -->
					<view class="d-flex j-center a-center py-2">
						<text class="text-light-muted font-md">{{item.loadingText}}</text>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	// 模拟后端数据
	let demoTabBar = [
		{
			name: '关注',
			id: 'guanzhu',
			template: 'index'
		}, {
			name: '推荐',
			id: 'tuijian',
			template: 'special'
		}, {
			name: '体育',
			id: 'tiyu',
			template: 'special'
		}, {
			name: '热点',
			id: 'redian',
			template: 'special'
		}, {
			name: '财经',
			id: 'caijing',
			template: 'special'
		}, {
			name: '娱乐',
			id: 'yule',
			template: 'special'
		}, {
			name: '军事',
			id: 'junshi',
			template: 'special'
		}, {
			name: '历史',
			id: 'lishi',
			template: 'special'
		}, {
			name: '本地',
			id: 'bendi',
			template: 'special'
		}
	]
	let demo1 = [
		{
			type: "swiper",
			data: [
				{ src: "/static/images/demo/demo4.jpg" },
				{ src: "/static/images/demo/demo5.jpg" },
				{ src: "/static/images/demo/demo6.jpg" }
			]
		},{
			type: "indexNavs",
			data: [
				{ src:"/static/images/indexnav/1.png",text:"新品发布" },
				{ src:"/static/images/indexnav/2.gif",text:"小米众筹" },
				{ src:"/static/images/indexnav/3.gif",text:"以旧换新" },
				{ src:"/static/images/indexnav/4.gif",text:"一分换团" },
				{ src:"/static/images/indexnav/5.gif",text:"超值特卖" },
				{ src:"/static/images/indexnav/6.gif",text:"小米秒杀" },
				{ src:"/static/images/indexnav/7.gif",text:"真心想要" },
				{ src:"/static/images/indexnav/8.gif",text:"电视热卖" },
				{ src:"/static/images/indexnav/9.gif",text:"家电热卖" },
				{ src:"/static/images/indexnav/10.gif",text:"米粉卡" }
			]
		},
		{
			type: "threeAdvs",
			data: {
				big:         { src: "/static/images/demo/demo1.jpg" },
				smalltop:    { src: "/static/images/demo/demo2.jpg" },
				smallbottom: { src: "/static/images/demo/demo3.jpg" }
			}
		},
		{
			type: "oneAdv",
			data: {
				title: "每日精选",
				cover: "/static/images/demo/demo4.jpg"
			}
		},{
			type: "commonList",
			data: [
				{
					cover: "/static/images/demo/list/1.jpg",
					title: "米家空调",
					desc: "1.5匹直流变频",
					price: 1399,
					orginPrice: 2699
				},
				{
					cover: "/static/images/demo/list/2.jpg",
					title: "米家空调",
					desc: "1.5匹直流变频",
					price: 1399,
					orginPrice: 2699
				},
				{
					cover: "/static/images/demo/list/3.jpg",
					title: "米家空调",
					desc: "1.5匹直流变频",
					price: 1399,
					orginPrice: 2699
				},
				{
					cover: "/static/images/demo/list/4.jpg",
					title: "米家空调",
					desc: "1.5匹直流变频",
					price: 1399,
					orginPrice: 2699
				},
				{
					cover: "/static/images/demo/list/5.jpg",
					title: "米家空调",
					desc: "1.5匹直流变频",
					price: 1399,
					orginPrice: 2699
				},
				{
					cover: "/static/images/demo/list/6.jpg",
					title: "米家空调",
					desc: "1.5匹直流变频",
					price: 1399,
					orginPrice: 2699
				}
			]
		}
	]
	let demo2 = [
		{
			type: "swiper",
			data: [
				{ src: "/static/images/demo/demo4.jpg" },
				{ src: "/static/images/demo/demo5.jpg" },
				{ src: "/static/images/demo/demo6.jpg" }
			]
		},{
			type: "indexNavs",
			data: [
				{ src:"/static/images/indexnav/1.png",text:"新品发布" },
				{ src:"/static/images/indexnav/2.gif",text:"小米众筹" },
				{ src:"/static/images/indexnav/3.gif",text:"以旧换新" },
				{ src:"/static/images/indexnav/4.gif",text:"一分换团" },
				{ src:"/static/images/indexnav/5.gif",text:"超值特卖" }
			]
		},
		{
			type: "threeAdvs",
			data: {
				big:         { src: "/static/images/demo/demo1.jpg" },
				smalltop:    { src: "/static/images/demo/demo2.jpg" },
				smallbottom: { src: "/static/images/demo/demo3.jpg" }
			}
		},
		{
			type: "oneAdv",
			data: {
				title: "每日精选",
				cover: "/static/images/demo/demo4.jpg"
			}
		},{
			type: "commonList",
			data: [
				{
					cover: "/static/images/demo/list/1.jpg",
					title: "米家空调",
					desc: "1.5匹直流变频",
					price: 1399,
					orginPrice: 2699
				},
				{
					cover: "/static/images/demo/list/2.jpg",
					title: "米家空调",
					desc: "1.5匹直流变频",
					price: 1399,
					orginPrice: 2699
				},
				{
					cover: "/static/images/demo/list/3.jpg",
					title: "米家空调",
					desc: "1.5匹直流变频",
					price: 1399,
					orginPrice: 2699
				},
				{
					cover: "/static/images/demo/list/4.jpg",
					title: "米家空调",
					desc: "1.5匹直流变频",
					price: 1399,
					orginPrice: 2699
				},
				{
					cover: "/static/images/demo/list/5.jpg",
					title: "米家空调",
					desc: "1.5匹直流变频",
					price: 1399,
					orginPrice: 2699
				},
				{
					cover: "/static/images/demo/list/6.jpg",
					title: "米家空调",
					desc: "1.5匹直流变频",
					price: 1399,
					orginPrice: 2699
				}
			]
		}
	]
	// import mediaList from '@/components/mediaList.vue';
	import swiperImage from "@/components/index/swiper-image.vue";
	import indexNav    from "@/components/index/index-nav.vue";
	import threeAdv    from "@/components/index/three-adv.vue";
	import card        from "@/components/common/card.vue";
	import commonList  from "@/components/common/commonList.vue";
	export default {
		components: {
			// mediaList,
			swiperImage,
			indexNav,
			threeAdv,
			card,
			commonList
		},
		data() {
			return {
				scrollinto: 'tab0',
				windowHeight: 0,
				tabIndex: 0,
				tabBars: [],
				newsitems: []
				
			}
		},
		// 页面载入的时候加载数据
		onLoad: function() {
			// 获取可视区域高度(原生头和底部之外的地方)
			uni.getSystemInfo({
				success:(e) => {
					// 这里得到的height单位是px
					this.windowHeight = e.windowHeight - uni.upx2px(81);
				}
			})
			
			// 初始化事件
			this.__init()
			
		},
		methods: {
			// 初始化事件
			__init() {
				// 获取顶部选项卡
				this.tabBars = demoTabBar
				// 根据顶部选项卡 生成页面
				let arr = []
				for (var i = 0; i < this.tabBars.length; i++) {
					let obj = {
						list:[],
						// 1.上拉加载更多 2.加载中 3.没有更多了
						loadingText: "上拉加载更多"
					}
					// 获取首屏数据
					if( i === 0 ) obj.list = demo1
					arr.push(obj)
				}
				this.newsitems = arr
			},
			
			// 切换选项卡
			changeTab(index) {
				if(this.tabIndex === index) return;
				this.tabIndex = index;
				this.scrollinto = 'tab' + index;
				this.addData();
			},
			
			// 监听滑动列表
			onChangeTab(e) {
				this.changeTab(e.detail.current);
			},
			
			// 加载数据
			addData() {
				// 拿到当前的索引
				let index = this.tabIndex
				// 请求数据
				this.newsitems[index].list = demo2
				
			},
			
			// 上拉加载更多
			loadMore(index){
				// 拿到当前对象
				let item = this.newsitems[index]
				// 是否处于可加载状态
				if(item.loadingText !== "上拉加载更多") return
				// 模拟加载
				item.loadingText = "加载中..."
				if(item.list.length < 20){
					setTimeout(() => {
						// 加载数据
						item.list = [...item.list,...demo2]
						// 恢复状态
						item.loadingText = "上拉加载更多"
					}, 2000);
				} else {
					item.loadingText = "没有更多了"
				}
			},
			
			
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = index;
				}
			},
			// 生成随机数据
			randomfn() {
				let ary = [
				];
				let length = this.tabBars.length;
				for (let i = 0; i < length; i++) {
					let aryItem = {
						loadingText: '加载更多......',
						data: []
					};
					// 给页面添加数据
					if (this.tabBars[i].template === 'index'){
						aryItem.data = [
							{
								type: "swiper",
								data: [
									{ src: "/static/images/demo/demo4.jpg" },
									{ src: "/static/images/demo/demo5.jpg" },
									{ src: "/static/images/demo/demo6.jpg" }
								]
							},
							{
								type: "indexNavs",
								data: [
									{ src:"/static/images/indexnav/1.png",text:"新品发布" },
									{ src:"/static/images/indexnav/2.gif",text:"小米众筹" },
									{ src:"/static/images/indexnav/3.gif",text:"以旧换新" },
									{ src:"/static/images/indexnav/4.gif",text:"一分换团" },
									{ src:"/static/images/indexnav/5.gif",text:"超值特卖" },
									{ src:"/static/images/indexnav/6.gif",text:"小米秒杀" },
									{ src:"/static/images/indexnav/7.gif",text:"真心想要" },
									{ src:"/static/images/indexnav/8.gif",text:"电视热卖" },
									{ src:"/static/images/indexnav/9.gif",text:"家电热卖" },
									{ src:"/static/images/indexnav/10.gif",text:"米粉卡" }
								]
							},
							{
								type: "threeAdvs",
								data: {
									big:         { src: "/static/images/demo/demo1.jpg" },
									smalltop:    { src: "/static/images/demo/demo2.jpg" },
									smallbottom: { src: "/static/images/demo/demo3.jpg" }
								}
							},
							{
								type: "oneAdv",
								data: {
									title: "每日精选",
									cover: "/static/images/demo/demo4.jpg"
								}
							},
							{
								type: "commonList",
								data: [
									{
										cover: "/static/images/demo/list/1.jpg",
										title: "米家空调",
										desc: "1.5匹直流变频",
										price: 1399,
										orginPrice: 2699
									},
									{
										cover: "/static/images/demo/list/2.jpg",
										title: "米家空调",
										desc: "1.5匹直流变频",
										price: 1399,
										orginPrice: 2699
									},
									{
										cover: "/static/images/demo/list/3.jpg",
										title: "米家空调",
										desc: "1.5匹直流变频",
										price: 1399,
										orginPrice: 2699
									},
									{
										cover: "/static/images/demo/list/4.jpg",
										title: "米家空调",
										desc: "1.5匹直流变频",
										price: 1399,
										orginPrice: 2699
									},
									{
										cover: "/static/images/demo/list/5.jpg",
										title: "米家空调",
										desc: "1.5匹直流变频",
										price: 1399,
										orginPrice: 2699
									},
									{
										cover: "/static/images/demo/list/6.jpg",
										title: "米家空调",
										desc: "1.5匹直流变频",
										price: 1399,
										orginPrice: 2699
									}
								]
							}
						]
					}
					ary.push(aryItem);
				}
				return ary;
			}
		}
	}
</script>

<style>
	.tab-item {
		width: 75upx;
		border-bottom-width: 5upx;
		border-bottom-style: solid;
		border-color: #FFFFFF;
	}
	.active .tab-item {
		border-color: #DE5F0E;
	}
	/* #ifdef MP-ALIPAY */
	.swiper-tab-list {
		display: inline-block;
	}
	/* #endif */
</style>
