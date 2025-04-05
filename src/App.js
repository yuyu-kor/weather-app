import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자마자 현재 위치 기반 날씨가 보임
// 2. 날씨 정보에는 도시,섭씨,화씨,날씨상태 정보가 들어감
// 3. 5개의 버튼이 있음 (1: 현재위치, 4: 다른도시)
// 4. 도시 버튼 클릭할 때마다 도시별 날씨 나옴
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나옴
// 6. 데이터를 들고 오는 동안 로딩 스피너가 돔

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
console.log("API_KEY", API_KEY);

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const cities = ["florida", "london", "osaka", "moscow"];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&&units=metric`;
    try {
      setLoading(true);
      let response = await fetch(url);
      if (!response.ok) throw new Error("현재 위치 날씨 정보를 불러오는 데 실패했습니다.");
      // !response.ok 는 200(성공) 제외한 404,500 에러가 났을 때임 / ok가 200
      let data = await response.json();
      setWeather(data);
    } catch (err) {
      console.err("현재 위치 에러:", err.message);
      alert("현재 위치 날씨 정보를 불러오지 못했어요.")
    } finally {
      setLoading(false);
    }
    
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&&units=metric`;
    try {
      setLoading(true);
      let response = await fetch(url);
      if (!response.ok) throw new Error("도시 날씨 정보를 불러오는 데 실패했습니다.");
      let data = await response.json();
      setWeather(data);
    }catch (err) {
      console.err("도시 에러:", err.message);
      alert("선택한 도시의 날씨 정보를 가져오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  const handleCityClick = (cityName) => {
    setCity(cityName);
    setSelectedCity(cityName);
  };
  
  const handleCurrentLocation = () => {
    setCity("");
    setSelectedCity("current"); // current 라는 임의의 값으로 표시
    getCurrentLocation();
  };

  return (
    <div>
      <div>
        {loading ? (
          <div className="container">
            <ClipLoader color="#fff" loading={loading} size={200} />
          </div>
        ) : (
          <div className="container">
            <WeatherBox weather={weather} />
            <WeatherButton cities={cities} setCity={handleCityClick} handleCurrentLocation={handleCurrentLocation} selectedCity={selectedCity} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
