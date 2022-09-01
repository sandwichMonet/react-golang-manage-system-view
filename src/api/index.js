import { request } from '@/utils'

// 登录
export const login = (mobile, code) =>
  request({
    url: 'http://geek.itheima.net/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })

// 获取用户信息
export const getUserInfo = () =>
  request({
    url: '/user/profile',
    method: 'GET'
  })

// 获取频道列表
export const getChannels = () =>
  request({
    url: '/channels',
    method: 'GET'
  })

// 获取文章表格数据
export const getArticles = params =>
  request({
    url: '/mp/articles',
    method: 'GET',
    params
  })

// 删除指定文章
export const deleteArticle = id =>
  request({
    url: `/mp/articles/${id}`,
    method: 'DELETE'
  })

// 发布文章
export const getPublishParams = params =>
  request({
    url: `/mp/articles?draft=false`,
    method: 'POST',
    params
  })

// 根据id参数获取某一个文章信息
export const getArticle = id =>
  request({
    url: `/mp/articles/${id}`,
    method: 'GET'
  })
