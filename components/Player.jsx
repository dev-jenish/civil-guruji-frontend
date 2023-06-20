import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels/dist/videojs-contrib-quality-levels.js';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [availableBitrates, setAvailableBitrates] = useState([]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const player = videojs(videoElement);

      // Enable quality levels plugin
      player.qualityLevels();

      // Fetch available bitrates and update the state
      player.on('loadedmetadata', () => {
        const qualityLevels = player.qualityLevels();
        const bitrates = [];
        for (let i = 0; i < qualityLevels.length; i++) {
          const level = qualityLevels[i];
          bitrates.push(level.height);
        }
        setAvailableBitrates(bitrates);
      });

      // Change the selected quality when the user selects an option
      const changeQuality = (height) => {
        const qualityLevels = player.qualityLevels();
        for (let i = 0; i < qualityLevels.length; i++) {
          const level = qualityLevels[i];
          if (level.height === height) {
            if (level.enabled) {
              player.src(level.src);
              setSelectedQuality(height);
            } else {
              console.log('Selected quality is not enabled.');
            }
            break;
          }
        }
      };
      

      // Expose the changeQuality function to the global scope
      window.changeQuality = changeQuality;
    }

    return () => {
      if (videoElement) {
        videojs(videoElement).dispose();
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} className="video-js vjs-default-skin" controls width="640" height="360">
        <source
          src="https://d1wxh31cdpnls0.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/168674871742507856100/168674871742507856100_7856100.m3u8"
          type="application/x-mpegURL"
        />
      </video>
      <div>
        <label>Quality:</label>
        <select
          value={selectedQuality}
          onChange={(e) => window.changeQuality(Number(e.target.value))}
        >
          <option value="">Auto</option>
          {availableBitrates.map((bitrate, index) => (
            <option key={index} value={bitrate}>
              {bitrate}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;
