import type { Metadata } from "next";
import "./globals.css";
import { store } from './Store/store';
import { Providers } from "./Store/Provider";


export const metadata: Metadata = {
  title: "MachinVise",
  description: "Project about machine service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" >
        <body>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
  );
}
