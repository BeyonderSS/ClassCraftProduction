// app/layout.js
import ProvidersWrapper from "./ProvidersWrapper";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <head>
        <title>Class Craft || Powered By Flourishers Edge</title>
        <link rel="icon" href="/CC.ico" />
      </head>
      <body>
        <ProvidersWrapper>
          {children}
          <Analytics />
        </ProvidersWrapper>
      </body>
    </html>
  );
}
