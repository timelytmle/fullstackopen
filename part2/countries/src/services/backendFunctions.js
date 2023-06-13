import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const api_key = process.env.REACT_APP_API_KEY

const getAll = (countryName) => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getWeather = (lat, lng) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`
    const request = axios.get(weatherUrl)
    return request.then(response => response.data)
}

const exportedObject = {
    getAll,
    getWeather
}

export default exportedObject