import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

const BASE_PATH = '/cours';

export default function LazyVideo({ src, poster }) {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const videoSrc = src.startsWith('/') || src.startsWith('http')
    ? src
    : `${BASE_PATH}/${src}`;

  // Lazy load when scrolled into view
  useEffect(() => {
    const el = wrapperRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoaded(true);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }, []);

  // Restart resets to the beginning and leaves the video paused.
  const restart = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  }, []);

  // Hide controls after 1s of no mouse movement while playing.
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (playing) {
      timerRef.current = setTimeout(() => setShowControls(false), 1000);
    }
  }, [playing]);

  useEffect(() => {
    if (!playing) {
      setShowControls(true);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      timerRef.current = setTimeout(() => setShowControls(false), 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing]);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseMove={handleMouseMove}
    >
      {loaded ? (
        <video
          ref={videoRef}
          className={styles.video}
          src={videoSrc}
          poster={poster}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      ) : (
        <div className={styles.placeholder} />
      )}

      <div className={`${styles.controls} ${showControls ? styles.controlsVisible : ''}`}>
        <button
          type="button"
          className={styles.button}
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
          title={playing ? 'Pause' : 'Play'}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={restart}
          aria-label="Restart"
          title="Restart"
        >
          <RestartIcon />
        </button>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  );
}

function RestartIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    </svg>
  );
}