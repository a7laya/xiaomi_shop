<template>
	<view>
		<view class="card">
			<!-- head -->
			<view v-if="showhead" class="p-2 border-bottom main-border-color">
				<slot name="title">
					<text v-if="headTitle" class="font-md font-weight">{{headTitle}}</text>
				</slot>
			</view>
			<!-- body -->
			<view>
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
			// 头部标题
			headTitle: String,
			// 大图地址
			bodyCover: String
		},
		methods:{
			event(obj){
				console.log(obj);
			}
		}
	}
</script>

<style>
</style>
