import React from "react";
import AppNavbar from "./_components/navbar";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <AppNavbar />
      {children}
    </div>
  );
}

export default AppLayout;
