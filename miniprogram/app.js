App({
  globalData: {
    url: "http://www.tuppy.pub:8099",
    openId: "",
    newUser: false
  },

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    
    this.init();
  },

  
  init: function () {
    var that = this
    var onGetUserInfo = this.onGetUserInfo()
    var onGetCompetition = this.onGetCompetition()
    Promise.all([onGetUserInfo, onGetCompetition]).then(res => {
      var openId = that.globalData.openId
      var onGetRecCompetition = that.onGetRecCompetition()
      var getFavorite = that.getFavorite()
      Promise.all([onGetRecCompetition, getFavorite]).then(res => {
        that.pretreatData()
        // page callback
        that.globalData.initDone = true
        if (that.initCallback) {
          console.log("init: Callback")
          that.initCallback(true)
        }
      })
    })
  },

  // UserInfo start
  onGetUserInfo: function () {
    var that = this
    return new Promise(function (resolve, reject) {
      that.getOpenId().then(res => {
        var openId = res
        that.judgeUser(openId).then(res => {
          resolve("onGetUserInfo : success")
        })
      }).catch(err => {
        console.log("onGetUserInfo : fail | ", err)
      })
    })
  },
  getOpenId: function () {
    var that = this
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: that.globalData.url + '/getOpenId',
              method: 'POST',
              data: {
                "code": res.code
              },
              success: res => {
                that.globalData.openId = res.data
                resolve(res.data)
              },
              fail: res => {
                console.log(res)
                reject("getOpenId : fail")
              }
            })
          }
        }
      })
    })
  },
  judgeUser: function (openId) {
    var that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        url: that.globalData.url + '/judgeUser',
        method: 'POST',
        header: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
          "openId": openId
        },
        success: res => {
          if (res.data == "") {
            that.globalData.newUser = true;
          }
          resolve(that.globalData.newUser)
        },
        fail: res => {
          reject("judgeUser : fail")
        }
      });
    })
  },
  // UserInfo end

  // Competition start
  onGetRecCompetition: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: that.globalData.url + '/recommend',
        method: 'POST',
        data: {
          'openId': that.globalData.openId
        },
        success: res => {
          console.log(res.data)
          that.globalData.competitionData = res.data
          resolve(res.data)
        },
        fail: res => {
          reject("onGetRecCompetition : fail")
        }
      })
    })
  },
  onGetCompetition: function () {
    var that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        url: that.globalData.url + '/findAll',
        method: 'GET',
        data: {},
        success: res => {
          that.globalData.allCompetitionData = res.data
          resolve(res.data)
        },
        fail: res => {
          reject("onGetCompetition : fail")
        }
      })
    })
  },
  pretreatData: function () { // fav->visable
    var that = this
    var data = that.globalData.allCompetitionData
    var rec = that.globalData.competitionData
    var fav = that.globalData.myFavorite
    var isCollect = that.globalData.isCollect = {}
    for (let i = 0; i < data.length; ++i) {
      var oId = that.getObjectId(data[i].id)
      data[i].objectId = oId
    }
    for (let i = 0; i < rec.length; ++i) {
      var oId = that.getObjectId(rec[i].id)
      rec[i].objectId = oId
    }
    for (let i = 0; i < fav.length; ++i) {
      var oId = that.getObjectId(fav[i].id)
      isCollect[oId] = true
    }
    // console.log(isCollect)
  },
  // Competition end

  // Favorite start
  getFavorite: function () {
    var that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        url: that.globalData.url + '/getFavorite',
        method: 'POST',
        data: {
          'openId': that.globalData.openId,
        },
        success: res => {
          that.globalData.myFavorite = res.data
          resolve(res.data)
        },
        fail: res => {
          reject("getFavorite : fail")
        }
      })
    })
  },
  addFavorite: function (objectId) {
    var that = this
    var openId = this.globalData.openId
    return new Promise(function (resolve, reject) {
      wx.request({
        url: that.globalData.url + '/addFavorite',
        method: 'POST',
        data: {
          'openId': openId,
          'objectId': objectId,
        },
        success: res => {
          console.log(res)
          resolve("addFavorite : done")
        }
      })
    })
  },
  delFavorite: function (objectId) {
    var that = this
    var openId = this.globalData.openId
    return new Promise(function (resolve, reject) {
      wx.request({
        url: that.globalData.url + '/delFavorite',
        method: 'POST',
        data: {
          'openId': openId,
          'objectId': objectId,
        },
        success: res => {
          console.log(res)
          resolve("delFavorite : done")
        }
      })
    })
  },
  // Favorite end
  
  addSearch: function (history) {
    var that = this
    var openId = this.globalData.openId
    console.log(openId)
    console.log(history)
    return new Promise(function (resolve, reject) {
      wx.request({
        url: that.globalData.url + '/addSearch',
        method: 'POST',
        data: {
          'openId': openId,
          'type': history,
        },
        success: res => {
          console.log(res)
          resolve("addSearch : done")
        }
      })
    })
  },

  addSearch: function (history) {
    var that = this
    var openId = this.globalData.openId
    console.log(openId)
    console.log(history)
    return new Promise(function (resolve, reject) {
      wx.request({
        url: that.globalData.url + '/addSearch',
        method: 'POST',
        data: {
          'openId': openId,
          'type': history,
        },
        success: res => {
          console.log(res)
          resolve("addSearch : done")
        }
      })
    })
  },

  getObjectId: function (id) {
    var oId = id.timeSecond.toString(16) +
      id.machineIdentifier.toString(16) +
      id.processIdentifier.toString(16) +
      id.counter.toString(16);
    return oId
  },
})