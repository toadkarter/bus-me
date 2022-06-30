from typing import Dict
import requests
import schedule
import environ
import os
import time

env = environ.Env()
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# Obtaining OpenWeather API key
OpenWeatherAPI_KEY = os.getenv("WEATHER_API_KEY")
OpenWeatherAPI_URL = "https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}"


# Static function for pulling information from OpenWeather API into JSON object
def pull_current_weather_from_api() -> Dict[str, str]:
    lat = 53.33947559137039
    lon = -6.248868208190408
    weather_response = requests.get(OpenWeatherAPI_URL.format(lat, lon, OpenWeatherAPI_KEY))
    print(weather_response.json())
    icon = weather_response.json()['weather'][0]['icon']
    weather = weather_response.json()['weather'][0]['main']
    temperature = weather_response.json()['main']['temp']
    return {"icon": icon, "weather": weather, "temperature": temperature}


# Class for interacting with app views
class Weather:
    def __init__(self):
        self.current_weather = pull_current_weather_from_api()

    def __set_current_weather(self) -> None:
        self.current_weather = self.get_current_weather()

    def get_current_weather(self) -> Dict[str, str]:
        return self.current_weather

    def update_current_weather(self) -> None:
        schedule.every(60).minutes.do(self.get_current_weather)


# Initialise weather object and set to update every fixed time period
# current_weather = Weather()
# current_weather.update_current_weather()
