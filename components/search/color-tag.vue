<template>
	<view class="d-inline-block">
		<view class="px-2 py-1 border d-inline-block m-1" :style="getStyle">
			{{item.name}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item: Object,
			color: {
				type: Boolean,
				default: true
			}
		},
		computed:{
			getStyle(){
				if(!this.color) {
					return 'border-radius:4px;border:none;background-color:#f5f5f5;color:#555555;'
				}
				let color = {
					borderColor:['#EEA6AA', '#DD6A4B', '#98D5D8', '#9DBE93', '#BCCD99'],
					backgroudColor:['#F8EAE9', '#FFBEC6', '#E8F6F6', '#E4F5E2', '#F2F6E8']
				}
				let index = Math.floor(Math.random() * color.borderColor.length)
				let borderColor = color.borderColor[index]
				let backgroudColor = color.backgroudColor[index]
				return `border-color: ${borderColor}; background-color: ${backgroudColor}`
			}
		}
	}
</script>

<style>
</style>
