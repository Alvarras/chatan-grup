"use client";

import { ButtonsMessage as ButtonsMessageType } from "@/types/chat";
import { useState } from "react";

interface ButtonsMessageProps {
  message: ButtonsMessageType;
  isUser: boolean;
}

const ButtonsMessage: React.FC<ButtonsMessageProps> = ({ message, isUser }) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const messageClass = isUser
    ? "bg-primary-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
    : "bg-gray-100 text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl";

  const handleButtonClick = (
    label: string,
    value: string,
    type: "postback" | "link",
  ) => {
    setSelectedButton(label);

    if (type === "link") {
      window.open(value, "_blank");
    } else {
      // For postback, you would typically send this value back to your chat server
      console.log("Button postback:", value);
    }
  };

  return (
    <div className={`py-3 px-4 max-w-[75%] ${messageClass}`}>
      <p className={`text-sm mb-3 ${isUser ? "text-white" : "text-gray-800"}`}>
        {message.message}
      </p>

      <div className="flex flex-col space-y-2">
        {message.buttons.map((button, index) => (
          <button
            key={index}
            onClick={() =>
              handleButtonClick(button.label, button.value, button.type)
            }
            disabled={selectedButton !== null}
            className={`px-4 py-2 text-sm rounded-lg text-center transition-colors ${
              selectedButton === button.label
                ? isUser
                  ? "bg-white/30 text-white border border-white/50"
                  : "bg-gray-300 text-gray-700 border border-gray-400"
                : isUser
                  ? "bg-white/10 text-white hover:bg-white/20 border border-white/30"
                  : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300"
            }`}
          >
            {button.label}
            {selectedButton === button.label && <span className="ml-2">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonsMessage;
