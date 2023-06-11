import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteObj = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    console.log('delete', request)
    return request
}

const update = (newObject) => {
    const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
    console.log('update', request)
    return request
}

const exportedObject = {
    getAll,
    create,
    deleteObj,
    update
}

export default exportedObject