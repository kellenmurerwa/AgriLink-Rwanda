import React from 'react';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="ContentContainer">
      <h1 className="PageTitle">Contact Us</h1>
      
      <div className="ContactGrid">
        <div className="ContactInfo">
          <h2 className="SectionTitle">Get in Touch</h2>
          <p className="Paragraph">
            Have questions about AgriLink Rwanda? Want to learn more about how our platform can help you?
            Fill out the form and our team will get back to you shortly.
          </p>
          
          <div className="AddressBlock">
            <h3 className="AddressTitle">Our Office</h3>
            <p className="AddressLine">Kigali, Rwanda</p>
            <p className="AddressLine">Email: info@agrilinkrwanda.rw</p>
            <p className="AddressLine">Phone: +250 781386451</p>
          </div>
        </div>
        
        <div className="FormContainer">
          <form className="ContactForm">
            <div className="FormGroup">
              <label htmlFor="name" className="FormLabel">Name</label>
              <input
                type="text"
                id="name"
                className="FormInput"
                placeholder="Your name"
              />
            </div>
            
            <div className="FormGroup">
              <label htmlFor="email" className="FormLabel">Email</label>
              <input
                type="email"
                id="email"
                className="FormInput"
                placeholder="Your email"
              />
            </div>
            
            <div className="FormGroup">
              <label htmlFor="message" className="FormLabel">Message</label>
              <textarea
                id="message"
                rows="4"
                className="FormTextarea"
                placeholder="Your message"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="SubmitButton"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;