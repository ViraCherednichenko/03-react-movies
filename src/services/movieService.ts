import axios, { type AxiosResponse } from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

if (!TMDB_TOKEN) {
  console.warn('TMDB token is missing! Please set VITE_TMDB_TOKEN in .env file.');
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) {
    return [];
  }

  const config = {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };

  const response: AxiosResponse<MovieSearchResponse> = await axios.get(
    BASE_URL,
    config
  );

  return response.data.results;
}
