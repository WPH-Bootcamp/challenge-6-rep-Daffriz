import type { Movie } from '../types/movies';
import MovieCard from './MovieCard';

interface NewReleaseGridProps {
  movies: Movie[];
  title: string;
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export default function NewReleaseGrid({
  movies,
  title,
  isLoading,
  onLoadMore,
  hasMore,
}: NewReleaseGridProps) {
  // Filter movies to only 2025 and earlier
  const filteredMovies = movies.filter((movie) => {
    if (!movie.release_date) return false;
    const year = new Date(movie.release_date).getFullYear();
    return year <= 2025;
  });

  if (isLoading && filteredMovies.length === 0) {
    return (
      <section className='mt-12'>
        <h2 className='text-2xl font-semibold mb-4'>{title}</h2>
        <div className='flex flex-wrap gap-3 md:gap-4'>
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className='w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(20%-0.8rem)] max-w-[200px] animate-pulse'
            >
              <div className='aspect-[2/3] w-full rounded-lg bg-zinc-800/60' />
              <div className='mt-2 h-4 w-3/4 rounded bg-zinc-800/60' />
              <div className='mt-1 h-3 w-1/2 rounded bg-zinc-800/40' />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className='mt-12'>
      <div className='flex items-baseline justify-between mb-4'>
        <h2 className='text-2xl font-semibold'>{title}</h2>
      </div>

      <div className='relative mb-[113px]'>
        <div className='flex flex-wrap gap-3 md:gap-4'>
          {filteredMovies.slice(0, 18).map((movie) => (
            <div
              key={movie.id}
              className='w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(20%-0.8rem)] max-w-[200px]'
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {onLoadMore && hasMore && (
          <div className='absolute inset-x-0 bottom-0 flex justify-center'>
            <button
              onClick={onLoadMore}
              disabled={isLoading}
              className='!rounded-full border border-zinc-800 !bg-neutral-900 backdrop-blur px-8 py-2 text-sm hover:bg-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]'
            >
              {isLoading ? 'Loading...' : 'Load more'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
