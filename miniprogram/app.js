App({
  globalData: {
    url: "https://www.tuppy.pub/bsj",
    // url: "http://localhost:8099",
    openId: "",
    newUser: false,
    //identity表示身份是游客'0'还是用户'1'，然后判断是否能够进行相关操作
    identity: 0
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

      var getFavorite = that.getFavorite()
      Promise.all([getFavorite]).then(res => {

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
          } else {
            that.globalData.identity = 1;
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
  tranDate: function (time) {
    return new Date(time.replace(/-/g, '/')).getTime();
  },
  pretreatData: function () { // fav->visable
    var that = this
    var data = that.globalData.allCompetitionData
    //var rec = that.globalData.competitionData
    var fav = that.globalData.myFavorite
    var isCollect = that.globalData.isCollect = {}
    for (let i = 0; i < data.length; ++i) {
      var oId = that.getObjectId(data[i].id)
      data[i].objectId = oId

      
      let endTime = this.tranDate(data[i].endTime);
      let thisDate = new Date();
      // 获取当前时间，格式为 2018-9-10 20:08
      let currentTime = thisDate.getFullYear() + '-' + (thisDate.getMonth() + 1) + '-' + thisDate.getDate() + ' ' + thisDate.getHours() + ':' + thisDate.getMinutes();
      let nowTime = this.tranDate(currentTime);
      // 如果当前时间处于时间段内，返回true，否则返回false
      if (nowTime > endTime) {
        data[i].isEnd = "已截止";
      }
      else {
        data[i].isEnd = "未截止";
      }
    }

    for (let i = 0; i < fav.length; ++i) {
      var oId = that.getObjectId(fav[i].id)
      isCollect[oId] = true
    }

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

          resolve("addSearch : done")
        }
      })
    })
  },

  getObjectId: function (id) {
    var oId = id.timeSecond.toString(16) +
      id.machineIdentifier.toString(16) +
      id.processIdentifier.toString(16) +
      ('000000' + id.counter.toString(16)).slice(-6);
    return oId
  },
})