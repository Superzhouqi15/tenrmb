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

  del: function (e) {
  var self=this
  var objectId = e.currentTarget.dataset.objectid
    console.log('我', objectId)

    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      cancelText: '否',
      confirmText: '是',
    success(res){
       if(res.confirm)
       {
       
        self.delFavorite(objectId)
        self.onShow()
         console.log('成功')
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