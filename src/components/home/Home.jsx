import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import VideoData from '../data/VideoData';

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
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
          fetchVideos(page + 1);
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
  }, [isLoading, page]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      style={{
        padding: '20px',
        minHeight: '100vh',
        fontFamily: 'var(--font-primary)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px 16px',
          marginBottom: '20px',
          borderBottom: '1px solid #c8e6c9',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#333333',
            fontFamily: 'var(--font-primary)',
          }}
        >
          NEW VIDEOS
        </h1>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          padding: '0 10px',
        }}
      >
        {videos.map((video) => (
          <Link
            to={`/video/${video.id}`}
            key={video.id}
            style={{ textDecoration: 'none' }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(200, 230, 201, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
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
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: '#ffffff',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  10:45
                </div>
              </div>

              <div style={{ padding: '12px' }}>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333333',
                    marginBottom: '8px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '1.4',
                    height: '44px',
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {video.snippet.title}
                </div>

                <div
                  style={{
                    fontSize: '14px',
                    color: '#666666',
                    marginBottom: '4px',
                    fontWeight: '400',
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {video.snippet.channelTitle}
                </div>

                <div
                  style={{
                    fontSize: '12px',
                    color: '#666666',
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
      </div>

      <div
        ref={loaderRef}
        style={{
          textAlign: 'center',
          padding: '30px',
          color: '#666666',
          fontSize: '14px',
          fontWeight: '400',
          fontFamily: 'var(--font-primary)',
        }}
      >
        {isLoading ? 'Loading more videos...' : ''}
      </div>
    </div>
  );
};

export default Home;