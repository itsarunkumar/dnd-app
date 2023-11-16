import React from "react";
import Navbar from "./_components/navbar";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      {children}
    </>
  );
}

export default AppLayout;
