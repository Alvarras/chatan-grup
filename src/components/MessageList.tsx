"use client";

import { useRef, useEffect, useMemo } from "react";
import { Message } from "@/types/chat";
import MessageItem from "./MessageItem";
import { formatMessageDate, isToday } from "@/utils/dateUtils";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Always use dark theme
  // No need for isDarkTheme variable as we're directly using dark styles

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Group messages by date
  const groupedMessages = useMemo(() => {
    const grouped: { [key: string]: Message[] } = {};

    messages.forEach((message) => {
      const date = new Date(message.timestamp).toISOString().split("T")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(message);
    });

    return grouped;
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto py-4 px-2 md:px-4 space-y-6 bg-gray-900 bg-opacity-50">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className="space-y-4">
          <div className="flex justify-center my-4">
            <div className="bg-gray-700 text-gray-300 rounded-full px-4 py-1 text-xs">
              {isToday(dateMessages[0].timestamp)
                ? "Today"
                : formatMessageDate(dateMessages[0].timestamp)}
            </div>
          </div>

          <div className="space-y-4">
            {dateMessages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                isUser={message.sender === currentUserId}
                senderName={
                  message.sender === "agent@mail.com"
                    ? "Agent A"
                    : message.sender === "admin@mail.com"
                      ? "Admin"
                      : "You"
                }
              />
            ))}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} className="h-4" />
    </div>
  );
};

export default MessageList;
