import { useEffect, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import styles from './MovieModal.module.css';
import type { Movie } from '../../types/movie';

export interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  // Закриття по ESC + блокування скролу
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  // Клік по бекдропу (поза модалкою)
  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : undefined;

  const modal = (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            className={styles.image}
          />
        )}

        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>
  );

  // Рендеримо поза основним деревом — прямо в body
  return createPortal(modal, document.body);
}
