import axios from './_axios'

export function getOrgan() {
  return axios.instance.get(`/api/organ/visitor`)
}

export function getOrganById(id) {
  return axios.instance.get(`/api/organ/${id}`)
}

export function putOrgan(file) {
  return axios.instance.put(`/api/organ/upload-organ` , file , {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    )
  }

