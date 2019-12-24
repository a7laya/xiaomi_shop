<template>
	<view>
		<!-- 商品详情大图 -->
		<swiper-image :resdata="banners" height='750' preview></swiper-image>
		
		<!-- 基础详情 -->
		<base-info    :resdata="detail"></base-info>
		
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
							<text v-for="(item,index) in labels" :key="index" class="ml-1">
								{{item.list[item.selected].name}}
							</text>
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
					<price priceSize="font-lg" unitSize="font">{{detail.pprice}}</price>
					<view class="d-block d-flex">
						<text v-for="(item,index) in labels" :key="index" class="ml-1">
							{{item.list[item.selected].name}}
						</text>
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
	import commonList     from '@/components/common/commonList.vue'
	import bottomBtn      from "@/components/detail/bottom-btn.vue"
	import commonPopup    from '@/components/common/common-popup.vue'
	import price          from '@/components/common/price.vue'
	import zcmRadioGroup  from '@/components/common/zcm-radio-group.vue'
	import uniNumberBox   from '@/components/uni-ui/uni-number-box/uni-number-box.vue'
	
	import { mapState,mapGetters,mapActions,mapMutations } from "vuex"
	var htmlString = `
			<p>
				<img src="https://i8.mifile.cn/v1/a1/9c3e29dc-151f-75cb-b0a5-c423a5d13926.webp">
				<img src="https://i8.mifile.cn/v1/a1/f442b971-379f-5030-68aa-3b0accb8c2b9.webp">
				<img src="https://i8.mifile.cn/v1/a1/63b700b6-643e-ec18-fdf3-da66b4b4173f.webp">
				<img src="https://i8.mifile.cn/v1/a1/e9dbf276-193e-11c4-99a6-3097fde82350.webp">
				<img src="https://i8.mifile.cn/v1/a1/1249d3ee-2990-a2b4-28d9-f719c2417b1f.webp">
				<img src="https://i8.mifile.cn/v1/a1/97c79915-64b2-808c-53b4-4345652a179f.webp">
				<img src="https://i8.mifile.cn/v1/a1/cd0fbe1e-a1b3-a87a-f4a6-6fb08ec54931.webp">
			</p>
	    `
	export default {
		components:{uniNumberBox,zcmRadioGroup,price,commonPopup,bottomBtn,commonList,card,swiperImage,baseInfo,scrollAttrs,uniListItem,scrollComments,uParse},
		data() {
			return {
				labels:[
					{
						title: "颜色",
						selected: 0,
						list: [
							{ name: '黄色' },
							{ name: '黑色' },
							{ name: '红色' }
						]
					},
					{
						title: "容量",
						selected: 0,
						list: [
							{ name: '64GB' },
							{ name: '128GB' }
						]
					},
					{
						title: "套餐",
						selected: 0,
						list: [
							{ name: '标配' },
							{ name: '套餐一' },
							{ name: '套餐二' }
						]
					}
				],
				popupClass: {
					attr: "none",
					express: "none",
					service: "none"
				},
				hotList: [
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
				],
				context: htmlString,
				comments:[
					{
						avatar: "/static/images/demo/demo6.jpg",
						nickname: "哈哈1",
						create_time: "2019-11-11",
						goods_num: "128",
						context: "正在重启，如手机上HBuilder调试基座未启动",
						imglist:[
							{ src:"/static/images/demo/cate_03.png" },
							{ src:"/static/images/demo/cate_04.png" },
							{ src:"/static/images/demo/cate_05.png" }
						]
					},
					{
						avatar: "/static/images/demo/demo6.jpg",
						nickname: "哈哈2",
						create_time: "2019-11-11",
						goods_num: "124",
						context: "正在重启，如手机上HBuilder调试基座未启动",
						imglist:[
							{ src:"/static/images/demo/cate_06.png" },
							{ src:"/static/images/demo/cate_07.png" },
							{ src:"/static/images/demo/cate_08.png" }
						]
					},
					{
						avatar: "/static/images/demo/demo6.jpg",
						nickname: "哈哈3",
						create_time: "2019-11-11",
						goods_num: "124",
						context: "正在重启，如手机上HBuilder调试基座未启动",
						imglist:[
							{ src:"/static/images/demo/cate_06.png" },
							{ src:"/static/images/demo/cate_07.png" },
							{ src:"/static/images/demo/cate_08.png" }
						]
					}
				],
				banners:[
					{ src:'/static/images/demo/list/4.jpg' },
					{ src:'/static/images/demo/list/5.jpg' },
					{ src:'/static/images/demo/list/6.jpg' }
				],
				detail:{
					id:23,
					title: "小米CC 8GB+256GB",
					cover: '/static/images/demo/list/3.jpg',
					desc: "1亿像素主摄 / 全场景五摄像头 / 四闪光灯 / 3200万自拍 / 10 倍混合光学变焦，50倍数字变焦 / 5260mAh ⼤电量 / 标配 30W疾速快充 / ⼩米⾸款超薄屏下指纹 / 德国莱茵低蓝光认证 / 多功能NFC / 红外万能遥控 / 1216超线性扬声器",
					pprice: 2799,
					num: 1,
					minnum: 1,
					maxnum: 10
				},
				baseAttrs: [
					{ icon:"icon-cpu", title:"CPU", desc:"绞龙845八核" },
					{ icon:"icon-cpu", title:"CPU", desc:"绞龙845八核" },
					{ icon:"icon-cpu", title:"CPU", desc:"绞龙845八核" },
					{ icon:"icon-cpu", title:"CPU", desc:"绞龙845八核" },
					{ icon:"icon-cpu", title:"CPU", desc:"绞龙845八核" },
					{ icon:"icon-cpu", title:"CPU", desc:"绞龙845八核" },
					{ icon:"icon-cpu", title:"CPU", desc:"绞龙845八核" },
					{ icon:"icon-cpu", title:"CPU", desc:"绞龙845八核" },
					{ icon:"icon-cpu", title:"CPU", desc:"绞龙845八核" }
				]
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
				list:state => state.cart.list,
				pathList:state => state.path.list
			})
		},
		methods: {
			...mapMutations(['addGoodsToCart']),
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
