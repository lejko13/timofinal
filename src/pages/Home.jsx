import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/home/HeroSection";
import ProjectsShowcase from "../components/home/ProjectsShowcase";
import ServicesSection from "../components/home/ServicesSection";
import ReviewsSection from "../components/home/ReviewsSection";
import InstagramSection from "../components/home/InstagramSection";
import ContactCTA from "../components/home/ContactCTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProjectsShowcase />
      <ServicesSection />
      <ReviewsSection />
      <InstagramSection />
      <ContactCTA />
      <Footer />
    </div>
  );
}