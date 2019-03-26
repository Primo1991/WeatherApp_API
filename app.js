window.addEventListener('load', () => {

    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/62a43f4b1513228ac405c956cd30aab6/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;
                    // Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;


                    // Formula for celsius
                    let celsius = (temperature - 32) * (5 / 9).toFixed(1);
                    //Set Icon
                    setIcons(icon, document.querySelector('#icon'));
                    //Set Watch
                    (function () {
                        var saat = document.querySelector('.watch');
                        // 2:12:4 => 02:12:04 oluyor.
                        var ekstraSifir = function (x) {
                            return x < 10 ? '0' + x : x;
                        };

                        var tiktak = function () {
                            var d = new Date();
                            var h = ekstraSifir(d.getHours());
                            var m = ekstraSifir(d.getMinutes());
                            var s = ekstraSifir(d.getSeconds());
                            var current_time = [h, m, s].join(':');
                            saat.innerHTML = current_time;
                        };

                        tiktak();

                        // Calling ticktock() every 1 second
                        setInterval(tiktak, 1000);
                    }());
                    // Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "°F") {
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = celsius.toFixed();
                        } else {
                            temperatureSpan.textContent = "°F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });

    } else {
        h1.textContent = 'Hey, this is not working beacuse your location allowance is switch off.'
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: 'white'
        });
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});