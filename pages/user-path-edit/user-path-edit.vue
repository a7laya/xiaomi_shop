<template>
	<view>
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">收货人:</view>
			<input class="font-md px-1 flex-1 text-light-muted" type="text" v-model="form.name" />
		</view>
		<view class="p-2 d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">手机号码:</view>
			<input class="font-md px-1 flex-1 text-light-muted" type="text" v-model="form.phone" />
		</view>
		
		<divider></divider>
		
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">所在地区:</view>
			<input class="font-md px-1 flex-1 text-light-muted" type="text" disabled placeholder="请选择所在地区"
			@click="showMulLinkageThreePicker" :value="form.path" />
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="pickerValue"
			 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		</view>
		<view class="p-2 d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">详细地址:</view>
			<input class="font-md px-1 flex-1 text-light-muted" type="text" v-model="form.detailPath" />
		</view>
		
		<divider></divider>
		
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">设为默认地址:</view>
			<switch class="ml-auto" :checked="form.isDefault" color="#FD6801" @change="form.isDefault = $event.detail.value"/>
		</view>
		
		<!-- 底部按钮 -->
		<view class="p-3">
			<view class="text-center text-white w-100 main-bg-color font-md py-2 rounded"
			hover-class="main-bg-hover-color" @click="submit">
				保 存
			</view>
		</view>
	</view>
</template>

<script>
	import uniListItem    from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import mpvueCityPicker from "@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue"
	// 引入vuex 
	import {mapActions} from "vuex"
	
	export default {
		components:{uniListItem,mpvueCityPicker},
		data() {
			return {
				isedit: false,
				pickerValue: [0, 0, 1],
				themeColor: '#FD6801',
				index: -1, // 存放当前修改对象的索引
				form:{
					path: "",
					name: "",
					phone: "",	
					detailPath: "",
					isDefault: false
				}
				
			}
		},
		computed:{
			pathList: state => state.path.list
		},
		methods: {
			// 引入createPath
			...mapActions(['updatePathAction','createPathAction']),
			// 保存表单
			submit(){
				// 验证表单
				
				if(this.isedit) {
					// 修改数据
					this.updatePathAction({index:this.index, item:this.form})
					uni.showToast({title:"修改成功"})
					uni.navigateBack({delta: 1})
					return
				}
				// 添加数据
				this.createPathAction(this.form)
				uni.showToast({title:"地址添加成功"})
				uni.navigateBack({delta: 1})
			},
			// switch开关事件测试
			test(e){
				// console.log('switch=>e',e);
			},
			// 三级联动取消
			onCancel(e) {
				console.log(e)
			},
			// 提交三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			// 三级联动确定
			onConfirm(e) {
				this.form.path = e.label
				this.pickerValue = e.value
			}
		},
		onLoad(e) {
			if(e.data!=="{}") {
				let res = JSON.parse(e.data)
				this.form = res.item
				this.index = res.index
				this.isedit = true
				uni.setNavigationBarTitle({
					title:"修改收货地址"
				})
			}
		},
		// 监听返回
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		// 页面卸载之后关闭选择器
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		}
	}
</script>

<style>
page{
	background-color: #EEEEEE;
}
</style>
