import axios from './_axios'

export function getOrgan() {
  return axios.instance.get(`/api/organ/visitor`)
}

export function getOrganById(id) {
  return axios.instance.get(`/api/organ/${id}`)
}

export function addOrgan(data) {
  return axios.instance.post(`/api/organ`, data, {
    'Content-Type': 'multipart/form-data',
  })
}

export function putOrgan(data) {
  return axios.instance.put(`/api/organ/upload-organ`, data, {

    'Content-Type': 'multipart/form-data'
  })
}

export function deleteOrgan(id) {
  return axios.instance.delete(`/api/organ/${id}`)
}



