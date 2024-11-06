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
        videoId="dEO6phYD_Ig"
        videoTime="01 Min 12 Sec"
      />

      <VideoPlayListCards
        Videotitle="2. What is Triggers & Action?"
        buttonText="Watch Now"
        thumbnailimage="1. What is Triggers  Action.png"
        videoId="z2B7tBxN-ak"
        videoTime="15 Min 01 Sec"
      />
      <VideoPlayListCards
        Videotitle="3. How to use Webhooks"
        buttonText="Watch Now"
        thumbnailimage="2. How to use Webhooks.png"
        videoId="xxWoEJbrtFE"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="4. How to use Email Parser"
        buttonText="Watch Now"
        thumbnailimage="3. How to use Email Parser.png"
        videoId="xxWoEJbrtFE"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="5. How to use Filters"
        buttonText="Watch Now"
        thumbnailimage="4. How to use Filters.png"
        videoId="W3HMbI5Q68U"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="6. How to use Routers"
        buttonText="Watch Now"
        thumbnailimage="5. How to use Routers.png"
        videoId="6XDASZVv3tw"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="7. How to use Iterator"
        buttonText="Watch Now"
        thumbnailimage="6. How to use Iterator.png"
        videoId="zJaGQ-SIB0I"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="8. How to use API Module"
        buttonText="Watch Now"
        thumbnailimage="7. How to use API Module.png"
        videoId="M-oU-yG-CCU"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="9. Google Sheets Triggers"
        buttonText="Watch Now"
        thumbnailimage="8. Google Sheets Triggers.png"
        videoId="2YDqYkJhT_I"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="10. Working with Facebook Lead Ads"
        buttonText="Watch Now"
        thumbnailimage="9. Working with Facebook Lead Ads.png"
        videoId="afsGkIaLDlU"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="11. How to use Number Formatter"
        buttonText="Watch Now"
        thumbnailimage="10. How to use Number Formatter.png"
        videoId="cfrB2ahirlw"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="12. How to use Text Formatter"
        buttonText="Watch Now"
        thumbnailimage="11. How to use Text Formatter.png"
        videoId="Wp-4sQqNx9g"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="13. Existing Apps Authentication"
        buttonText="Watch Now"
        thumbnailimage="12. Existing Apps Authentication.png"
        videoId="L_IPt-R0ntA"
        videoTime="07 Min 23 Sec"
      />
    </Box>
  );
}
