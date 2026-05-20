import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/Wrapper/page";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart Drainase RT",
  description: "Sistem di Kanal BTP",
};



export default function RootLayout({ children }) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex w-full">

        <ClientLayout />

    <main className="flex-1">
        {children}
    </main>

</body>
    </html>
  );
}