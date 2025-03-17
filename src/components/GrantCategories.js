import React from 'react';

const GrantCategories = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionStyle = {
    padding: '40px 20px',
    backgroundColor: 'white',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  };

  const cardStyle = {
    textAlign: 'center',
    padding: '30px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    border: '2px solid #e0e0e0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: 'white',
  };

  const iconStyle = {
    fontSize: '40px',
    marginBottom: '15px',
  };

  const categories = [
    {
      id: 'youth-grants',
      icon: '🤝', // Changed from 👨‍👩‍👧‍👦 to 🤝
      title: 'Youth Grants',
      description: 'Opportunities for young innovators.'
    },
    {
      id: 'business-grants',
      icon: '💼',
      title: 'Business Grants',
      description: 'Funding for startups and SMEs.'
    },
    {
      id: 'ngo-grants',
      icon: '👨‍👩‍👧‍👦', // Changed from 🤝 to 👨‍👩‍👧‍👦
      title: 'NGO Grants',
      description: 'Support for community projects.'
    },
    {
      id: 'education-grants',
      icon: '🎓',
      title: 'Education Grants',
      description: 'Scholarships and educational funding.'
    }
  ];

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          {categories.map((category, index) => (
            <div 
              key={index} 
              style={cardStyle}
              onClick={() => scrollToSection(category.id)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.backgroundColor = '#f0f0f0'; // Changed to grey background
                e.currentTarget.style.borderColor = '#cccccc'; // Changed border color
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.backgroundColor = 'white'; // Back to white
                e.currentTarget.style.borderColor = '#e0e0e0'; // Original border color
              }}
            >
              <div style={iconStyle}>{category.icon}</div>
              <h3 style={{ marginBottom: '10px' }}>{category.title}</h3>
              <p style={{ color: '#666' }}>{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrantCategories;