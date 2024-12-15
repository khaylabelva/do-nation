import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import AksiSection from "../../components/AksiSection";
import DonasiSection from "../../components/DonasiSection";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <main className="container mx-auto px-8 mt-32 mb-4">
        <AksiSection />
        <DonasiSection />
      </main>
    </div>
  );
};

export default Home;
