import React from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Features from "./components/Features";
import Hero from "./components/Hero";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
