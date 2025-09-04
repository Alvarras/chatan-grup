"use client";

import {
  Message,
  TextMessage as TextMessageType,
  ImageMessage as ImageMessageType,
  VideoMessage as VideoMessageType,
  PdfMessage as PdfMessageType,
  FileMessage as FileMessageType,
  LocationMessage as LocationMessageType,
  CarouselMessage as CarouselMessageType,
  ReplyMessage as ReplyMessageType,
  ButtonsMessage as ButtonsMessageType,
  ContactMessage as ContactMessageType,
} from "@/types/chat";
import { formatMessageTime } from "@/utils/dateUtils";
import TextMessage from "./messages/TextMessage";
import ImageMessage from "./messages/ImageMessage";
import VideoMessage from "./messages/VideoMessage";
import PdfMessage from "./messages/PdfMessage";
import FileMessage from "./messages/FileMessage";
import LocationMessage from "./messages/LocationMessage";
import CarouselMessage from "./messages/CarouselMessage";
import ReplyMessage from "./messages/ReplyMessage";
import ButtonsMessage from "./messages/ButtonsMessage";
import ContactMessage from "./messages/ContactMessage";

interface MessageItemProps {
  message: Message;
  isUser: boolean;
  senderName: string;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isUser,
  senderName,
}) => {
  const messageTime = formatMessageTime(message.timestamp);

  // Always use dark theme
  // No need for isDarkTheme variable as we're directly using dark styles

  const messageContainerClass = isUser
    ? "flex flex-col items-end"
    : "flex flex-col items-start";

  // MessageStatus component
  const MessageStatus = () => {
    if (!isUser) return null;

    let statusIcon;
    switch (message.status) {
      case "sent":
        statusIcon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
        break;
      case "delivered":
        statusIcon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        );
        break;
      case "read":
        statusIcon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
        break;
      default:
        statusIcon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        );
    }

    return <span className="mr-1">{statusIcon}</span>;
  };

  const renderMessage = () => {
    switch (message.type) {
      case "text":
        return (
          <TextMessage message={message as TextMessageType} isUser={isUser} />
        );
      case "image":
        return (
          <ImageMessage message={message as ImageMessageType} isUser={isUser} />
        );
      case "video":
        return (
          <VideoMessage message={message as VideoMessageType} isUser={isUser} />
        );
      case "pdf":
        return (
          <PdfMessage message={message as PdfMessageType} isUser={isUser} />
        );
      case "file":
        return (
          <FileMessage message={message as FileMessageType} isUser={isUser} />
        );
      case "location":
        return (
          <LocationMessage
            message={message as LocationMessageType}
            isUser={isUser}
          />
        );
      case "carousel":
        return (
          <CarouselMessage
            message={message as CarouselMessageType}
            isUser={isUser}
          />
        );
      case "reply":
        return (
          <ReplyMessage message={message as ReplyMessageType} isUser={isUser} />
        );
      case "buttons":
        return (
          <ButtonsMessage
            message={message as ButtonsMessageType}
            isUser={isUser}
          />
        );
      case "contact":
        return (
          <ContactMessage
            message={message as ContactMessageType}
            isUser={isUser}
          />
        );
      default:
        // If unknown type, treat as text message
        return (
          <TextMessage message={message as TextMessageType} isUser={isUser} />
        );
    }
  };

  return (
    <div className={`py-2 px-4 ${messageContainerClass} w-full`}>
      {!isUser && (
        <div className="flex items-center mb-1">
          <div className="w-6 h-6 rounded-full bg-gray-600 mr-2 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-xs font-medium text-gray-300">
              {senderName.charAt(0).toUpperCase()}
            </div>
          </div>
          <span className="text-xs text-gray-400">{senderName}</span>
        </div>
      )}
      {renderMessage()}
      <div
        className={`flex items-center text-xs text-gray-500 mt-1 ${isUser ? "justify-end" : "justify-start"}`}
      >
        <MessageStatus />
        <span>{messageTime}</span>
      </div>
    </div>
  );
};

export default MessageItem;
