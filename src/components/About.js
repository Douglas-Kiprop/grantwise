import React from 'react';

const About = () => {
  return (
    <section id="about-section" className="bg-[#333] py-16 px-5 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Empowering Kenyans with Funding Opportunities
            </h2>
            <p className="text-gray-200 leading-relaxed text-base md:text-lg">
              Our mission is to make grant discovery seamless for Kenyan individuals, 
              businesses, and organizations. We believe in connecting ambitious projects 
              with the right funding opportunities, fostering innovation and growth 
              across the nation. Through our platform, we aim to simplify the grant 
              discovery process and help turn promising ideas into reality.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Empowering Kenyans with funding opportunities" 
              className="w-full rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;