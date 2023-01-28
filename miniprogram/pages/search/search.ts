// pages/search/search.ts
import { gasStation } from '../../https/api';
 
 
Page({
  mixins: [require('../../utils/mixins')],
  data: {
    citySelection: {
      // 城市选择 目前只有北京市 禁选
      option: [{ text: '北京', value: '0' }],
    },
    intimate: {
      // 距离最近 筛选
      option: [{ text: '距离最近', value: '0' }],
    },
    county: {
      // 区县 筛选
      option: [{ text: '区县', value: '0' }],
    },
    distance: {
      // 距离 公里 筛选
      option: [{ text: '距离', value: '0' }],
    },
    searchData: [],
    searchEvent: '',
    searchInput: '',
    loadingShow:false
  },
  // 搜索input
  searchEvent(e) {
    if (e.detail.input) {
      this.setData({ searchInput: e.detail })
      this.getList();
    } else {
      this.setData({ searchData: [] });
    }
  },
  // 搜索pop
  searchBtnEvent(e) {
    this.setData({ searchEvent: e.detail })
    this.getList();
  },
  getInf(str, key){
     return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%')
  },
  // 获取数据
  getList(e) {
    this.setData({loadingShow:true});
    gasStation({
      stationName: this.data.searchInput.input,
      advScreen: this.data.searchEvent.advScreen ? this.data.searchEvent.advScreen.reduce((total, value) => total + value) : '',
      brands: 1,
      cityId: 110100,
      districtId: '',
      optCondition: this.data.searchEvent.optCondition ? this.data.searchEvent.optCondition.reduce((total, value) => total + value) : '',
      provinceId: '',
      stars: this.data.searchEvent.stars ? this.data.searchEvent.stars.reduce((total, value) => total + value) : '',
      outTags: this.data.searchEvent.outTags,
      lat: getApp().globalData.lat,
      lng: getApp().globalData.lng,
      page: {
        orderBy: '',
        pageNum: 1,
        pageSize: 99999,
        returnCount: true,
      },
    }).then(res => {
      if (res.body.dataList) {
        res.body.dataList.forEach((item: any) => {
          item.stationName = this.getInf(item.stationName,this.data.searchInput.input)
          item.distance = this.distanceText(item.distance);
        });
        this.setData({
          searchData: res.body.dataList,
          loadingShow:false
        });
      }
    });
  },
});
