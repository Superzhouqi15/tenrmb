// miniprogram/pages/mark/mark.js
const app = getApp()
var that=this

Page({

  /**
   * 页面的初始数据
   */
  data: {
    competition: app.globalData.competitionData,
    feedbackList: [],
  },

  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    wx.request({
      url: app.globalData.url + '/getFavorite',
      method: 'POST',
      data: {
        'openId': app.globalData.openId,
      },
      success: res => {
        console.log(res.data)
        that.setData({
          feedbackList:res.list,
        })
      }
    })

    this.setData({
      competition: app.globalData.competitionData
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})