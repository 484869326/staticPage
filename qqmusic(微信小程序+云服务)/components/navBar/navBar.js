// components/navBar/navBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    top:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
  }
})
