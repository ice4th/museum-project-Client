import axios from './_axios'

export function getAnimal() {
  return axios.instance.get(`/api/animal/visitor`)
}

export function getAnimalById(id) {
  return axios.instance.get(`/api/animal/${id}`)
}

export function putAnimal(file) {
  return axios.instance.put(`/api/animal/upload-bone`, file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  )
}
