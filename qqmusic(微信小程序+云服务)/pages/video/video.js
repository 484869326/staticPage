// pages/video/video.js
wx.cloud.init();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    video:[],
    recomend:[],
    currentNo:9,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let video=wx.getStorageSync("video");    
    let newVideo=[];
    let currentNo=this.data.currentNo;
    if(video==""){
        db.collection('video').doc('83cfc1ac617769e801122c1d0e4131bb').get().then(res=>{
              wx.setStorageSync('video', res.data.video)
              let totalNum=Math.ceil(res.data.video.length/10);
              let recomend=[];
              res.data.video.some((v,i)=>{
                this.Num(v);
                newVideo.push(v);
                if(i==currentNo){
                  return true;
                }
              })
              for(let i=0;i<10;i++){
                let random=Math.floor(Math.random()*res.data.video.length);
                this.Num(res.data.video[random]);
                recomend.push(
                  res.data.video[random]
                )
                res.data.video.splice(random,1);
              }
              this.setData({
                video:newVideo,
                totalNum,
                recomend
              })
          })
    }
    else{
      let totalNum=Math.ceil(video.length/10);
      video.some((v,i)=>{
        this.Num(v);
        newVideo.push(v)
        if(i==currentNo){
          return true;
        }
      })
        this.setData({
          totalNum,
            video:newVideo
        })
    }
  },
  onShow(){
    let video=wx.getStorageSync('video');
   if(video!=""){
    let recomend=[];
    for(let i=0;i<10;i++){
      let random=Math.floor(Math.random()*video.length);
      this.Num(video[random]);
      recomend.push(
        video[random]
      )
      video.splice(random,1);
    }
    this.setData({
      recomend
    })
   }
  },
  Num(item){
    if(item.cnt>10000){
      item.cnt=(item.cnt/10000).toFixed(2)+'万';
    }
    return item
  },
  change(e){
    this.setData({
      num:e.currentTarget.dataset.index
    })
  },
  left(e){
    this.setData({
      num:e.detail.current
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
   reachBottom(e){
    this.onReachBottom()
   },
  onReachBottom: function () {
    let currentNo=this.data.currentNo+10;
    let totalNum=this.data.totalNum*10;
    if(currentNo<totalNum){
      wx.showToast({
        title: '加载中',
        icon:'loading',
        duration:1000
      })
      let video=wx.getStorageSync('video');
      let newVideo=[];
      video.some((v,i)=>{
        this.Num(v);
        newVideo.push(v)
        if(i==currentNo){
          return true;
        }
      })
       setTimeout(() => {
        this.setData({
          video:newVideo,
          currentNo
      })
       }, 1000);
    }
    else{
      wx.showToast({
        icon:'error',
        title: '已经是最新数据了'
      })
    }
  }
})