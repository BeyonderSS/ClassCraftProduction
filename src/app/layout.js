import ProvidersWrapper from "./ProvidersWrapper";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
 

  return (
    <html lang="en">
      <head>
        <title>Class Craft || Powered By Flourishers Edge</title>
        <link rel="icon" href="/CC.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <link rel="manifest" href="/manifest.json" />
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
