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
    competition: [],
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
    // console.log(this.data)
    var that = this

    // 样式
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight,
    })
    var query = wx.createSelectorQuery();
    query.select("#tabs").boundingClientRect(function (rect) {

      console.log(rect.height)
      that.setData({
        tabsHeight: rect.height
      })
    }).exec();
    query.select("#search_bar").boundingClientRect(function (rect) {
      console.log(rect.height)
      that.setData({
        searchHeight: rect.height
      })
    }).exec();

    // 数据
    this.pageInit().then(res => {
      this.recInit()
    })
  },

  onShow: function () {
    var that = this
    if (app.globalData.initDone) { 
      // isCollect
      that.setData({
        isCollect: app.globalData.isCollect,
      })
      // update allCom
      app.onGetCompetition().then(res => {
        console.log("all", res)
        that.setData({
          allCompetition: res,
        })
      })
    }
  },

  onHide: function () {
    this.addSearHis();
    for (var key in this.data.history) {
      delete (this.data.history[key]);
    }
    // console.log(this.data.history)
  },

  onHide:function () {
    this.addSearHis();
    for (var key in this.data.history) {
      delete (this.data.history[key]);
    }
    console.log(this.data.history)
  },

  pageInit: function () {
    var that = this
    return new Promise(function (resolve, reject) {
      if (app.globalData.initDone) {
        that.setData({
          allCompetition: app.globalData.allCompetitionData,
          isCollect: app.globalData.isCollect,
        })
        resolve("pageInit : done")
      } else {
        app.initCallback = res => {
          if (res) {
            that.setData({
              allCompetition: app.globalData.allCompetitionData,
              isCollect: app.globalData.isCollect,
            })
            resolve("pageInit : done")
          }
        }
      }
    });

  },

  recInit: function () {
    var that = this
    var onGetRecCompetition = app.onGetRecCompetition()
    Promise.all([onGetRecCompetition]).then(res => {
      var rec = app.globalData.competitionData
      for (let i = 0; i < rec.length; ++i) {
        var oId = app.getObjectId(rec[i].id)
        rec[i].objectId = oId
      }
      that.setData({
        competition: app.globalData.competitionData,
      })
    })
  },

  // card start
  InToGame1: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../showCompetition/showCompetition?id=' + id+'&target='+1,
    })
  },
  InToGame2: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../showCompetition/showCompetition?id=' + id+'&target='+2,
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
    new Promise(function (resolve, reject) {
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
  addSearHis: function () {
    var that = this
    var his = []
    his = Object.keys(this.data.history)
    console.log(his)
    return new Promise(function (resolve, reject) {
      app.addSearch(his).then(res => {
        resolve("success")
      }).catch(err => {
        reject("fail")
      })
    })
  },

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
    this.addSearHis();

  },
  onClear(e) {
    // console.log('onClear', e)
    this.setData({
      value: '',
    })
    this.filter();
  },
  onCancel(e) {
    // console.log('onCancel', e)
    this.onClear()
    this.filter()
  },
  filter: function () {
    var that = this
    var val = this.data.value.trim()
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
    // 输入为空时不保存
    if(this.data.value.trim()=='') return null;
    for (let i = 0; i < data.length; ++i) {
      if (!data[i].isHidden) {
        tmp = tmp.concat(data[i].type)
      }
    }
    for (let i = 0; i < tmp.length; ++i) {
      if (tmp[i] == "") {
        continue
      }else if (his[tmp[i]] == undefined) {

        his[tmp[i]] = 1
      } else  {
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