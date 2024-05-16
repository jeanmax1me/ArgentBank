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

  export default Hero;