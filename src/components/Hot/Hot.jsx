import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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

// Styled Components
const HotContainer = styled.div`
  padding: ${({ isMobile }) => (isMobile ? '14px' : '20px')};
  min-height: 100vh;
  font-family: var(--font-primary);
  background: #121212;
  box-shadow: inset 0 0 15px ${colors.accent.secondary};
`;

const HotHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ isMobile }) => (isMobile ? '0 10px 12px' : '0 16px 16px')};
  margin-bottom: 20px;
  border-bottom: 1px solid ${colors.accent.secondary};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const HotTitle = styled.h1`
  font-size: ${({ isMobile }) => (isMobile ? '20px' : '24px')};
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: 16px;
  font-family: var(--font-heading);
  text-shadow: 0 0 8px ${colors.accent.primary}, 0 0 15px rgba(139, 0, 0, 0.5);
  letter-spacing: 1px;
  transition: all 0.4s ease;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid ${colors.border.primary};
  background-color: ${({ active }) => (active ? colors.accent.secondary : colors.background.tertiary)};
  color: ${({ active }) => (active ? colors.text.highlight : colors.text.primary)};
  font-size: ${({ isMobile }) => (isMobile ? '12px' : '14px')};
  font-weight: 400;
  font-family: var(--font-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px ${colors.accent.secondary};

  &:hover {
    background-color: ${colors.accent.primary};
    color: ${colors.text.highlight};
    box-shadow: 0 0 10px ${colors.accent.primary};
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: ${({ isMobile }) => (isMobile ? '0 8px' : '0 10px')};
`;

const VideoCard = styled.div`
  background-color: ${colors.background.tertiary};
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5), 0 0 5px ${colors.accent.secondary};
  border: 1px solid ${colors.border.primary};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 12px ${colors.accent.primary}, inset 0 0 8px ${colors.accent.primary};
    border-color: ${colors.accent.primary};
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  background-color: #000;
  border-bottom: 1px solid ${colors.border.primary};
`;

const VideoInfo = styled.div`
  padding: ${({ isMobile }) => (isMobile ? '10px' : '12px')};
`;

const Title = styled.div`
  font-size: ${({ isMobile }) => (isMobile ? '14px' : '16px')};
  font-weight: 600;
  color: ${colors.text.primary};
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  height: 44px;
  font-family: var(--font-heading);
  text-shadow: 0 0 4px ${colors.accent.secondary};
  transition: all 0.3s ease;
`;

const Channel = styled.div`
  font-size: ${({ isMobile }) => (isMobile ? '12px' : '14px')};
  color: ${colors.text.secondary};
  margin-bottom: 4px;
  font-weight: 400;
  font-family: var(--font-primary);
`;

const Meta = styled.div`
  font-size: ${({ isMobile }) => (isMobile ? '10px' : '12px')};
  color: ${colors.text.secondary};
  display: flex;
  gap: 6px;
  font-weight: 400;
  font-family: var(--font-primary);
`;

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

// Enhanced mock data generator with popularity metrics
const generateHotVideos = () => {
  return VideoData.map((video, index) => {
    const isTrending = index % 3 === 0;
    const viewCount = isTrending
      ? `${Math.floor(Math.random() * 500) + 500}K`
      : video.statistics.viewCount;

    return {
      ...video,
      trending: isTrending ? 1 : 0,
      statistics: {
        ...video.statistics,
        viewCount: viewCount,
      },
    };
  });
};

const Hot = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('trending');

  const filteredVideos = React.useMemo(() => {
    if (!videos.length) return [];

    const sorted = [...videos];

    switch (filter) {
      case 'newest':
        return sorted.sort(
          (a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
        );
      case 'popular':
        return sorted.sort((a, b) =>
          parseInt(b.statistics.viewCount.replace('K', '')) -
          parseInt(a.statistics.viewCount.replace('K', ''))
        );
      case 'trending':
      default:
        return sorted.sort((a, b) => {
          if (a.trending !== b.trending) return b.trending - a.trending;
          return (
            parseInt(b.statistics.viewCount.replace('K', '')) -
            parseInt(a.statistics.viewCount.replace('K', ''))
          );
        });
    }
  }, [videos, filter]);

  const fetchVideos = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const hotVideos = generateHotVideos();
    setVideos(hotVideos);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  return (
    <HotContainer isMobile={isMobile}>
      <HotHeader isMobile={isMobile}>
        <HotTitle isMobile={isMobile}>UNHOLY FIRE</HotTitle>
        <FilterButtons>
          <FilterButton
            active={filter === 'trending'}
            onClick={() => setFilter('trending')}
            isMobile={isMobile}
          >
            Trending
          </FilterButton>
          <FilterButton
            active={filter === 'newest'}
            onClick={() => setFilter('newest')}
            isMobile={isMobile}
          >
            Newest
          </FilterButton>
          <FilterButton
            active={filter === 'popular'}
            onClick={() => setFilter('popular')}
            isMobile={isMobile}
          >
            Most Popular
          </FilterButton>
        </FilterButtons>
      </HotHeader>

      <VideoGrid isMobile={isMobile}>
        {isLoading
          ? Array(4)
            .fill()
            .map((_, index) => (
              <VideoCardSkeleton key={`skeleton-${index}`} isMobile={isMobile} />
            ))
          : filteredVideos.map((video) => (
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
                <VideoInfo isMobile={isMobile}>
                  <Title isMobile={isMobile}>{video.snippet.title}</Title>
                  <Channel isMobile={isMobile}>{video.snippet.channelTitle}</Channel>
                  <Meta isMobile={isMobile}>
                    <span>{video.statistics.viewCount} views</span>
                    <span>•</span>
                    <span>{formatDate(video.snippet.publishedAt)}</span>
                  </Meta>
                </VideoInfo>
              </VideoCard>
            </Link>
          ))}
      </VideoGrid>
    </HotContainer>
  );
};

export default Hot;