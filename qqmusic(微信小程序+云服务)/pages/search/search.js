// pages/search/search.js
wx.cloud.init();
const db = wx.cloud.database()
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:false,
    value:"",
    top:0,
    newValue:"",
    History:[],
    input:false,
    inputValue:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      top:wx.getSystemInfoSync()['statusBarHeight']+'px',
    })
  },
  getValue(e){
    let list=wx.getStorageSync('list');
    list.map((v,i)=>{
      if(v.author==e.detail.value || v.name==e.detail.value){
        let inputValue=this.data.inputValue;
        inputValue.push(e.detail.value);
       this.setData({
        inputValue
       })
      }
    })
    let timer=null;
    if(timer){
      clearTimeout(timer);
    }
    if(e.detail.value !=""){
      timer=setTimeout(() => {
        this.setData({
          newValue:e.detail.value,
          input:true
         })
      }, 10);
    }
    else{
      this.setData({
        newValue:e.detail.value,
        input:false
      })
    }
  },
  blur(){
    this.setData({
      hidden:true,
      input:false
    })
  },
  focus(){
      this.setData({
        hidden:false
      })

  },
  clear(){
    this.setData({
      value:"",
      hidden:true
     })
  } ,
  search(){
    let History=wx.getStorageSync('History');
    if(Array.isArray(History)){
    History.push(
        this.data.newValue
      )
    }
    else{
      History=[this.data.newValue]
    }
    wx.setStorageSync('History', History);
    this.setData({
      value:"",
      newValue:""
    })
    this.onShow();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let History=wx.getStorageSync('History');
    this.setData({
      History
    })
  }
})