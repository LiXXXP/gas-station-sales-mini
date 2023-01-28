// about.ts
Page({
  data: {

  },
  onLoad() {

  },
  /**
   * 跳转阅读法律声明
   */
	toReadLaw() {
		wx.navigateTo({
      url: '../law/law'
    })
	},
	/**
   * 跳转阅读隐私政策
   */
	toReadConceal() {
		wx.navigateTo({
      url: '../conceal/conceal'
    })
	},
})