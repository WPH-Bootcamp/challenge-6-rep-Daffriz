import { useState } from 'react';
import type { Movie } from '../types/movies';
import MovieCard from './MovieCard';
import arrow from '../assets/arrow.svg';

interface TrendingCarouselProps {
  movies: Movie[];
  title: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export default function TrendingCarousel({
  movies,
  title,
}: TrendingCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('carousel-' + title);
    if (!container) return;

    const scrollAmount = 300;
    const newPosition =
      direction === 'left'
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;

    container.scrollLeft = newPosition;
    setScrollPosition(newPosition);
  };

  return (
    <section className='mt-12 overflow-hidden -mr-4 md:-mr-8 lg:-mr-[140px]'>
      <div className='flex items-center justify-between mb-4 mr-4 md:mr-8 lg:mr-[140px]'>
        <h2 className='text-2xl font-semibold'>{title}</h2>
      </div>

      <div className='relative overflow-hidden'>
        <div
          id={'carousel-' + title}
          className='flex gap-3 md:gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide pr-4 md:pr-8 lg:pr-[140px]'
          style={{ scrollBehavior: 'smooth' }}
        >
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className='flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] relative'
            >
              <div
                className='absolute top-2 left-2 text-white !rounded-full text-xs font-bold z-10'
                style={{
                  padding: '6.86px',
                  backgroundColor: 'rgba(10, 13, 18, 0.6)',
                }}
              >
                {index + 1}
              </div>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Left arrow */}
        <img
          src={arrow}
          alt='Previous'
          onClick={() => scroll('left')}
          className='absolute left-0 top-[45%] -translate-y-1/2 rotate-180 w-11 h-11 cursor-pointer hover:opacity-80 transition-opacity z-20'
        />

        {/* Right arrow - flipped */}
        <img
          src={arrow}
          alt='Next'
          onClick={() => scroll('right')}
          className='absolute right-4 md:right-8 lg:right-[140px] top-[45%] -translate-y-1/2 w-11 h-11 cursor-pointer hover:opacity-80 transition-opacity z-20'
        />
      </div>
    </section>
  );
}
