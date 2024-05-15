import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Link } from 'react-router-dom';


const MainNav: React.FC = () => {
  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate('/sign-in'); // Navigate to the sign-in route
  };
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <a className="main-nav-item" onClick={handleSignInClick}>
          <i className="fa fa-user-circle"></i>
          Sign In
        </a>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="hero bg-hero-image h-hero-height bg-cover bg-center">
      <section className="hero-content mx-auto w-80 rounded-lg bg-white p-8 text-left">
        <h2 className="sr-only">Promoted Content</h2>
        <p className="subtitle">No fees.</p>
        <p className="subtitle">No minimum deposit.</p>
        <p className="subtitle">High interest rates.</p>
        <p className="text">Open a savings account with Argent Bank today!</p>
      </section>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section className="features flex flex-col md:flex-row">
      <div className="feature-item flex-1 p-10">
        <img
          src="./img/icon-chat.png"
          alt="Chat Icon"
          className="feature-icon"
        />
        <h3 className="feature-item-title">You are our #1 priority</h3>
        <p>
          Need to talk to a representative? You can get in touch through our
          24/7 chat or through a phone call in less than 5 minutes.
        </p>
      </div>
      <div className="feature-item flex-1 p-10">
        <img
          src="./img/icon-money.png"
          alt="Chat Icon"
          className="feature-icon"
        />
        <h3 className="feature-item-title">More savings means higher rates</h3>
        <p>The more you save with us, the higher your interest rate will be!</p>
      </div>
      <div className="feature-item flex-1 p-10">
        <img
          src="./img/icon-security.png"
          alt="Chat Icon"
          className="feature-icon"
        />
        <h3 className="feature-item-title">Security you can trust</h3>
        <p>
          We use top of the line encryption to make sure your data and money is
          always safe.
        </p>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const { testData } = useSelector((state: RootState) => state.auth);
  return (
    <footer className="footer flex justify-center border-t-2 border-gray-400 pt-8">
      <p className="footer-text">Copyright 2020 Argent Bank</p>
      <h2 className="ml-4">Test Data</h2>
      {testData ? (
        <p>Test Data Message: {testData.message}</p>
      ) : (
        <p>No test data available.</p>
      )}
    </footer>
  );
};

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <MainNav />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
