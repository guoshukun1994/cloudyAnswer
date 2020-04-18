// miniprogram/laochen/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  uploadEvent(){
    let that = this;
    //1选择上传图片
    wx.chooseImage({
      success: function(res) {
        console.log(res)
        //将选中的图片上传到云服务器
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+".png",
          filePath:res.tempFilePaths[0],
          success(result){
            console.log(result);
            that.setData({
              imgSrc: result.fileID
            })
          }
        })


      },
      fail(error){
        console.log(error)
      }
    })
  }
})