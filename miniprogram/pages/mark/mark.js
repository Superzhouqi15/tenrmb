// miniprogram/pages/mark/mark.js
const app = getApp()
var that=this
Page({

  /**
   * 页面的初始数据
   */
  data: {

    right: [{
      text: 'Delete',
      style: 'background-color: #F4333C; color: white',
    }],

    myFavoriteList: [],
   
  },


  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    new Promise(function (resolve, reject) {
      wx.request({
        url: app.globalData.url + '/getFavorite',
        method: 'POST',
        data: {
          'openId': app.globalData.openId,
        },
        success: res => {
          app.globalData.myFavorite = res.data
          resolve(res.data)
        }
      })
    })
    this.setData({
      myFavoriteList: app.globalData.myFavorite
    })
    that.pretreatData()
    //console.log('你', this.data.myFavoriteList)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },




  pretreatData: function () {
    var that = this
    var myfav = that.data.myFavoriteList
    for (let i = 0; i < myfav.length; ++i) {
      var oId = that.getObjectId(myfav[i].id)
      myfav[i].objectId = oId
    }
  },

  getObjectId: function (id) {
    var oId = id.timeSecond.toString(16) +
      id.machineIdentifier.toString(16) +
      id.processIdentifier.toString(16) +
      id.counter.toString(16);
    return oId
  },

  del: function (e) {
    var self = this
    var id = e.currentTarget.dataset.id
    //console.log(id)
    var objectId = this.data.myFavoriteList[id].objectId
    //console.log('我', objectId)
    
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      cancelText: '否',
      confirmText: '是',
      success(res) {
        if (res.confirm) {
          self.delFavorite(objectId)
          self.onLoad();//刷新页面
        }
      }
    })
  },

  delFavorite: function (objectId) {
    var that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        url: app.globalData.url + '/delFavorite',
        method: 'POST',
        data: {
          'openId': app.globalData.openId,
          'objectId': objectId,
        },
        success: res => {
          console.log(res)
        }
      })
    })
  },








  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  InToGame2: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../showCompetition/showCompetition?id=' + id,
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