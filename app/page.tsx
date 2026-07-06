"use client";

import { useState } from "react";

import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import SearchBox from "@/components/home/SearchBox";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import WhyChoose from "@/components/home/WhyChoose";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [pesquisa, setPesquisa] = useState("");

  return (
    <>
      <Header />

      <Hero />

      <SearchBox
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
      />

      <FeaturedVehicles
        pesquisa={pesquisa}
      />

      <WhyChoose />

      <Footer />
    </>
  );
}