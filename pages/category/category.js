import { request } from '../../request/index.js'
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 被点击左侧的菜单
    currentIndex: 0,
    // 右侧内容滚动条距离顶部的距离
    scrollTop:0,
    // 接口的返回数据
    Cates: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates()
    // 1 获取本地存储中的数据
    const Cates = wx.getStorageSync('cates');
    // 2 判断
    if (!Cates) {
      // 不存在 发送请求获取数据
      this.getCates()
    } else {
      // 有旧的数据 定义过期时间
      if (Date.now() - Cates.time > 1000 * 10) {
        // 重新发送请求
        this.getCates()
      } else {
        // 可以使用旧的数据
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        // 构造右侧的商品数据
        let rightContent = this.Cates[0].children
        // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
        this.setData({
          leftMenuList,
          rightContent,
        })    
      }
    }

  },
  // 获取分类数据
  getCates () {
    request({
      url: '/categories'
    }).then(res => {
      this.Cates = res
      // 把接口的数据存入到本地存储中
      wx.setStorageSync('cates', { time: Date.now(), data: this.Cates });

      // 解构左侧大菜单数据
      let leftMenuList = this.Cates.map(v => v.cat_name)
      // 构造右侧的商品数据
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  // 左侧菜单的点击事件
  handleItemTap (e) {
    const { index } = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop:0
    })
  }
})