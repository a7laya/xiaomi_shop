<template>
	<view class="d-flex flex-column" style="height: 100%;">
		<!-- 选项卡 -->
		<view class="d-flex j-center a-center bg-white w-100 border-top border-light-secondary">
			<view class="flex-1 d-flex j-center a-center py-2"
			:class="tabIndex === index ? 'tab-active' : 'text-light-muted'"
			v-for="(item,index) in tabBars" :key="index" @click="tabIndex = index">
				{{item.name}}
			</view>
		</view>
		
		<!-- 优惠券列表 -->
		<scroll-view scroll-y class="flex-1" style="background-color: #F5F5F5;">
			<block v-for="(tab,tabI) in tabBars" :key="tabI">
				<view class="position-relative p-3" v-show="tabI === tabIndex" style="min-height: 440rpx;">
					<!-- 有优惠券 -->
					<template v-if="tab.list.length > 0">
						<coupon v-for="(item,index) in tab.list" :key="index" :item="item"></coupon>
					</template>
					
					<!-- 优惠券为空 -->
					<template v-else>
						<nothing :icon="tab.nothing" :msg="tab.msg"></nothing>
					</template>
				</view>
				
			</block>
		</scroll-view>
		
	</view>
</template>

<script>
	import nothing     from '@/components/common/nothing.vue'
	import coupon from "@/components/order-coupon/coupon.vue"
	export default {
		components:{nothing,coupon},
		data() {
			return {
				tabIndex: 0,
				tabBars:[
					{   name:"可用", id:1, nothing:"no_receiving", msg:"没有可用优惠券",
						list:[
							{
								title: '手机立减1000元',
								start_time: "2020-01-02",
								end_time: "2020-02-02",
								price: "1000",
								desc:"满3000元使用",
								status: true, // 可用 失效
								disabled: false
							},
							{
								title: '手机立减1000元',
								start_time: "2020-01-01",
								end_time: "2020-02-02",
								price: "1000",
								desc:"满3000元使用",
								status: true, // 可用 失效
								disabled: true
							},
						],
					},
					{   name:"已失效", id:2, nothing:"no_comment", msg:"没有已失效优惠券",
					    list:[
							{
								title: '手机立减1000元',
								start_time: "2020-01-02",
								end_time: "2020-02-02",
								price: "1000",
								desc:"满3000元使用",
								status: false, // 可用 失效
								disabled: true
							},
							{
								title: '手机立减1000元',
								start_time: "2020-01-01",
								end_time: "2020-02-02",
								price: "1000",
								desc:"满3000元使用",
								status: false, // 可用 失效
								disabled: true
							},
					    ],
					},
				],
			}
		},
		methods: {
			// 切换选项卡
			changeTab(index) {
				this.tabIndex = index
			},
			
		}
	}
</script>

<style>
.tab-active{
	border-bottom: 5rpx solid #FD6801 !important;
	color: #FD6801 !important;
	/* margin-bottom: -5rpx; */
}

</style>
