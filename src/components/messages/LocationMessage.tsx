"use client";

import { LocationMessage as LocationMessageType } from "@/types/chat";

interface LocationMessageProps {
  message: LocationMessageType;
  isUser: boolean;
}

const LocationMessage: React.FC<LocationMessageProps> = ({
  message,
  isUser,
}) => {
  const { location } = message;

  const messageClass = isUser
    ? "bg-primary-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
    : "bg-gray-100 text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl";

  // Google Maps embed URL
  const mapUrl = `https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`;

  // Direct link to Google Maps
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;

  return (
    <div className={`py-3 px-4 max-w-[75%] ${messageClass}`}>
      <div className="rounded-lg overflow-hidden border border-gray-300">
        <iframe
          src={mapUrl}
          width="100%"
          height="200"
          className="border-0"
          allowFullScreen={true}
          loading="lazy"
          title="Map Location"
        ></iframe>
      </div>
      <div className="mt-2">
        <h3
          className={`font-medium text-sm ${isUser ? "text-white" : "text-gray-900"}`}
        >
          {location.name}
        </h3>
        <p
          className={`text-xs mt-1 ${isUser ? "text-white/80" : "text-gray-500"}`}
        >
          {location.address}
        </p>
      </div>
      <div className="mt-3 flex justify-end">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-xs px-3 py-1 rounded-full 
            ${isUser ? "bg-white/20 text-white hover:bg-white/30" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          Get Directions
        </a>
      </div>
      {message.message && (
        <p
          className={`mt-2 text-sm ${isUser ? "text-white/90" : "text-gray-700"}`}
        >
          {message.message}
        </p>
      )}
    </div>
  );
};

export default LocationMessage;
