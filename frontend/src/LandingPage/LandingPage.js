import Hero from "./Hero.js";
import Features from "./Features.js";
import Work from "./Work.js";
import BloodType from "./BloodType.js";
import Difference from "./Difference";

function LandingPage() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="work">
        <Work/>
      </section>
      <section id="blood-types">
        <BloodType />
      </section>
      <section id="difference">
        <Difference />
      </section>
    </>
  );
}

export default LandingPage;
