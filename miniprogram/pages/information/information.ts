import {MiniGasStationCorrectionListInquiry} from '../../https/api'


Page({
  data: {
    currentIndex: [1],
    dataList: [],
    gasData:{},
    page: 1,
    loadingShow: false,
  },
  onLoad() {
    this.getList()
  },
  /**
   * 待处理 切换状态
   */
  handlePending() {
    this.setData({
      currentIndex: [1],
      page:1,
      dataList:[]
    })
    this.getList()
  },
  /**
   * 已完成 切换状态
   */
  handleComplete() {
    this.setData({
      currentIndex: [2,4],
      page:1,
      dataList:[]
    })
    this.getList()
  },
  // 获取列表
  getList(){
    MiniGasStationCorrectionListInquiry({
      statusList:this.data.currentIndex,
      page:{
        orderBy: '',
        pageNum: this.data.page,
        pageSize: 10,
        returnCount: true,
      }
    }).then((res)=>{
      if(res.body){
        if (res.body.page.pageNum == 1) this.setData({dataList:[]});
        this.setData({
          dataList: this.data.dataList.concat(res.body.dataList),
          gasData: res.body,
        });
      }
    })
  },
  scrollBtn(){
    this.setData({
      page: this.data.page + 1,
    });
    this.getList();
  },
})
