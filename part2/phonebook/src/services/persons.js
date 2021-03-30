import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const requset = axios.get(baseUrl)
  return requset.then(response => response.data)
}

const createItem = newObject => {
  const requset = axios.post(baseUrl, newObject)
  return requset.then(response => response.data)
}

const personService = { getAll, createItem }

export default personService