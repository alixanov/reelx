import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
const VideoPageSkeleton = ({ isMobile }) => (
  <div
    style={{
      maxWidth: '1200px',
      width: '100%',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '24px',
    }}
  >
    <div style={{ flexBasis: isMobile ? '100%' : '850px', flexGrow: 1 }}>
      {/* Video Player */}
      <ContentLoader
        speed={2}
        width={isMobile ? 300 : 850}
        height={isMobile ? 168 : 478}
        viewBox="0 0 850 478"
        backgroundColor={colors.background.tertiary}
        foregroundColor={colors.border.primary}
      >
        <rect x="0" y="0" rx="6" ry="6" width="850" height="478" />
      </ContentLoader>
      {/* Video Info */}
      <ContentLoader
        speed={2}
        width={isMobile ? 300 : 850}
        height={200}
        viewBox="0 0 850 200"
        backgroundColor={colors.background.tertiary}
        foregroundColor={colors.border.primary}
        style={{ marginTop: '16px' }}
      >
        <rect x="0" y="0" rx="6" ry="6" width="850" height="200" />
        <rect x="16" y="16" rx="4" ry="4" width="600" height="20" />
        <rect x="16" y="44" rx="4" ry="4" width="200" height="14" />
        <rect x="650" y="44" rx="4" ry="4" width="150" height="14" />
        <rect x="16" y="76" rx="4" ry="4" width="750" height="100" />
      </ContentLoader>
      {/* Comments */}
      <ContentLoader
        speed={2}
        width={isMobile ? 300 : 850}
        height={120}
        viewBox="0 0 850 120"
        backgroundColor={colors.background.tertiary}
        foregroundColor={colors.border.primary}
        style={{ marginTop: '16px' }}
      >
        <rect x="0" y="0" rx="6" ry="6" width="850" height="120" />
        <rect x="16" y="16" rx="4" ry="4" width="200" height="16" />
        <circle cx="36" cy="64" r="20" />
        <rect x="64" y="56" rx="6" ry="6" width="750" height="24" />
      </ContentLoader>
    </div>
    <div style={{ flexBasis: isMobile ? '100%' : '300px', flexGrow: 1 }}>
      {/* Related Videos */}
      <ContentLoader
        speed={2}
        width={isMobile ? 300 : 300}
        height={470}
        viewBox="0 0 300 470"
        backgroundColor={colors.background.tertiary}
        foregroundColor={colors.border.primary}
      >
        <rect x="0" y="0" rx="4" ry="4" width="200" height="16" />
        {Array(5)
          .fill()
          .map((_, i) => (
            <React.Fragment key={i}>
              <rect x="8" y={40 + i * 90} rx="6" ry="6" width="168" height="94" />
              <rect x="184" y={40 + i * 90} rx="4" ry="4" width="100" height="14" />
              <rect x="184" y={60 + i * 90} rx="4" ry="4" width="80" height="12" />
              <rect x="184" y={78 + i * 90} rx="4" ry="4" width="80" height="12" />
            </React.Fragment>
          ))}
      </ContentLoader>
    </div>
  </div>
);

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVideo = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate async load
      const currentVideo = VideoData.find((v) => v.id === id);
      setVideo(currentVideo);

      if (currentVideo) {
        // Save to localStorage for History
        const history = JSON.parse(localStorage.getItem('videoHistory')) || [];
        if (!history.find((v) => v.id === currentVideo.id)) {
          history.unshift(currentVideo);
          localStorage.setItem('videoHistory', JSON.stringify(history));
        }

        // Set related videos
        const related = VideoData.filter((v) => v.id !== id).slice(0, 5);
        setRelatedVideos(related);
      }
      setIsLoading(false);
    };
    loadVideo();
  }, [id]);

  const formatViews = (viewCount) => {
    return viewCount;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  if (isLoading) {
    return (
      <div
        style={{
          padding: isMobile ? '14px' : '20px',
          minHeight: '100vh',
          fontFamily: 'var(--font-primary)',
          background: '#121212',
          boxShadow: `inset 0 0 15px ${colors.accent.secondary}`,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <VideoPageSkeleton isMobile={isMobile} />
      </div>
    );
  }

  if (!video) {
    return (
      <div
        style={{
          padding: isMobile ? '14px' : '20px',
          textAlign: 'center',
          background: '#121212',
          minHeight: '100vh',
          fontFamily: 'var(--font-primary)',
          color: colors.text.secondary,
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '400',
          boxShadow: `inset 0 0 15px ${colors.accent.secondary}`,
        }}
      >
        No soul found for this video.
      </div>
    );
  }

  return (
    <div
      style={{
        padding: isMobile ? '14px' : '20px',
        minHeight: '100vh',
        fontFamily: 'var(--font-primary)',
        background: '#121212',
        boxShadow: `inset 0 0 15px ${colors.accent.secondary}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '24px',
        }}
      >
        <div
          style={{
            flexBasis: isMobile ? '100%' : '850px',
            flexGrow: 1,
          }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '16/9',
              backgroundColor: '#000',
              borderRadius: '6px',
              marginBottom: '16px',
              overflow: 'hidden',
              border: `1px solid ${colors.border.primary}`,
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.snippet.title}
            ></iframe>
          </div>

          <div
            style={{
              backgroundColor: colors.background.tertiary,
              borderRadius: '6px',
              padding: '16px',
              marginBottom: '16px',
              boxShadow: `inset 0 0 5px rgba(0, 0, 0, 0.5), 0 0 5px ${colors.accent.secondary}`,
              border: `1px solid ${colors.border.primary}`,
            }}
          >
            <h1
              style={{
                fontSize: isMobile ? '18px' : '20px',
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: '8px',
                fontFamily: 'var(--font-heading)',
                textShadow: `0 0 4px ${colors.accent.secondary}`,
              }}
            >
              {video.snippet.title}
            </h1>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
                fontSize: isMobile ? '12px' : '14px',
                color: colors.text.secondary,
                fontWeight: '400',
                fontFamily: 'var(--font-primary)',
              }}
            >
              <div>
                <span style={{ fontWeight: '600', color: colors.text.primary }}>
                  {video.snippet.channelTitle}
                </span>
              </div>
              <div>
                <span>{formatViews(video.statistics.viewCount)} views • </span>
                <span>{formatDate(video.snippet.publishedAt)}</span>
              </div>
            </div>

            <div
              style={{
                padding: '12px',
                backgroundColor: colors.background.secondary,
                borderRadius: '6px',
                fontSize: isMobile ? '12px' : '14px',
                color: colors.text.secondary,
                fontWeight: '400',
                fontFamily: 'var(--font-primary)',
                boxShadow: `0 0 5px ${colors.accent.secondary}`,
              }}
            >
              <p>{video.snippet.description}</p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: colors.background.tertiary,
              borderRadius: '6px',
              padding: '16px',
              boxShadow: `inset 0 0 5px rgba(0, 0, 0, 0.5), 0 0 5px ${colors.accent.secondary}`,
              border: `1px solid ${colors.border.primary}`,
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: '16px',
                fontFamily: 'var(--font-heading)',
                textShadow: `0 0 4px ${colors.accent.secondary}`,
              }}
            >
              Cursed Whispers
            </h3>
            <div
              style={{
                display: 'flex',
                marginBottom: '16px',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: colors.background.secondary,
                  marginRight: '12px',
                  boxShadow: `0 0 5px ${colors.accent.secondary}`,
                }}
              ></div>
              <input
                type="text"
                placeholder="Add a cursed whisper..."
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${colors.border.primary}`,
                  fontSize: isMobile ? '12px' : '14px',
                  fontWeight: '400',
                  fontFamily: 'var(--font-primary)',
                  color: colors.text.primary,
                  backgroundColor: colors.background.tertiary,
                  outline: 'none',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accent.primary;
                  e.target.style.boxShadow = `0 0 5px ${colors.accent.primary}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border.primary;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div
              style={{
                color: colors.text.secondary,
                textAlign: 'center',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: '400',
                fontFamily: 'var(--font-primary)',
              }}
            >
              No whispers haunt this place yet.
            </div>
          </div>
        </div>

        <div
          style={{
            flexBasis: isMobile ? '100%' : '300px',
            flexGrow: 1,
          }}
        >
          <h3
            style={{
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              color: colors.text.primary,
              marginBottom: '12px',
              fontFamily: 'var(--font-heading)',
              textShadow: `0 0 4px ${colors.accent.secondary}`,
            }}
          >
            Kindred Souls
          </h3>
          {relatedVideos.map((relVideo) => (
            <Link
              key={relVideo.id}
              to={`/video/${relVideo.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  display: 'flex',
                  marginBottom: '12px',
                  backgroundColor: colors.background.tertiary,
                  borderRadius: '6px',
                  padding: '8px',
                  transition: 'all 0.4s ease',
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
                    width: '168px',
                    height: '94px',
                    backgroundColor: '#000',
                    marginRight: '8px',
                    borderRadius: '6px',
                    backgroundImage: `url(${relVideo.snippet.thumbnails.medium.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    flexShrink: 0,
                    border: `1px solid ${colors.border.primary}`,
                  }}
                ></div>
                <div>
                  <div
                    style={{
                      fontSize: isMobile ? '12px' : '14px',
                      fontWeight: '600',
                      color: colors.text.primary,
                      marginBottom: '4px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      fontFamily: 'var(--font-heading)',
                      textShadow: `0 0 4px ${colors.accent.secondary}`,
                    }}
                  >
                    {relVideo.snippet.title}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? '10px' : '12px',
                      color: colors.text.secondary,
                      fontWeight: '400',
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {relVideo.snippet.channelTitle}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? '10px' : '12px',
                      color: colors.text.secondary,
                      fontWeight: '400',
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {formatViews(relVideo.statistics.viewCount)} views •{' '}
                    {formatDate(relVideo.snippet.publishedAt)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;