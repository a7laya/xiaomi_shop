<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x class='scroll-row border-bottom px-2' style="height: 80rpx;">
			<view class="scroll-row-item px-2" 
			style="width: 80rpx; line-height: 80rpx;"
			v-for="(item,index) in tabBars" :key='index'
			:class="tabIndex === index ? 'main-text-color border-bottom' : ''">
				<text class="font-md">{{item.name}}</text>
			</view>
		</scroll-view>
		
		<!--scrollview要加上height才能滚动 并且要和swiper的height保持一致 -->
		<swiper :current="tabIndex" :style="'height: ' + windowHeight + 'px;'">
			<swiper-item v-for="(item, index) in tabBars" :key="index">
				<scroll-view scroll-y="true" :style="'height: ' + windowHeight + 'px;'">
					<!-- 轮播图 -->
					<swiper-image :resdata=""></swiper-image>
					<!-- 首页分类 -->
					<index-nav :resdata=""></index-nav>
					<divider></divider>
					
					<!-- 三图广告 -->
					<three-adv :resdata=""></three-adv>
					<divider></divider>
					
					<!-- 大图广告 -->
					<card :headTitle="" :bodyCover=""></card>
					
					<!-- 公共列表组件 -->
					<view class="row j-sb">
						<block v-for="(item2,index2) in commonList" :key="index2">
							<commonList :item="item2" :index="index2"></commonList>
						</block>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	// import mediaList from '@/components/mediaList.vue';
	import swiperImage from "@/components/index/swiper-image.vue";
	import indexNav    from "@/components/index/index-nav.vue";
	import threeAdv    from "@/components/index/three-adv.vue";
	export default {
		components: {
			// mediaList,
			swiperImage,
			indexNav,
			threeAdv
		},
		data() {
			return {
				windowHeight: 0,
				tabIndex: 1,
				tabBars: [
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
				],
				newsitems: [
					{
						name: "关注",
						list:[
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
									{ src:"/static/images/indexnav/5.gif",text:"超值特卖" }
								]
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
					, {
						name: '推荐',
						id: 'tuijian',
						list:[]
					}, {
						name: '体育',
						id: 'tiyu',
						list:[]
					}, {
						name: '热点',
						id: 'redian',
						list:[]
					}, {
						name: '财经',
						id: 'caijing',
						list:[]
					}, {
						name: '娱乐',
						id: 'yule',
						list:[]
					}, {
						name: '军事',
						id: 'junshi',
						list:[]
					}, {
						name: '历史',
						id: 'lishi',
						list:[]
					}, {
						name: '本地',
						id: 'bendi',
						list:[]
					}
				]
				
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
			
		},
		methods: {
			// 加载更多
			loadMore(e) {
				this.newsitems[e].loadingType = 1;
				setTimeout(() => {
					this.addData(e);
				}, 1200);
			},
			// 加载更多模拟数据
			addData(e) { //拿到当前索引e
				if (this.newsitems[e].data.length > 20) {
					this.newsitems[e].loadingText = '没有更多了';
					return;
				}
				let arr = [
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
							{ src:"/static/images/indexnav/5.gif",text:"超值特卖" }
						]
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
				this.newsitems[e].data=[...this.newsitems[e].data,...arr];
			},
			// 改变tab
			async changeTab(e) {
				let index = e.target.current;
				if (this.newsitems[index].data.length === 0) {
					this.addData(index)
				}
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;
				
				for (let i = 0; i < index; i++) {
					let result = await this.getElSize(this.tabBars[i].id);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(this.tabBars[index].id),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题
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
