// miniprogram/pages/baidu/baidu.js
const {
  $Toast
} = require('../../iview/dist/base/index');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
    value6: '',
    value7: '',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  handleClick: function() {


    app.globalData.competitionData.push({
      title: this.data.value1,
      organization: this.data.value2,
      time: this.data.value3,
      member: this.data.value4,
      content: this.data.value5,
      footer: this.data.value6,
      method: this.data.value7

    })
    wx.switchTab({
      url: '../info/info',
    })
    
    $Toast({
      content: '发布比赛成功',
      type: 'success'
    });

   
  },


  onChange1: function(e) {

    console.log(e.detail)
    this.setData({
      value1: e.detail
    })
  },
  onChange2: function(e) {

    console.log(e.detail)
    this.setData({
      value2: e.detail
    })
  },

  onChange3: function(e) {

    console.log(e.detail)
    this.setData({
      value3: e.detail
    })
  },
  onChange4: function(e) {

    console.log(e.detail)
    this.setData({
      value4: e.detail
    })
  },
  onChange5: function(e) {

    console.log(e.detail)
    this.setData({
      value5: e.detail
    })
  },

  onChange6: function(e) {

    console.log(e.detail)
    this.setData({
      value6: e.detail
    })
  },
  onChange7: function(e) {

    console.log(e.detail)
    this.setData({
      value7: e.detail
    })
  }

})