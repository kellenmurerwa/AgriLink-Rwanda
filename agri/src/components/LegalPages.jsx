import React from 'react';
import '../styles/LegalPages.css'

// Terms of Service Page
export const TermsOfService = () => {
  return (
    <div className="pageWrapper">
      <div className="contentContainer">
        <h1 className="pageTitle">Terms of Service</h1>
        <div className="contentBox">
          <p className="contentParagraph">
            Welcome to AgriLink. By accessing our platform, you agree to comply with and be bound by the
            following terms and conditions of use.
          </p>
          <h2 className="sectionTitle">1. Platform Usage</h2>
          <p className="contentParagraph">
            The AgriLink platform is designed to connect farmers with markets and provide agricultural
            information. Users must not misuse the platform for unauthorized commercial purposes or
            illegal activities.
          </p>
          <h2 className="sectionTitle">2. User Accounts</h2>
          <p className="contentParagraph">
            Users are responsible for maintaining the confidentiality of their account information
            and for all activities that occur under their account.
          </p>
          <h2 className="sectionTitle">3. Data Policy</h2>
          <p className="contentParagraph">
            Information collected through the platform is subject to our Privacy Policy. By using
            AgriLink, you consent to our data practices as described in that policy.
          </p>
        </div>
      </div>
    </div>
  );
};

// Privacy Policy Page
export const PrivacyPolicy = () => {
  return (
    <div className="pageWrapper">
      <div className="contentContainer">
        <h1 className="pageTitle">Privacy Policy</h1>
        <div className="contentBox">
          <p className="contentParagraph">
            AgriLink is committed to protecting the privacy and security of our users. This Privacy
            Policy explains how we collect, use, and safeguard your information.
          </p>
          <h2 className="sectionTitle">1. Information Collection</h2>
          <p className="contentParagraph">
            We collect personal information such as name, contact details, and farm location when
            you register. We also collect usage data to improve our services.
          </p>
          <h2 className="sectionTitle">2. Information Usage</h2>
          <p className="contentParagraph">
            Your information is used to provide and improve our services, connect you with relevant
            markets, and send important updates about the platform.
          </p>
          <h2 className="sectionTitle">3. Data Security</h2>
          <p className="contentParagraph">
            We implement appropriate security measures to protect your personal information
            against unauthorized access or disclosure.
          </p>
        </div>
      </div>
    </div>
  );
};

// FAQ Page
export const FAQ = () => {
  return (
    <div className="pageWrapper">
      <div className="contentContainer">
        <h1 className="pageTitle">Frequently Asked Questions</h1>
        <div className="contentBox">
          <div className="faqItem">
            <h2 className="faqQuestion">How do I register as a farmer?</h2>
            <p className="faqAnswer">
              Click the "Sign Up" button on our homepage, select "Farmer" as your account type, 
              and fill out the registration form with your personal and farm details.
            </p>
          </div>
          <div className="faqItem">
            <h2 className="faqQuestion">How can I list my products for sale?</h2>
            <p className="faqAnswer">
              After logging in, navigate to "My Products" in your dashboard, click "Add New Product,"
              and fill out the product details including quantity, price, and available dates.
            </p>
          </div>
          <div className="faqItem">
            <h2 className="faqQuestion">Are there fees for using AgriLink?</h2>
            <p className="faqAnswer">
              Basic access to AgriLink is free for all farmers. We charge a small commission only when
              successful sales are made through our platform.
            </p>
          </div>
          <div className="faqItem">
            <h2 className="faqQuestion">How do I access the training resources?</h2>
            <p className="faqAnswer">
              Training resources are available in the "Learning" section of your dashboard. You can
              filter by topic or format to find relevant materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};