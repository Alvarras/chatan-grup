"use client";

import { useState, useRef } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For demo purposes, just show the filename in the message
      const fileMessage = `[File: ${file.name}]`;
      onSendMessage(fileMessage);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Define attachment types with icons and accept attributes
  const attachmentTypes = [
    {
      name: "Image",
      icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
      accept: "image/*",
    },
    {
      name: "Video",
      icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
      accept: "video/*",
    },
    {
      name: "Document",
      icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
      accept: ".pdf,.doc,.docx,.txt",
    },
    {
      name: "Location",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 10a3 3 0 11-6 0 3 3 0 016 0z",
      accept: "",
    },
    {
      name: "Contact",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      accept: "",
    },
  ];

  return (
    <div className="border-t border-gray-700 bg-gray-800 px-4 pt-3 pb-4 shadow-lg relative z-10">
      {isAttachmentMenuOpen && (
        <div className="grid grid-cols-5 gap-2 mb-3 p-2 bg-gray-700 rounded-lg">
          {attachmentTypes.map((type) => (
            <button
              key={type.name}
              type="button"
              className="flex flex-col items-center justify-center p-2 hover:bg-gray-600 rounded-lg transition-colors text-gray-200 focus:outline-none"
              onClick={() => {
                if (type.accept && fileInputRef.current) {
                  fileInputRef.current.setAttribute("accept", type.accept);
                  fileInputRef.current.click();
                }
                setIsAttachmentMenuOpen(false);
              }}
            >
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mb-1">
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
                    d={type.icon}
                  />
                </svg>
              </div>
              <span className="text-xs">{type.name}</span>
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2 mt-1 pb-1">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-2 rounded-full text-gray-300 hover:bg-gray-700 focus:outline-none"
            onClick={() => {
              setIsEmojiPickerOpen(!isEmojiPickerOpen);
              setIsAttachmentMenuOpen(false);
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="p-2 rounded-full text-gray-300 hover:bg-gray-700 focus:outline-none"
            onClick={() => {
              setIsAttachmentMenuOpen(!isAttachmentMenuOpen);
              setIsEmojiPickerOpen(false);
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
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
        <div className="relative flex-1 mr-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full border rounded-full py-2 px-4 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
          {isEmojiPickerOpen && (
            <div className="absolute bottom-12 left-0 bg-gray-700 border-gray-600 shadow-lg rounded-lg p-2 border z-10">
              <div className="grid grid-cols-7 gap-2">
                {[
                  "😀",
                  "😂",
                  "😊",
                  "😍",
                  "😢",
                  "😎",
                  "👍",
                  "👏",
                  "🎉",
                  "❤️",
                  "🔥",
                  "👋",
                  "🤔",
                  "👀",
                  "👻",
                  "🚀",
                  "🌟",
                  "🎵",
                  "🎁",
                  "🍕",
                  "☕",
                ].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="text-2xl hover:bg-gray-600 rounded p-1 cursor-pointer"
                    onClick={() => {
                      setMessage((prev) => prev + emoji);
                      setIsEmojiPickerOpen(false);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={!message.trim()}
          className={`p-2 rounded-full focus:outline-none transition-colors ${
            message.trim()
              ? "bg-primary-600 text-white hover:bg-primary-700"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
