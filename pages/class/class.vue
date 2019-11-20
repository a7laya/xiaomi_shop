<template>
	<view class="d-flex border-top border-light-secondary" style="height: 100%; box-sizing: border-box;">
		<scroll-view scroll-y="true" style="flex: 1; height: 100%;"
		class="border-right border-light-secondary">
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
		scroll-with-animation="true">
			<view class="row right-scroll-item" v-for="(listItem,listIndex) in content" :key="listIndex"
			:id="'content'+listIndex">
				<view class="span24-8 text-center py-2" v-for="(item,index) in listItem.list" :key="index">
					<image :src="item.cover" style="width: 120upx; height: 120upx;" mode="widthFix"></image>
					<view>{{item.name}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 
				scrollContent: 'content0',
				// 当前选中分类的索引
				cateIndex: 0,
				// 分类列表
				cate:[],
				// 右侧内容列表
				content:[],
				// 左右两块内容距顶部距离
				leftDomsTop:[],
				rightDomsTop:[],
				// 右侧距顶部距离的数据绑定
				rightScorllTop:0
			}
		},
		onLoad() {
			this.getData()
		},
		onReady() {
			const query = uni.createSelectorQuery().in(this);
			query.selectAll('.left-scroll-item').boundingClientRect(data => {
				this.leftDomsTop = data.map(v => ~~v.top)
			}).exec();
			query.selectAll('.right-scroll-item').boundingClientRect(data => {
				this.rightDomsTop = data.map(v => ~~v.top)
			}).exec();
		},
		methods: {
			// 获取模拟数据
			getData(){
				for (let i=0; i<20; i++) {
					this.cate.push({name:'分类'+i})
					this.content.push(
						{
							list:[
								{cover:'/static/images/demo/cate_03.png',name:'商品'+i},
								{cover:'/static/images/demo/cate_03.png',name:'商品'+i},
								{cover:'/static/images/demo/cate_03.png',name:'商品'+i},
								{cover:'/static/images/demo/cate_03.png',name:'商品'+i},
								{cover:'/static/images/demo/cate_03.png',name:'商品'+i},
								{cover:'/static/images/demo/cate_03.png',name:'商品'+i},
								{cover:'/static/images/demo/cate_03.png',name:'商品'+i},
								{cover:'/static/images/demo/cate_03.png',name:'商品'+i},
								{cover:'/static/images/demo/cate_03.png',name:'商品'+i},
								{cover:'/static/images/demo/cate_03.png',name:'商品'+i},
								{cover:'/static/images/demo/cate_03.png',name:'商品'+i},
								{cover:'/static/images/demo/cate_03.png',name:'商品'+i}
							]
						}
					)
				}
			},
			// 点击左边分类导航按钮
			changeCate(index){
				this.cateIndex = index
				// 右边scorll-view滚动到相应位置
				this.rightScorllTop = this.rightDomsTop[index]
				
			}
		}
	}
</script>

<style>
.class-active{
	border-left: 8upx solid #FD6801; color: #FD6801!important;
}
</style>
