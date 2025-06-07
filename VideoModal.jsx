import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

const VideoModal = ({ isOpen, onClose, videoSrc, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoRef, setVideoRef] = useState(null);

  const togglePlay = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef) {
      videoRef.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef) {
      if (videoRef.requestFullscreen) {
        videoRef.requestFullscreen();
      } else if (videoRef.webkitRequestFullscreen) {
        videoRef.webkitRequestFullscreen();
      } else if (videoRef.msRequestFullscreen) {
        videoRef.msRequestFullscreen();
      }
    }
  };

  const handleVideoLoad = (video) => {
    setVideoRef(video);
    if (video) {
      video.addEventListener('play', () => setIsPlaying(true));
      video.addEventListener('pause', () => setIsPlaying(false));
      video.addEventListener('ended', () => setIsPlaying(false));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gold-luxury transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Video Container */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={handleVideoLoad}
            className="w-full h-auto max-h-[80vh]"
            controls={false}
            poster="/api/placeholder/1200/675"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Custom Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between text-white">
              <div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-gray-300">Aquela 42 Power Catamaran Virtual Tour</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
                
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={toggleFullscreen}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

