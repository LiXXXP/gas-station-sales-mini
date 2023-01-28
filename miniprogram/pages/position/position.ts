// pages/position/position.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    this.position()
  },
  position() {
    // 判断用户是否授权
    wx.getSetting({
      success: (res) => {
        var statu = res.authSetting;
        if (!statu['scope.userLocation']) { //没授权
          console.log("没授权")
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认打开授权',
            confirmColor: '#f16765',
            success: res => {
              if (res.confirm) {
                console.log(res.confirm)
                wx.openSetting({
                  success: data => {
                    if (data.authSetting["scope.userLocation"]) {}
                  }
                })
              }else{
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        } else { //已授权
            console.log("已授权")
            wx.getLocation({
              type: 'gcj02',
              success (res) {
                getApp().globalData.lat = res.latitude
                getApp().globalData.lng = res.longitude
                wx.navigateBack({
                  delta: 1
                })
              }
             })
             
        }
      }
    })
  },
})