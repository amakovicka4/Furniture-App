import React from 'react';

const teamMembers = [
  { name: 'Jason Irwin', email: 'jason@huskers.unl.edu' },
  { name: 'Amr Elsayed', email: 'aelsayed5@huskers.unl.edu' },
  { name: 'Caleb List', email: 'caleb@huskers.unl.edu' },
  { name: 'Aiden Makovicka', email: 'aiden@huskers.unl.edu' },
  { name: 'Kyle Nguyen', email: 'kyle@huskers.unl.edu' },
  { name: 'Collin Sauley', email: 'collin@huskers.unl.edu' },
];

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Meet the Team</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <div className="avatar-circle">
              {member.name.charAt(0)}
            </div>
            <h3>{member.name}</h3>
            <p>{member.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;