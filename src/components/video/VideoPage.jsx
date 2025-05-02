import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import VideoData from '../data/VideoData';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
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
  }, [id]);

  if (!video) {
    return (
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#e8f5e9',
          minHeight: '100vh',
          fontFamily: 'var(--font-primary)',
          color: '#666666',
          fontSize: '16px',
          fontWeight: '400',
        }}
      >
        Video not found
      </div>
    );
  }

  const formatViews = (viewCount) => {
    return viewCount;
  };

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
          flexDirection: 'row',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            flexBasis: '850px',
            flexGrow: 1,
          }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '16/9',
              backgroundColor: '#000000',
              borderRadius: '12px',
              marginBottom: '16px',
              overflow: 'hidden',
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
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h1
              style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#333333',
                marginBottom: '8px',
                fontFamily: 'var(--font-primary)',
              }}
            >
              {video.snippet.title}
            </h1>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
                fontSize: '14px',
                color: '#666666',
                fontWeight: '400',
                fontFamily: 'var(--font-primary)',
              }}
            >
              <div>
                <span style={{ fontWeight: '600', color: '#333333' }}>
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
                backgroundColor: '#e8f5e9',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#666666',
                fontWeight: '400',
                fontFamily: 'var(--font-primary)',
              }}
            >
              <p>{video.snippet.description}</p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#333333',
                marginBottom: '16px',
                fontFamily: 'var(--font-primary)',
              }}
            >
              Comments
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
                  backgroundColor: '#c8e6c9',
                  marginRight: '12px',
                }}
              ></div>
              <input
                type="text"
                placeholder="Add a comment..."
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '12px',
                  border: '1px solid #c8e6c9',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: 'var(--font-primary)',
                  color: '#333333',
                  backgroundColor: '#ffffff',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#dcedc8')}
                onBlur={(e) => (e.target.style.borderColor = '#c8e6c9')}
              />
            </div>
            <div
              style={{
                color: '#666666',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '400',
                fontFamily: 'var(--font-primary)',
              }}
            >
              No comments yet
            </div>
          </div>
        </div>

        <div
          style={{
            flexBasis: '300px',
            flexGrow: 1,
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#333333',
              marginBottom: '12px',
              fontFamily: 'var(--font-primary)',
            }}
          >
            Related Videos
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
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '8px',
                  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#dcedc8';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(200, 230, 201, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div
                  style={{
                    width: '168px',
                    height: '94px',
                    backgroundColor: '#000',
                    marginRight: '8px',
                    borderRadius: '8px',
                    backgroundImage: `url(${relVideo.snippet.thumbnails.medium.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    flexShrink: 0,
                  }}
                ></div>
                <div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#333333',
                      marginBottom: '4px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {relVideo.snippet.title}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#666666',
                      fontWeight: '400',
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {relVideo.snippet.channelTitle}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#666666',
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