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
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  myfavInit: function () {
    var that = this
    var myfav = that.data.myFavoriteList
    for (let i = 0; i < myfav.length; ++i) {
      var oId = app.getObjectId(myfav[i].id)
      myfav[i].objectId = oId
    }
  },


  del: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var objectId = this.data.myFavoriteList[id].objectId
    var isCollect = app.globalData.isCollect;
   
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      cancelText: '否',
      confirmText: '是',
      success(res) {
        if (res.confirm) {
        new Promise(function (resolve, reject) {
        app.delFavorite(objectId).then(res => {
          delete isCollect[objectId]
          resolve("success")
        }).catch(err => {
          reject("fail")
          }).then(res => {
            that.setData({
              isCollect: isCollect,
            })
          })
    }),
         that.onShow();
        }
      }
    })
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
          resolve(res.data)
          app.globalData.myFavorite = res.data
          that.setData({
            myFavoriteList: app.globalData.myFavorite
          })
          that.myfavInit()
        }
      })
    })
  },

  InToGame3: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../showCompetition/showCompetition?id=' + id + '&target=' + 3,
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