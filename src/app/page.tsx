import { redirect } from "next/navigation";

export default function Home() {
  // Redirect users directly to the chat page
  redirect("/chat");
}
