// pages/music_detail/music_detail.js
let app=getApp();
const backAudioManager=wx.createInnerAudioContext()
app.backAudioManager=backAudioManager;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    currentIndex:0,
   "Detail":[],
  top:0,
  state:true,
  "newList":[
    {
        "id":0,
        "name":"我怕来者不是你 (dj版)",
        "author":"小蓝背心",
        "src":"http://y.gtimg.cn/music/photo_new/T002R300x300M000003yMlDs4YjY79_2.jpg",
        "audio":"http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400004XMkMK2PRp2d.m4a?guid=1874938434&vkey=E90EF3F102F89EB63E8F9E87DCB15222284A5436000A790ACF1A100A289B6863E8CC057A5D191A06FE5896A49744242A73CFE06E11A353CA&uin=1657447830&fromtag=38",
        "value": "[ti:我怕来者不是你]\n[ar:小蓝背心]\n[al:我怕来者不是你]\n[by:xiongyao_karakal]\n[offset:0]\n[00:00.00]我怕来者不是你 (dj版) - 小蓝背心\n[00:00.16]词：Seven@幻乐星球\n[00:00.24]曲：孙成龙@幻乐星球\n[00:00.34]编曲：LilXi\n[00:00.38]和声：妙机\n[00:00.43]混音：LilXi\n[00:00.46]统筹：代不困\n[00:00.52]监制：何湲\n[00:00.57]出品：飞行计划/讯飞音乐\n[00:00.75]推广策划：扭湃哇音乐\n[00:00.84]营销推广：扭湃哇音乐/噼里啪啦Studio\n[00:00.97]发行：扭湃哇音乐\n[00:01.05][未经著作权人书面许可，不得以任何方式（包括翻唱、翻录等）使用]\n[00:01.36]『酷狗音乐人 • 星曜计划』\n[00:01.87]怕无归期 怕空欢喜\n[00:05.41]怕来的不是你\n[00:07.20]怕没有奇迹\n[00:08.67]\n[00:09.17]等风吹尽 等雨过季后\n[00:13.60]等你与我的下次相遇\n[00:16.79]怕无归期 怕会犹豫\n[00:20.51]怕来的不是你\n[00:22.15]怕没有结局\n[00:24.33]等风吹尽 等雨过季后\n[00:27.92]再相遇\n[00:30.72]\n[00:32.78]盛夏看不见雪景\n[00:35.41]\n[00:37.00]太阳等不到星星\n[00:38.71]\n[00:40.59]我在街角等着你\n[00:42.71]就花光了勇气\n[00:45.48]\n[00:48.21]候鸟向南方迁徙\n[00:50.58]\n[00:51.69]北国披上了白衣\n[00:54.48]深冬的美好光景\n[00:56.67]却没有你的踪迹\n[01:00.69]\n[01:01.80]怕无归期 怕空欢喜\n[01:05.43]怕来的不是你\n[01:07.28]怕没有奇迹\n[01:09.34]等风吹尽 等雨过季后\n[01:13.29]\n[01:13.83]等你与我的下次相遇\n[01:16.90]怕无归期 怕会犹豫\n[01:20.47]怕来的不是你\n[01:22.19]怕没有结局\n[01:23.60]\n[01:24.28]等风吹尽 等雨过季后\n[01:27.91]再相遇\n[01:30.09]\n[01:33.18]盛夏看不见雪景\n[01:35.73]\n[01:36.92]太阳等不到星星\n[01:39.18]\n[01:40.47]我在街角等着你\n[01:42.76]就花光了勇气\n[01:45.72]\n[01:48.21]候鸟向南方迁徙\n[01:50.53]\n[01:51.87]北国披上了白衣\n[01:54.41]深冬的美好光景\n[01:56.67]却没有你的踪迹\n[02:00.91]\n[02:01.86]怕无归期 怕空欢喜\n[02:05.47]怕来的不是你\n[02:07.24]怕没有奇迹\n[02:08.70]\n[02:09.27]等风吹尽 等雨过季后\n[02:13.61]等你与我的下次相遇\n[02:16.86]怕无归期 怕会犹豫\n[02:20.44]怕来的不是你\n[02:22.24]怕没有结局\n[02:24.39]等风吹尽 等雨过季后\n[02:28.11]再相遇"
    },
    {
        "id":1,
        "name":"踏山河",
        "author":"七叔（叶泽浩)",
        "src": "http://y.gtimg.cn/music/photo_new/T002R300x300M000000LNpPn0efhTG_2.jpg",
        "audio":"http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400004XMkMK2PRp2d.m4a?guid=1874938434&vkey=E90EF3F102F89EB63E8F9E87DCB15222284A5436000A790ACF1A100A289B6863E8CC057A5D191A06FE5896A49744242A73CFE06E11A353CA&uin=1657447830&fromtag=38"
    },
    {
        "id": 2,
        "name": "晴天",
        "author": "周杰伦",
        "src": "http://y.gtimg.cn/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg",
        "audio":"http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400004XMkMK2PRp2d.m4a?guid=1874938434&vkey=E90EF3F102F89EB63E8F9E87DCB15222284A5436000A790ACF1A100A289B6863E8CC057A5D191A06FE5896A49744242A73CFE06E11A353CA&uin=1657447830&fromtag=38"
    }],
    "TotalsongSheet":[
      {
          "id":0,
          "title": "欧美流行:潮爆你的耳膜",
          "cover": "http://qpic.y.qq.com/music_cover/zqUicMhhFIzl6mcGoic3gqcXMIMMHS8vJib0RTp4t3LswYJxwSULWjibjS2SnCYIOTp1/300?n=1",
          "cnt": 9143373
      },
      {
          "id":1,
          "title":"深情翻唱：无一是你，无一不是你",
          "cover": "http://qpic.y.qq.com/music_cover/PoA7Tqlia19ic1wSib27r9hjUw7Er8icsKAhu30nNMibd43icUuW6zVX3NPA/300?n=1",
          "cnt": 15940644
      },
      {
          "id":2,
          "title": "『b站阿婆主』宝藏神曲无限循环",
          "cover": "http://qpic.y.qq.com/music_cover/teNC3ZiaQKialg3foOIzDfLEf5GrWUPEgs8U1L020700QiaJR6rsUwgibw/300?n=1",
          "cnt": 20062956
      },
      {
          "id":3,
          "title": "脸红警告·宝藏rapper的撩人情话",
          "cover": "http://qpic.y.qq.com/music_cover/FZN9m5MCZXiaJfw00k0CyQmmibo80oNRCHrOPbYibTjYw9rHHy4lqk86A/300?n=1",
          "cnt": 5069445
      },
      {
          "id":4,
          "title": "柔情嘻哈：藏在说唱里的爱恋气息",
          "cover": "http://qpic.y.qq.com/music_cover/o7fIFKCWGAfN5D0ibqX6xGJzgYfQSRrOsf6dVQbdMm3lIic8n4chjxKQ/300?n=1",
          "cnt": 365559
      },
      {
          "id":5,
          "title": "华语杂货铺：哪首是你的单曲循环",
          "cover": "http://qpic.y.qq.com/music_cover/faXur0HIQb1zd5MQVPl98S1mgheiaUcaic6PEgL4NCAg93eGFpDzp6aw/300?n=1",
          "cnt": 7456267
      }
  ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let Detail=wx.getStorageSync('list');
    Detail.map((v,i)=>{
      if(options.id==i){
        let value=v.value.split("\n");
        let newValue=[]
        value.map((v,i)=>{
          var t = v.substring(v.indexOf("[") + 1, v.indexOf("]"));
          let time=(t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3)
          if(time=="NaN"){
          }else{
            newValue.push({
              t: time,
            c: v.substring(v.indexOf("]") + 1, v.length)
            })
          }
        })
        wx.setStorageSync("Detail", v);
        v.value=newValue;
        this.setData({
          Detail:v,
          top:wx.getSystemInfoSync()['statusBarHeight']+'px'
        })
      }  
  })
  },
  onReady: function (e) {
    backAudioManager.src=this.data.Detail.audio;
    backAudioManager.autoplay=true;
    backAudioManager.loop=true;
    wx.setStorageSync("state", true);
  },
 OnShow: function (){

 },
  handleLyric(){
    console.log(1);
  },
  onPageScroll(e){
    let timer=null;
    if(timer){
      clearTimeout(timer);
    }
    timer=setTimeout(()=>{
      console.log(e.scrollTop);
      if(e.scrollTop>70){
        this.setData({
          hidden:false
        })
      }
      else{
        this.setData({
          hidden:true
        })
      }
    },200)
  },
 
  play(){
    let state=wx.getStorageSync('state')
    if(state){
      backAudioManager.pause()
      wx.setStorageSync("state", false);
      this.setData({
        state:false
      })
    }
    else{
      backAudioManager.play()
      this.setData({
        state:true
      })
      wx.setStorageSync("state", true);  
    }
  },
  hanleReturn(){
    wx.navigateBack({
      delta: 0
    });
  },
  hanleIndex(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  last(){
    console.log("歌曲跳转");
  }
})