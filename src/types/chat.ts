export interface Participant {
  id: string;
  name: string;
  role: number;
}

export interface Room {
  name: string;
  id: number;
  image_url: string;
  participant: Participant[];
}

export interface BaseMessage {
  id: number;
  type: string;
  message: string;
  sender: string;
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}

export interface TextMessage extends BaseMessage {
  type: "text";
}

export interface ImageMessage extends BaseMessage {
  type: "image";
  media_url: string;
  thumbnail_url: string;
  file_name: string;
  file_size?: string;
}

export interface VideoMessage extends BaseMessage {
  type: "video";
  media_url: string;
  thumbnail_url: string;
  file_name: string;
  file_size?: string;
  duration: string;
}

export interface PdfMessage extends BaseMessage {
  type: "pdf";
  media_url: string;
  file_name: string;
  file_size: string;
}

export interface FileMessage extends BaseMessage {
  type: "file";
  media_url: string;
  file_name: string;
  file_size: string;
}

export interface Location {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface LocationMessage extends BaseMessage {
  type: "location";
  location: Location;
}

export interface CarouselItem {
  title: string;
  description: string;
  image_url: string;
  url: string;
}

export interface CarouselMessage extends BaseMessage {
  type: "carousel";
  items: CarouselItem[];
}

export interface RepliedMessage {
  id: number;
  message: string;
  sender: string;
}

export interface ReplyMessage extends BaseMessage {
  type: "reply";
  replied_message: RepliedMessage;
}

export interface Button {
  label: string;
  value: string;
  type: "postback" | "link";
}

export interface ButtonsMessage extends BaseMessage {
  type: "buttons";
  buttons: Button[];
}

export interface Contact {
  name: string;
  phone: string;
  email: string;
}

export interface ContactMessage extends BaseMessage {
  type: "contact";
  contact: Contact;
}

export type Message =
  | TextMessage
  | ImageMessage
  | VideoMessage
  | PdfMessage
  | FileMessage
  | LocationMessage
  | CarouselMessage
  | ReplyMessage
  | ButtonsMessage
  | ContactMessage;

export interface ChatData {
  room: Room;
  comments: Message[];
}

export interface ChatResponse {
  results: ChatData[];
}
