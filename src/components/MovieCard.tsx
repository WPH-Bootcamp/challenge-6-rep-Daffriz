import type { Movie } from '../types/movies';
import { movieService } from '../lib/movieService';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movieService.getImageUrl(movie.poster_path, 'w500');

  return (
    <article className='group cursor-pointer'>
      <div className='relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800'>
        <img
          src={imageUrl}
          alt={movie.title}
          loading='lazy'
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
          onError={(e) => {
            e.currentTarget.src = '/placeholder-movie.png';
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/80' />
      </div>
      <div className='mt-2'>
        <h3 className='line-clamp-1 text-md font-semibold text-zinc-100 group-hover:text-white transition-colors'>
          {movie.title}
        </h3>
        <p className='text-sm text-yellow-400 flex items-center gap-1'>
          <span>★</span>
          {movie.vote_average.toFixed(1)}/10
        </p>
      </div>
    </article>
  );
}
