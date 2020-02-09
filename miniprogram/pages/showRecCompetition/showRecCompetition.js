var app = getApp()
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

  onLoad: function(options) {
    var id = options.id;
    var target = options.target
    //console.log(target)

    this.setData({
      index: id
    });
    this.pageInit();
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

  pageInit: function () {

    var that = this
    if (app.globalData.initDone) {
      that.setData({
        dat: app.globalData.competitionData,
      })
    } else {
      app.initCallback = res => {
        if (res) {
          //console.log(app.globalData.competitionData)
          that.setData({
            competition: app.globalData.competitionData,
            allCompetition: app.globalData.allCompetitionData,
            isCollect: app.globalData.isCollect,
          })
        }
      }
    }
  }
})