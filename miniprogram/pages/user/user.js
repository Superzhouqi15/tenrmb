// miniprogram/pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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

  },



  mine_func: function(){
 
  },

  //关于我们的弹窗
  aboutUs: function () {
    wx.navigateTo({
      url: '../aboutUs/aboutUs',
    })
  },

  launchGame: function () {
    console.log('游客', app.globalData.identity)
    if (app.globalData.identity == 0) {
      wx.showToast({
        title: '游客无法发布比赛',
        icon: 'none'
      })
    }else{
      wx.navigateTo({
        url: '../competition/competition',
      })
    }
    
  },

  feedback: function () {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  }



})