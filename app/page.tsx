"use client";

import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import WhyChoose from "@/components/home/WhyChoose";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <Hero />

      <FeaturedVehicles />

      <WhyChoose />

      <Footer />
    </>
  );
}