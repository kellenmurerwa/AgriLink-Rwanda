import React from 'react';
import mission from '../assets/mission.png';
import relevance from '../assets/relevance.jpg';
import '../styles/About.css';

const About = () => {
  return (
    <div className="ContentContainer">
      <h1 className="PageTitle">About AgriLink Rwanda</h1>

      <div class="card-grid">
       
        <div class="card">
            <div class="card-img">
                <img src={mission} alt="Card image placeholder"/>
            </div>
            <div class="card-content">
                <h3 class="card-title">Our Mission</h3>
                <p class="card-text">AgriLink Rwanda's mission is to create a unified agricultural communication and
          monitoring platform that connects all districts in Rwanda and enables data-driven
          farming decisions and market integration. We are striving to build a system on which
          districts can share agricultural information so farmers can make crop selections based
          on market demand and environmental conditions and facilitate direct interactions
          between farmers and buyers.</p>
            </div>
        </div>

        <div class="card">
            <div class="card-img">
                <img src={relevance} alt="Card image placeholder"/>
            </div>
            <div class="card-content">
                <h3 class="card-title">Relevance</h3>
                <p class="card-text">AgriLink Rwanda has a mission that remains particularly relevant in Rwanda, where
          agriculture accounts for about 67% of the national employment base, contributing 31%
          to the Gross Domestic Product (GDP). Thus, AgriLink focuses on addressing important
          challenges in agricultural information distribution and market access, given that
          Rwanda's Vision 2050 spells out the modernisation of agriculture with committed digital
          transformation.</p>
          
          <p class="card-text">
          With mobile phone access reaching an unparalleled 80% penetration and internet access 
          being sufficiently plausible, AgriLink is uniquely positioned to connect farmers, districts, 
          and buyers through the digital platform, contributing to the agricultural transformation 
          agenda in Rwanda.
        </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default About;