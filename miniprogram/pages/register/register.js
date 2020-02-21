// miniprogram/pages/register/register.js
const app = getApp();
var that = this;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { value: '创业', checked: '' },
      { value: '算法', checked: '' },
      { value: '网络安全', checked: '' },
      { value: '师范技能', checked: '' },
      { value: '数学建模', checked: '' },

      { value: '美术设计', checked: '' },
      { value: '体育竞技', checked: '' },
      { value: '知识竞赛', checked: '' },
      { value: '歌唱比赛', checked: '' },

      { value: '文学知识', checked: '' },
      { value: '高等数学', checked: '' },
      { value: '外语比赛', checked: '' },
      { value: '理科知识', checked: '' },
    ],
    arr: []//标签数组：用来存储选中的值
  },

  /**
   * 提交界面
   */
  onSubmit: function (e) {
    app.globalData.user = e.detail.value;
    if (this.data.arr.length !== 0) {
      wx.request({
        url: app.globalData.url + '/newUser',
        method: 'POST',
        data: {
          "openId": app.globalData.openId,
          "type": this.data.arr
        },
        success: res => {}
      })
      wx.showToast({
        title: "注册成功",
        duration: 2000,
      })
      wx.switchTab({
        url: '../info/info',
      })
    }
    else{
      wx.showToast({
        title: "请至少选择一个",
        duration: 2000,
      })
    }
  },

  /**
   *跳过
   */
  Skip: function (e) {
    // app.globalData.user = e.detail.value;
    // wx.request({
    //   url: app.globalData.url + '/newUser',
    //   method: 'POST',
    //   data: {
    //     "openId": app.globalData.openId,
    //   },
    //   success: res => { }
    // })
    // wx.switchTab({
    //   url: '../info/info',
    // })
  },

  //选择标签方法
  checkLabs(e) {
    var that = this,
      index = e.currentTarget.dataset.index,
      value = e.currentTarget.dataset.value,
      items = that.data.items,
      arr = that.data.arr,
      val = items[index].checked, //点击前的值
      limitNum = 3,
      curNum = 0; //已选择数量

    //选中累加
    for (var i in items) {
      if (items[i].checked) {
        curNum += 1;
      }
    }

    if (!val) {
      if (curNum == limitNum) {
        wx.showModal({
          content: '选择数量不能超过' + limitNum + '个',
          showCancel: false
        })
        return;
      }
      arr.push(value);
    } else {
      for (var i in arr) {
        if (arr[i] == value) {
          arr.splice(i, 1);
        }
      }

    }
    items[index].checked = !val;

    that.setData({
      items: items,
      arr: arr
    })

  },

  //默认选中为true的
  selectEd(e) {
    var that = this,
      arr = that.data.arr,
      items = that.data.items
    for (var i = 0; i < items.length; i++) {
      if (items[i].checked) {
        var value = items[i].value;
        arr.push(value);
        that.setData({
          items: items,
          arr: arr
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.selectEd();
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
  onReachButton: function () {

  }
})