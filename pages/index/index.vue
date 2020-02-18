<template>
	<view>
		<!-- 在小程序端需要 自定义导航 -->
		<!-- #ifdef MP -->
			<view class="d-flex a-center" style="height: 90rpx;">
				<!-- 左边 -->
				<view style="width: 85rpx;" class="d-flex a-center j-center">
					<text class="iconfont icon-62 font-md"></text>
				</view>
				<!-- 中间 -->
				<view class="flex-1 bg-light rounded d-flex a-center text-light-muted" style="height: 65rpx;">
					<text class="iconfont icon-sousuo mx-2"></text>
					智能积木 越野四驱2
				</view>
				<!-- 右边 -->
				<view style="width: 85rpx;" class="d-flex a-center j-center">
					<text class="iconfont icon-saomiao"></text>
				</view>
			</view>
		<!-- #endif -->
		
		
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x class='scroll-row border-bottom px-2' style="height: 80rpx;"
		:scroll-into-view="scrollinto" 
		scroll-with-animation="true">
			<view class="scroll-row-item px-3" 
			style="line-height: 80rpx;"
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
					<template v-if="item.list.length > 0">
						<block v-for="(list,listIndex) in item.list" :key="listIndex">
							<!-- 轮播图组件 -->
							<swiper-image v-if="list.type === 'swiper'" 
							:resdata="list.data" />
							
							<template  v-else-if="list.type === 'indexnavs'">
								<!-- 首页分类 -->
								<index-nav :resdata="list.data" />
								<divider />
							</template>
							
							<template  v-else-if="list.type === 'threeAdv'">
								<!-- 三图广告 -->
								<three-adv :resdata="list.data" />
								<divider />
							</template>
							<!-- 大图广告位 -->
							<!-- <card headTitle="每日精选" bodyCover="/static/images/demo/demo4.jpg" /> -->
							
							<!-- 公共列表组件 750 - 5 = 745   372.5-->
							<view class="row j-sb" v-else-if="list.type === 'list'">
								<block v-for="(item2,index2) in list.data" :key="index2">
									<common-list :item="item2" :index="index2" />
								</block>
							</view>
							 
						</block>
					
						<!-- 上拉加载更多 -->
						<divider />
						<view 
						class="d-flex a-center j-center text-light-muted font-md py-3">
							{{item.loadingText}}
						</view>
					</template>
					<template v-else-if="item.firstLoad">
						<view class="d-flex j-center a-center pt-5">
							<text class="font-md text-light-muted">加载中...</text>
						</view>
					</template>
					<template v-else>
						<!-- 空数据 -->
						<view class="d-flex j-center a-center pt-5">
							<text class="font-md text-light-muted">暂无数据</text>
						</view>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import swiperImage from "@/components/index/swiper-image.vue";
	import indexNav    from "@/components/index/index-nav.vue";
	import threeAdv    from "@/components/index/three-adv.vue";
	import card        from "@/components/common/card.vue";
	import commonList  from "@/components/common/common-list.vue";
	
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
				newsitems: [{}]
			}
		},
		// 页面载入的时候加载数据
		onLoad: function() {
			// 获取可视区域高度(原生头和底部之外的地方)
			uni.getSystemInfo({
				success:(e) => { 
					let navbarH = 0
					// #ifdef MP
						navbarH = uni.upx2px(90)
					// #endif
					// 这里得到的height单位是px
					this.windowHeight = e.windowHeight - uni.upx2px(81) -navbarH;
				}
			})
			
			// 初始化事件
			this.__init()
			
		},
		methods: {
			// 初始化事件
			__init(){
				// 获取顶部选项卡
				this.$H.get('/index_category/data').then((res)=>{
					console.log('请求到的首屏数据：',res);
					this.tabBars = res.category
					// 根据顶部选项卡生成页面
					let arr = []
					for (var i = 0; i < this.tabBars.length; i++) {
						// 初始化每个页面的obj
						let obj = {
							list:[],
							// 1.上拉加载更多 2.加载中... 3.没有更多了
							loadingText: "上拉加载更多",
							// 是否首次加载
							firstLoad: true
						}
						// 获取首屏数据
						if (i === 0) {
							obj.list = res.data
							obj.firstLoad = false
						}
						
						arr.push(obj)
					}
					this.newsitems = arr
				})
			},
			// 切换选项卡
			changeTab(index) {
				if(this.tabIndex === index) return;
				this.tabIndex = index;
				this.scrollinto = 'tab' + index;
				if(this.newsitems[index].firstLoad) this.addData();
			},
			
			// 监听滑动列表
			onChangeTab(e) {
				this.changeTab(e.detail.current);
			},
			
			// 加载数据
			async addData(callback = false) {
				// 拿到当前的索引
				let index = this.tabIndex
				// 拿到当前对象
				let obj = this.newsitems[index]
				// 获取当前分类id
				let id = this.tabBars[index].id
				// 获取当前分页数
				let page = Math.ceil(obj.list.length/5) + 1
				
				// 请求数据
				let data = await this.$H.get(`/index_category/${id}/data/${page}`)
				console.log('data:',data)
				// 标记该页面已加载过 -> 非首次加载
				obj.firstLoad = false
				// 回调
				if(typeof callback === 'function') callback()
				// 请求不到数据 就终止
				if(!data) return obj.loadingText = "没有更多了"
				// 追加渲染数据
				obj.list = [...obj.list, ...data]
				// 根据获取到的数据条目 -> 没有更多了
				obj.loadingText = data.length < 5 ? "没有更多了" : "上拉加载更多"
			},
			
			// 上拉加载更多
			loadMore(index){
				// 拿到当前对象
				let obj = this.newsitems[index]
				// 是否处于可加载状态
				if(obj.loadingText !== "上拉加载更多") return
				
				// 先将状态设置为 "加载中..."				
				obj.loadingText = "加载中..."
				
				// 加载数据
				this.addData(()=>{
					uni.showToast({
						title: '加载成功',
						icon: 'none'
					});
				})
				
				// 数据加载完毕之后更改状态 "上拉加载更多"/"没有更多了"
				// todo...（这部分在addData里面完成了）

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
