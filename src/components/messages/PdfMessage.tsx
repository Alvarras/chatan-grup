"use client";

import { PdfMessage as PdfMessageType } from "@/types/chat";
import { formatFileSize } from "@/utils/dateUtils";

interface PdfMessageProps {
  message: PdfMessageType;
  isUser: boolean;
}

const PdfMessage: React.FC<PdfMessageProps> = ({ message, isUser }) => {
  const messageClass = isUser
    ? "bg-primary-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
    : "bg-gray-100 text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl";

  const openPdf = () => {
    window.open(message.media_url, "_blank");
  };

  return (
    <div className={`py-2 px-4 max-w-[75%] ${messageClass}`}>
      {message.message && <div className="mb-2">{message.message}</div>}
      <div
        className="flex items-center p-3 bg-white bg-opacity-10 rounded cursor-pointer"
        onClick={openPdf}
      >
        <div className="flex-shrink-0 mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 20 20"
            fill={isUser ? "white" : "red"}
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{message.file_name}</p>
          <p className="text-xs opacity-70">
            {formatFileSize(message.file_size)}
          </p>
        </div>
        <div className="ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PdfMessage;
