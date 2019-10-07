<template>
	<view class="uni-tab-bar">
		<!-- 横向滚动导航 -->
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" 
			:class="['swiper-tab-list',tabIndex==index ? 'active' : '']" 
			:id="tab.id"
			:data-current="index" 
			@click="tapTab(index)">
				<view class="tab-item">
					{{tab.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 列表 -->
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tab,index1) in newsitems" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					
					<!-- index 模板 -->
					<template v-if="tabBars[index1].template === 'index'">
						
							<block v-for="(v,i) in tab.data" :key="i">
								
								<!-- 轮播图组件 -->
								<template v-if="v.type === 'swiper'">
									<swiper-image :resdata="v.data" />
								</template>
								
								<!-- 首页分类 -->
								<template v-if="v.type === 'indexNavs'">
									<index-nav :resdata="v.data" />
									<divider />
								</template>
								
								<!-- 三个广告图 -->
								<template v-if="v.type === 'threeAdvs'">
									<threeAdv :resdata="v.data" />
									<divider />
								</template>
								
								
								<!-- 大图广告位 -->
								<template v-if="v.type === 'oneAdv'">
									<card :headTitle="v.data.title" :bodyCover="v.data.cover"/>
								</template>
								
								
								<!-- 公共列表组件 750 - 5 = 745/2 = 372.5 -->
								<template v-if="v.type === 'commonList'">
									<view class="row j-sb">
										<block v-for="(listItem,listIndex) in v.data" :key="listIndex">
											<commonList :item="listItem" :index="listIndex"></commonList>
										</block>
									</view>
								</template>
							
								
								
								
								
							</block>
							
							
							
							
							
							
							
							
							
							
					</template>
					
					<!-- special 模板 -->
					<template v-if="tabBars[index1].template === 'special'">
						<view class="">
							其他模板
						</view>
					</template>
					
					
					<!-- 加载更多 -->
					<view class="uni-tab-bar-loading">
						<uni-load-more :loadingType="tab.loadingType" :contentText="loadingText"></uni-load-more>
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
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		components: {
			// mediaList,
			swiperImage,
			indexNav,
			threeAdv,
			uniLoadMore
		},
		data() {
			return {
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				newsitems: [
					{
						loadingText: "加载更多>>>>>",
						data:[
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
				    ,
					{ loadingText:"加载更多",data:[{type:"",data:[]}] },
					{ loadingText:"加载更多",data:[{type:"",data:[]}] },
					{ loadingText:"加载更多",data:[{type:"",data:[]}] },
					{ loadingText:"加载更多",data:[{type:"",data:[]}] },
					{ loadingText:"加载更多",data:[{type:"",data:[]}] },
					{ loadingText:"加载更多",data:[{type:"",data:[]}] },
					{ loadingText:"加载更多",data:[{type:"",data:[]}] },
					{ loadingText:"加载更多",data:[{type:"",data:[]}] }
				],
				data0: {
					"datetime": "40分钟前",
					"article_type": 0,
					"title": "uni-app行业峰会频频亮相，开发者反响热烈!",
					"source": "DCloud",
					"comment_count": 639
				},
				data1: {
					"datetime": "一天前",
					"article_type": 1,
					"title": "DCloud完成B2轮融资，uni-app震撼发布!",
					"image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
					"source": "DCloud",
					"comment_count": 11395
				},
				data2: {
					"datetime": "一天前",
					"article_type": 2,
					"title": "中国技术界小奇迹：HBuilder开发者突破200万",
					"image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90",
					"source": "DCloud",
					"comment_count": 11395
				},
				data4: {
					"datetime": "2小时前",
					"article_type": 4,
					"title": "uni-app 支持原生小程序自定义组件，更开放、更自由",
					"image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90",
					"source": "DCloud",
					"comment_count": 69
				},
				data3: {
					"article_type": 3,
					"image_list": [{
						"url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90",
						"width": 563,
						"height": 316
					}, {
						"url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90",
						"width": 641,
						"height": 360
					}, {
						"url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
						"width": 640,
						"height": 360
					}],
					"datetime": "5分钟前",
					"title": "uni-app 支持使用 npm 安装第三方包，生态更趋丰富",
					"source": "DCloud",
					"comment_count": 11
				},
				tabBars: [{
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
				}]
			}
		},
		onLoad: function() {
			// this.newsitems = this.randomfn()
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
			addData(e) {
				if (this.newsitems[e].data.length > 30) {
					this.newsitems[e].loadingType = 2;
					return;
				}
				for (let i = 1; i <= 10; i++) {
					this.newsitems[e].data.push(this['data' + Math.floor(Math.random() * 5)]);
				}
				this.newsitems[e].loadingType = 1;
			},
			// 异步改变tab
			async changeTab(e) {
				let index = e.detail.current;
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
				let ary = [];
				for (let i = 0, length = this.tabBars.length; i < length; i++) {
					let aryItem = {
						loadingType: 0,
						data: []
					};
					for (let j = 1; j <= 10; j++) {
						aryItem.data.push(this['data' + Math.floor(Math.random() * 5)]);
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
