// miniprogram/pages/feedback/feedback.js
const app = getApp()
var that = this 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: '',
    content: '',
  },

  onChange1: function (e) {
    console.log(e.detail)
    this.setData({
      email: e.detail.value
    })
  },

  onChange2: function (e) {
    console.log(e.detail)
    this.setData({
      content: e.detail.value
    })
  },

  onClick() {

    if (this.data.content=='')
    {
      wx.showToast({
        title: '反馈内容不能为空',
        icon: "none"
      })
      return;
    }
   
    wx.request({
      url: app.globalData.url + '/feedback',
      method: 'POST',
      data: {
        'openId': app.globalData.openId,
        'email': this.data.email,
        'content': this.data.content,
      },
      success: res => {
        console.log(res)
      }
    })

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

  }
})