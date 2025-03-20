import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import GrantCategories from '../components/GrantCategories';
import FeaturedGrants from '../components/FeaturedGrants';
import ThreeCardGrants from '../components/ThreeCardGrants';
import ExploreGrants from '../components/ExploreGrants';
import NGOGrants from '../components/NGOGrants';
import EducationGrants from '../components/EducationGrants';
import About from '../components/About';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <div>
      <Header />
      <Hero />
      <GrantCategories />
      <FeaturedGrants />
      <ThreeCardGrants />
      <ExploreGrants />
      <NGOGrants />
      <EducationGrants />
      <About />
      <Footer />
    </div>
  );
};

export default Landing;