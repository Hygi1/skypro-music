import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Centerblock from "@/components/Centerblock/Centerblock";
import Player from "@/components/Player/Player";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Navbar />
          <Centerblock />
          <Sidebar />
        </main>
        <Player />
      </div>
    </div>
  );
}
