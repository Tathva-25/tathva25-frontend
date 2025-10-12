import "./globals.css";

export const metadata = {
  title: "Expo Tathva 2025",
  description: "Official Expo Tathva showcase page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        {/* Add SCHABO font CDN link here */}
        <link
          href="https://fonts.cdnfonts.com/css/schabo"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
