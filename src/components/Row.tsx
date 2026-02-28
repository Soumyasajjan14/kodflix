import React, { useState, useEffect, useRef } from 'react';
import { fetchMovies, imageUrl } from '../services/tmdb';
import './Row.css';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  original_name?: string;
  poster_path: string;
  backdrop_path: string;
}

interface RowProps {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}

const Row: React.FC<RowProps> = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMovies = await fetchMovies(fetchUrl);
      setMovies(fetchedMovies);
    };
    fetchData();
  }, [fetchUrl]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__container">
        <button 
          className="row__arrow row__arrowLeft" 
          onClick={() => handleScroll('left')}
        >
          &#8249;
        </button>
        <div className="row__posters" ref={rowRef}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
              src={imageUrl(
                isLargeRow ? movie.poster_path : movie.backdrop_path,
                isLargeRow ? 'w500' : 'w300'
              )}
              alt={movie.title || movie.name || movie.original_name}
            />
          ))}
        </div>
        <button 
          className="row__arrow row__arrowRight" 
          onClick={() => handleScroll('right')}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Row;
