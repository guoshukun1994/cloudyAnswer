// miniprogram/db/db.js
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
    //this.addDb()
    //this.getDb()
    //this.queryDb()
    //this.queryDb1()
    //this.updateDb()
    //this.removeDb()
    //this.removeDb2()
  },
  addDb(){
    //1获取连接云的数据库
    let db = wx.cloud.database()
    db.collection('dbtest').add({
      data:{
        age:"admin",
        type:'123456',
        num:3000
      },
      success(res){
        console.log(res)
      }
    })


  },

  async getDb(){
    // fb16f7905e50d9ef0211fd9e0cad8fb3
    let db = wx.cloud.database()
    let result = await db.collection('dbtest').doc('fb16f7905e50d9ef0211fd9e0cad8fb3').get();
    console.log(result)
  },

  async queryDb(){
    let db = wx.cloud.database()
    let result = await db.collection('dbtest').where({
      age:"admin"
    }).get()
    console.log(result);
  },

  async queryDb1() {
    let db = wx.cloud.database()
    let command = db.command
    let result = await db.collection('dbtest').where({
      //num: command.lt(1000)
      //num:command.gt(50).and(command.lt(1000))
      num:command.in([10,3000])
    }).get()
    console.log(result);
  },

  updateDb(){
    let db = wx.cloud.database();
    db.collection('dbtest').doc('f5f6a9235e50dc2a020e5a5a7f9097db').update({
      data:{
        num:5000
      },
      success(res){
        console.log(res)
      }
    })

  },
  updateDb2() {
    let db = wx.cloud.database();
    db.collection('dbtest').where({
      username:"admin"
    }).update({
      data: {
        num: 5000
      },
      success(res) {
        console.log(res)
      }
    })

  },

  removeDb(){
    let db = wx.cloud.database();
    db.collection('dbtest').doc('f5f6a9235e50dc2a020e5a5a7f9097db').remove({
      success(res){
        console.log(res)
      }
    })
  },

  removeDb2(){
    //云端才可以删除多条数据
    wx.cloud.callFunction({
      name:"deleteDb",
      success(res){
        console.log(res);
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

  }
})