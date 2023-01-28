import base from '../https/base.js'

module.exports = {
  data: {

  },
  onShow () {

  },
  // 跳转路由
  goPage (event, type) {
    let dataset
    if (event.currentTarget) {
      dataset = event.currentTarget.dataset
    } else {
      dataset = { url: event, type }
    }
    if (!dataset.type) wx.navigateTo({ url: dataset.url })
    if (dataset.type == 'switchTab') wx.switchTab({ url: dataset.url })
    if (dataset.type == 'reLaunch') wx.reLaunch({ url: dataset.url })
    if (dataset.type == 'redirectTo') wx.redirectTo({ url: dataset.url })
  },
  // 后退
  goBack (event) {
    wx.navigateBack({ delta: event.currentTarget.dataset.index })
  },
  goH5Page(event){
    const dataset = event.currentTarget.dataset
    const url = '/pages/openWeb/openWeb?url=' + base.mapUrl + dataset.url
    wx.setStorageSync('openUrl', base.mapUrl + dataset.url)
    wx.navigateTo({ url: url})
  },
  // 距离
  distanceText (distance) {
    if (distance == 0) {
      return '100m'
    } else if (distance < 1000) {
      return Number(distance).toFixed(0) + 'm'
    } else {
      return (Number(distance) / 1000).toFixed(2) + 'km'
    }
  },
  // 打开地图
  goMap (event) {
    const dataset = event.currentTarget.dataset
    console.log(dataset)
    wx.openLocation({
      latitude: Number(dataset.lat),
      longitude: Number(dataset.lng),
      name:dataset.name,
      address:dataset.address,
      scale: 18
    })
  }
}
