import React from 'react';
import { Link } from 'react-router-dom';

const ServicesLinks = () => {
  const services = [
    { name: 'Market Integration', path: '/market-integration' },
    { name: 'Data Analytics', path: '/data-analytics' },
    { name: 'Farmer Training', path: '/farmer-training' },
    { name: 'Community Building', path: '/community-building' }
  ];

  return (
    <>
      <h3 className="columnTitle">Services</h3>
      <ul className="linkList">
        {services.map((service, index) => (
          <li key={index} className="linkItem">
            <Link to={service.path} className="footerLink">
              {service.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ServicesLinks;