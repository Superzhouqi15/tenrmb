// miniprogram/pages/baidu/baidu.js

import { $wuxToast } from '../../dist/index'

var util = require('../../utils/util.js');
const app = getApp()
const isTel = (value) => !/^1[34578]\d{9}$/.test(value)


Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    organization: '',
    member: '',
    method: '',
    label: [],
    introduction: "",
    image: "",
    file: "",
    startTime: util.formatTime(new Date()),
    endTime: util.formatTime(new Date()),
    displayValue1: '请选择',
    displayValue3: '请选择',
    displayValue2: '最多选择3项',
    options3: [{
      title: '计算机',
      value: '1',
    }, {
      title: '文学',
      value: '2',
    }, {
      title: '体育',
      value: '3',
    }, {
      title: '数学',
      value: '4',
    }, {
      title: '金融',
      value: '5',
    }, {
      title: '美术',
      value: '6',
    }],

    fileList: [],

  },

  onChange(e) {
    console.log('onChange', e)
    const { file } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0,
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      this.setData({
        imageUrl: file.url,
      })
    }
  },


  onComplete(e) {
    console.log('onComplete', e)
    wx.hideLoading()
  },

  onPreview(e) {
    console.log('onPreview', e)
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },

  onConfirm1(e) {
    const { index } = e.currentTarget.dataset
    this.setValue1(e.detail, index)
    console.log(`onConfirm${index}`, e.detail)
  },
  
  onConfirm2(e) {
    const { index } = e.currentTarget.dataset
    this.setValue2(e.detail, index)
    console.log(`onConfirm${index}`, e.detail)
  },

  setValue1(values, key, mode) {
    this.setData({
     startTime: values.displayValue,
      [`displayValue${key}`]: values.label,
    })
  console.log(this.data.startTime)
  },

  setValue2(values, key, mode) {
    this.setData({
      endTime: values.displayValue,
      [`displayValue${key}`]: values.label,
    })
    console.log(this.data.endTime)
  },

  onValueChange(e) {
    const { index } = e.currentTarget.dataset
    console.log(`onValueChange${index}`, e.detail)
  },

  showToast() {
    $wuxToast().show({
      type: 'success',
      duration: 1500,
      color: '#fff',
      text: '发布成功'
    }),

      wx.switchTab({
        url: '../info/info',
      })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data)
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

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      value3: e.detail.value,
      date: e.detail.value
    })
  },

  handleClick: function () {
    app.globalData.allCompetitionData.push({
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


  },


  onChange1: function (e) {

    console.log(e.detail.value)
    this.setData({
      title: e.detail.value
    })
    console.log(this.data.title)
  },

  onChange2: function (e) {

    console.log(e.detail)
    this.setData({
      organization: e.detail.value
    })
  },

  onChange3: function (e) {

    console.log(e.detail)
    this.setData({
      member: e.detail.value
    })
  },

  onChange4: function (e) {
    console.log(e.detail)
    this.setData({
      method: e.detail.value
    })
  },

  onChange5: function (e) {

    console.log(e.detail)
    this.setData({
      introduction: e.detail.value
    })
  },

  onChange6: function (e) {

    console.log(e.detail)
    this.setData({
      introduction: e.detail.value
    })
  },



})