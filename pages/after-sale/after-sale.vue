<template>
	<view>
		<divider></divider>
		<view>
			<card headTitle="申请售后的产品" bodyPadding>
				<view class="d-flex a-center">
					<image src="/static/images/demo/cate_01.png" style="height: 90rpx; width: 90rpx; margin-right: 10rpx;" mode="widthFix"></image>
					<view>
						<view class="font-md font-weight line-h-md">小米8 青春版 梦幻蓝 6G+128G</view>
						<view class="text-light-muted font">维修服务剩余: 111天</view>
					</view>
				</view> 
			</card>
		</view>
		<divider></divider>
		<view>
			<card headTitle="服务类型" bodyPadding>
				<zcm-radio-group :label="label1" :selected.sync='label1.selected'></zcm-radio-group>
			</card>
		</view>
		<divider></divider>
		<view>
			<card headTitle="问题描述" bodyPadding>
				<view class="position-relative">
					<textarea placeholder="请详细描述一下您遇到的问题" :maxlength="maxlength" 
					style="height: 400rpx;border: #F5F5F5 solid 1px;box-sizing: border-box;"
					class="rounded p-1 w-100" v-model="content"></textarea>
					<!-- 剩余字数计数 -->
					<view class="position-absolute font-sm"
					:class="remain == 0 ? 'text-danger' : 'text-light-muted'"
					style="bottom: 4rpx; right: 14rpx;">
						{{remain}}/{{maxlength}}
					</view>
				</view>
				
			</card>
		</view>
		<view class="p-3">
			<view class="rounded main-bg-color text-white py-1 font-md text-center w-100" hover-class="main-bg-hover-color">
				下一步
			</view>
		</view>
	</view>
</template>

<script>
	import card from "@/components/common/card.vue"
	import zcmRadioGroup from "@/components/common/zcm-radio-group.vue"
	export default {
		components:{card, zcmRadioGroup},
		data() {
			return {
				content: '',
				maxlength: 50,
				label1:{
					selected: 0,
					list: [
						{ name: '维修' }
					]
				}
			}
		},
		methods: {
		},
		computed:{
			// 剩余可输入字数
			remain(){
				return this.maxlength - this.content.length
			}
		}
	}
</script>

<style>
page{
	background: #F5F5F5;
}
</style>
