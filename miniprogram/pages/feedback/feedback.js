// pages/feedback/feedback.js
const app = getApp();
var util = require('../../utils/util.js');
import { $wuxToast } from '../../dist/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    main: '',
    email: ''
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

  //点击上传反馈按钮
  upload: function(e) {



    $wuxToast().show({
      color: '#fff',
      text: '上传反馈成功！',
      duration: 1500,
      type: 'success'
    }),

    wx.switchTab({
      url: '../user/user',
    })
  },

  onChange1: function(e) {
    console.log(e.detail)
    this.setData({
      title : e.detail.value
    })
  },

  onChange2: function(e) {
    console.log(e.detail)
    this.setData({
      main: e.detail.value
    })
  },

  onChange3: function(e) {
    console.log(e.detail)
    this.setData({
      email: e.detail
    })
  }

})