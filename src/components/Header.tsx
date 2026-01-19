import { useState, useEffect } from 'react';
import movieLogo from '../assets/movieLogo.svg';
import search from '../assets/search.svg';
import menu from '../assets/menu.svg';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

export default function Header({
  searchValue,
  onSearchChange,
  onSearch,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
        isScrolled
          ? 'bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/60'
          : 'bg-transparent'
      }`}
    >
      <div className='mx-auto px-4 md:px-8 lg:px-[140px] h-16 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-2 flex-shrink-0'>
          <img
            src={movieLogo}
            alt='Movie Explorer'
            className='w-6 h-6 md:w-7 md:h-7'
          />
          <h1 className='text-xs md:text-base lg:text-lg font-semibold tracking-tight'>
            Movie
          </h1>
        </div>

        <div className='flex-1 max-w-md hidden sm:block'>
          <div className='relative'>
            <span className='pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-zinc-400'>
              <img src={search} alt='Search' className='w-5 h-5' />
            </span>
            <input
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Search movies...'
              className='w-full rounded-lg bg-zinc-900/70 border border-zinc-800 px-10 py-2 text-sm placeholder:text-zinc-500 outline-none ring-0 focus:border-zinc-700'
            />
          </div>
        </div>

        {/* Icon group */}
        <div className='flex items-center gap-3 md:gap-4'>
          <img
            src={search}
            alt='Search'
            className='w-5 h-5 md:w-6 md:h-6 sm:hidden cursor-pointer hover:opacity-80 transition-opacity'
          />
          <img
            src={menu}
            alt='Menu'
            className='w-5 h-5 md:w-6 md:h-6 sm:hidden cursor-pointer hover:opacity-80 transition-opacity'
          />
        </div>
      </div>
    </header>
  );
}
