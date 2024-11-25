import Box from '@mui/material/Box';

import VideoPlayListCards from 'src/components/video-play-list-card/video-playlist-card';

// ----------------------------------------------------------------------

export function VideoPlayList({ title, list, ...other }) {
  return (
    <Box
      sx={{
        mt: 3,
        gap: 3,
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' },
      }}
    >
      <VideoPlayListCards
        Videotitle="1. Introduction to Pabbly Connect"
        buttonText="Watch Now"
        thumbnailimage="Introduction to Pabbly Connect.png"
        // videoId="dEO6phYD_Ig"
        videoId="https://www.youtube.com/embed/CoIfgN0tfhE"
        videoTime="01 Min 12 Sec"
      />

      <VideoPlayListCards
        Videotitle="2. What is Triggers & Action?"
        buttonText="Watch Now"
        thumbnailimage="1. What is Triggers  Action.png"
        videoId="https://www.youtube.com/embed/z2B7tBxN-ak"
        videoTime="15 Min 01 Sec"
      />
      <VideoPlayListCards
        Videotitle="3. How to use Webhooks"
        buttonText="Watch Now"
        thumbnailimage="2. How to use Webhooks.png"
        videoId="https://www.youtube.com/embed/xxWoEJbrtFE"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="4. How to use Email Parser"
        buttonText="Watch Now"
        thumbnailimage="3. How to use Email Parser.png"
        videoId="https://www.youtube.com/embed/xxWoEJbrtFE"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="5. How to use Filters"
        buttonText="Watch Now"
        thumbnailimage="4. How to use Filters.png"
        videoId="https://www.youtube.com/embed/W3HMbI5Q68U"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="6. How to use Routers"
        buttonText="Watch Now"
        thumbnailimage="5. How to use Routers.png"
        videoId="https://www.youtube.com/embed/6XDASZVv3tw"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="7. How to use Iterator"
        buttonText="Watch Now"
        thumbnailimage="6. How to use Iterator.png"
        videoId="https://www.youtube.com/embed/zJaGQ-SIB0I"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="8. How to use API Module"
        buttonText="Watch Now"
        thumbnailimage="7. How to use API Module.png"
        videoId="https://www.youtube.com/embed/M-oU-yG-CCU"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="9. Google Sheets Triggers"
        buttonText="Watch Now"
        thumbnailimage="8. Google Sheets Triggers.png"
        videoId="https://www.youtube.com/embed/2YDqYkJhT_I"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="10. Working with Facebook Lead Ads"
        buttonText="Watch Now"
        thumbnailimage="9. Working with Facebook Lead Ads.png"
        videoId="https://www.youtube.com/embed/afsGkIaLDlU"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="11. How to use Number Formatter"
        buttonText="Watch Now"
        thumbnailimage="10. How to use Number Formatter.png"
        videoId="https://www.youtube.com/embed/cfrB2ahirlw"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="12. How to use Text Formatter"
        buttonText="Watch Now"
        thumbnailimage="11. How to use Text Formatter.png"
        videoId="https://www.youtube.com/embed/Wp-4sQqNx9g"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="13. Existing Apps Authentication"
        buttonText="Watch Now"
        thumbnailimage="12. Existing Apps Authentication.png"
        videoId="https://www.youtube.com/embed/L_IPt-R0ntA"
        videoTime="07 Min 23 Sec"
      />
    </Box>
  );
}
