import Hero from "../components/Hero";
import Features from "../components/Features";
import BlogSection from "../components/BlogSection";
import TestimonialSection from "../components/TestimonialSection";
import CtaSection from "../components/CtaSection";
import FaqSection from "../components/FaqSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <TestimonialSection />
      <BlogSection />
      <CtaSection />
      <FaqSection />
    </div>
  );
};

export default Home;
