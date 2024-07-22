import React, { useState } from 'react';
import style from './weather.module.css';
import clear from '../Assets/clear.png';
import cloud from '../Assets/cloud.png';
import drizzle from '../Assets/drizzle.png';
import humidity from '../Assets/humidity.png';
import rain from '../Assets/rain.png';
import search_icon from '../Assets/search.png';
import snow from '../Assets/snow.png';
import wind from '../Assets/wind.png';

const Weather = () => {

    const [inputValue, setInputValue] = useState('');
    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow
    }
    const search = async (city) => {
        if (city === "") {
            alert('Enter city name');
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a80e7fc66a2d57412e094489b9b1467b`;

            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                setInputValue('');
                return;
            }
            console.log(data);

            const icon = allIcons[data.weather[0].icon] || clear;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        }
        catch (error) {
            console.error('Error in fetching weather data\n', error);
            setInputValue('');
        }
        setInputValue('');
    };


    return (
        <div className={style.container}>

            <h1 className={style.heading}>Weather App</h1>
            <div className={style.underline}></div>

            <div className={style.search_bar}>
                <input type="text" placeholder='Enter city name' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <img src={search_icon} alt="Search" onClick={() => search(inputValue)} />
            </div>

            <img src={weatherData.icon} alt="Clear" className={style.weather_icon} />
            <p className={style.temperature}>{weatherData.temperature}°c</p>
            <p className={style.location}>{weatherData.location}</p>

            <div className={style.weather_data}>

                <div className={style.col}>
                    <img src={humidity} alt="Humidity" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>

                <div className={style.col}>
                    <img src={wind} alt="Humidity" />
                    <div>
                        <p>{weatherData.windSpeed} km/hr</p>
                        <span>Wind speed</span>
                    </div>
                </div>

            </div>

        </div>

    );
};

export default Weather;