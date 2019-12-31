<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="d-flex a-center j-sb px-3 py-2 text-light-muted">
			<view class="iconfont icon-guanbi" @click="goBack"></view>
			<view class="font-md" @click="forget">忘记密码</view>
		</view>
		<view class="p-5">
			<view class="font-big mb-5">
				密码登录
			</view>
			<!-- 用户名输入框 -->
			<input type="text" class="border-bottom mb-4 uni-input " 
			placeholder-class="text-light-muted" placeholder="请输入手机号/邮箱/小米账号" 
			:class="focusObj.username ? 'input-border-color' : ''" v-model="username"
			@focus="focus('username')" @blur="blur('username')"/>
			<!-- 密码输入框 -->
			<input type="text" class="border-bottom mb-4 uni-input " 
			placeholder-class="text-light-muted" placeholder="请输入密码" 
			:class="focusObj.password ? 'input-border-color' : ''" v-model="password"
			@focus="focus('password')" @blur="blur('password')"/>
			<!-- 登录按钮 -->
			<view class="py-2 w-100 d-flex a-center j-center main-bg-color text-white font-md mb-4 " 
			hover-class="main-bg-hover-color" @click="submit">
				登 录
			</view>
			
			<label class="checkbox d-flex a-center" @click="check = !check">
				<checkbox  :checked="check"></checkbox>
				<text class="text-light-muted font">已阅读并同意XXXXX协议</text>
			</label>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue"
	import uniStatusBar from "@/components/uni-ui/uni-status-bar/uni-status-bar.vue"
	export default {
		components:{
			uniNavBar,uniStatusBar
		},
		data() {
			return {
				username: "",
				password: "",
				check: false,
				// 验证规则
				rules: {
					username: [
						{
							rule: /^[a-zA-Z]\w{5,17}$/,
							msg: '用户名格式有误,以字母开头,长度8位以上'
						},
						{
							rule: /^[a-zA-Z]\w{5,17}$/,
							msg: '用户名格式有误222,以字母开头,长度8位以上'
						},
					],
					password: [
						{
							rule: /^.{3,20}$/,
							msg: '密码长度太短,任意字符,长度3位以上'
						}
					]
				},
				focusObj:{
					username: false,
					password: false
				}
			}
		},
		methods: {
			// 表单验证
			validate(key){
				let pass = true
				this.rules[key].forEach(v=>{
					if(!v.rule.test(this[key])){
						uni.showToast({
							title: v.msg,
							icon:"none"
						})
						pass = false
						return false
					}
				})
				return pass
			},
			// 提交表单
			submit(){
				// 验证是否阅读须知
				if(!this.check) {
					return uni.showToast({
						title:'请先阅读须知',
						icon:'none'
					})
				}
				// 验证用户名
				if(!this.validate('username')) return
				// 验证密码
				if(!this.validate('password')) return
				// 防止用户点击多次 将mask设置为true
				uni.showLoading({
					title:'登录中',
					mask: true
				})
				// 模拟成功
				setTimeout(function() {
					uni.hideLoading()
					uni.navigateBack({
						delta:1
					})
				}, 3000);
				
			},
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			forget(){
				
			},
			// input输入框激活样式改变
			focus(key){
				this.focusObj[key] = true
			},
			blur(key){
				this.focusObj[key]  = false
			},
			
		}
	}
</script>

<style>
	
</style>
