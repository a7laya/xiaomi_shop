<template>
	<view>
		<!-- 商品详情大图 -->
		<swiper-image :resdata="banners" height='750' preview></swiper-image>
		
		<!-- 基础详情 -->
		<base-info    :resdata="detail" :show-price='showPrice'></base-info>
		
		<!-- 滚动商品特性 w170*h110 -->
		<scroll-attrs :resdata='baseAttrs'></scroll-attrs>
		
		<!-- 属性选择 -->
		<view class="p-2 ">
			<view class="rounded boder bg-light-secondary">
				<!-- 商品属性 -->
				<uni-list-item @tap="show('attr')">
					<view class="d-flex">
						<text class="font-md text-muted">已选</text>
						<text class="font-md ml-1">
							{{showAttr}}
						</text>
					</view>
				</uni-list-item>
				<!-- 配送信息 -->
				<uni-list-item @tap="show('express')">
					<view class="d-flex">
						<text class="font-md text-muted">配送</text>
						<text class="font-md mx-1">北京 东城区</text>
						<view class="main-text-color">有现货</view>
					</view>
				</uni-list-item>
				<!-- 服务说明 -->
				<uni-list-item widthExtra="5%"  @tap="show('service')">
					<view class="d-flex a-center">
						<text class="iconfont icon-shoujiduihao main-text-color"></text>
						<text class="m-1">小米自营</text>
						<text class="iconfont icon-shoujiduihao main-text-color"></text>
						<text class="m-1">小米发货</text>
						<text class="iconfont icon-shoujiduihao main-text-color"></text>
						<text class="m-1">七天无理由退货</text>
					</view>
				</uni-list-item>
				
			</view>
		</view>
		
		<!-- 横向滚动评论 外层 w620 * h380   头像 70 * 70 图片 h115 -->
		<scroll-comments :resdata="comments"></scroll-comments>
		
		<!-- 商品详情 -->
		<view class="py-2">
			<uParse className="uparse" :content="context" @preview="preview" @navigate="navigate" />
		</view>
		
		<!-- 热门推荐 -->
		<card headTitle="热门推荐" :headTitleWeight="false" :headBorderBottom="false">
			<view class="row j-sb">
				<commonList v-for="(item,index) in hotList" :key="index" 
				:item="item" :index="index"></commonList>
			</view>
		</card>
		<!-- 底部操作条 -->
		<bottomBtn @show="show('attr')"></bottomBtn>
		
		<!-- 购物车弹出框 进行属性选择 -->
		<commonPopup :popupClass="popupClass.attr" @hide='hide("attr")'>
			<!-- 商品信息 H:275rpx -->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="/static/images/demo/list/1.jpg" mode="widthFix" style="height: 180rpx; width: 180rpx;" class="border rounded"></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">{{showPrice}}</price>
					<view class="d-block d-flex">
						{{showAttr}}
					</view>
				</view>
			</view>
			<!-- 表单部分 H:660rpx -->
			<scroll-view scroll-y class="w-100" style="height: 660rpx;">
				<card :headTitle="item.title" :headTitleWeight="false" :headBorderBottom="false"
				v-for="(item,index) in labels" :key="index">
					<zcm-radio-group :label="item" :selected.sync='item.selected'></zcm-radio-group>
				</card>
				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量{{detail.num}}</text>
					<uni-number-box :min="detail.minnum" :max="detail.maxnum" :value="detail.num" @change="detail.num = $event"></uni-number-box>
				</view>
			</scroll-view>
			<!-- 按钮 H:100rpx -->
			<view class="w-100 main-bg-color text-white font-md d-flex j-center a-center position-fixed bottom-0 left-0" 
			hover-class="main-bg-hover-color" style="height: 100rpx;" @tap.stop="addCart">
				加入购物车
			</view>
		</commonPopup>
		
		<!-- 收货地址弹出框 -->
		<commonPopup :popupClass="popupClass.express" @hide='hide("express")'>
			<!-- 标题 H:100rpx -->
			<view class="w-100 d-flex j-center a-center font-md border-bottom border-light-secondary" 
			style="height: 100rpx;">
				收货地址
			</view>
			<!-- 表单部分 H:835rpx -->
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<uni-list-item v-for="(item,index) in pathList" :key="index">
					<view class="iconfont icon-dingwei font-weight font-md">{{item.name}}</view>
					<view class="font text-light-muted">{{item.path}}{{item.detailPath}}</view>
				</uni-list-item>
			</scroll-view>
			<!-- 按钮 H:100rpx -->
			<view class="w-100 main-bg-color text-white font-md d-flex j-center a-center position-fixed bottom-0 left-0" 
			hover-class="main-bg-hover-color" style="height: 100rpx;" @tap.stop="openCreatePath">
				添加新收货地址
			</view>
		</commonPopup>
		
		<!-- 服务说明弹出框 -->
		<commonPopup :popupClass="popupClass.service" @hide='hide("service")'>
			<!-- 标题 H:100rpx -->
			<view class="w-100 d-flex j-center a-center font-md border-bottom border-light-secondary" 
			style="height: 100rpx;">
				服务说明
			</view>
			<!-- 表单部分 H:835rpx -->
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<view class="py-2">
					<view class="d-flex flex-row a-center">
						<view class="iconfont icon-shoujiduihao main-text-color mr-1"></view>
						小米自营
					</view>
					<view class="text-light-muted font pl-4">
						不管满多少
					</view>
				</view>
				<view class="py-2">
					<view class="d-flex flex-row a-center">
						<view class="iconfont icon-shoujiduihao main-text-color mr-1"></view>
						小米发货
					</view>
				</view>
				<view class="py-2">
					<view class="d-flex flex-row a-center">
						<view class="iconfont icon-shoujiduihao main-text-color mr-1"></view>
						七天无理由退货
					</view>
					<view class="text-light-muted font pl-4">
						不管满多少
					</view>
				</view>
			</scroll-view>
			<!-- 按钮 H:100rpx -->
			<view class="w-100 main-bg-color text-white font-md d-flex j-center a-center position-fixed bottom-0 left-0" 
			hover-class="main-bg-hover-color" style="height: 100rpx;" @tap.stop="hide('service')">
				确定
			</view>
		</commonPopup>
	</view>
</template>

<script>
	import swiperImage    from "@/components/index/swiper-image.vue"
	import baseInfo       from "@/components/detail/base-info.vue"
	import scrollAttrs    from "@/components/detail/scroll-attrs.vue"
	import uniListItem    from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import scrollComments from "@/components/detail/scroll-comments.vue"
	import uParse         from '@/components/uni-ui/uParse/src/wxParse.vue'
	import card           from '@/components/common/card.vue'
	import commonList     from '@/components/common/common-list.vue'
	import bottomBtn      from "@/components/detail/bottom-btn.vue"
	import commonPopup    from '@/components/common/common-popup.vue'
	import price          from '@/components/common/price.vue'
	import zcmRadioGroup  from '@/components/common/zcm-radio-group.vue'
	import uniNumberBox   from '@/components/uni-ui/uni-number-box/uni-number-box.vue'
	
	import { mapState,mapGetters,mapActions,mapMutations } from "vuex"
	
	export default {
		components:{uniNumberBox,zcmRadioGroup,price,commonPopup,bottomBtn,commonList,card,swiperImage,baseInfo,scrollAttrs,uniListItem,scrollComments,uParse},
		data() {
			return {
				item: {},
				labels:[],
				popupClass: {
					attr: "none",
					express: "none",
					service: "none"
				},
				hotList: [],
				context: '',
				comments:[],
				banners:[],
				detail:{},
				baseAttrs: []
			}
		},
		// 监听页面返回事件
		onBackPress() {
			// 关闭弹出框 而不是直接退回上一个页面
			for (let key in this.popupClass) {
				if(this.popupClass[key] !== "none"){
					this.hide(key)
					return true
				}
			}
		},
		computed:{
			...mapState({
				list:     state => state.cart.list,
				pathList: state => state.path.list
			}),
			// 显示规格 eg:黄色,套餐一
			showAttr(){
				return this.labels.map(v => v.list[v.selected].name).join(',')
			},
			// 显示根据规格计算出来的价格
			showPrice(){
				let skus = this.detail.goodsSkus
				// 刚进入页面 this.detail里面是空的 防止报错
				if(skus === undefined) return this.detail.min_price || 0.00
				// 这里用findIndex效率比较高
				let index = skus.findIndex(v => this.showAttr === v.skusText)
				return skus[index].pprice
			}
		},
		onLoad(e) {
			console.log('e:',JSON.parse(e.detail));
			this.item = JSON.parse(e.detail)
			this.__init(this.item.id)
		},
		methods: {
			...mapMutations(['addGoodsToCart']),
			// 初始化页面
			__init(id) {
				console.log(id);
				this.$H.get(`/goods/${id}`).then(res => {
					console.log("res:", res);
					// 设置标题
					uni.setNavigationBarTitle({
						title: res.title
					})
					// 轮播图
					this.banners = res.goodsBanner.map(v => {return {src: '/static/images/demo/list/4.jpg'}})
					// 初始化基本信息
					this.detail = res
					// 滚动商品属性
					this.baseAttrs = res.goodsAttrs.map(v => {
						return {
							icon:"icon-cpu", 
							title: v.name, 
							desc: v.value
						}
					})
					// 评论
					this.comments = res.hotComments.map(v => {
						return {
							id: v.id,
							user_id: v.user.id,
							avatar: v.user.avatar,
							nickname: v.user.nickname,
							create_time: v.review_time,
							goods_num: v.goods_num,
							context: v.review.data,
							imglist: v.review.image
						}
					})
					
					// 商品详情
					this.context = res.content
					
					// 热门推荐
					this.hotList = res.hotList.map(v=>{
						return {
							id: v.id,
							cover: v.cover,
							title: v.title,
							desc: v.desc,
							pprice: v.min_price,
							oprice: v.min_oprice
						}
					})
					
					// 商品规格选择
					this.labels = res.goodsSkusCard.map(v=>{
						return {
							id: v.id,
							title: v.name,
							selected: 0,
							list: v.goodsSkusCardValue.map(item=>{
								return {
									id: item.id,
									name: item.value
								}
							})
						}
					})
					
					// 商品规格,匹配价格
					this.detail.goodsSkus.forEach(item => {
						let arr = []
						for (let key in item.skus) {
							arr.push(item.skus[key].value)
						}
						item.skusText = arr.join(',')
					})
				})
			},
			// 加入购物车
			addCart(){
				// 组织数据
				let goods = this.detail
				goods['checked'] = false
				goods['attrs'] = this.labels
				// 加入购物车
				this.addGoodsToCart(goods)
				// 隐藏popup
				this.hide('attr')
				// 提示加入成功
				uni.showToast({
					title: '加入购物车成功'
				});
			},
			// 控制底部弹出框的显示和隐藏
			hide(key) {
				this.popupClass[key]='hide'
				setTimeout(()=>{
					this.popupClass[key]="none"
				}, 200);
				console.log('mask');
			},
			show(key) {
				this.popupClass[key]='show'
			},
			openCreatePath() {
				uni.navigateTo({
					url: '/pages/user-path-edit/user-path-edit',
				})
				this.hide('express')
			},
			
			
			// 下面的preview和navigate是 htmlParse组件产生的两个方法
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				console.log("href: " + href);
				uni.showModal({
					content : "点击链接为：" + href,
					showCancel:false
				})
			}
		}
	}
</script>

<style>
/* html富文本解析设置 */
.uparse .p {
	padding-top: 0!important;
	padding-bottom: 0!important;
}
.uparse view{
	line-height: 0!important;
}

</style>
