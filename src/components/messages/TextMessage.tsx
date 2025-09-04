"use client";

import { TextMessage as TextMessageType } from "@/types/chat";

interface TextMessageProps {
  message: TextMessageType;
  isUser: boolean;
}

const TextMessage: React.FC<TextMessageProps> = ({ message, isUser }) => {
  const messageClass = isUser
    ? `bg-primary-700 text-white ml-auto rounded-tl-2xl rounded-tr-xl rounded-bl-2xl`
    : `bg-gray-700 text-gray-100 mr-auto rounded-tr-2xl rounded-bl-2xl rounded-br-xl border-gray-600 shadow-sm border`;

  return (
    <div className={`py-3 px-4 max-w-[80%] break-words ${messageClass}`}>
      {message.message}
    </div>
  );
};

export default TextMessage;
