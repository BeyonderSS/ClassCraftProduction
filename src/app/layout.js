// app/layout.js
import ProvidersWrapper from "./ProvidersWrapper";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProvidersWrapper>
          {children}
          <Analytics />
        </ProvidersWrapper>
      </body>
    </html>
  );
}
