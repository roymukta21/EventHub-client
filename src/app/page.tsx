//import Landing from "./Landing";
import Navbar from "../components/Navbar";
import AIAssistant from "../components/AIAssistant";
import Landing from "./landing/page";
//import Landing from "./landing/page";
//import Landing from "./Landing";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Landing />
      </main>
      <AIAssistant />
    </div>
  );
}
