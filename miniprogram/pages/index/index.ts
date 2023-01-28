/*
 * @Author: Jin Biao
 * @Date: 2021-10-28 13:51:44
 * @LastEditTime: 2021-11-29 13:57:41
 * @Description:  
 */
// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
import base from '../../https/base.js'
Page({
  data: {
    mapUrl: '',
    loadingShow: true,
    position: false
  },
  onShow() {
    // 判断用户是否授权
    this.getPosition()
  },
  // 获取地图url
  openUrl() {
    const userStatus = wx.getStorageSync('userStatus')
    let url = `${base.mapUrl}/home?lat=${getApp().globalData.lat}&lng=${getApp().globalData.lng}&position=${this.data.position}`
    if (userStatus) {
      url = `${url}&userId=${userStatus.userId}&accessToken=${userStatus.accessToken}`
    }
    if (this.data.mapUrl != url) {
      this.setData({ mapUrl: '' })
      setTimeout(() => {
        this.setData({ mapUrl: url })
      }, 100);
    }
    console.log(url)
  },
  bindload(e) {
    setTimeout(() => {
      this.setData({
        loadingShow: true
      })
    }, 1500)
  },
  getPosition() {
    // 判断用户是否授权位置
    wx.getSetting({
      success: (res) => {
        var statu = res.authSetting;
        if (!statu['scope.userLocation']) {
          //没授权
          console.log("没授权")
          this.setData({ position: true })
        } else { //已授权
          console.log("已授权")
          this.setData({ position: false })
        }
        this.openUrl()
      }
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
