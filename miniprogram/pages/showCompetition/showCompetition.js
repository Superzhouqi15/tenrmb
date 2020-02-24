// pages/showCompetition/showCompetition.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dat: [],
    index: null
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var id = options.id;
    var target=options.target
    this.setData({
      index: id
    });
    
    if(target==1) //推荐
    {
      this.pageInit1();
    }
   else if (target == 2) //全部
    {
      this.pageInit2();
    }
    else if (target == 3) //收藏
     {
      this.pageInit3();
    }
    
  },


  downloadFile: function () {
    console.log(this.data.dat[this.data.index].filePath)
    wx.downloadFile({
      url: this.data.dat[this.data.index].filePath,
      success: function (res) {
        console.log(res)

        var filePath = res.tempFilePath

        wx.openDocument({

          filePath: filePath,


          success: function (res) {
            console.log(res)
            console.log(filePath)

            console.log('打开文档成功')

          },
          fail: function(res){
            console.log(res)
          }
        })
      }
    })
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

  pageInit1: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + '/recommend',
      method: 'POST',
      data: {
        'openId': app.globalData.openId,
      },
      success: res => {
        that.setData({
          dat: res.data
        })
      },
      fail: res => {
        reject("onGetRecCompetition : fail")
      }
    })
  },

  pageInit2: function() {

    var that = this
    if (app.globalData.initDone) {
      that.setData({
        dat: app.globalData.allCompetitionData,
      })
    } else {
      app.initCallback = res => {
        if (res) {
          console.log(app.globalData.allCompetitionData)
          that.setData({
            competition: app.globalData.allCompetitionData,
            allCompetition: app.globalData.allCompetitionData,
            isCollect: app.globalData.isCollect,
          })
        }
      }
    }
  },

  pageInit3: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + '/getFavorite',
      method: 'POST',
      data: {
        'openId': app.globalData.openId,
      },
      success: res => {
        that.setData({
          dat: res.data
        })
      },
      fail: res => {
        reject("onGetMyFavCompetition : fail")
      }
    })
  }

})



