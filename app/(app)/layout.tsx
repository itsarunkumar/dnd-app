import React from "react";

import { Navbar } from "@/components/navbar";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      {/* <AppNavbar /> */}

      <Navbar />

      {children}
    </div>
  );
}

export default AppLayout;
