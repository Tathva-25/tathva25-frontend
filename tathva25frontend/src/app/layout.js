import "./globals.css";
import MenuWrapper from "./components/MenuWrapper";

export const metadata = {
  title: "Tathva 25",
  description: "Tathva",
};

export default function RootLayout({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <html lang="en">
      <body className="relative overflow-x-hidden">
        {/* Background */}
        {children}
      </body>
    </html>
  );
}
