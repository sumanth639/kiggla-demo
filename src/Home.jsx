import Header from './components/Header';
import HeroSection from './components/Hero';
import Marquee from './components/Marquee';
import AboutUs from './components/About-Us';
import IndustryImpact from './components/IndustryImpact';
import TeamSection from './components/TeamSection';
import Services from './components/Services';
import CounterSection from './components/CounterSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FooterCredit from './components/FooterCredit';

const Home = () => {
  return (
    <div>
      <Header />
      <div id="home">
        <HeroSection />
      </div>
      <Marquee />
      <div id="about-us">
        <AboutUs />
      </div>
      <IndustryImpact />
      <TeamSection />
      <div id="services">
        <Services />
      </div>
      <div id="impact">
        <CounterSection />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      {/* <Footer /> */}
       <FooterCredit /> 
    </div>
  );
};

export default Home;
