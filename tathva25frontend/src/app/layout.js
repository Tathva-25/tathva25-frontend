import "./globals.css";
// Import the new wrapper component
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Tathva 25",
  description: "Tathva",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden">
        <Toaster />
        {/* Use the wrapper to manage loading state and content visibility */}
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
