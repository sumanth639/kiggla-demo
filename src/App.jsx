import AboutUs from './components/About-Us';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/Hero';
import Services from './components/Services';
import CounterSection from './components/CounterSection';
import ContactForm from './components/ContactForm';
import Marquee from './components/Marquee';
import FAQSection from './components/FAQSection';
const App = () => {
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
      <div id="services">
        <Services />
      </div>
      <CounterSection />
      <ContactForm />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default App;
