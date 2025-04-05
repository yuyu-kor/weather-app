import React from 'react'

const WeatherBox = ({weather}) => {
    if (!weather || !weather.main || !weather.weather) {
        return null; // 또는 return <div>Loading...</div>;
    }

    const temperature = weather.main.temp;
    const weatherDescription = weather.weather[0].description;

    const findCuteDescription = (desc) => {
        const lowerDesc = desc.toLowerCase();

        if (lowerDesc.includes("thunderstorm")) return "⛈️ 천둥 번개 조심!";
        if (lowerDesc.includes("drizzle")) return "🌦 이슬비 내려요";
        if (lowerDesc.includes("rain")) return "🌧 비 와요, 우산 챙기기!";
        if (lowerDesc.includes("snow")) return "❄️ 눈이 내려요~";
        if (lowerDesc.includes("clear")) return "☀️ 오늘은 맑고 화창해요!";
        if (lowerDesc.includes("clouds")) return "☁️ 구름이 많아요";
        if (lowerDesc.includes("mist") || desc.includes("fog") || desc.includes("haze")) 
            return "🌫 안개가 뿌옇게 껴 있어요!";

        return desc;
    };

    const cuteDescription = findCuteDescription(weatherDescription);

    return (
        <div className="weather-box">
            <div>{weather?.name}</div>
            <h2>{(weather?.main.temp).toFixed(1)}&#8451; / {((weather?.main.temp)*1.8+32).toFixed(1)}&#8457;</h2>
            <h3>{cuteDescription}</h3>
        </div>
    )
}

export default WeatherBox