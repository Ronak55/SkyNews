import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getCurrentLocation } from "../utils/getCurrentLocation";
import {
  fetchCurrentWeather,
  classifyWeather,
  WeatherResponse,
  ForecastItem,
  fetchFiveDayForecast,
} from "../services/weatherService";
import {
  fetchTopHeadlines,
  filterNewsByWeather,
  NewsArticle,
} from "../services/newsService";
import { useAppContext } from "../contexts/AppContext";

interface UseWeatherNewsResult {
  unit: "metric" | "imperial";
  weather: WeatherResponse | null;
  forecast: ForecastItem[];
  news: NewsArticle[];
  weatherLoading: boolean;
  newsLoading: boolean;
  reload: () => void;
}

export const useWeatherNews = (): UseWeatherNewsResult => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const { selectedCategories, unit } = useAppContext();

  const fetchWeather = async () => {
    setWeatherLoading(true);
    try {
      const location = await getCurrentLocation();
      const weatherData = await fetchCurrentWeather(
        location.latitude,
        location.longitude,
        unit
      );
      setWeather(weatherData);
      const forecastData = await fetchFiveDayForecast(
        location.latitude,
        location.longitude,
        unit
      );
      setForecast(forecastData);
    } catch (error: any) {
      Alert.alert(
        "Weather Error",
        error.message || "Could not fetch weather data."
      );
    } finally {
      setWeatherLoading(false);
    }
  };

  const fetchNews = async (condition: ReturnType<typeof classifyWeather>) => {
    setNewsLoading(true);
    try {
      const allNews: NewsArticle[] = [];

      for (const category of selectedCategories.length
        ? selectedCategories
        : ["general"]) {
        const newsData = await fetchTopHeadlines(category);
        console.log(
          `[fetchNews] News fetched for category "${category}":`,
          newsData.length
        );
        allNews.push(...newsData);
      }

      console.log(`[fetchNews] Total news before filtering: ${allNews.length}`);
      const filtered = filterNewsByWeather(allNews, condition);
      console.log(`[fetchNews] Final filtered news count: ${filtered.length}`);
      setNews(filtered);
    } catch (error: any) {
      Alert.alert("News Error", error.message || "Could not fetch news.");
    } finally {
      setNewsLoading(false);
    }
  };

  const loadInitialData = async () => {
    await fetchWeather();
  };

  const reload = async () => {
    const condition = classifyWeather(weather?.main?.temp ?? 0);
    await fetchNews(condition);
  };

  useEffect(() => {
    loadInitialData();
  }, [unit]);

  useEffect(() => {
    if (weather) {
      const condition = classifyWeather(weather.main.temp);
      fetchNews(condition);
    }
  }, [selectedCategories, weather]);

  return {
    unit,
    weather,
    forecast,
    news,
    weatherLoading,
    newsLoading,
    reload,
  };
};
