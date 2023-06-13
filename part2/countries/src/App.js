import { useState, useEffect } from 'react'
import backendService from './services/backendFunctions'
import Display from './components/Display'
import Filter from './components/Filter'

const App = () => {
  const [filterName, setFilterName] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [isShowCountry, setShowCountry] = useState(false)
  const [showCountryVal, setShowCountryVal] = useState(0)
  const [capitalLatLng, setCapitalLatLng] = useState({lat:0, lng:0})
  const [capitalWeather, setCapitalWeather] = useState({})
  const [oneCountry, setOneCountry] = useState(false)
  
  useEffect(() => {
    backendService
    .getAll()
    .then(response => {  
      setAllCountries(allCountries.concat(response))
    })
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    backendService
    .getWeather(capitalLatLng.lat, capitalLatLng.lng)
    .then(response => {  
      setCapitalWeather(response)
    })
  },[capitalLatLng]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilter = (event) => {
    setFilterName(event.target.value)
    setShowCountry(false)
    setShowCountryVal(0)
    setOneCountry(false)
  }
  const showCountry = (value) => {
    setShowCountry(true)
    setShowCountryVal(value)
    setCapitalLatLng({lat:filteredCountries[value].capitalInfo.latlng[0],lng:filteredCountries[value].capitalInfo.latlng[1]})
  }

  const filteredCountries = filterName.length > 0 
  ? allCountries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase())) 
  : []

  if (filteredCountries.length === 1 && oneCountry !== true) {
    setOneCountry(true)
    setCapitalLatLng({lat:filteredCountries[0].capitalInfo.latlng[0],lng:filteredCountries[0].capitalInfo.latlng[1]})
  }

  return(
    <div>
      <Filter valueVar={filterName} changeHandler={handleFilter} />
      <Display displayedCountries={filteredCountries} showCountry={showCountry} isShowSingle={isShowCountry} shownCountryValue={showCountryVal} weather={capitalWeather}/>
    </div>
  )
}

export default App;
