// app/layout.js
import Header from "./Header";
import SideBar from "./SideBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {/* <SideBar/> */}
        {children}
      </body>
    </html>
  );
}
