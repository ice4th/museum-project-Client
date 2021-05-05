import axios from './_axios'

export function getAnimalType() {
  return axios.instance.get(`/api/animalType/visitor`)
}

export function getAnimalTypeById(id) {
  return axios.instance.get(`/api/animalType/${id}`)
}


