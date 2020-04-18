// miniprogram/dati/dati.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:"startPage",
    currentTimu:{},
    currentNum:0,
    timuList:[],
    score:0,
    styleArr: ["optionsItem", "optionsItem", "optionsItem","optionsItem"],
    isAnswer:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

    let result = await this.getTimu()
    console.log(result)
    console.log(result.data[0])
    this.setData({
      timuList:result.data,
      currentTimu:result.data[0]
    })

    this.getRange()
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
  async getTimu(){
    let randomNum = parseInt(Math.random() * 16000) 
    let db = wx.cloud.database();
    //skip()设置偏移数量
    //limit()限制数量
    let result = await db.collection('timu').skip(randomNum).limit(10).get()
    return result
  },
  goGaming(){
    console.log(123)
    this.setData({
      page:"gamingPage"
    })
  },
  chooseEvent(event){
    console.log(event)
    let that = this;
    if(this.data.isAnswer){
      return;
    }
    let num = event.currentTarget.dataset.num;
    console.log(num)
    if (num == this.data.currentTimu.answer){
      let score = this.data.score+10;
      let arr = this.data.styleArr;
      arr[num - 1] = 'optionsItem success';
      let currentNum = this.data.currentNum + 1 == 10 ? 0 : this.data.currentNum + 1;
      this.setData({
        styleArr: arr,
        score: score,
        currentNum: currentNum,
        isAnswer:true
      })
      
      setTimeout(()=>{
        this.setData({
          currentTimu:this.data.timuList[this.data.currentNum],
          styleArr: ["optionsItem", "optionsItem", "optionsItem", "optionsItem"],
          isAnswer:false
        })
      },2000)
    }else{
      let arr = this.data.styleArr;
      arr[num - 1] = 'optionsItem fail';
      arr[this.data.currentTimu.answer - 1] = 'optionsItem success';
      this.setData({
        styleArr: arr,
        isAnswer:true
      })

      setTimeout(()=>{
        this.setData({
          page:'endPage',
          isAnswer:false
        })
        wx.getUserInfo({
          success(res){
            console.log(res)
            let data = res.userInfo;
            //console.log(data)
            data.score = that.data.score;
            console.log(data)
            let db = wx.cloud.database();
            db.collection('datiRange').add({
              data: data,
              success(res){
                console.log(res)
                that.getRange()
              }
            })
          }
        })
      },2000)

    }


    
  },
  async getRange(){
    let db = wx.cloud.database();
    let result = await db.collection('datiRange').aggregate().sort({
      score:-1
    }).limit(3).end()
    this.setData({
      rangeList: result.list
    })
    console.log(result)
  }

})