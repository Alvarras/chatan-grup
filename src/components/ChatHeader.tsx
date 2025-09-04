"use client";

import Image from "next/image";
import { useState } from "react";

interface ChatHeaderProps {
  roomName: string;
  participantCount: number;
  imageUrl?: string;
  onMenuClick?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  roomName,
  participantCount,
  imageUrl,
  onMenuClick,
}) => {
  const [imageError, setImageError] = useState(false);

  // Always use dark theme
  // No need for isDarkTheme variable as we're directly using dark styles

  return (
    <div className="flex items-center px-4 py-4 border-b border-gray-700 bg-gray-800 shadow-gray-900/20 shadow-md sticky top-0 z-10 h-[67px]">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="mr-3 p-2 rounded-md md:hidden text-gray-300 hover:bg-gray-700 focus:outline-none"
        aria-label="Open menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageError ? "/user.svg" : imageUrl}
            alt={roomName}
            fill
            sizes="(max-width: 768px) 40px, 48px"
            className="rounded-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-200 font-semibold text-lg">
              {roomName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      </div>

      <div className="ml-3 flex-1">
        <h1 className="text-lg font-semibold text-white">{roomName}</h1>
        <p className="text-sm text-gray-400">
          {participantCount > 0 ? `${participantCount} participants` : "Online"}
        </p>
      </div>

      <div className="flex items-center">
        <button className="p-2 rounded-full hover:bg-gray-700 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        </button>
        <button className="p-2 rounded-full hover:bg-gray-700 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-700 text-gray-300 ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
