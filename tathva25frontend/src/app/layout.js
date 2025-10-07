
import "./globals.css";

export const metadata = {
  title: "Tathva 25",
  description: "Tathva"
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
