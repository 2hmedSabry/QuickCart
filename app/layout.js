import { Outfit } from "next/font/google";
import "./globals.css";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata = {
  title: "QuickCart - GreatStack",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    
    <ClerkProvider>
          <AppContextProvider>
    
    <html lang="en">
      <body className={`antialiased`}>
          {children}
      </body>
    </html>
                </AppContextProvider>
        </ClerkProvider>

  );
}
