<template>
	<!-- 单选按钮组 -->
	<view class="row">
		<view class="span24-8 px-2 mb-2" v-for="(item,index) in label.list" :key="index"
			@click="changeLabel(index)">
			<view class="rounded border px-2 py-1 bg-light-secondary text-center"
			:class="label.currentIndex == index ? 'radio-active' : ''">
				{{item.name}}
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		props: {
			label: Object
		},
		methods: {
			changeLabel(index) {
				// 子传父 父组件调用:selected.sync='label.currentIndex' 来同步子父通讯
				this.$emit('update:selected', index)
			}
		}
	}
</script>

<style>
.radio-active{
	background-color: #FEC0D5!important;
	border-color: #EB7320!important;
	color: #EB7320!important;
}
</style>
