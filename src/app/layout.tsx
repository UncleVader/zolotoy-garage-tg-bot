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
          <div className="relative h-full flex flex-col justify-between">
            <Header />

            {children}

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
