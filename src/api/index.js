import axios from 'axios'
const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL
// --------------登陆
export const login = (params) => {
  return axios.post('login', params).then((res) => {
    return res.data
  })
}
