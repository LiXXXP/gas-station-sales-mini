import { MiniTagListInquiry } from '../../https/api';
Component({
  properties: {
    toSearch: {
      type: String,
      value: false,
    },
  },
  options: {
    styleIsolation: 'shared'
  },
  data: {
    cityId: 110100,
    citySelection: {
      option: [{ text: '北京', value: 110100 }],
    },
    advScreenList: [
      { text: '100寸以上', value: 2, selected: false },
      { text: '120寸以上', value: 4, selected: false },
      { text: '150寸以上', value: 8, selected: false },
      { text: '无', value: 1, selected: false },
    ],
    starsList:[
      { text: '三星级', value: 4, selected: false },
      { text: '四星级', value: 8, selected: false },
      { text: '五星级', value: 16, selected: false },
    ],
    optConditionList:[
      { text: '正常营业', value: 1, selected: false },
      { text: '装修', value: 2, selected: false },
      { text: '停业', value: 4, selected: false },
    ],
    brandsList:[
      { text: '中国石化', value: 3, selected: false }
    ],
    outTagsList:[],
    searchData: {
      advScreen: [],
      stars:[],
      optCondition:[],
      outTags:[],
      brands:[]
    },
    searchPopup: false,
    searchInput: '',
    conditionList: [],
  },
  created() {
    this.condition();
  },
  methods: {
    // 重置
    resetBtn(){
      this.setData({
        searchData: {
          advScreen: [],
          stars:[],
          optCondition:[],
          outTags:[],
          brands:[]
        }
      })
      this.data.outTagsList.forEach(item=>{item.selected =false})
      this.setData({outTagsList:this.data.outTagsList})
      this.data.optConditionList.forEach(item=>{item.selected =false})
      this.setData({optConditionList:this.data.optConditionList})
      this.data.brandsList.forEach(item=>{item.selected =false})
      this.setData({brandsList:this.data.brandsList})
      this.data.starsList.forEach(item=>{item.selected =false})
      this.setData({starsList:this.data.starsList})
      this.data.advScreenList.forEach(item=>{item.selected =false})
      this.setData({advScreenList:this.data.advScreenList})
    },
    // 确定
    btn(){
      this.setData({searchPopup:false})
      this.triggerEvent('searchBtnEvent', this.data.searchData);
    },
    // 标签
    outTagsTap(e) {
      const obj = this.arrSet(this.data.searchData.outTags,e.target.dataset,this.data.outTagsList)
      this.setData({'searchData.outTags': obj.list,outTagsList: obj.key});
    },
    // 经营
    optConditionTap(e) {
      const obj = this.arrSet(this.data.searchData.optCondition,e.target.dataset,this.data.optConditionList)
      this.setData({'searchData.optCondition': obj.list,optConditionList: obj.key});
    },
    // 品牌
    brandsTap(e) {
      const obj = this.arrSet(this.data.searchData.brands,e.target.dataset,this.data.brandsList)
      this.setData({'searchData.brands': obj.list,brandsList: obj.key});
    },
    // 星级
    starTap(e) {
      const obj = this.arrSet(this.data.searchData.stars,e.target.dataset,this.data.starsList)
      this.setData({'searchData.stars': obj.list,starsList: obj.key});
    },
    // 大屏
    advTap(e) {
      const obj = this.arrSet(this.data.searchData.advScreen,e.target.dataset,this.data.advScreenList)
      this.setData({'searchData.advScreen': obj.list,advScreenList: obj.key});
    },
    // 集合处理
    arrSet(data,item,sel){
      if (data.includes(item.item.value)) {
        sel[item.index].selected = false
        data.forEach((list,key)=>{
          if(item.item.value == list){
            data.splice(key,1);
          }
        })
        return {list :data,key:sel}
      } else {
        sel[item.index].selected = true
        data.push(item.item.value);
        return {list :data,key:sel}
      }
    },
    // 获取标签
    condition() {
      MiniTagListInquiry({}).then(res => {
        let arr =[]
        res.body.dataList.forEach(item => {
        arr.push({
          text:item.tagName,
          value:item.tagId,
          selected:false
        })
      })
        this.setData({
          outTagsList: arr,
        });
      });
    },
    // 筛选
    searchPopupBind() {
      this.setData({
        searchPopup: true,
      });
    },
    // 跳转搜索
    goSearch() {
      if (this.data.toSearch) {
        wx.navigateTo({ url: '/pages/search/search' });
      }
    },
    // 搜索
    inputChange(e) {
      this.triggerEvent('searchEvent', { input: e.detail });
    },
    // 关闭弹出
    onClose() {
      this.setData({ searchPopup: false });
    },
  },
});
