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
        Videotitle="How to use Pabbly Chatflow"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="CoIfgN0tfhE"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="Video 2"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="CoIfgN0tfhE"
        videoTime="07 Min 23 Sec"
        
      />
      <VideoPlayListCards
        Videotitle="Video 3"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="your-youtube-video-id"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="Video 4"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="your-youtube-video-id"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="Video 5"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="your-youtube-video-id"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="Video 6"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="your-youtube-video-id"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="Video 7"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="your-youtube-video-id"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="Video 8"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="your-youtube-video-id"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="Video 9"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="your-youtube-video-id"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="Video 10"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="your-youtube-video-id"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="Video 11"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="your-youtube-video-id"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="Video 12"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="your-youtube-video-id"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="Video 13"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="your-youtube-video-id"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="Video 14"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="your-youtube-video-id"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="Video 15"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="your-youtube-video-id"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="Video 16"
        buttonText="Watch Now"
        thumbnailimage="Pabbly Broadcast Card.png"
        videoId="your-youtube-video-id"
        videoTime="07 Min 23 Sec"
      />
      
    </Box>
    
  );
}
