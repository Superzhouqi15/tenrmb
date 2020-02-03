App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    var that = this
    wx.login({
      success: function(res) {
        if (res.code) {
          console.log("res.code:" + res.code);
          wx.request({
            url: that.globalData.url + '/getOpenId',
            method: 'POST',
            data: {
              "code": res.code
            },
            success: res => {
              console.log(res.data);
              that.globalData.openId = res.data;
              wx.request({
                url: that.globalData.url + '/judgeUser',
                method: 'POST',
                header: {
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                  "openId": res.data
                },
                success: res => {
                  console.log(res.data == "")
                  if(res.data == ""){
                    that.globalData.newUser = true;
                  }
                }
              });
              wx.request({
                url: that.globalData.url + '/findAll',
                method: 'GET',
                success: res => {
                  console.log(res.data);
                  that.globalData.allCompetitionData = res.data;
                }
              });
            },
            fail: res => {
              console.log(res);
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }

    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  },
  globalData: {
    competitionData: [{
        "title": "金点子",
        "organization": "计算机学院",
        "thumb": "/icon/timg.png",
        "startTime": "2019-12-15 12:00",
        "endTime": "2019-12-30 20:00",
        "label": "计算机",
        "member": "全体本科生",
        "introduction": "学院的创意大赛",
        "method": "填写报名表发送给指定邮箱"
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
        "method": "填写报名表发送给指定邮箱"
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
        "method": "填写报名表发送给指定邮箱"
      }

    ],

    allCompetitionData: [{
        "title": "金点子",
        "organization": "计算机学院",
        "thumb": "/icon/timg.png",
        "startTime": "2019-12-15 12:00",
        "endTime": "2019-12-30 20:00",
        "label": "计算机",
        "member": "全体本科生",
        "introduction": "学院的创意大赛",
        "method": "填写报名表发送给指定邮箱",
        "publisher": "sam"
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
        "publisher": "sam"
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
        "publisher": "sam"
      }
    ],
    url: "http://www.tuppy.pub:8099",
    openId: "",
    newUser: false
  }

})