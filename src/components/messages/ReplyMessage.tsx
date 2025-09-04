"use client";

import { ReplyMessage as ReplyMessageType } from "@/types/chat";

interface ReplyMessageProps {
  message: ReplyMessageType;
  isUser: boolean;
}

const ReplyMessage: React.FC<ReplyMessageProps> = ({ message, isUser }) => {
  const messageClass = isUser
    ? "bg-primary-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
    : "bg-gray-100 text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl";

  const replyClass = isUser
    ? "bg-white/20 text-white/90 border-l-4 border-white/50"
    : "bg-gray-200/70 text-gray-700 border-l-4 border-gray-400";

  return (
    <div className={`py-3 px-4 max-w-[75%] ${messageClass}`}>
      <div className={`p-2 rounded mb-2 text-sm ${replyClass}`}>
        <p
          className={`text-xs mb-1 font-medium ${isUser ? "text-white/80" : "text-gray-600"}`}
        >
          {message.replied_message.sender}
        </p>
        <p className="truncate">{message.replied_message.message}</p>
      </div>
      <p className={`text-sm ${isUser ? "text-white" : "text-gray-800"}`}>
        {message.message}
      </p>
    </div>
  );
};

export default ReplyMessage;
