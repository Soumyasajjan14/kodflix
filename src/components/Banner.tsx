import React, { useState, useEffect } from 'react';
import { fetchMovies, requests, imageUrl } from '../services/tmdb';
import './Banner.css';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  original_name?: string;
  backdrop_path: string;
  overview: string;
}

const Banner: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await fetchMovies(requests.fetchNetflixOriginals);
      if (movies && movies.length > 0) {
        setMovie(movies[Math.floor(Math.random() * movies.length)]);
      }
    };
    fetchData();
  }, []);

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: movie?.backdrop_path
          ? `url(${imageUrl(movie.backdrop_path, 'original')})`
          : '',
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button banner__buttonPlay">Play</button>
          <button className="banner__button banner__buttonMyList">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview || '', 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
