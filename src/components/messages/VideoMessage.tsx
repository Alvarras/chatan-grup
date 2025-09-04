"use client";

import { useState, useRef } from "react";
import { VideoMessage as VideoMessageType } from "@/types/chat";
import Image from "next/image";

interface VideoMessageProps {
  message: VideoMessageType;
  isUser: boolean;
}

const VideoMessage: React.FC<VideoMessageProps> = ({ message, isUser }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const messageClass = isUser
    ? "bg-primary-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
    : "bg-gray-100 text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl";

  const handlePlay = () => {
    if (videoError) return;
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setVideoError(true);
        setIsPlaying(false);
      });
    }
  };

  return (
    <div className={`py-2 px-4 max-w-[75%] ${messageClass}`}>
      {message.message && <div className="mb-2">{message.message}</div>}
      <div className="relative rounded-md overflow-hidden">
        {!isPlaying ? (
          <div className="relative">
            <Image
              src={thumbnailError ? "/video.svg" : message.thumbnail_url}
              alt={message.file_name}
              width={240}
              height={135}
              className="object-cover w-full"
              onError={() => setThumbnailError(true)}
            />
            <div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer"
              onClick={handlePlay}
            >
              <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {message.duration}
              </div>
            </div>
          </div>
        ) : videoError ? (
          <div className="bg-gray-100 p-4 text-center rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mx-auto text-gray-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-gray-600">Video could not be played</p>
            <button
              className="mt-2 px-3 py-1 bg-gray-200 rounded text-xs font-medium"
              onClick={() => window.open(message.media_url, "_blank")}
            >
              Download video
            </button>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={message.media_url}
            controls
            className="w-full max-w-[240px]"
            onEnded={() => setIsPlaying(false)}
            onError={() => setVideoError(true)}
          />
        )}
      </div>
    </div>
  );
};

export default VideoMessage;
