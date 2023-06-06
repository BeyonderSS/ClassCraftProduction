// app/layout.js 
import Header from "./Header";
import ProvidersWrapper from "./ProvidersWrapper";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProvidersWrapper>
          <Header />
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}
