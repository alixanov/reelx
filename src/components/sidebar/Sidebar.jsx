import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HistoryIcon from '@mui/icons-material/History';
import XIcon from '@mui/icons-material/X';
import VideoData from '../data/VideoData';

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaChange = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Filter videos based on search query
  const filteredVideos = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    return VideoData.filter((video) =>
      video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.snippet.channelTitle.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); // Limit to 5 results
  }, [searchQuery]);

  // Navbar Styles
  const navbarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: isMobile ? '8px 12px' : '12px 20px',
    backgroundColor: '#e8f5e9',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    height: isMobile ? '48px' : '60px',
  };

  const logoStyle = {
    fontSize: isMobile ? '20px' : '24px',
    fontWeight: '600',
    color: '#333333',
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '6px' : '8px',
    fontFamily: 'var(--font-primary)',
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    maxWidth: isMobile ? '100%' : '600px',
    margin: isMobile ? '0 10px' : '0 20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: isMobile ? '3px 6px' : '6px 12px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  };

  const searchInputStyle = {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#333333',
    fontSize: isMobile ? '14px' : '16px',
    padding: isMobile ? '2px' : '5px',
    fontFamily: 'var(--font-primary)',
    fontWeight: '400',
  };

  const searchIconStyle = {
    color: '#666666',
    fontSize: isMobile ? '16px' : '20px',
  };

  const searchResultsStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '8px',
    zIndex: 1001,
    maxHeight: '300px',
    overflowY: 'auto',
  };

  const searchResultItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: isMobile ? '6px 10px' : '8px 12px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  };

  const searchResultHoverStyle = {
    ...searchResultItemStyle,
    backgroundColor: '#dcedc8',
  };

  const thumbnailStyle = {
    width: isMobile ? '60px' : '80px',
    height: isMobile ? '34px' : '45px',
    borderRadius: '8px',
    objectFit: 'cover',
    marginRight: isMobile ? '8px' : '12px',
  };

  const resultTextStyle = {
    flex: 1,
  };

  const resultTitleStyle = {
    fontSize: isMobile ? '12px' : '14px',
    fontWeight: '600',
    color: '#333333',
    fontFamily: 'var(--font-primary)',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  const resultChannelStyle = {
    fontSize: isMobile ? '10px' : '12px',
    color: '#666666',
    fontWeight: '400',
    fontFamily: 'var(--font-primary)',
  };

  const profileLinkStyle = {
    color: '#333333',
    padding: isMobile ? '6px' : '8px',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease',
    backgroundColor: 'transparent',
  };

  // Sidebar Styles
  const sidebarStyle = isMobile
    ? {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: '12px 20px',
      backgroundColor: '#e8f5e9',
      boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      bottom: 0,
      left: 0,
      zIndex: 1000,
    }
    : {
      display: 'flex',
      flexDirection: 'column',
      width: '250px',
      height: 'calc(100vh - 60px)',
      padding: '10px 20px 20px',
      backgroundColor: '#e8f5e9',
      position: 'fixed',
      top: '60px',
      right: 0,
      zIndex: 1000,
    };

  const sidebarLogoStyle = isMobile
    ? {
      display: 'none',
    }
    : {
      fontSize: '24px',
      fontWeight: '600',
      color: '#333333',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '20px',
      fontFamily: 'var(--font-primary)',
    };

  const navLinksStyle = isMobile
    ? {
      display: 'flex',
      flexDirection: 'row',
      gap: '15px',
      flex: 1,
      justifyContent: 'flex-end',
    }
    : {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      flex: 1,
    };

  const linkStyle = isMobile
    ? {
      padding: '8px',
      borderRadius: '8px',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
    : {
      color: '#333333',
      fontSize: '16px',
      fontWeight: '400',
      padding: '10px',
      borderRadius: '8px',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'var(--font-primary)',
    };

  const activeLinkStyle = isMobile
    ? {
      ...linkStyle,
      backgroundColor: '#c8e6c9',
    }
    : {
      ...linkStyle,
      color: '#333333',
      backgroundColor: '#c8e6c9',
      fontFamily: 'var(--font-primary)',
    };

  const hoverLinkStyle = isMobile
    ? {
      ...linkStyle,
      backgroundColor: '#dcedc8',
    }
    : {
      ...linkStyle,
      color: '#333333',
      backgroundColor: '#dcedc8',
      fontFamily: 'var(--font-primary)',
    };

  const getLinkStyle = (isActive, linkName) =>
    isActive ? activeLinkStyle : hoveredLink === linkName ? hoverLinkStyle : linkStyle;

  const links = [
    { name: 'Home', icon: <HomeIcon style={{ color: '#333333', fontSize: isMobile ? '20px' : '24px' }} />, to: '/' },
    {
      name: 'Hot',
      icon: <LocalFireDepartmentIcon style={{ color: '#333333', fontSize: isMobile ? '20px' : '24px' }} />,
      to: '/hot',
    },
    {
      name: 'History',
      icon: <HistoryIcon style={{ color: '#333333', fontSize: isMobile ? '20px' : '24px' }} />,
      to: '/history',
    },
  ];

  return (
    <>
      {/* Navbar */}
      <nav style={navbarStyle}>
        <NavLink to="/" style={logoStyle}>
          <VideoLibraryIcon style={{ color: '#333333', fontSize: isMobile ? '20px' : '24px' }} />
          REELX
        </NavLink>
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Search videos..."
            style={searchInputStyle}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon style={searchIconStyle} />
          {filteredVideos.length > 0 && (
            <div style={searchResultsStyle}>
              {filteredVideos.map((video) => (
                <NavLink
                  to={`/video/${video.id}`}
                  key={video.id}
                  style={{ textDecoration: 'none' }}
                  onClick={() => setSearchQuery('')}
                >
                  <div
                    style={searchResultItemStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#dcedc8')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                  >
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      style={thumbnailStyle}
                      onError={(e) => {
                        e.target.src = 'https://i.ytimg.com/vi/default.jpg';
                      }}
                    />
                    <div style={resultTextStyle}>
                      <div style={resultTitleStyle}>{video.snippet.title}</div>
                      <div style={resultChannelStyle}>{video.snippet.channelTitle}</div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </div>
        <NavLink
          to="/profile"
          style={({ isActive }) =>
            isActive ? { ...profileLinkStyle, backgroundColor: '#c8e6c9' } : profileLinkStyle
          }
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#dcedc8')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <AccountCircleIcon style={{ color: '#333333', fontSize: isMobile ? '20px' : '24px' }} />
        </NavLink>
      </nav>

      {/* Sidebar */}
      <nav style={sidebarStyle}>
        {!isMobile && (
          <div style={sidebarLogoStyle}>
            <VideoLibraryIcon style={{ color: '#333333', fontSize: '24px' }} />
            REELX
          </div>
        )}
        <ul style={navLinksStyle}>
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.to}
                style={({ isActive }) => getLinkStyle(isActive, link.name.toLowerCase())}
                onMouseEnter={() => !isMobile && setHoveredLink(link.name.toLowerCase())}
                onMouseLeave={() => !isMobile && setHoveredLink(null)}
              >
                {link.icon}
                {!isMobile && <span>{link.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
        <a
          href="https://x.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={hoveredLink === 'follow-us' ? hoverLinkStyle : linkStyle}
          onMouseEnter={() => !isMobile && setHoveredLink('follow-us')}
          onMouseLeave={() => !isMobile && setHoveredLink(null)}
        >
          <XIcon style={{ color: '#333333', fontSize: isMobile ? '20px' : '24px' }} />
          {!isMobile && <span>Follow Us</span>}
        </a>
      </nav>
    </>
  );
};

export default Navigation;