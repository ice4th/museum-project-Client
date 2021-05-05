import _axios from 'axios'

/** @type {{instance: import('axios').AxiosInstance}} */
const axios = { instance: null }

export const createInstance = ({ store, redirect }) => {
  const instance = _axios.create({
    baseURL: process.env.endpoint,
  })

  // instance.interceptors.request.use((config) => {
  //   if (store.state.user.data) {
  //     config.headers = {
  //       Authorization: `Bearer ${store.state.user.data.token}`,
  //     }
  //   }

  //   return config
  // })

  axios.instance = instance
}


export default axios
