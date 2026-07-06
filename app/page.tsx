import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchBox from "@/components/SearchBox";
import FeaturedVehicles from "@/components/FeaturedVehicles";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <SearchBox />
      <FeaturedVehicles />
    </>
  );
}