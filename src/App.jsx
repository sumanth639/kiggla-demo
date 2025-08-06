// import About3 from '../Components/About/About3';
// import Blog3 from '../Components/Blog/Blog3';
// import HomeFaq1 from '../Components/Faq/HomeFaq1';
// import HeroBanner3 from '../Components/HeroBanner/HeroBanner3';
// import HowWork2 from '../Components/HowWork/HowWork2';
// import Project2 from '../Components/Project/Project2';
// import Services3 from '../Components/Services/Services3';
// import Team2 from '../Components/Team/Team2';
import AboutUs from './components/About-Us';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/Hero';
import Services from './components/Services';

const App = () => {
  return (
    <div>
      <div className="main-page-area3">
        <Header />
        <div id="home">
          <HeroSection />
        </div>
        <div id="about-us">
          <AboutUs />
        </div>
        <div id="services">
          <Services />
        </div>
        <Footer />
        {/*
        <HowWork2 id="how-it-works" />
        <Project2 id="projects" />
        <Team2 id="team" />
        <HomeFaq1 id="faq" />
        <Blog3 id="blog-section" />
        */}
      </div>
    </div>
  );
};

export default App;
