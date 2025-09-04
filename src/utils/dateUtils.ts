export const formatMessageTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatMessageDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const isToday = (timestamp: string): boolean => {
  const today = new Date();
  const messageDate = new Date(timestamp);

  return (
    today.getDate() === messageDate.getDate() &&
    today.getMonth() === messageDate.getMonth() &&
    today.getFullYear() === messageDate.getFullYear()
  );
};

export const formatFileSize = (size: string): string => {
  return size;
};
