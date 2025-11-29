import React, { useEffect } from "react";
import Header from "../components/Header";
import SpecialityMenue from "../components/SpecialityMenue";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";

const Home = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      <SpecialityMenue />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
