// detail.ts
import { MiniGasStationInquiry } from '../../https/api'
import base from '../../https/base'

Page({
  mixins: [require('../../utils/mixins')],
  data: {
    list: [1, 2, 3, 5, 6, 7, 8, 9],
    options: '',
    detailData: '',
    imgUrl: base.imgUrl,
    detailList: [],
    arrowShow:true
  },
  onLoad(options) {
    this.setData({
      options: options
    })
    console.log(this.data.options)
    this.getDetail() //获取详情
  },
  arrow(e){
    if(e.currentTarget.dataset.index == 1){
      this.setData({arrowShow:true})
    }else{
      this.setData({arrowShow:false})
    }
  },
  getImg(e) {
    let url = this.data.imgUrl + '/' + e.target.dataset.item
    let arr = []
    this.data.detailData.pictures.forEach(item => {
      arr.push(this.data.imgUrl + '/' + item)
    })
    wx.previewImage({
      current: url,
      urls: arr
    })
  },
  // 星级
  starText(star: any) {
    switch (star) {
      case 4:
        return '三星级';
        break;
      case 8:
        return '四星级';
        break;
      case 16:
        return '五星级';
        break;
      default:
        break;
    }
  },
  // 状态
  getState  (state: number) {
    switch (state) {
      case 1:
        return '正常营业';
        break;
      case 2:
        return '装修';
        break;
      case 4:
        return '停业';
        break;
      default:
        break;
    }
  },
  // 大屏
  advText(advScreen) {
    switch (advScreen) {
      case 1:
        return '无';
        break;
      case 2:
        return '100寸以上';
        break;
      case 4:
        return '120寸以上';
        break;
      case 8:
        return  '150寸以上';
        break;
      default:
        break;
    }
  },
  // 获取详情
  getDetail() {
    MiniGasStationInquiry({
      stationId: this.options.id
    }).then((res) => {
      if (res.body) {
        res.body.distance = this.distanceText(res.body.distance)
        let a = this.starText(res.body.star)
        let detailList = [
          { text: '经营状态', value: this.getState(res.body.optCondition) },
          { text: '加油站星级', value: a  },
          { text: '广告大屏', value: this.advText(res.body.advScreen) },
        ]
        for (let index in res.body.properties) {
          detailList.push({ text: index, value: res.body.properties[index] })
        }
        this.setData({
          detailData: res.body,
          detailList: detailList
        })
        console.log(JSON.stringify(this.data.detailData))
      }
    })
  }
})
