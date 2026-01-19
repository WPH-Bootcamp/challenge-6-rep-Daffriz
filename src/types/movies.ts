export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Replace enum with const object + type
export const MovieCategory = {
  Trending: 'trending',
  TopRated: 'top_rated',
  Upcoming: 'upcoming',
  NowPlaying: 'now_playing',
} as const;

export type MovieCategory = (typeof MovieCategory)[keyof typeof MovieCategory];
