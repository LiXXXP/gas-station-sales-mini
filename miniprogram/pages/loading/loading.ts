// start.ts
Page({
  data: {

  },
  onLoad() {
    let vm = this
    // 获取位置授权
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        getApp().globalData.lat = res.latitude
        getApp().globalData.lng = res.longitude
      },
      complete() {
        let timer = setTimeout(() => {
          clearTimeout(timer)
          vm.direct()
        }, 2000)
      }
    })
  },
  direct() {
    wx.switchTab({
      url: '../index/index'
    })
  }
})