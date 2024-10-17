import Hero from "./components/Section/Hero";
import HomeWrapper from "./components/HOC/HomeWrapper";

export default function Home() {
  return (
    <HomeWrapper>
      <Hero />
    </HomeWrapper>
  );
}
