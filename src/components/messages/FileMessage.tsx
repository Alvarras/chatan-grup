"use client";

import { FileMessage as FileMessageType } from "@/types/chat";
import Image from "next/image";

interface FileMessageProps {
  message: FileMessageType;
  isUser: boolean;
}

const FileMessage: React.FC<FileMessageProps> = ({ message, isUser }) => {
  const messageClass = isUser
    ? "bg-primary-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
    : "bg-gray-100 text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl";

  // Function to get file icon based on extension
  const getFileIcon = () => {
    const extension = message.file_name.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "doc":
      case "docx":
        return "/file.svg"; // Use your own SVG or icon
      case "xls":
      case "xlsx":
        return "/file.svg";
      case "zip":
      case "rar":
        return "/file.svg";
      default:
        return "/file.svg";
    }
  };

  // Function to format file size
  const formatFileSize = (fileSize: string) => {
    return fileSize;
  };

  const downloadFile = () => {
    window.open(message.media_url, "_blank");
  };

  return (
    <div className={`py-3 px-4 max-w-[75%] ${messageClass}`}>
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
          <Image
            src={getFileIcon()}
            alt="File icon"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium truncate ${isUser ? "text-white" : "text-gray-900"}`}
          >
            {message.file_name}
          </p>
          <p
            className={`text-xs ${isUser ? "text-gray-200" : "text-gray-500"}`}
          >
            {formatFileSize(message.file_size)}
          </p>
        </div>
        <button
          onClick={downloadFile}
          className={`flex-shrink-0 p-1 rounded-full ${isUser ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <p
        className={`mt-2 text-sm ${isUser ? "text-white/90" : "text-gray-700"}`}
      >
        {message.message}
      </p>
    </div>
  );
};

export default FileMessage;
