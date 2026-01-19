import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrendingCarousel from './components/TrendingCarousel';
import NewReleaseGrid from './components/NewReleaseGrid';
import MovieCard from './components/MovieCard';
import { useMovies, useSearchMovies } from './hooks/useMovies';
import movieLogo from './assets/movieLogo.svg';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data: trendingData } = useMovies('trending', page);
  const { data: upcomingData, isLoading: upcomingLoading } = useMovies(
    'upcoming',
    page
  );
  const { data: searchData } = useSearchMovies(activeSearch, page);

  const isSearchActive = activeSearch.trim().length > 0;
  const heroMovie = trendingData?.results[0];

  const handleSearch = () => {
    setActiveSearch(searchQuery);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((p) => p + 1);
  };

  return (
    <div className='min-h-screen bg-black text-zinc-100 overflow-x-hidden w-screen relative'>
      {/* Side gradients - responsive width */}
      <div className='hidden md:block fixed inset-y-0 left-0 w-20 lg:w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10' />
      <div className='hidden md:block fixed inset-y-0 right-0 w-20 lg:w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10' />

      <Header
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />

      {!isSearchActive && <Hero movie={heroMovie} />}

      <main className='mx-auto px-4 md:px-8 lg:px-[140px] py-8'>
        {isSearchActive ? (
          <section>
            <section className='mt-8'>
              <div className='flex items-baseline justify-between mb-4'>
                <h2 className='text-2xl font-semibold'>Search Results</h2>
                <span className='text-sm text-zinc-400'>
                  {searchData?.results.length || 0} results
                </span>
              </div>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {searchData?.results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          </section>
        ) : (
          <>
            {trendingData && trendingData.results.length > 0 && (
              <TrendingCarousel
                movies={trendingData.results.slice(0, 10)}
                title='TRENDING NOW'
              />
            )}

            {upcomingData && (
              <NewReleaseGrid
                movies={upcomingData.results}
                title='NEW RELEASES'
                isLoading={upcomingLoading}
                onLoadMore={handleLoadMore}
                hasMore={upcomingData ? page < upcomingData.total_pages : false}
              />
            )}
          </>
        )}
      </main>

      <footer className='mt-10 border-t border-zinc-800/70'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between mx-auto px-4 md:px-8 lg:px-[140px] py-6 gap-4 md:gap-2'>
          <div className='flex items-center gap-2'>
            <img src={movieLogo} alt='Movie Logo' className='size-7' />
            <div className='font-semibold text-zinc-100'>Movie</div>
          </div>
          <div className='text-xs text-zinc-500'>
            Copyright ©2025 Movie Explorer
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
