const inputBox = document.getElementById('input-box')
const searchBtn = document.getElementById('search-button')
const weatherBody = document.getElementById('weather-body')
const Location = document.getElementById('location')
const weatherImg = document.getElementById('weather-image')
const temperature = document.getElementById('temperature')
const feelsLike = document.getElementById('feels-like')
const description = document.getElementById('description')
const humidity = document.getElementById('humidity')
const windSpeed = document.getElementById('wind-speed')
const forecast = document.getElementById('forecast')
const LocationNotFound = document.querySelector('.location-not-found')
const temperatureBox = document.querySelector('.temperature')



async function getWeather(city) {
    const api_key = '82e35c4101a04007997181842232312'
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}`
    const weatherData = await fetch(url).then((request)=>{
        return request.json()
    })

    if(weatherData.error) {
        LocationNotFound.style.display = 'flex';
        weatherBody.style.display = 'none'
        forecast.style.display = 'none'
        inputBox.value = ''
        inputBox.blur()
        return
    }
    console.log(weatherData)
    
    LocationNotFound.style.display = 'none';
    weatherBody.style.display = 'flex'
    forecast.style.display = 'flex'

    Location.innerHTML = "<i class='fa-solid fa-location-dot'></i> "+weatherData.location.name + ", " + weatherData.location.region + ", " + weatherData.location.country

    weatherImg.src = weatherData.current.condition.icon

    temperature.innerHTML = Math.round(weatherData.current.temp_c) + "°C"

    feelsLike.innerHTML = `(Feels like ${Math.round(weatherData.current.feelslike_c)}°C)`

    temperatureBox.style.left = `${(feelsLike.offsetWidth)/2}px`

    description.innerHTML = weatherData.current.condition.text

    humidity.innerHTML = weatherData.current.humidity+"%"

    windSpeed.innerHTML = Math.round(weatherData.current.wind_kph)+" Km/H"

    const currTime = Number.parseInt(weatherData.current.last_updated.substring(11,13))

    inputBox.value = ''
    inputBox.blur()

    forecast.innerHTML = ''
    
    for(let i = currTime+1; i < 24; i+= 3) {
        let p_time = document.createElement('p')
        if(i < 12) {
            p_time.innerHTML = i+ " AM"
        }
        else if(i == 12) {
            p_time.innerHTML = "12 PM"
        }
        else{
            p_time.innerHTML = i-12 + " PM"
        }

        let img = document.createElement('img')
        img.src = weatherData.forecast.forecastday[0].hour[i].condition.icon

        let innerDiv = document.createElement('div')

        let p_rain = document.createElement('p')

        p_rain.innerHTML = weatherData.forecast.forecastday[0].hour[i].chance_of_rain+"%"

        innerDiv.innerHTML = "<i class='fa-solid fa-cloud-rain'></i>"+p_rain.outerHTML

        let div = document.createElement('div')
        div.classList.add('forecast')
        div.appendChild(p_time)
        div.appendChild(img)
        div.appendChild(innerDiv)
        forecast.appendChild(div)
       
    }
}

searchBtn.addEventListener('click',()=>{
    getWeather(inputBox.value)
})

inputBox.addEventListener('keypress',(e)=>{
    if(e.key == 'Enter') {
        getWeather(inputBox.value)
    }
})
