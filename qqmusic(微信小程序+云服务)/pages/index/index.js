// index.js
// 获取应用实例
let app=getApp();
wx.cloud.init();
const db = wx.cloud.database()
Page({
  data: {
    "list":[],
  "officialsongSheet":[],
"hotsongSheet":[],
Detail:[],
state:[],
navBarMusic:true
  },
  onLoad() {
    let list=wx.getStorageSync("list");
    let officialsongSheet=wx.getStorageSync("officialsongSheet");
    let hotsongSheet=wx.getStorageSync("hotsongSheet");
    let recommend=[];
    if(list==""){
        db.collection('music').doc('8e1706526176a3ce011be56a6c4374b3').get().then(res=>{
              console.log(res.data.hotsongSheet);
              wx.setStorageSync('list', res.data.list)
              wx.setStorageSync('officialsongSheet',res.data.officialsongSheet)
              wx.setStorageSync('hotsongSheet', res.data.hotsongSheet)
              res.data.list.some((v,i)=>{
                recommend.push(v)
                if(i==5){
                  return true;
                }
              })
              this.setData({
                  list:recommend,
                officialsongSheet:res.data.officialsongSheet,
                hotsongSheet:res.data.hotsongSheet
              })
            
          })
    }
    else{
     list.some((v,i)=>{
        recommend.push(v)
        if(i==5){
          return true;
        }
      })
        this.setData({
            list:recommend,
          officialsongSheet,
          hotsongSheet
        })
    }
   
  },
  handleReturn(){

      
    wx.navigateTo({
      url: '../music_detail/music_detail?id='+this.data.Detail.id,
    })
      
  },
  handleDetail(e){
    wx.navigateTo({
      url: '../music_detail/music_detail?id='+e.currentTarget.dataset.id,
    })
    this.setData({
      navBarMusic:false
    })
  },
  onShow: function () {
    const userInfo=wx.getStorageSync("userInfo");  
    if(userInfo!=""){
      let officialsongSheet=this.data.officialsongSheet;
      let hotsongSheet=this.data.hotsongSheet;
      hotsongSheet.map((item,index)=>{
        if(item.cnt>10000){
          item.cnt=(item.cnt/10000).toFixed(2)+'万';
        }
      })
      officialsongSheet.map((item,index)=>{
        if(item.cnt>10000){
          item.cnt=(item.cnt/10000).toFixed(2)+'万';
        }
      })
      this.setData({
        officialsongSheet,
        hotsongSheet
      })
    }
    else{
        wx.navigateTo({
            url: '../default/default'
        });
          
    }
    let Detail=wx.getStorageSync('Detail')
    let state=wx.getStorageSync('state')
    this.setData({
      Detail,
      state
    })
},
play(){
  let state=wx.getStorageSync('state')
  if(state){
    app.backAudioManager.pause()
    wx.setStorageSync("state", false);
    this.setData({
      state:false
    })
  }
  else{
    app.backAudioManager.play()
    this.setData({
      state:true
    })
    wx.setStorageSync("state", true);  
  }
}

})
