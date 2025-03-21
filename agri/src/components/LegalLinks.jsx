import React from 'react';
import { Link } from 'react-router-dom';

const LegalLinks = () => {
  const legalItems = [
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'FAQ', path: '/faq' }
  ];

  return (
    <>
      <h3 className="columnTitle">Legal</h3>
      <ul className="linkList">
        {legalItems.map((item, index) => (
          <li key={index} className="linkItem">
            <Link to={item.path} className="footerLink">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default LegalLinks;