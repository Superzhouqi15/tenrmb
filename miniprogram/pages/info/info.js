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
    current: 'tab1',
    active: 0,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    competition: app.globalData.competitionData,
    allCompetition: app.globalData.allCompetitionData,
    // search
    inputShowed: false,
    inputVal: "",
  },

  onChange(e) {
    console.log('onChange', e)
    this.setData({
      current: e.detail.key,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data)
  },


  onShow: function () {

    this.setData({
      competition: app.globalData.competitionData,
      allCompetition: app.globalData.allCompetitionData
    })
    if (this.data.competition.length != 0) {
      this.setData({
        emptyFlag: false
      })
    } else {
      this.setData({
        emptyFlag: true
      })
    }

  },

  getInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  },





  InToGame1:function(e){
    var id = e.currentTarget.dataset.id
 
    wx.navigateTo({
      url: '../showRecCompetition/showRecCompetition?id=' + id,
    })
    
  },

  InToGame2: function (e) {
    var id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: '../showCompetition/showCompetition?id=' + id,
    })

  },

  // search bar
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    this.filter();
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    this.filter();
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    this.filter();
  },

  // filter
  filter: function () {
    var that = this
    var val = this.data.inputVal
    var ac = this.data.allCompetition

    for (let i = 0; i < ac.length; ++i) {
      var aim = []
      // title and label
      aim.push(ac[i].title)
      aim.push(ac[i].label)
      // console.log(aim)

      let isHidden = false
      if (val != null && val != '') {
        isHidden = true
        for (let j = 0; j < aim.length; ++j) {
          if (aim[j] != null && aim[j].indexOf(val) != -1) {
            isHidden = false;
          }
        }
      }
      ac[i].isHidden = isHidden
    }

    that.setData({
      allCompetition: ac,
    })
  },

})
