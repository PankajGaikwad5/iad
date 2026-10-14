import { League_Spartan } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "../components/LenisProvider";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
});

export const metadata = {
  title: "Studio IAD | Ishan Ahluwalia Design",
  description: "Ishan Ahluwalia Design Studio Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={leagueSpartan.variable}>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
