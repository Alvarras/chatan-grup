"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChatData } from "@/hooks/useChatData";
import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import MessageInput from "./MessageInput";
import { Message, Room } from "@/types/chat";
import Image from "next/image";

const ChatContainer: React.FC = () => {
  const { data, loading, error } = useChatData();
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<Room | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Always use dark theme
  // No need for isDarkTheme variable as we're directly using dark styles

  // Apply dark theme when component mounts
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    if (data && data.results && data.results.length > 0) {
      setMessages(data.results[0].comments);
      setRoom(data.results[0].room);
    }
  }, [data]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      type: "text",
      message: text,
      sender: "customer@mail.com",
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden dark bg-gray-900">
      {/* Overlay for mobile when sidebar is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar - improved styling and responsive behavior */}
      <div
        className={`bg-gray-800 border-gray-700 w-[320px] border-r flex-shrink-0 
                   fixed md:static left-0 top-0 h-full z-20 transition-transform duration-300 ease-in-out flex flex-col
                   ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-4 border-b border-gray-700 bg-gray-900 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Qiscus Chat</h2>
          <div className="flex items-center gap-2">
            {/* Mobile close button */}
            <button
              className="p-1 rounded-full md:hidden text-gray-300 hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="p-3 border-b border-gray-700">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search conversations..."
              className="block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Filter options */}
        <div className="p-3 border-b border-gray-700 flex space-x-2">
          <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 transition-colors">
            Active Chats
          </button>
          <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 transition-colors">
            Direct Messages
          </button>
        </div>

        {/* New chat button */}
        <div className="p-3 border-b border-gray-700">
          <button className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Chat
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-230px)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {/* Active chat item */}
          {/* Active conversation with badge */}
          <div className="p-3 border-b border-gray-700 bg-gray-700 hover:bg-gray-600 cursor-pointer transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 relative shadow-sm">
                <Image
                  src={room?.image_url || "/user.svg"}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                  onError={() => {
                    // This is handled by Next.js Image component automatically
                  }}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-white">
                    {room?.name || "Customer Support"}
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">
                    3m ago
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-300 truncate w-40">
                    {messages.length > 0
                      ? messages[messages.length - 1].message
                      : "No messages yet"}
                  </p>
                  <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                    2
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional conversation examples to fill the sidebar */}
          <div className="p-3 border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex-shrink-0 relative shadow-sm flex items-center justify-center">
                <span className="text-purple-700 font-bold text-lg">M</span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 border-2 border-white rounded-full"></span>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">
                    Marketing Team
                  </h3>
                  <span className="text-xs text-gray-500 font-medium">
                    Yesterday
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-600 truncate w-40">
                    Let&apos;s discuss the new campaign
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex-shrink-0 relative shadow-sm flex items-center justify-center">
                <span className="text-blue-700 font-bold text-lg">T</span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">
                    Technical Support
                  </h3>
                  <span className="text-xs text-gray-500 font-medium">
                    2d ago
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-600 truncate w-40">
                    How can I help you today?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User profile section */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 bg-gray-800 p-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold text-lg shadow-sm">
              Y
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-white">You</p>
              <p className="text-xs text-gray-400">Online</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-full transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path
                  fillRule="evenodd"
                  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden md:ml-0">
        <ChatHeader
          roomName={room?.name || "Customer Support"}
          participantCount={room?.participant?.length || 0}
          imageUrl={room?.image_url}
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <div className="flex-1 overflow-hidden bg-gray-800 relative">
          <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-5 pointer-events-none"></div>
          <div className="relative h-full flex flex-col">
            <MessageList
              messages={messages}
              currentUserId="customer@mail.com"
            />
            <div ref={messagesEndRef} />
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
