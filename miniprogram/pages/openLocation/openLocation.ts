// pages/openLocation/openLocation.ts
Page({
  data: {
    show: true
  },
  onLoad(options) {
    this.setData({ show: true })
      wx.openLocation({
        latitude: Number(options.lat),
        longitude: Number(options.lng),
        name: options.name,
        address: options.address,
        scale: 18
      })
  },
  onShow() {
    if (this.data.show == false) {
        wx.navigateBack({
          delta: 1
        })
    }
    this.setData({ show: false })
  }


})
