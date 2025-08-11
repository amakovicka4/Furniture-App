import React from 'react';

const About = () => {
  return (
    <div className="about-container" style={{ padding: '120px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Our Story</h1>
      <p>
        This project began as a class assignment — but quickly turned into something we truly cared about.
        Countless late nights, dozens of bugs, and gallons of coffee later, we built something we're proud of.
      </p>

      <p>
        From designing the frontend components to handling the backend logic and building a fully connected database,
        every step pushed us to think harder and learn faster. Each feature you see came from hard work and dedication.
      </p>

      <p>
        Thank you for visiting. We hope you enjoy exploring it as much as we enjoyed building it.
      </p>

      {/* 👇 you can embed a photo, logo, or quote here */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
          "Blood, sweat, and semicolons."
        </p>
      </div>
    </div>
  );
};

export default About;