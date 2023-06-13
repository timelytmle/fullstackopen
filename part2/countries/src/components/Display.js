const Display = ({displayedCountries, showCountry, isShowSingle, shownCountryValue, weather}) => {
    if (isShowSingle === false) {
        if (displayedCountries.length === 0) { 
            return null
        }
        
        else if (displayedCountries.length === 1) {
            return (
                <div>
                    <h1>{displayedCountries[0].name.common}</h1>
                    <p>Captial: {displayedCountries[0].capital}</p>
                    <p>Area: {displayedCountries[0].area}</p>
                    <h2>languages</h2>
                    {Object.entries(displayedCountries[0].languages).map(([key, value]) => {
                        return (
                            <li key={key}>{value}</li>
                        )
                    })}
                    <img src={displayedCountries[0].flags.png} alt={displayedCountries[0].flags.alt}/>
                    <h2>Weather in {displayedCountries[shownCountryValue].capital}</h2>
                    <p>temperature {weather.main.temp} Celcius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon"/>
                    <p>wind {weather.wind.speed} m/s</p>
                </div>
            )
        }
        
        else if (displayedCountries.length <= 10) {
            return (
                displayedCountries.map((countries, index) => <li key={countries.ccn3}>{countries.name.common} <button onClick={() => showCountry(index)}>show</button></li>)
            )
        }
        
        else {
            return (
                <p>Too many matches, specify another filter</p>
            )
        }
    }
    
    else {
        return (
            <div>
                <h1>{displayedCountries[shownCountryValue].name.common}</h1>
                <p>Captial: {displayedCountries[shownCountryValue].capital}</p>
                <p>Area: {displayedCountries[shownCountryValue].area}</p>
                <h2>languages</h2>
                {Object.entries(displayedCountries[shownCountryValue].languages).map(([key, value]) => {
                    return (
                        <li key={key}>{value}</li>
                    )
                })}
                <img src={displayedCountries[shownCountryValue].flags.png} alt={displayedCountries[shownCountryValue].flags.alt}/>
                <h2>Weather in {displayedCountries[shownCountryValue].capital}</h2>
                <p>temperature {weather.main.temp} Celcius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon"/>
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        )
    }
}

export default Display