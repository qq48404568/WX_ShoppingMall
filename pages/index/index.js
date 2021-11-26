/*
 * @Description: 
 * @Author: RyangXie
 * @Date: 2021-11-24 08:46:59
 * @LastEditTime: 2021-11-26 14:40:12
 * @LastEditors: RyangXie
 * @Reference: 
 */

// 引入发送请求的方法
import { request } from '../../request/index.js'
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catesList: [],
    // 楼层数据
    floorList: []
  },
  // 页面开始加载触发
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },

  // 获取轮播图数据
  getSwiperList () {
    // 1 发送异步请求获取轮播图数据
    request({ url: '/home/swiperdata' })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
  },
  // 获取 分类导航数据
  getCateList () {
    // 1 发送异步请求获取轮播图数据
    request({ url: '/home/catitems' })
      .then(result => {
        this.setData({
          catesList: result
        })
      })
  },
  // 获取楼层数据
  getFloorList () {
    // 1 发送异步请求获取轮播图数据
    request({ url: '/home/floordata' })
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  }
});
