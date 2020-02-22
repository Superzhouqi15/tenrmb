const app = getApp()
Page({
  data: {
    
  },

  onSubmit: function(e){
    wx.navigateTo({
      url: '../register/register',
    })
  },

  skip:function(e){
    wx.switchTab({
      url: '../info/info',
    })
    // app.globalData.identity = 0
  },

  onLoad: function () {

  }
})