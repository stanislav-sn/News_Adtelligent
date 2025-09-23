import { useEffect, useState } from 'react';
import type { Article } from '@/types/article';

export const useFetchNews = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/data/news.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, isLoading };
};
