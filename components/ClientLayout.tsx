"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Player from "./Player/Player";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  if (isAuthPage) {
    return <div className="authContainer">{children}</div>;
  }

  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Navbar />
          {children}
          <Sidebar />
        </main>
        <Player />
      </div>
    </div>
  );
}