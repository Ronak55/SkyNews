// services/weatherService.ts
import axios from 'axios';
import { OPENWEATHER_API_KEY, OPEN_WEATHER_BASE_URL } from './apiConfig';

export type WeatherCondition = 'hot' | 'cold' | 'cool';

export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

export interface ForecastItem {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}

export const fetchCurrentWeather = async (
  lat: number,
  lon: number,
  units: 'metric' | 'imperial' = 'metric'
): Promise<WeatherResponse> => {
  try {
    const response = await axios.get(`${OPEN_WEATHER_BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error fetching weather:', error?.response || error);
    throw new Error('Failed to fetch weather data.');
  }
};

export const fetchFiveDayForecast = async (
  lat: number,
  lon: number,
  units: 'metric' | 'imperial' = 'metric'
): Promise<ForecastItem[]> => {
  const response = await axios.get(`${OPEN_WEATHER_BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      appid: OPENWEATHER_API_KEY,
      units,
    },
  });

  const allItems = response.data.list as ForecastItem[];
  const dailyForecast = allItems.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);
  return dailyForecast;
};

export const classifyWeather = (temp: number): WeatherCondition => {
  if (temp <= 10) return 'cold';
  if (temp >= 30) return 'hot';
  return 'cool';
};
