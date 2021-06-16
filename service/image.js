import axios from './_axios'

export function addImage(data) {
    return axios.instance.post(`/api/image`, data, {
      'Content-Type': 'multipart/form-data',
    })
  }

  export function getImage(path) {
    return axios.instance.get(`/api/image/${path}`)
  }
  // export function addImage(path) {
  //   return axios.instance.post(`/api/image/${path}
  //   }