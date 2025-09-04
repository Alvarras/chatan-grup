"use client";

import { useState, useEffect } from "react";
import { useChatData } from "@/hooks/useChatData";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Message } from "@/types/chat";

const ChatInterface = () => {
  const { data, loading, error } = useChatData();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId] = useState<string>("customer@mail.com");

  // Set messages when data is loaded
  useEffect(() => {
    if (data && data.results && data.results.length > 0) {
      setMessages(data.results[0].comments);
    }
  }, [data]);

  const handleSendMessage = (text: string, type: string, file?: File) => {
    if (!data || !data.results || data.results.length === 0) return;

    const newId = Math.max(...messages.map((m) => m.id)) + 1;
    const timestamp = new Date().toISOString();

    let newMessage: Message;

    if (type === "text") {
      newMessage = {
        id: newId,
        type: "text",
        message: text,
        sender: currentUserId,
        timestamp,
        status: "sent",
      };
    } else if (type === "image" && file) {
      const imageUrl = URL.createObjectURL(file);
      newMessage = {
        id: newId,
        type: "image",
        message: text,
        sender: currentUserId,
        timestamp,
        media_url: imageUrl,
        thumbnail_url: imageUrl,
        file_name: file.name,
        status: "sent",
      } as Message;
    } else if (type === "video" && file) {
      const videoUrl = URL.createObjectURL(file);
      newMessage = {
        id: newId,
        type: "video",
        message: text,
        sender: currentUserId,
        timestamp,
        media_url: videoUrl,
        thumbnail_url: "https://picsum.photos/id/1015/200/150",
        file_name: file.name,
        duration: "00:10",
        status: "sent",
      } as Message;
    } else if (type === "pdf" && file) {
      const pdfUrl = URL.createObjectURL(file);
      newMessage = {
        id: newId,
        type: "pdf",
        message: text,
        sender: currentUserId,
        timestamp,
        media_url: pdfUrl,
        file_name: file.name,
        file_size: `${Math.round(file.size / 1024)}KB`,
        status: "sent",
      } as Message;
    } else {
      return;
    }

    setMessages([...messages, newMessage]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !data || !data.results || data.results.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Failed to load chat data.</div>
      </div>
    );
  }

  const { room, comments } = data.results[0];

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <ChatHeader
        roomName={room.name}
        participantCount={room.participant.length}
        imageUrl={room.image_url}
      />
      <div className="flex-1 overflow-hidden flex flex-col">
        <MessageList
          messages={messages.length > 0 ? messages : comments}
          currentUserId={currentUserId}
        />
        <div className="z-10 relative">
          <MessageInput
            onSendMessage={(text: string) => handleSendMessage(text, "text")}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
