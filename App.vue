<script>
	export default {
		// 监听nvue页面uni.postMessage({...})发送过来的数据
		onUniNViewMessage(e) {
			console.log('来自nvue的数据',e);
			// 处理
			let data = e.data
			if(data.from && data.from === 'index') {
				// 通知vue页(分类页)修改数据,vue页面通过uni.$on('index',e=>{console.log(e)})监听接收
				uni.$emit('index', data)
			}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 官方UI库 */
	@import "/common/uni.css";
	/* 第三方动画库 */
	@import "/common/animate.css";
	/* 自定义图标库 */
	@import "/common/icon.css";
	/* UI基础库 */
	@import "/common/zcm-main.css";
	/* 公共样式 */
	@import "/common/common.css";
</style>
