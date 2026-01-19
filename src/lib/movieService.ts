import { api } from './api';
import type { MoviesResponse, MovieCategory } from '../types/movies';
import { MovieCategory as MC } from '../types/movies';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const CATEGORY_ENDPOINTS: Record<MovieCategory, string> = {
  [MC.Trending]: '/trending/movie/day',
  [MC.TopRated]: '/movie/top_rated',
  [MC.Upcoming]: '/movie/upcoming',
  [MC.NowPlaying]: '/movie/now_playing',
};

export const movieService = {
  getMoviesByCategory: async (
    category: MovieCategory,
    page: number = 1
  ): Promise<MoviesResponse> => {
    const { data } = await api.get<MoviesResponse>(
      CATEGORY_ENDPOINTS[category],
      {
        params: { page },
      }
    );
    return data;
  },

  searchMovies: async (
    query: string,
    page: number = 1
  ): Promise<MoviesResponse> => {
    const { data } = await api.get<MoviesResponse>('/search/movie', {
      params: { query, page },
    });
    return data;
  },

  getImageUrl: (
    path: string | null,
    size: 'original' | 'w500' = 'original'
  ): string => {
    if (!path) return '/placeholder-movie.png';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },
};
