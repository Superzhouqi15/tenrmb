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

    // card start
    competition: [[]],
    allCompetition: [],
    // card end

    // search-bar start
    value: '',
    history: {},
    // search-bar end

    // tabs start
    current: '1',
    tabs: [{
      key: '0',
      title: '推荐比赛',
      content: 'Content of tab 1',
    },
    {
      key: '1',
      title: '全部比赛',
      content: 'Content of tab 2',
    },
    ],
    // tabs end
  },


  /**
   * 生命周期函数--监听页面加载
   */
 onLoad: function (options) {
    var that = this;
    new Promise(function (resolve, reject) {
      wx.request({
        url: app.globalData.url + '/recommend',
        method: 'POST',
        data: {
          'openId':app.globalData.openId
        },
        success: res => {
          that.setData({
            competition:res.data
          })
          resolve(res.data)
        },
        fail: res => {
          reject("onGetRecCompetition : fail")
        }
      })
    }),
    // console.log(this.data)
    this.pageInit();
  },

  onShow: function () {

  },

  pageInit: function () {
    var that = this
    if (app.globalData.initDone) {
      that.setData({
        competition: app.globalData.allCompetitionData,
        allCompetition: app.globalData.allCompetitionData,
        isCollect: app.globalData.isCollect,
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

  // card start
  InToGame1: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../showRecCompetition/showRecCompetition?id=' + id,
    })
  },
  InToGame2: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../showCompetition/showCompetition?id=' + id,
    })
  },
  // card end

  // collect start
  clickCollect: function (e) {
    var that = this
    var objectId = e.currentTarget.dataset.objectid
    var current = this.data.current
    var isCollect = app.globalData.isCollect;
    // console.log(objectId)
    new Promise(function(resolve, reject){
      if (isCollect[objectId]) {
        app.delFavorite(objectId).then(res => {
          delete isCollect[objectId]
          resolve("success")
        }).catch(err => {
          reject("fail")
        })

      } else {
        app.addFavorite(objectId).then(res => {
          isCollect[objectId] = true
          resolve("success")
        }).catch(err => {
          reject("fail")
        })
        
      }
    }).then(res => {
      this.setData({
        isCollect: isCollect,
      })
      var text = isCollect[objectId] ? '已收藏' : '已取消收藏';
      wx.showToast({
        title: text,
      })
    }).catch(err => {
      console.log('clickCollect : fail > ', err)
      wx.showToast({
        title: '失败',
        icon: 'none',
      })
    })
    
    
  },
  // collect end

  // search-bar start
  onChange(e) {
    // console.log('onChange', e)
    this.setData({
      value: e.detail.value,
    })
  },
  onFocus(e) {
    // console.log('onFocus', e)
  },
  onBlur(e) {
    // console.log('onBlur', e)
  },
  onConfirm(e) {
    // console.log('onConfirm', e)
    // console.log(this.data.value)
    this.filter();
    this.saveHistory();
  },
  onClear(e) {
    // console.log('onClear', e)
    this.setData({
      value: '',
    })
  },
  onCancel(e) {
    // console.log('onCancel', e)
    this.onClear()
    this.filter()
  },
  filter: function () {
    var that = this
    var val = this.data.value
    var ac = this.data.allCompetition

    for (let i = 0; i < ac.length; ++i) {
      var aim = []
      // title and label
      aim.push(ac[i].competitionName)
      aim = aim.concat(ac[i].type)
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
    // console.log(ac)
    that.setData({
      allCompetition: ac,
    })
  },
  saveHistory: function () { // label 未改成数组
    var that = this
    var data = this.data.allCompetition
    var his = this.data.history
    var tmp = []
    for (let i = 0; i < data.length; ++i) {
      if (!data[i].isHidden) {
        tmp = tmp.concat(data[i].type)
      }
    }
    for (let i = 0; i < tmp.length; ++i) {
      if (his[tmp[i]] == undefined) {
        his[tmp[i]] = 1
      } else {
        his[tmp[i]] += 1
      }
    }
    this.setData({
      history: his,
    })
    console.log(his)
  },
  // search-bar end

  // tabs start
  onChangeTab(e) {
    // console.log('onChange', e)
    var key = e.detail.key
    this.setData({
      current: key,
    })
  },
  // tabs end

})
