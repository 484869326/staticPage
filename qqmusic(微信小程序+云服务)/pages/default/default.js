// pages/default/default.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false,
    tips:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  checkboxChange(e){
    if(e.detail.value=="true"){
      this.data.checked=true;
    }
    else{
      this.data.checked=false;
    }
    this.setData({
      checked:this.data.checked
    })
  },
  isLogin(){
    if(this.data.checked){
          wx.getUserProfile({
      desc: "获取你的昵称、头像、地区及性别",
      success: (result) => {
        wx.setStorageSync("userInfo", result.userInfo);
        wx.navigateBack({
          delta: 0,
          success: (res) => {},
        })
      }
    });
    }
    else{
        this.setData({
          tips:true
        })
        setTimeout(() => {
          this.setData({
            tips:false
          })
        }, 2000);
    }

  }
})