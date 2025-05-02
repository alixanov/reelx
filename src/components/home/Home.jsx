import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import VideoData from '../data/VideoData';
import ContentLoader from 'react-content-loader';

// Gothic Color Palette
const colors = {
  background: {
    primary: '#0A0A0A',
    secondary: '#131313',
    tertiary: '#1C1C1C',
  },
  accent: {
    primary: '#8B0000',
    secondary: '#4A0404',
    highlight: '#B30000',
  },
  text: {
    primary: '#C0C0C0',
    secondary: '#767676',
    highlight: '#DEDEDE',
  },
  border: {
    primary: '#333',
    highlight: '#4A0404',
  },
};

// Skeleton Loader Component
const VideoCardSkeleton = ({ isMobile }) => (
  <ContentLoader
    speed={2}
    width={300}
    height={isMobile ? 240 : 260}
    viewBox="0 0 300 260"
    backgroundColor={colors.background.tertiary}
    foregroundColor={colors.border.primary}
  >
    {/* Thumbnail */}
    <rect x="0" y="0" rx="6" ry="6" width="300" height="168" />
    {/* Title */}
    <rect x="10" y="180" rx="4" ry="4" width="200" height="16" />
    <rect x="10" y="200" rx="4" ry="4" width="150" height="16" />
    {/* Channel */}
    <rect x="10" y="224" rx="4" ry="4" width="120" height="12" />
    {/* Meta */}
    <rect x="10" y="240" rx="4" ry="4" width="80" height="10" />
  </ContentLoader>
);

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  const fetchVideos = (pageNum) => {
    setIsLoading(true);

    if (!Array.isArray(VideoData)) {
      console.error('VideoData is not an array:', VideoData);
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const start = (pageNum - 1) * 12;
      const end = start + 12;
      const paginatedVideos = VideoData.slice(start, end);

      if (paginatedVideos.length > 0) {
        setVideos((prev) => [...prev, ...paginatedVideos]);
      }
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoading]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  return (
    <div
      style={{
        padding: isMobile ? '14px' : '20px',
        minHeight: '100vh',
        fontFamily: 'var(--font-primary)',
        background: '#121212',
        boxShadow: `inset 0 0 15px ${colors.accent.secondary}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '0 10px 12px' : '0 16px 16px',
          marginBottom: '20px',
          borderBottom: `1px solid ${colors.accent.secondary}`,
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: colors.text.primary,
            fontFamily: 'var(--font-heading)',
            textShadow: `0 0 8px ${colors.accent.primary}, 0 0 15px rgba(139, 0, 0, 0.5)`,
            letterSpacing: '1px',
            transition: 'all 0.4s ease',
          }}
        >
          NEW SOULS
        </h1>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          padding: isMobile ? '0 8px' : '0 10px',
        }}
      >
        {videos.map((video) => (
          <Link
            to={`/video/${video.id}`}
            key={video.id}
            style={{ textDecoration: 'none' }}
          >
            <div
              className="video-card"
              style={{
                backgroundColor: colors.background.tertiary,
                borderRadius: '6px',
                overflow: 'hidden',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                boxShadow: `inset 0 0 5px rgba(0, 0, 0, 0.5), 0 0 5px ${colors.accent.secondary}`,
                border: `1px solid ${colors.border.primary}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 0 12px ${colors.accent.primary}, inset 0 0 8px ${colors.accent.primary}`;
                e.currentTarget.style.borderColor = colors.accent.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `inset 0 0 5px rgba(0, 0, 0, 0.5), 0 0 5px ${colors.accent.secondary}`;
                e.currentTarget.style.borderColor = colors.border.primary;
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  backgroundColor: '#000',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderBottom: `1px solid ${colors.border.primary}`,
                  }}
                  onError={(e) => {
                    e.target.src = 'https://i.ytimg.com/vi/default.jpg';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    backgroundColor: colors.background.secondary,
                    color: colors.text.primary,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: isMobile ? '10px' : '12px',
                    fontWeight: '400',
                    fontFamily: 'var(--font-primary)',
                    boxShadow: `0 0 4px ${colors.accent.secondary}`,
                  }}
                >
                  10:45
                </div>
              </div>

              <div style={{ padding: isMobile ? '10px' : '12px' }}>
                <div
                  style={{
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: '600',
                    color: colors.text.primary,
                    marginBottom: '8px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '1.4',
                    height: '44px',
                    fontFamily: 'var(--font-heading)',
                    textShadow: `0 0 4px ${colors.accent.secondary}`,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {video.snippet.title}
                </div>

                <div
                  style={{
                    fontSize: isMobile ? '12px' : '14px',
                    color: colors.text.secondary,
                    marginBottom: '4px',
                    fontWeight: '400',
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {video.snippet.channelTitle}
                </div>

                <div
                  style={{
                    fontSize: isMobile ? '10px' : '12px',
                    color: colors.text.secondary,
                    display: 'flex',
                    gap: '6px',
                    fontWeight: '400',
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  <span>{video.statistics.viewCount} views</span>
                  <span>•</span>
                  <span>{formatDate(video.snippet.publishedAt)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {isLoading &&
          Array(4)
            .fill()
            .map((_, index) => (
              <VideoCardSkeleton key={`skeleton-${index}`} isMobile={isMobile} />
            ))}
      </div>

      <div ref={loaderRef} style={{ height: '20px' }} />
    </div>
  );
};

export default Home;