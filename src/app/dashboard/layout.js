// app/layout.js
'use client'
import { useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

export default function RootLayout({ children }) {

   // Function to disable right-click
   const disableRightClick = (e) => {
    e.preventDefault();
  };

  // Add a right-click event listener to the body element
  document.body.addEventListener("contextmenu", disableRightClick);

  // Remove the event listener and restore inspect mode when the component unmounts
  useEffect(() => {
    return () => {
      document.body.removeEventListener("contextmenu", disableRightClick);
      document.onkeydown = null;
    };
  }, []);
  return (
    <html lang="en">
    <head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <link rel="manifest" href="/manifest.json" />
    </head>
      <body>
        <Header />
        {/* <SideBar/> */}
        {children}
      </body>
    </html>
  );
}
