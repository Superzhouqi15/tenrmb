// miniprogram/pages/post/post.js
const app = getApp();
var util = require('../../utils/util.js');
const {
  $Toast
} = require('../../iview/dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: '',
    value2: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  handleClick: function(e) {

    console.log(e.detail)
    app.globalData.allPostData.push({
      title: this.data.value1,
      content: this.data.value2,
      user: e.detail.userInfo.nickName,
      time: util.formatTime(new Date())

    })

    $Toast({
      content: '发布帖子成功',
      type: 'success'
    });

    wx.switchTab({
      url: '../forum/forum',
    })

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
  }
})