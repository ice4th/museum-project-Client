import axios from './_axios'

export function getAnimal() {
  return axios.instance.get(`/api/animal/visitor`)
}

export function getAnimalById(id) {
  return axios.instance.get(`/api/animal/${id}`)
}

export function addAnimal(data) {
  return axios.instance.post(`/api/animal`, data, {
    'Content-Type': 'multipart/form-data',
  })
}

export function putAnimal(boneFile) {
  return axios.instance.put(`/api/animal/upload-bone`, boneFile, {
    'Content-Type': 'multipart/form-data'
  })
}

export function deleteAnimal(id) {
  return axios.instance.delete(`/api/animal/${id}`)
}
