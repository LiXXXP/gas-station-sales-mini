/*
 * @Author: Jin Biao
 * @Date: 2021-10-28 18:29:12
 * @LastEditTime: 2021-11-29 10:40:52
 * @Description:  
 */
// user.ts
import { MiniGasStationRegionInquiry } from '../../https/api';
Page({
  data: {
    avatarUrl: '',
    userStatus: ''
  },
  onShow() {
    MiniGasStationRegionInquiry({}).then(res => { });
    let vm = this
    wx.getStorage({
      key: 'userStatus',
      success(res) {
        vm.setData({ userStatus: res.data })
        wx.getUserInfo({
          success: function (user) {
            console.log(user)
            vm.setData({ avatarUrl: user.userInfo.avatarUrl })
          }
        })
      }
    })
  },
  onLoad() {

  },
  // 登录
  toLogin() {
    let userStatus = wx.getStorageSync('userStatus')
    if (!userStatus) {
      wx.navigateTo({ url: '/pages/login/login' })
      return
    }
  },
  /**
   * 跳转站点信息更新页面
   */
  goToInformation() {
    this.toLogin()
    wx.navigateTo({
      url: '../information/information',
    })
  },
  /**
   * 跳转关于产品页面
   */
  goToAbout() {
    this.toLogin()
    wx.navigateTo({
      url: '../about/about',
    })
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '融耀智屏',
      path: '/pages/index/index',
      imageUrl: '../../assets/imgs/share.png',
    }
  }
})
