// miniprogram/pages/profile/profile.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyFlag: true,
    userInfo: {},
    hasUserInfo: false,
    currentTab: 0,
    active: 0,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    competition: app.globalData.competitionData,
    allCompetition: app.globalData.allCompetitionData,
  },

  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this.data)
  },


  onShow: function () {

    console.log(app.globalData.competitionData)
    this.setData({
      competition: app.globalData.competitionData,
      allCompetition: app.globalData.allCompetitionData
    })
    console.log(this.data.allCompetition)
    if (this.data.competition.length != 0){
      this.setData({
        emptyFlag : false
      })
    }else{
      this.setData({
        emptyFlag: true
      })
    }
   
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
      url: '../competition/competition',
    })
  },

  InToGame:function(){
    wx.navigateTo({
      url: '../competition/competition',
    })
  }


})
 