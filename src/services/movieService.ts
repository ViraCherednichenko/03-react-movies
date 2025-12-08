import axios, { type AxiosRequestConfig } from 'axios';
import type { Movie } from '../types/movie';

interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(query: string): Promise<Movie[]> {
  const config: AxiosRequestConfig = {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };


  const response = await axios.get<MovieSearchResponse>(API_URL, config);

  return response.data.results;
}
