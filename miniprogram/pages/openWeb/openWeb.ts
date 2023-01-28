/*
 * @Author: Jin Biao
 * @Date: 2021-11-03 16:35:27
 * @LastEditTime: 2021-11-29 14:00:42
 * @Description:  
 */

Page({
  data: {
    openUrl: '',
    options: ''
  },
  onLoad(option) {
    // H5发起周边信息
    if (option.ambitus) {
      this.setData({
        openUrl: `${option.ambitus}?tagName=${option.tagName}&lat=${option.lat}&lng=${option.lng}&innerIcon=${option.innerIcon}`
      })
      // H5发起更新
    } else if (option.updating) {
      this.setData({
        openUrl: `${option.updating}?id=${option.id}`
      })
    } else {
      const url = wx.getStorageSync('openUrl')
      this.setData({ openUrl: url })
    }
    console.log(this.data.openUrl)
  },
  onShow() {

  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '融耀智屏',
      imageUrl: '../../assets/imgs/share.png',
    }
  }
})