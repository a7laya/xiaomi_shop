<template>
	<view>
		<view class="card">
			<!-- head -->
			<view v-if="showhead" class="p-2 main-border-color"
			:class="getHeadClass">
				<slot name="title">
					<text v-if="headTitle" class="font-md "
					:class="headTitleWeight ? 'font-weight' : ''">{{headTitle}}</text>
				</slot>
			</view>
			<!-- body -->
			<view :class="getBodyClass">
				<image v-if="bodyCover" :src="bodyCover" 
				mode="widthFix"></image>
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			// 是否显示标题
			showhead: {
				type: Boolean,
				default: true
			},
			// 是否显示头部下边线
			headBorderBottom: {
				type: Boolean,
				default: true
			},
			// 
			bodyPadding: {
				type: Boolean,
				default: true
			},
			// 头部标题
			headTitle: String,
			// 头部标题是否加粗
			headTitleWeight:{
				type: Boolean,
				default: true
			},
			// 大图地址
			bodyCover: String
		},
		methods:{
			event(obj){
				console.log(obj);
			}
		},
		computed:{
			getHeadClass() {
				let BorderBottom = this.headBorderBottom ? 'border-bottom':''
				return `${BorderBottom}`
			},
			getBodyClass(){
				let padding = this.bodyPadding ? 'p-2' : ''
				return `${padding}`
			}
		}
	}
</script>

<style>
</style>
