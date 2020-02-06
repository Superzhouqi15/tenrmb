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

    // test-data start
    competition: [{
        "title": "金点子",
        "organization": "计算机学院",
        "thumb": "/icon/timg.png",
        "startTime": "2019-12-15 12:00",
        "endTime": "2019-12-30 20:00",
        "label": "计算机",
        "member": "全体本科生",
        "introduction": "学院的创意大赛",
        "method": "填写报名表发送给指定邮箱",
        "publisher": "sam",
        "isCollect": false,
      },
      {
        "title": "全国数学建模大赛",
        "organization": "中国数学发展协会",
        "thumb": "/icon/math.png",
        "startTime": "2019-12-15 12:00",
        "endTime": "2019-12-30 12:00",
        "label": "数学",
        "member": "全国本科生",
        "introduction": "全国的建模大赛",
        "method": "填写报名表发送给指定邮箱",
        "publisher": "sam",
        "isCollect": true,
      },
    ],
    allCompetition: [{
        "title": "金点子",
        "organization": "计算机学院",
        "thumb": "/icon/timg.png",
        "startTime": "2019-12-15 12:00",
        "endTime": "2019-12-30 20:00",
        "label": "计算机",
        "member": "全体本科生",
        "introduction": "学院的创意大赛",
        "method": "填写报名表发送给指定邮箱",
        "publisher": "sam",
        "isCollect": false,
      },
      {
        "title": "全国数学建模大赛",
        "organization": "中国数学发展协会",
        "thumb": "/icon/math.png",
        "startTime": "2019-12-15 12:00",
        "endTime": "2019-12-30 12:00",
        "label": "数学",
        "member": "全国本科生",
        "introduction": "全国的建模大赛",
        "method": "填写报名表发送给指定邮箱",
        "publisher": "sam",
        "isCollect": true,
      },
      {
        "title": "ACM程序设计大赛",
        "organization": "中国计算机协会",
        "thumb": "/icon/acm.png",
        "startTime": "2019-12-9 08:00",
        "endTime": "2019-12-15 20:00",
        "label": "计算机",
        "member": "全体本科生",
        "introduction": "学院的算法设计大赛",
        "method": "填写报名表发送给指定邮箱",
        "publisher": "sam",
        "isCollect": false,
      },
    ],
    // test-data end

    // card start
    // competition: app.globalData.competitionData,
    // allCompetition: app.globalData.allCompetitionData,
    // card end

    // collect start
    collectLogo0: '/icon/shoucang.png',
    collectLogo1: '/icon/shoucang1.png',
    // collect end

    // search-bar start
    value: '',
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
  onLoad: function(options) {
    console.log(this.data)
  },


  onShow: function() {
    // this.setData({
    //   competition: app.globalData.competitionData,
    //   allCompetition: app.globalData.allCompetitionData
    // })
    // if (this.data.competition.length != 0){
    //   this.setData({
    //     emptyFlag : false
    //   })
    // }else{
    //   this.setData({
    //     emptyFlag: true
    //   })
    // }
  },

  getInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  },

  // card start
  InToGame1: function(e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    // wx.navigateTo({
    //   url: '../showRecCompetition/showRecCompetition?id=' + id,
    // })
  },

  InToGame2: function(e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    // wx.navigateTo({
    //   url: '../showCompetition/showCompetition?id=' + id,
    // })
  },
  // card end

  // collect start
  clickCollect: function(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var current = this.data.current
    var data = current == 0 ? this.data.competition : this.data.allCompetition;
    var targ = current == 0 ? "competition" : "allCompetition";

    data[id].isCollect = !data[id].isCollect
    this.setData({
      [targ]: data,
    })
    var text = data[id].isCollect ? '已收藏' : '取消收藏';
    wx.showToast({
      title: text,
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
    console.log('onConfirm', e)
    console.log(this.data.value)
    this.filter();
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
  filter: function() {
    var that = this
    var val = this.data.value
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
    console.log(ac)
    that.setData({
      allCompetition: ac,
    })
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