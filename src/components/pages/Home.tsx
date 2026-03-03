import Navbar from "../Navbar";
import Hero from "../Hero";
import TrendingSection from "../TrendingSection";
import NewReleaseSection from "../NewReleaseSection";
import Footer from "../Footer";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />

      {/* TRENDING */}
      <TrendingSection />

      {/* NEW RELEASE */}
      <NewReleaseSection />

      <footer className="max-w-360 mx-auto px-8">
        <Footer />
      </footer>
    </div>
  );
}
