import React from 'react';
import '../styles/Services.css';
import OIP from '../assets/OIP.jpg';
import markInte from '../assets/markInte.jpg';
import commu from '../assets/commu.webp';
import OIP1 from '../assets/OIP1.jpg';
import sea from '../assets/sea.jpg';

const Services = () => {
  return (
    <div className="ContentContainer">
      <h1 className="PageTitle">Our Services</h1>
      
      <p className="Paragraph">
        AgriLink Rwanda provides a complete platform for district-level agriculture monitoring and
        communication to enable farmers to access buyers.
      </p>
      
      <div className="CardGrid">
        <div className="Card">
        <div class="card-img">
            <img src={sea} alt="Card image placeholder"/>
          </div>
          <h3 className="CardTitle">District Dashboard</h3>
        
          <p className="CardText">Real-time monitoring of agricultural activities, crop production, and market demands across districts.</p>
        </div>
        
        <div className="Card">
        <div class="card-img">
            <img src={OIP1} alt="Card image placeholder"/>
          </div>
          <h3 className="CardTitle">Crop Analytics</h3>
          <p className="CardText">Recommend the optimal crops for planting based on soil condition, climate, and market demands via data-driven recommendations.</p>
        </div>
        
        <div className="Card">
        <div class="card-img">
            <img src={markInte} alt="Card image placeholder"/>
          </div>
          <h3 className="CardTitle">Market Integration</h3>
          <p className="CardText">Direct engagement of farmers and buyers with price updates and demand projection.</p>
        </div>
        
        <div className="Card">
        <div class="card-img">
            <img src={commu} alt="Card image placeholder"/>
          </div>
          <h3 className="CardTitle">Communication Hub</h3>
          <p className="CardText">The messaging system among farmers, district agricultural officers, and buyers is integrated.</p>
        </div>
        
        <div className="Card">
        <div class="card-img">
            <img src={OIP} alt="Card image placeholder"/>
          </div>
          <h3 className="CardTitle">Resource Sharing</h3>
          <p className="CardText">District operations share experiences, equipment, and resources.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;