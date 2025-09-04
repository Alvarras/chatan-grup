"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageMessage as ImageMessageType } from "@/types/chat";

interface ImageMessageProps {
  message: ImageMessageType;
  isUser: boolean;
}

const ImageMessage: React.FC<ImageMessageProps> = ({ message, isUser }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [fullImageError, setFullImageError] = useState(false);

  const messageClass = isUser
    ? "bg-primary-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
    : "bg-gray-100 text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl";

  return (
    <div className={`py-2 px-4 max-w-[75%] ${messageClass}`}>
      {message.message && <div className="mb-2">{message.message}</div>}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsFullScreen(true)}
      >
        <Image
          src={thumbnailError ? "/thumbnail.svg" : message.thumbnail_url}
          alt={message.file_name}
          width={200}
          height={150}
          className="rounded-md object-cover"
          onError={() => setThumbnailError(true)}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 flex items-center justify-center transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white opacity-0 hover:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {isFullScreen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setIsFullScreen(false)}
        >
          <div className="relative max-w-full max-h-full">
            <Image
              src={fullImageError ? "/thumbnail.svg" : message.media_url}
              alt={message.file_name}
              width={800}
              height={600}
              className="object-contain max-h-[90vh]"
              onError={() => setFullImageError(true)}
            />
            <button
              className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full text-white"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullScreen(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageMessage;
