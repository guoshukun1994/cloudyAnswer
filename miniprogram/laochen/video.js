// miniprogram/laochen/image.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.cloud.callFunction({
      name: "duanzi",
      data: {
        page: 1,
        count: 10,
        type: "video"
      },
      success(res) {
        console.log(res)
        that.setData({
          dzList: res.result.result
        })
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


  onReachBottom: function () {
    this.setData({ currentPage: this.data.currentPage + 1 })
    console.log(this.data.currentPage)
    this.getDz(this.data.currentPage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  getDz(page) {
    let that = this;
    wx.cloud.callFunction({
      name: "duanzi",
      data: {
        page: page,
        count: 10,
        type: "video"
      },
      success(res) {
        console.log(res)
        console.log(that.data.dzList)

        let arr = that.data.dzList.concat(res.result.result)
        console.log(arr)
        that.setData({
          dzList: arr
        })
      }
    })
  }
})