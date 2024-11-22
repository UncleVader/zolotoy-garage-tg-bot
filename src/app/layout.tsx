import type { Metadata } from "next";
import "./styles/globals.css";
import Providers from "./providers";
import { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children}:{children: ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no,viewport-fit=cover" />
      </head>
      <body>
        <Providers>
          <div className="fixed inset-0 flex flex-col full-screen-container overflow-hidden">
            <Header />

            <div className="flex-1 overflow-y-auto relative overflow-scroll touch-scroll">
              {children}
            </div>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
