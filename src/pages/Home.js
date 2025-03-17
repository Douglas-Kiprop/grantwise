import React from 'react';
import Hero from '../components/Hero';
import GrantCategories from '../components/GrantCategories';
import FeaturedGrants from '../components/FeaturedGrants';
import ThreeCardGrants from '../components/ThreeCardGrants';
import ExploreGrants from '../components/ExploreGrants';
import NGOGrants from '../components/NGOGrants';
import EducationGrants from '../components/EducationGrants';
import About from '../components/About';

const Home = () => {
  return (
    <div>
      <Hero />
      <GrantCategories />
      <FeaturedGrants />
      <ThreeCardGrants />
      <ExploreGrants />
      <NGOGrants />
      <EducationGrants />
      <About />
    </div>
  );
};

export default Home;