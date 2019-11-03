// pages/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Id: null,
    item_list: [],
    capacity: 0,
    service: false,
    longitude: 0,
    latitude: 0,
    color: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Id: options.id,
    })

    var that = this
    wx.request({
      // url: 'http://106.54.103.171/test.php',
      url: 'https://hao2hen.com/test.php',
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      data: {},
      success: function (res) {
        // success
        console.log(res.data);//打印请求返回的结果
        that.setData({ item_list: res.data })
        that.setData({
          capacity: that.data.item_list[that.data.Id].capacity,
          service: that.data.item_list[that.data.Id].service,
          longitude: that.data.item_list[that.data.Id].longitude,
          latitude: that.data.item_list[that.data.Id].latitude,
        })
        if(that.data.capacity > 50)
        {
          if(that.data.capacity < 90)
          {
            that.setData({
              color: '#FFD700'
            })
          }
          else
          {
            that.setData({
              color: '#f01313'
            })
          }
        }
        else
        {
          that.setData({
            color: '#33cd5f'
          })
        }
        console.log(typeof (that.data.service))
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

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

  switchService: function (e) {
    this.setData({
      service: e.detail.value
    });
    console.log(this.data.service)
  },

  formSubmit: function(e) {
    var that = this
    var Id = that.data.Id
    console.log(e.detail.value)
    console.log(Id)
    wx.request({
      url: 'https://hao2hen.com/form.php',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data:{
        service: e.detail.value.service,
        id: Id 
      },
      success: function(res) {
        console.log(res.data);
        if(res.data.status == 0) {
          wx.showToast({
            title: '提交失败',
            icon: 'loading',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })
  }
})