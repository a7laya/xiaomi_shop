<template>
	<view class="d-flex border-top border-light-secondary" style="height: 100%; box-sizing: border-box;">
		<loading :show="showLoading"></loading>
		<scroll-view scroll-y="true" style="flex: 1; height: 100%;"
		class="border-right border-light-secondary" id="leftScrollView"
		:scroll-top="leftScorllTop">
			<view class="border-bottom border-light-secondary py-1 left-scroll-item" hover-class="bg-light-secondary" v-for="(item,index) in cate" :key='index'
			@tap="changeCate(index)">
				<view class="py-1 font-md text-muted text-center"
				:class="cateIndex == index ? 'class-active' : ''">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" style="flex: 3.5; height: 100%;" 
		:scroll-top="rightScorllTop"
		scroll-with-animation="true"
		@scroll="onRightScroll">
			<view class="row right-scroll-item" v-for="(item,index) in content" :key="index">
				<view class="span24-8 text-center py-2"  v-for="(itemList,indexList) in item.list" :key="indexList">
					<image :src="itemList.cover" style="height: 120upx; width: 120upx;" mode=""></image>
					<text class="d-block">{{itemList.name}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 显示页面加载动画
				showLoading: true,
				// 当前选中分类的索引
				cateIndex: 0,
				// 分类列表
				cate:[],
				// 右侧内容列表
				content:[],
				// 左右两块内容距顶部距离
				leftDomsTop:[],
				rightDomsTop:[],
				// 左右侧距顶部距离的数据绑定
				leftScorllTop:0,
				rightScorllTop:0,
				// 左侧选中菜单所处高度
				cateItemHeight:[]
			}
		},
		onLoad() {
			this.getData()
		},
		onReady() {
			const query = uni.createSelectorQuery().in(this);
			query.selectAll('.left-scroll-item').boundingClientRect(data => {
				// 获取左侧菜单子项的高度
				this.cateItemHeight = data.map(v => v.height)
				this.leftDomsTop = data.map(v => v.top)
			}).exec();
			query.selectAll('.right-scroll-item').boundingClientRect(data => {
				this.rightDomsTop = data.map(v => v.top)
			}).exec();
		},
		watch:{
			cateIndex(newValue, oldValue){
				const query = uni.createSelectorQuery().in(this)
				query.select('#leftScrollView').fields({size:true,scrollOffset:true}, data=>{
					// 左边scrollView在屏幕中的可视高度
					let H = data.height
					// 左边scrollView向上滚动的距离
					let ST = data.scrollTop
					
					// 下边
					if(H + ST < this.leftDomsTop[newValue] + this.cateItemHeight[newValue]) {
						return this.leftScorllTop += this.cateItemHeight[newValue]
					}
					// 上边
					if(ST > this.leftDomsTop[newValue]) {
						return this.leftScorllTop -= this.cateItemHeight[newValue]
					}
				}).exec()
			}
		},
		methods: {
			// 获取模拟数据
			getData(){
				for (let i=0; i<20; i++) {
					this.cate.push({name:'分类'+i})
					let obj = {list:[]}
					for (let j = 0; j < 24; j++) {
						obj.list.push({
							cover:'/static/images/demo/cate_03.png',
							name:`分类${i}商品${j}`
						})
					}
					this.content.push(obj)
				}
				// 等待页面渲染完毕后进行loading动画隐藏
				this.$nextTick(function(){
					this.showLoading = false
				})
			},
			// 点击左边分类导航按钮
			changeCate(index){
				this.cateIndex = index
				// 右边scorll-view滚动到相应位置
				this.rightScorllTop = this.rightDomsTop[index]
			},
			// 监听右侧滚动事件
			async onRightScroll(e){
				this.rightDomsTop.forEach((v,k)=>{
					if(v < e.detail.scrollTop + 1){
						this.cateIndex = k
						return
					}
				})
			}
		}
	}
</script>

<style>
.class-active{
	border-left: 8upx solid #FD6801; color: #FD6801!important;
}
</style>
