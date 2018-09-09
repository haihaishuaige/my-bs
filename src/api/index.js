import axios from 'axios'
const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL
// --------------登陆
export const login = (params) => {
  return axios.post('login', params).then((res) => {
    return res.data
  })
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  var mytoken = JSON.parse(localStorage.getItem('mytoken'))
  if (mytoken) {
    // 将请求头加上token
    config.headers['Authorization'] = mytoken.token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 用户数据；列表
export const getAllUserData = (params) => {
  return axios.get('users', {params: params}).then((res) => {
    return res.data
  })
}
// 添加用户
export const addUsers = (params) => {
  return axios.post('users', params).then(res => {
    return res.data
  })
}
// 编辑用户
export const editUsers = (params) => {
  return axios.put(`users/${params.id}`, params).then(res => {
    return res.data
  })
}
// 删除用户
export const delUsers = (id) => {
  return axios.delete(`users/${id}`).then(res => {
    return res.data
  })
}
// 修改用户状态
export const statUsers = (params) => {
  return axios.put(`users/${params.id}/state/${params.mg_state}`).then(res => {
    return res.data
  })
}
// 获取角色列表数据
export const getGuanLiUserData = () => {
  return axios.get('roles').then((res) => {
    return res.data
  })
}
// 授权角色管理
export const UsersJueSe = (params) => {
  return axios.put(`users/${params.id}/role`, params).then(res => {
    return res.data
  })
}
// 获取角色列表数据
export const getRightData = (params) => {
  return axios.get(`rights/${params}`).then((res) => {
    return res.data
  })
}
// 获取角色权限数据
export const getRoleData = () => {
  return axios.get('roles').then(res => {
    return res.data
  })
}
// 删除角色权限
export const delRoleData = (roleId, rightId) => {
  return axios.delete(`roles/${roleId}/rights/${rightId}`).then(res => {
    return res.data
  })
}
// 修改用户权限
export const editRoleData = (roleId, rids) => {
  return axios.post(`roles/${roleId}/rights`, {rids: rids}).then(res => {
    return res.data
  })
}
// 修改用户权限
export const addRoleData = (params) => {
  return axios.post('roles', params).then(res => {
    return res.data
  })
}
// 删除角色
export const delRoleJueSeData = (id) => {
  return axios.delete(`roles/${id}`).then(res => {
    return res.data
  })
}
// 修改角色
export const editRoleJueSe = (params) => {
  return axios.put(`roles/${params.id}`, params).then(res => {
    return res.data
  })
}
// 获取左边菜单列表数据
export const getMenusData = (params) => {
  return axios.get('menus').then((res) => {
    return res.data
  })
}
// 获取categories列表数据
export const getCategoriesData = (params) => {
  return axios.get('categories', {params: {'type': params}}).then((res) => {
    return res.data
  })
}
