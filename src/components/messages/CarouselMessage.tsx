"use client";

import { CarouselMessage as CarouselMessageType } from "@/types/chat";
import Image from "next/image";
import { useState } from "react";

interface CarouselMessageProps {
  message: CarouselMessageType;
  isUser: boolean;
}

const CarouselMessage: React.FC<CarouselMessageProps> = ({
  message,
  isUser,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<boolean[]>(
    new Array(message.items.length).fill(false),
  );

  const messageClass = isUser
    ? "bg-primary-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
    : "bg-gray-100 text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl";

  const handleImageError = (index: number) => {
    const newErrors = [...imageErrors];
    newErrors[index] = true;
    setImageErrors(newErrors);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === message.items.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? message.items.length - 1 : prevIndex - 1,
    );
  };

  const currentItem = message.items[currentIndex];

  return (
    <div className={`py-3 px-4 max-w-[90%] w-72 ${messageClass}`}>
      <div className="relative">
        <div className="rounded-lg overflow-hidden h-40 bg-gray-200 relative">
          {!imageErrors[currentIndex] ? (
            <Image
              src={currentItem.image_url}
              alt={currentItem.title}
              fill
              sizes="100%"
              className="object-cover"
              onError={() => handleImageError(currentIndex)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-1 rounded-full text-white"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-1 rounded-full text-white"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
            {message.items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full ${
                  currentIndex === index ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <h3
            className={`font-medium text-sm ${isUser ? "text-white" : "text-gray-900"}`}
          >
            {currentItem.title}
          </h3>
          <p
            className={`text-xs mt-1 ${isUser ? "text-white/80" : "text-gray-500"}`}
          >
            {currentItem.description}
          </p>
        </div>

        <div className="mt-3">
          <a
            href={currentItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block text-center text-xs px-4 py-2 rounded-lg border ${
              isUser
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-gray-300 text-gray-700 hover:bg-gray-200"
            }`}
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarouselMessage;
