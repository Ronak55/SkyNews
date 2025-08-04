// config/env.ts
import Constants from 'expo-constants';

export const OPENWEATHER_API_KEY = Constants?.expoConfig?.extra?.OPENWEATHER_API_KEY || '';
export const NEWS_API_KEY = Constants.expoConfig?.extra?.NEWS_API_KEY || '';
