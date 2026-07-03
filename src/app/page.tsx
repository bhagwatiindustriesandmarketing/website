import Hero from "@/components/home/Hero";
import StatsSection from "@/components/home/StatsSection";
import NewLaunch from "@/components/home/NewLaunch";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutPreview from "@/components/home/AboutPreview";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <NewLaunch />
      <CategorySection />
      <FeaturedProducts />
      <AboutPreview />
      <Testimonials />
      <CTABanner />
    </main>
  );
}
