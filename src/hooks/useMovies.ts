import { useQuery } from '@tanstack/react-query';
import { movieService } from '../lib/movieService';
import type { MovieCategory } from '../types/movies';

export const useMovies = (category: MovieCategory, page: number = 1) => {
  return useQuery({
    queryKey: ['movies', category, page],
    queryFn: () => movieService.getMoviesByCategory(category, page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => movieService.searchMovies(query, page),
    enabled: query.trim().length > 0,
    staleTime: 5 * 60 * 1000,
  });
};
