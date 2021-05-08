import axios from './_axios'

export function getDoner() {
  return axios.instance.get(`/api/doner/visitor`)
}

export function getDonerById(id) {
  return axios.instance.get(`/api/doner/${id}`)
}

export function addDoner(data) {
  return axios.instance.post(`/api/doner`, data, {
    'Content-Type': 'multipart/form-data',
  })
}

export function putDoner(donerIn) {
  return axios.instance.put(`/api/doner`, donerIn, {
    headers: {"Access-Control-Allow-Origin": "*"},
    'Content-Type': 'multipart/form-data',
  })
}

// export function putDoner(id) {
//   return axios.instance.get(`/api/doner/test/${id}` )
// }

export function deleteDoner(id) {
  return axios.instance.delete(`/api/doner/${id}`)
}

