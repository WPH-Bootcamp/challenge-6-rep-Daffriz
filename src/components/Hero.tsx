import { movieService } from '../lib/movieService';
import play from '../assets/play.svg';

interface HeroProps {
  movie?: {
    title: string;
    overview: string;
    backdrop_path: string | null;
  };
}

export default function Hero({ movie }: HeroProps) {
  const backdropUrl = movie?.backdrop_path
    ? movieService.getImageUrl(movie.backdrop_path, 'original')
    : null;

  return (
    <div
      className='relative h-96 md:h-[500px] bg-cover bg-center'
      style={{
        backgroundImage: backdropUrl
          ? `url(${backdropUrl})`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black' />

      <div className='relative h-full flex flex-col justify-end px-4 md:px-8 lg:px-[140px] py-8'>
        <div className='max-w-2xl'>
          <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4'>
            {movie?.title || 'Movie Explorer'}
          </h1>
          <p className='text-sm md:text-base text-zinc-200 line-clamp-3'>
            {movie?.overview ||
              'Discover and explore your favorite movies with our comprehensive movie database.'}
          </p>

          <div className='mt-6 flex flex-col sm:flex-row gap-3'>
            <button
              style={{ backgroundColor: '#e50914' }}
              className='!rounded-full hover:bg-[#b00610] text-white px-8 py-3 font-semibold flex items-center justify-center transition-colors w-full sm:w-auto relative z-10'
            >
              <span className='inline-flex items-center justify-center gap-2'>
                <span>Watch Trailer</span>
                <img src={play} alt='Play icon' className='w-5 h-5' />
              </span>
            </button>
            <button className='!rounded-full border-2 border-white text-white hover:bg-white/10 px-8 py-3 font-semibold transition-colors w-full sm:w-auto'>
              See Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
