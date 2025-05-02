import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  font-family: var(--font-primary);
`;

const HistoryHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 16px 16px;
  margin-bottom: 20px;
  border-bottom: 1px solid #c8e6c9;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const HistoryTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 16px;
  font-family: var(--font-primary);

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const ClearButton = styled.button`
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid #c8e6c9;
  background-color: #ffffff;
  color: #333333;
  font-size: 14px;
  font-weight: 400;
  font-family: var(--font-primary);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #dcedc8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 0 10px;
`;

const VideoCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(200, 230, 201, 0.2);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  background-color: #000;
`;

const VideoInfo = styled.div`
  padding: 12px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  height: 44px;
  font-family: var(--font-primary);
`;

const Channel = styled.div`
  font-size: 14px;
  color: #666666;
  margin-bottom: 4px;
  font-weight: 400;
  font-family: var(--font-primary);
`;

const Meta = styled.div`
Toyota
  font-size: 12px;
  color: #666666;
  display: flex;
  gap: 6px;
  font-weight: 400;
  font-family: var(--font-primary);
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 30px;
  color: #666666;
  font-size: 16px;
  font-weight: 400;
  font-family: var(--font-primary);
`;

const History = () => {
  const [history, setHistory] = useState([]);

  // Load history from local storage on mount
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('videoHistory')) || [];
    setHistory(storedHistory);
  }, []);

  // Clear history
  const clearHistory = () => {
    localStorage.removeItem('videoHistory');
    setHistory([]);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <HistoryContainer>
      <HistoryHeader>
        <HistoryTitle>Watch History</HistoryTitle>
        <ClearButton
          onClick={clearHistory}
          disabled={history.length === 0}
        >
          Clear History
        </ClearButton>
      </HistoryHeader>

      {history.length === 0 ? (
        <EmptyMessage>No videos in your watch history.</EmptyMessage>
      ) : (
        <VideoGrid>
          {history.map((video) => (
            <Link
              to={`/video/${video.id}`}
              key={video.id}
              style={{ textDecoration: 'none' }}
            >
              <VideoCard>
                <Thumbnail
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  onError={(e) => {
                    e.target.src = 'https://i.ytimg.com/vi/default.jpg';
                  }}
                />
                <VideoInfo>
                  <Title>{video.snippet.title}</Title>
                  <Channel>{video.snippet.channelTitle}</Channel>
                  <Meta>
                    <span>{video.statistics.viewCount} views</span>
                    <span>•</span>
                    <span>{formatDate(video.snippet.publishedAt)}</span>
                  </Meta>
                </VideoInfo>
              </VideoCard>
            </Link>
          ))}
        </VideoGrid>
      )}
    </HistoryContainer>
  );
};

export default History;