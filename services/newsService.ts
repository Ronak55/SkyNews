// services/newsService.ts
import axios from 'axios';
import { NEWS_API_KEY, NEWS_API_BASE_URL } from './apiConfig';
import { WeatherCondition } from './weatherService';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export const fetchTopHeadlines = async (
  category: string = 'general',
  country: string = 'us'
): Promise<NewsArticle[]> => {
  try {
    const response = await axios.get<NewsApiResponse>(`${NEWS_API_BASE_URL}/top-headlines`, {
      params: {
        apiKey: NEWS_API_KEY,
        category,
        country,
        pageSize: 30,
      },
    });

    console.log(`[fetchTopHeadlines] Category: ${category}, Articles fetched: ${response.data.articles.length}`);
    return response.data.articles;
  } catch (error: any) {
    console.error('Error fetching news:', error?.response || error);
    throw new Error('Failed to fetch news headlines.');
  }
};


export const filterNewsByWeather = (
  articles: NewsArticle[],
  weather: WeatherCondition
): NewsArticle[] => {
  const keywordsMap = {
  cold: [
    'death', 'crisis', 'loss', 'conflict', 'tragedy', 'accident',
    'inflation', 'recession', 'protest', 'drought', 'flood', 'struggle', 'violence'
  ],
  hot: [
    'fear', 'threat', 'attack', 'violence', 'terror', 'war',
    'danger', 'explosion', 'shooting', 'fire', 'assault', 'panic', 'riot'
  ],
  cool: [
    'win', 'success', 'celebrate', 'happiness', 'award', 'joy',
    'progress', 'peace', 'growth', 'love', 'achievement', 'victory', 'inspiration', 'innovation'
  ],
};
  const keywords = keywordsMap[weather];

  console.log(`[filterNewsByWeather] Weather condition: ${weather}`);
  console.log(`[filterNewsByWeather] Keywords used: ${keywords.join(', ')}`);
  console.log(`[filterNewsByWeather] Total articles before filtering: ${articles.length}`);

  const filtered = articles.filter(article => {
    const text = `${article.title} ${article.description || ''}`.toLowerCase();
    return keywords.some(k => text.includes(k));
  });

  console.log(`[filterNewsByWeather] Filtered articles count: ${filtered.length}`);

  return filtered;
};
