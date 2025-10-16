
import Sidebar from "../../component/Sidebar";
import "./globals.css";

export const metadata = {
  title: "Tathva 25",
  description: "Tathva"
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
