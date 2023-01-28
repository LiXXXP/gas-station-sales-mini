// login.ts
// 获取应用实例
const app = getApp<IAppOption>()
import {postLogin} from '../../https/api'

Page({
	data: {
		isShowText: false, //是否显示tip
		isAuthorize: false, //收否同意法律声明
		avatarUrl: '',
		jsCode: '',
	},
	onLoad() {
		this.getCode()
	},
  getCode(){
    const _this = this;
		wx.login({
		  success(res) {
			  _this.setData({jsCode: res.code});
		  }
		})
  },
	// 勾选用户协议
	radioChange() {
		this.setData({
			isShowText: this.data.isAuthorize,
			isAuthorize: !this.data.isAuthorize
		})
	},
	// 跳转阅读法律声明
	toReadLaw() {
		wx.navigateTo({
      url: '../law/law'
    })
	},
	// 跳转阅读隐私政策
	toReadConceal() {
		wx.navigateTo({
      url: '../conceal/conceal'
    })
	},
	// 登录 btn
	lgoin() {
		if(!this.data.isAuthorize) {
			this.setData({
				isShowText: true
			})
		}
	},
	// 获取手机号 btn
	getPhoneNumber(e: any) {
		const _this = this;
    _this.getCode()
		if (e.detail.errMsg === "getPhoneNumber:ok") {
			let data = {  //后台所需要的提交的参数
				encryptedData: e.detail.encryptedData,
				iv: e.detail.iv,
				code: _this.data.jsCode,
				channelId: 'gas_weixin_s'
			}
    
			// 创建新的Promise请求login接口
		postLogin(data).then((res:any) => {
      console.log(res)
				if(res.status.success) {
					wx.setStorage({
						key: "userStatus",
						data: {
							avatarUrl: _this.data.avatarUrl,
							...res.body,
						}
					})
					wx.reLaunch({
						url: '../index/index',
					})
				} else {
					wx.showToast({
						title: '不是内部人员或账号异常，无法登录',
						icon: 'none',
						duration: 2000,
						mask: true
					})
				}
			}).catch(err => {
				console.log(err)
			})
		} else {
			wx.reLaunch({
				url: '../index/index',
			})
		}
	},
})
