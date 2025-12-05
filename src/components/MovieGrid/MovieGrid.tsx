import styles from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';

export interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  // якщо фільмів немає – нічого не рендеримо
  if (movies.length === 0) {
    return null;
  }

  return (
    <ul className={styles.grid}>
      {movies.map(movie => (
        <li key={movie.id}>
          <div
            className={styles.card}
            onClick={() => onSelect(movie)}
            role="button"
            tabIndex={0}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                onSelect(movie);
              }
            }}
          >
            {movie.poster_path && (
              <img
                className={styles.image}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
            )}
            <h2 className={styles.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
