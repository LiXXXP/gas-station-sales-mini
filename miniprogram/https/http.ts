import base from './base'

interface optionsApi {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data: object
}


const request = (url: string, options: optionsApi) => {
  // wx.showLoading({
  //   title: '加载中...',
  //   mask: true
  // })
  return new Promise((resolve, reject) => {
    const userStatus = wx.getStorageSync('userStatus')
    const commonParams = {
      "channel": "gas-sales-h5",
      "entityId": "gas",
      "locale": "",
      "orgId": "",
      "privileges": "",
      "roles": "",
      "serviceId": "",
      "userId": userStatus.userId
    }
    options.data.context = commonParams
    options.data.userId = userStatus.userId
    options.data.lat = getApp().globalData.lat
    options.data.lng = getApp().globalData.lng
    wx.request({
      url: `${base.baseUrl}${url}`,
      method: options.method,
      data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
      header: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'accept': 'application/json',
        'accessToken': userStatus.accessToken
      },
      success(request) {
        if(request.statusCode == 401){
          wx.clearStorage()
          wx.navigateTo({
            url: '/pages/login/login'
          })
          wx.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 5000
          })
        }else{
          resolve(request.data)
        }
      },
      fail(error) {
        reject(error)
      },
      complete: info => {
        // wx.hideLoading()
      }
    })
  })
}

const get = (url: string, params: object) => {
  return request(url, { method: 'GET', data: params})
}

const post = (url: string, params: object) => {
  return request(url, { method: 'POST', data: params})
}

const put = (url: string, params: object) => {
  return request(url, { method: 'PUT', data: params})
}

// 不能声明DELETE（关键字）
const remove = (url: string, params: object) => {
  return request(url, { method: 'DELETE', data: params })
}

export default {
  get,
  post,
  put,
  remove
}