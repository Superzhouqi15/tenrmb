// miniprogram/pages/profile/profile.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    currentTab: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(this.data)
  },



  getInfo: function(e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })




  },

  //swipe to switch
  swiperTab: function (e) {
    var that = this;
    console.log(e);
    that.setData({
      currentTab: e.detail.current
    });
  },

  //click to switch
  clickTab: function (e) {
    var that = this;
    console.log(e);
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  click_the_text: function(e){
    wx.navigateTo({
      url: '../baidu/baidu',
    })
  }



})
 