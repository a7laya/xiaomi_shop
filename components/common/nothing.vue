<template>
	<view class="w-100 d-flex flex-column j-center a-center" 
	style="height: 400rpx; background-color: #F5F5F5;">
		<image :src="getUrl"  mode="widthFix"
		style="width: 242rpx;"></image>
		<text class="text-light-muted mt-2">{{msg}}</text>
	</view>
</template>

<script>
	export default {
		props:{
			icon:{
				type: String,
				default:"no_comment"
			},
			msg:{
				type: String,
				default:""
			}
		},
		computed:{
			getUrl(){
				return `/static/images/nothing/${this.icon}.png`
			}
		}
	}
</script>

<style>
</style>
