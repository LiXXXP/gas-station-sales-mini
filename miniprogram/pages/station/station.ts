import { gasStation, MiniGasStationRegionInquiry } from '../../https/api';
import base from '../../https/base';

Page({
  mixins: [require('../../utils/mixins')],
  data: {
    cityId: 110100,
    citySelection: {
      // 城市选择 目前只有北京市 禁选
      option: [{ text: '北京', value: 110100 }],
    },
    intimate: {
      // 距离最近 筛选
      option: [{ text: '距离最近', value: '0' }],
    },
    county: {
      // 区县 筛选
      option: [{ text: '全部区县', value: '0' }],
    },
    distance: {
      // 距离 公里 筛选
      option: [
        { text: '全部距离', value: 0 },
        { text: '3公里', value: 3000 },
        { text: '5公里', value: 5000 },
        { text: '10公里', value: 10000 },
      ],
    },
    searchMenu: {
      districtId: 0,
      distance: 0
    },
    stationData: '',
    dataList: [],
    page: 1,
    imgUrl: base.imgUrl,
    loadingShow: false,
    searchEvent: {
      advScreen: [],
      stars: [],
      optCondition: [],
      outTags: [],
      brands: []
    },
    searchInput: '',
    menuShow: true,
    scrollShow: true
  },
  onLoad() {
    //  获取城市
    this.getCity()
  },
  onShow() {
    // 获取列表
    this.getList();
  },
  /**
   * 区县选择 重置按钮
   */
  onReset() {
    this.selectComponent('#county').toggle();
  },

  /**
   * 区县选择 确定按钮
   */
  onConfirm() {
    this.selectComponent('#county').toggle();
  },
  getCity() {
    MiniGasStationRegionInquiry({}).then(res => {
      let list = [{ text: '全部区县', value: 0 }]
      res.body.children.forEach(item => {
        list.push({
          text: item.districtName,
          value: item.districtId
        })
      });
      this.setData({ 'county.option': list })
    });
  },
  // 星级
  starText(item: any) {
    switch (item.star) {
      case 4:
        item.star = '三星级';
        break;
      case 8:
        item.star = '四星级';
        break;
      case 16:
        item.star = '五星级';
        break;
      default:
        break;
    }
  },
  // 大屏
  advText(item) {
    switch (item.advScreen) {
      case 1:
        item.advScreen = '无';
        break;
      case 2:
        item.advScreen = '100';
        break;
      case 4:
        item.advScreen = '120';
        break;
      case 8:
        item.advScreen = '150';
        break;
      default:
        break;
    }
  },
  countyChange(val) {
    this.setData({ 'searchMenu.districtId': val.detail, page: 1, dataList: [] })
    this.getList()
  },
  distanceChange(val) {
    this.setData({ 'searchMenu.distance': val.detail, page: 1, dataList: [] })
    this.getList()
  },
  // 搜索pop
  searchBtnEvent(val) {
    console.log(val.detail.advScreen)
    this.setData({ searchEvent: val.detail, page: 1, dataList: [] })
    this.getList();

  },
  // 获取列表
  getList() {
    console.log(this.data)
    gasStation({
      advScreen: this.data.searchEvent.advScreen.length > 0 ? this.data.searchEvent.advScreen.reduce((total, value) => total + value) : '',
      brands: 1,
      provinceId: '',
      cityId: 110100,
      districtId: this.data.searchMenu.districtId,
      distance: this.data.searchMenu.distance,
      optCondition: this.data.searchEvent.optCondition.length > 0 ? this.data.searchEvent.optCondition.reduce((total, value) => total + value) : '',
      stars: this.data.searchEvent.stars.length > 0 ? this.data.searchEvent.stars.reduce((total, value) => total + value) : '',
      outTags: this.data.searchEvent.outTags,
      stationName: '',
      page: {
        orderBy: 'distance asc',
        pageNum: this.data.page,
        pageSize: 10,
        returnCount: true,
      },
    }).then(res => {
      if (res.body) {
        this.setData({ loadingShow: false });
        res.body.dataList.forEach((item: any) => {
          this.starText(item);
          this.advText(item);
          item.distance = this.distanceText(item.distance);
        });
        if (res.body.page.pageNum == 1) this.data.dataList = [];
        this.setData({
          dataList: this.data.dataList.concat(res.body.dataList),
          stationData: res.body,
        });
      }
    });
  },
  // 上拉
  scrollBtn() {
    this.setData({
      page: this.data.page + 1,
    });
    this.getList();
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

});
