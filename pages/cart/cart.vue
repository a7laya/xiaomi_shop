<template>
	<view style="background: #F5F5F5;">
		<uni-nav-bar :right-text="isEdit ? '完成' : '编辑'" 
		title="购物车" statusBar :shadow="false" :fixed="true"
		@click-right='isEdit = !isEdit'></uni-nav-bar>
		
		<!-- 购物车为空 -->
		<view class="d-flex a-center j-center w-100 py-5 bg-white"
		v-show="list.length==0">
			<view class="iconfont icon-gouwuche text-light-muted font-big"></view>
			<view class="font-md text-light-muted mx-2">购物车还是空的</view>
			<view class="border border-light-secondary py-1 px-2 font-md rounded" hover-class=" bg-light-secondary">去逛逛</view>
		</view>
		<!-- 购物车商品列表 -->
		<view class="px-2 bg-white">
			<!-- 商品块 -->
			<view class="d-flex a-center py-3 border-bottom border-light-secondary"
			v-for="(item, index) in list" :key="index">
				<!-- 复选框 - 引用了单选按钮的图标 -->
				<label class="radio d-flex a-center j-center flex-shrink" style="width: 100rpx; height: 100rpx;">
					<radio :value="item.id" color="#FD6801" :checked="item.checked" @click="selectItem(index)"/>
				</label>
				<!-- 商品主图 -->
				<image :src="item.cover" mode="widthFix" style="width: 150rpx; height: 150rpx;" 
				class="mr-2 p-1 border border-light-secondary rounded flex-shrink"></image>
				<!-- 商品信息 -->
				<view class="flex-1 d-flex flex-column">
					<!-- 标题 -->
					<view class="text-dark" style="font-size: 35rpx;">
						{{item.title}}
					</view>
					<!-- 规格属性 -->
					<view class="text-light-muted mb-1"
					:class="isEdit ? 'p-1 bg-light-secondary mb-2 d-flex a-center' : ''"
					@click="doShowPopup(index)">
						<text class="mr-1" v-for="(attr, attrIndex) in item.attrs" :key="attrIndex">
							{{attr.list[attr.selected].name}}
						</text>
						
						<view class="iconfont icon-xiangxia font ml-auto" v-if="isEdit"></view>
					</view>
					<!-- 价格 数量 -->
					<view class="mt-auto d-flex j-sb">
						<price>{{item.pprice}}</price>
						<view class="a-self-end">
							<uni-number-box :min="item.minnum" :max="item.maxnum" :value="item.num"
							@change="changeNum($event, item, index)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 合计 -->
		<!-- #ifdef APP-PLUS -->
		<view class="d-flex a-center a-stretch position-fixed left-0 bottom-0 w-100 bg-white border-top border-light-secondary" 
		style="height: 100rpx;z-index: 100;">
		<!-- #endif -->
		
		<!-- #ifdef H5 -->
		<view class="d-flex a-center a-stretch position-fixed left-0 w-100 bg-white border-top border-light-secondary"
		style="height: 100rpx;z-index: 100; bottom: 90rpx;">
		<!-- #endif -->
		
			<label class="radio d-flex a-center j-center flex-shrink" style="width: 120rpx;" 
			@click="doSelectAll">
				<radio color="#FD6801" :checked="checkedAll" :disabled="disableSelectAll"/>
			</label>
			
			<!-- 编辑/完成转台切换 -->
			<template v-if="!isEdit">
				<view class="flex-1 d-flex a-center j-center font-md">
					合计 <price unitSize="33" priceSize="44">{{totalPrice}}</price>
				</view>
				<view class="flex-1 d-flex a-center j-center main-bg-color" hover-class="main-bg-hover-color"
				@click="orderConfirm">
					<text class="text-white font-md">结算</text>
				</view>
			</template>
			<template v-else>
				<view class="flex-1 d-flex a-center j-center main-bg-color" hover-class="main-bg-hover-color">
					<text class="text-white font-md">移入收藏</text>
				</view>
				<view class="flex-1 d-flex a-center j-center bg-danger" hover-class="main-bg-hover-color"
				@click="doDelGoods">
					<text class="text-white font-md">删除</text>
				</view>
			</template>
		</view>
		
		<!-- 购物车弹出框 进行属性选择 -->
		<commonPopup :popupClass="popupShow" @hide='doHidePopup'>
			<!-- 商品信息 H:275rpx -->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="/static/images/demo/list/1.jpg" mode="widthFix" style="height: 180rpx; width: 180rpx;" class="border rounded"></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">2399</price>
					<view class="d-block d-flex">
						<text v-for="(item,index) in popupData.attrs" :key="index" class="ml-1">
							{{item.list[item.selected].name}}
						</text>
					</view>
				</view>
			</view>
			<!-- 表单部分 H:660rpx -->
			<scroll-view scroll-y class="w-100" style="height: 660rpx;">
				<card :headTitle="item.title" :headTitleWeight="false" :headBorderBottom="false"
				v-for="(item,index) in popupData.attrs" :key="index">
					<zcm-radio-group :label="item" :selected.sync='item.selected'></zcm-radio-group>
				</card>
				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量{{popupData.num}}</text>
					<uni-number-box :min="1" :value="popupData.num" @change="popupData.num = $event"></uni-number-box>
				</view>
			</scroll-view>
			<!-- 按钮 H:100rpx -->
			<view class="w-100 main-bg-color text-white font-md d-flex j-center a-center position-fixed bottom-0 left-0" 
			hover-class="main-bg-hover-color" style="height: 100rpx;" @tap.stop="doHidePopup">
				确定
			</view>
		</commonPopup>
		
		
		<!-- 为你推荐 -->
		<view class="text-center main-text-color font-md font-weight pt-2">
			为你推荐
		</view>
		<view class="position-relative d-flex a-center j-center text-secondary p-3">
			<view class="position-absolute px-1" style="background-color: #F5F5F5;z-index: 2;">买的人还买了</view>
			<view class="position-absolute w-100" style="height: 1upx; left: 0; background-color: #DDDDDD;">
				
			</view>
		</view>
		<view class="row j-sb bg-white">
			<commonList v-for="(item,index) in hotList" :key="index" 
			:item="item" :index="index"></commonList>
		</view>
		
		
		<!-- 占位符 -->
		<view style="height:200rpx"></view>
	</view>
</template>

<script>
	// 引入组件
	import uniNavBar     from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue"
	import price         from "@/components/common/price.vue"
	import uniNumberBox  from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	import commonPopup   from '@/components/common/common-popup.vue'
	import card          from '@/components/common/card.vue'
	import zcmRadioGroup from '@/components/common/zcm-radio-group.vue'
	import commonList    from '@/components/common/commonList.vue'
		
	// 引入vuex
	import { mapState,mapGetters,mapActions,mapMutations } from "vuex"
	
	export default {
		components:{ commonList,zcmRadioGroup,card,commonPopup,uniNumberBox,price,uniNavBar },
		data(){
			return {
				isEdit: false,
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
			}
		},
		computed:{
			...mapState({
				list: state=>state.cart.list,
				popupShow: state=>state.cart.popupShow
			}),
			...mapGetters(['checkedAll','totalPrice','disableSelectAll','popupData'])
		},
		methods:{	
			...mapMutations(['selectItem']),
			...mapActions(['doSelectAll','doDelGoods','doShowPopup','doHidePopup']),
			changeNum(e,item,index){
				item.num = e
			},
			// 订单结算
			orderConfirm(){
				uni.navigateTo({
					url: '/pages/order-confirm/order-confirm'
				});
			}
		}
	}
</script>

<style>

</style>
