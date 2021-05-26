import axios from './_axios'

export function getNews() {
  return axios.instance.get(`/api/news/visitor`)
}

export function getNewsById(id) {
  return axios.instance.get(`/api/news/${id}`)
}

export function addNews(data) {
  return axios.instance.post(`/api/news`, data, {
    'Content-Type': 'multipart/form-data',
  })
}

export function putNews(data) {
  return axios.instance.put(`/api/news`, data, {
    'Content-Type': 'multipart/form-data',
  })
}

export function deleteNews(id) {
  return axios.instance.delete(`/api/news/${id}`)
}


