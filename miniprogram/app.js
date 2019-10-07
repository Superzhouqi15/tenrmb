App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      competitionData : [],
      
      allCompetitionData: [
        { 
          "title":"金点子", "organization":"计算机学院", "thumb":"/icon/timg.png", "time":"2019-12", "footer":"计算机"
        },
        {
          "title":"全国数学建模大赛", "organization":"中国数学发展协会", "thumb":"/icon/math.png", "time":"2019-12-9", "footer":"数学"
        },
        {
          "title":"ACM程序设计大赛", "organization":"中国计算机协会", "thumb":"/icon/acm.png", "time":"2019-12-9", "footer":"计算机"
        }
        ]
    }
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  globalData:{
    
  }

})
