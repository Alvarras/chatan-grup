"use client";

import { ContactMessage as ContactMessageType } from "@/types/chat";

interface ContactMessageProps {
  message: ContactMessageType;
  isUser: boolean;
}

const ContactMessage: React.FC<ContactMessageProps> = ({ message, isUser }) => {
  const { contact } = message;

  const messageClass = isUser
    ? "bg-primary-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
    : "bg-gray-100 text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl";

  const actionClass = isUser
    ? "bg-white/10 text-white hover:bg-white/20 border border-white/30"
    : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300";

  return (
    <div className={`py-3 px-4 max-w-[75%] ${messageClass}`}>
      <div className="flex items-center mb-3">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3
            className={`font-medium text-sm ${isUser ? "text-white" : "text-gray-900"}`}
          >
            {contact.name}
          </h3>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 mr-2 ${isUser ? "text-white/80" : "text-gray-500"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span
            className={`text-sm ${isUser ? "text-white/90" : "text-gray-700"}`}
          >
            {contact.phone}
          </span>
        </div>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 mr-2 ${isUser ? "text-white/80" : "text-gray-500"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span
            className={`text-sm ${isUser ? "text-white/90" : "text-gray-700"}`}
          >
            {contact.email}
          </span>
        </div>
      </div>

      <div className="flex space-x-2">
        <a
          href={`tel:${contact.phone}`}
          className={`flex-1 px-3 py-1.5 text-xs rounded text-center ${actionClass}`}
        >
          Call
        </a>
        <a
          href={`mailto:${contact.email}`}
          className={`flex-1 px-3 py-1.5 text-xs rounded text-center ${actionClass}`}
        >
          Email
        </a>
        <button
          onClick={() => {
            navigator.clipboard.writeText(contact.phone);
            alert("Phone number copied to clipboard");
          }}
          className={`flex-1 px-3 py-1.5 text-xs rounded text-center ${actionClass}`}
        >
          Copy
        </button>
      </div>

      {message.message && (
        <p
          className={`mt-3 text-sm ${isUser ? "text-white/90" : "text-gray-700"}`}
        >
          {message.message}
        </p>
      )}
    </div>
  );
};

export default ContactMessage;
