import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "../components/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Studio IAD | Ishan Ahluwalia Design",
  description: "Ishan Ahluwalia Design Studio Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
