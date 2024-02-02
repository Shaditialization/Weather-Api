// Today variables 
let todayName = document.getElementById("today_date_day_name")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_month")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayConditionImg = document.getElementById("today_condition_img")
let todayConditionText = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")

// next data 
let nextDay = document.getElementsByClassName("next_day_name")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextConditionImg = document.getElementsByClassName("next_condition_img")
let nextConditionText = document.getElementsByClassName("next_condition_text")

// Search input
let searchInput = document.getElementById('search')


// Fetch API Data (WHY!!)
// async function getWeatherData(){
//     var weatherResponse = await fetch("http://api.weatherapi.com/v1/search.json?key=b342e5dacf194c209a6130722231910&q=lond");
//     console.log(weatherResponse);
//     var weatherData = await weatherResponse.json();
//     console.log(weatherData);
// }
// getWeatherData();
async function getWeatherData(cityName){
    var weatherResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b342e5dacf194c209a6130722231910&q=${cityName}&days=3`);
    var weatherData = await weatherResponse.json();
    return weatherData
}

// Display today data
function displayTodayData(data){
    var todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US" , {weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-us" , {month:"long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src" , `https:${data.current.condition.icon}`)  
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
}


// Display next days data
function displayNextData(data){

    var forecastData = data.forecast.forecastday
    for(let i=0; i<2; i++){
        var nextDate = new Date(forecastData[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US" , {weekday:"long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c     //دههه
        nextConditionImg[i].setAttribute("src" , `https:${forecastData[i+1].day.condition.icon}`)  // دههه
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
    }
}



// Start app (tagmee3 kol el function's calls fe func w7da)
async function startApp(city="london"){
    var weatherData = await getWeatherData(city)
    if(!weatherData.error)
    {
        displayTodayData(weatherData);
        displayNextData(weatherData);
    }
    
}
startApp();


searchInput.addEventListener("input" , function(){
    startApp(searchInput.value)
})