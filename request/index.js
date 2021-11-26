/*
 * @Description:封装网络请求
 * @Author: RyangXie
 * @Date: 2021-11-24 15:03:53
 * @LastEditTime: 2021-11-26 14:23:22
 * @LastEditors: RyangXie
 * @Reference:
 */

export const request = (params) => {
  // 定义公共的url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
