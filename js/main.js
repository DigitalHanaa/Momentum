// console.log("hana")

$(document).ready(function () {
    // Declartion section
    const unsplashApiKey = '';
    const watherApiKey = '';
    const icons = {
        clear: "☀",
        rain: "️🌧",
        storm: "⛈",
        snow: "🌨",
        mist: "🌫",
        clouds: "☁",
    };
    const currentTime = moment().format('LT');


    // appending html objects section
    $('body').append(`<img src=''>`)

    $('#timeContainer').append(`<h1 id="currentTime"></h1>`)
    $('#timeContainer').append(`<h2 id="currentTimeMsg"></h2>`)

    $('#quoteContainer').append(`<q id="quote"></q>`)
    $('#quoteContainer').append(`<p id="author"></p>`)


    function displayTime(currentTime){

        $("#currentTime").text(currentTime)

       if(currentTime.substring(5,7) == 'PM'){
           $("#currentTimeMsg").text("Good night")
       }
       else{
        $("#currentTimeMsg").text("Good Morning")
       }
    }

    displayTime(currentTime);
    
    // --------------- API calls ---------------------- 
    // Unsplash API
    axios({
        method: 'GET',
        url: `https://api.unsplash.com/photos/?client_id=${unsplashApiKey}`
    })
        .then(response => {
       console.log(moment().format('LTS'))
            if (response.status == 200) {
                console.log(response)
                console.log(response.data[0].urls.regular);
                $('body').css('background-image', `url(${response.data[0].urls.regular})`);

            } else {
                console.log("status is not 200")
            }
        })
        .catch(error => {
            console.log(error);
        })

    // Weather API 
    axios({
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5/weather?q=Jeddah&appid=${watherApiKey}&units=metric`
    })
        .then(response => {
            if (response.status == 200) {
                const mainWeatherStatus = (response.data.weather[0].main).toLowerCase();

                $("#weatherContainer").append(`<span>${icons[mainWeatherStatus]}</span>`)
                $("#weatherContainer").append(`<p>
                ${response.data.main.temp}
                <b>${response.data.name}</b></p>`)
                $("#weatherContainer").append(``)
                
            }
            else { 
                console.log("status is not 200")
            }
        })
        .catch(error => {
            console.log(error);
        })

        // Quotes API 
        axios({
            method: 'GET',
            url: 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'
        })
        .then(response => {
            if(response.status == 200){
                $("#quote").text(response.data.quoteText)
                $("#author").text(response.data.quoteAuthor)
            }
            else{
                console.log("status is not 200")
            }
        })
        .catch(error => {
            console.log(error);
        })


})