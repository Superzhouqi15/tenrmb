// miniprogram/pages/baidu/baidu.js

var that = this
import { $wuxToast } from '../../dist/index'

var util = require('../../utils/util.js');
const app = getApp()
const isTel = (value) => !/^1[34578]\d{9}$/.test(value)
import { $wuxForm } from '../../dist/index'

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
    labelValue: '',
    introduction: '',
    image: '',
    file: '',
    time1: util.formatTime(new Date()),
    time2: util.formatTime(new Date()),
    startTime: [],
    endTime: [],
    displayValue1: '请选择',
    displayValue3: '请选择',
    displayValue4: '最多选择3项',
    options3: [{
      title: '创业',
      value: '1',
    }, {
      title: '算法',
      value: '2',
    }, {
      title: '网络安全',
      value: '3',
    }, {
      title: '师范技能',
      value: '4',
    }, {
      title: '美术设计',
      value: '5',
    }, {
      title: '体育竞技',
      value: '6',
    }, {
      title: '知识竞赛',
      value: '7',
    }, {
      title: '歌唱比赛',
      value: '8',
    }, {
      title: '文学知识',
      value: '9',
    }, {
      title: '高等数学',
      value: '10',
    }, {
      title: '外语比赛',
      value: '11',
    }, {
      title: '理科知识',
      value: '12',
    }, {
        title: '数学建模',
        value: '13',
    }],

    fileList: []
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
    console.log(this.data.time1)
    const { index } = e.currentTarget.dataset
    this.setValue1(e.detail, index)
    console.log(`onConfirm${index}`, e.detail)

  },

  onConfirm2(e) {
    const { index } = e.currentTarget.dataset
    this.setValue2(e.detail, index)
    console.log(`onConfirm${index}`, e.detail)
  },

  onConfirm3(e) {
    const { index } = e.currentTarget.dataset
    this.setValue3(e.detail, index)
    console.log(`onConfirm${index}`, e.detail)
  },

  setValue1(values, key, mode) {
    this.setData({
      time1: values.value,
      [`displayValue${key}`]: values.label,
      startTime: values.label
    })

  },

  setValue2(values, key, mode) {
    this.setData({
      time2: values.value,
      [`displayValue${key}`]: values.label,
      endTime: values.label
    })
  },

  setValue3(values, key, mode) {
    this.setData({
      labelValue: values.value,
      label: values.displayValue,
      [`displayValue${key}`]: values.label,
    })
    console.log(this.data.label)
  },

  onValueChange(e) {
    const { index } = e.currentTarget.dataset
    console.log(`onValueChange${index}`, e.detail)
  },


  showToast() {

    if (this.data.title == '') {
      wx.showToast({
        title: '赛事名称不能为空',
        icon: "none"
      })
      return;
    }
    else if (this.data.organization == '') {
      wx.showToast({
        title: '举办单位不能为空',
        icon: "none"
      })
      return;
    }
    else if (this.data.member == '') {
      wx.showToast({
        title: '参赛对象不能为空',
        icon: "none"
      })
      return;
    }

    wx.request({
      url: app.globalData.url + '/addCompetition',
      method: 'POST',
      data: {
        'competitionName': this.data.title,
        'organization': this.data.organization,
        'startTime': this.data.startTime,
        'endTime': this.data.endTime,
        'type': this.data.label,
        'member': this.data.member,
        'introduction': this.data.introduction,
        'method': this.data.method,
      },
      success: res => {
        console.log(res.data)
      }
    })

    app.globalData.allCompetitionData.push({
      title: this.data.title,
      organization: this.data.organization,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      member: this.data.member,
      introduction: this.data.introduction,
      label: this.data.label,
      method: this.data.method
    })


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
  }



})