import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header'; // Ensure this imports your existing Header.js
import Hero from '../components/Hero';
import GrantCategories from '../components/GrantCategories';
import FeaturedGrants from '../components/FeaturedGrants';
import EnvironmentGrants from '../components/EnvironmentGrants';
import HealthGrants from '../components/HealthGrants';
import TechnologyGrants from '../components/TechnologyGrants';
import EducationGrants from '../components/EducationGrants';
import About from '../components/About';
import Footer from '../components/Footer'; // Import the Footer component

const Home = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopCategories = async () => {
      setIsLoading(true);
      setError(null);
      console.log("Home.js: Fetching top categories..."); // <-- Log: Start fetching
      try {
        const apiBaseUrl = process.env.REACT_APP_API_URL || '';
        const response = await axios.get(`${apiBaseUrl}/grants/landing/categories`);
        console.log("Home.js: API Response:", response); // <-- Log: Full API response

        if (Array.isArray(response.data) && response.data.length > 0) {
            console.log("Home.js: Setting featured categories:", response.data.slice(0, 4)); // <-- Log: Data being set
            setFeaturedCategories(response.data.slice(0, 4));
        } else {
            console.log("Home.js: No categories found or invalid data received:", response.data); // <-- Log: Empty/invalid data
            setFeaturedCategories([]);
        }
      } catch (err) {
        console.error("Home.js: Failed to fetch landing page categories:", err); // <-- Log: Error object
        setError('Could not load featured categories.');
        setFeaturedCategories([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopCategories();
  }, []);

  const categoryDisplayComponents = [
      EnvironmentGrants,   // environment grants
      HealthGrants,        // health grants
      TechnologyGrants,    // technology grants
      EducationGrants      // education grants
  ];

  // Remove the mainContentStyle definition entirely
  // const mainContentStyle = {
  //   paddingTop: '80px',
  // };

  console.log("Home.js: Rendering with featuredCategories:", featuredCategories); // <-- Log: State during render
  console.log("Home.js: isLoading:", isLoading, "error:", error); // <-- Log: Loading/error state during render

  return (
    <div> {/* This is the single root element */}
      <Header />

      <Hero />
      <GrantCategories />
      <FeaturedGrants />

      {/* Render loading/error state or the dynamic components */}
      {isLoading && <div style={{ textAlign: 'center', padding: '40px' }}>Loading featured grants...</div>}
      {error && <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error: {error}</div>}

      {/* Conditional rendering based on state */}
      {!isLoading && !error && featuredCategories.length > 0 && (
        <>
          {/* Map fetched category names to the corresponding display components */}
          {featuredCategories.map((categoryName, index) => {
            const ComponentToRender = categoryDisplayComponents[index];
            console.log(`Home.js: Rendering component ${index} for category: ${categoryName}`); // <-- Log: Rendering specific component
            return ComponentToRender ? <ComponentToRender key={categoryName} categoryName={categoryName} /> : null;
          })}
        </>
      )}
      {/* Render a message if no categories were loaded */}
      {!isLoading && !error && featuredCategories.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>No featured grant categories available at the moment.</div>
      )}

      {/* Keep other static sections like About */}
      <About id="about-section" />

      <Footer /> {/* Move Footer inside the main div */}
    </div> // This closes the single root element
    // <Footer /> {/* Remove Footer from here */}
  );
};

export default Home;