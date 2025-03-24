import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin, Search, Info } from 'lucide-react';
import '../BuyersDashStyles/SupplyDiscovery.css';
import { cropForecastData, cropTypes, locations } from '../BuyersDashboard/mockData';

// Sample supplier data - in a real app, this would come from an API
const sampleSuppliers = [
  { id: 1, name: "Kigali Cooperative", location: "Kigali", crops: ["Rice", "Beans"], quality: "Premium", quantity: 750 },
  { id: 2, name: "Musanze Farmers", location: "Musanze", crops: ["Beans", "Maize"], quality: "Standard", quantity: 1200 },
  { id: 3, name: "Huye Agricultural Group", location: "Huye", crops: ["Rice"], quality: "Premium", quantity: 500 },
  { id: 4, name: "Rubavu Growers", location: "Rubavu", crops: ["Maize"], quality: "Economy", quantity: 350 },
  { id: 5, name: "Nyagatare Producers", location: "Nyagatare", crops: ["Rice", "Beans", "Maize"], quality: "Standard", quantity: 900 },
];

const SupplyDiscovery = () => {
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedQuality, setSelectedQuality] = useState('All Grades');
  const [selectedQuantity, setSelectedQuantity] = useState('Any Amount');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showRegionInfo, setShowRegionInfo] = useState(false);

  // Define colors
  const PRIMARY_GREEN = '#219653';
  const SECONDARY_GREEN = '#27AE60';
  const LIGHT_GREEN = '#6FCF97';

  const handleCropFilter = (e) => {
    setSelectedCrop(e.target.value);
  };

  const handleLocationFilter = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleQualityFilter = (e) => {
    setSelectedQuality(e.target.value);
  };
  
  const handleQuantityFilter = (e) => {
    setSelectedQuantity(e.target.value);
  };

  const handleSearch = () => {
    // Filter suppliers based on criteria
    let results = [...sampleSuppliers];
    
    if (selectedCrop !== 'All Crops') {
      results = results.filter(supplier => supplier.crops.includes(selectedCrop));
    }
    
    if (selectedLocation !== 'All Locations') {
      results = results.filter(supplier => supplier.location === selectedLocation);
    }
    
    if (selectedQuality !== 'All Grades') {
      results = results.filter(supplier => supplier.quality === selectedQuality);
    }
    
    if (selectedQuantity !== 'Any Amount') {
      const range = selectedQuantity.split(' - ');
      if (range.length === 2) {
        const min = parseInt(range[0]);
        const max = parseInt(range[1]);
        results = results.filter(supplier => supplier.quantity >= min && supplier.quantity <= max);
      } else if (selectedQuantity === '1000+') {
        results = results.filter(supplier => supplier.quantity >= 1000);
      }
    }
    
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setShowRegionInfo(true);
    // Auto-select the location in the dropdown
    if (locations.includes(region)) {
      setSelectedLocation(region);
    }
  };

  const handleViewSupplierDetails = (supplier) => {
    // In a real app, this would navigate to a detailed view
    window.open(`/suppliers/${supplier.id}`, '_blank');
  };

  return (
    <div className='supplyDashContainer'>
      <div className="titleContainer">
        <h2 className="pageTitle">Supply Discovery</h2>
        <p className="pageDescription">Explore available crops and farmer locations across Rwanda</p>
      </div>
      
      <div className="gridContainer">
        {/* Interactive Map */}
        <div className="card">
          <h3 className="cardTitle">
            <MapPin className="cardIcon" />
            Supplier Locations in Rwanda
          </h3>
          {showRegionInfo && (
            <div className="regionInfoOverlay">
              <div className="regionInfoContent">
                <h4>{selectedRegion}</h4>
                <p>Available crops: Rice, Beans, Maize</p>
                <p>Number of suppliers: {Math.floor(Math.random() * 20) + 5}</p>
                <button 
                  className="closeButton"
                  onClick={() => setShowRegionInfo(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <div className="rwandaMap">
            {/* Simple SVG map of Rwanda's provinces */}
            <svg viewBox="0 0 400 400" className="mapSvg">
              {/* This is a simplified map of Rwanda's provinces */}
              <g>
                <path 
                  d="M150,100 L200,80 L250,100 L270,150 L250,200 L200,220 L150,200 L130,150 Z" 
                  fill={selectedRegion === "Kigali" ? "#27AE60" : "#6FCF97"} 
                  stroke="#219653" 
                  strokeWidth="2"
                  onClick={() => handleRegionClick("Kigali")}
                  className="mapRegion"
                />
                <text x="200" y="150" className="mapLabel">Kigali</text>
                
                <path 
                  d="M100,50 L150,100 L130,150 L100,180 L50,150 L70,100 Z" 
                  fill={selectedRegion === "Musanze" ? "#27AE60" : "#6FCF97"}
                  stroke="#219653" 
                  strokeWidth="2"
                  onClick={() => handleRegionClick("Musanze")}
                  className="mapRegion"
                />
                <text x="100" y="120" className="mapLabel">Musanze</text>
                
                <path 
                  d="M250,100 L300,50 L350,100 L330,150 L300,180 L270,150 Z" 
                  fill={selectedRegion === "Nyagatare" ? "#27AE60" : "#6FCF97"}
                  stroke="#219653" 
                  strokeWidth="2"
                  onClick={() => handleRegionClick("Nyagatare")}
                  className="mapRegion"
                />
                <text x="300" y="120" className="mapLabel">Nyagatare</text>
                
                <path 
                  d="M150,200 L200,220 L250,200 L270,250 L250,300 L200,320 L150,300 L130,250 Z" 
                  fill={selectedRegion === "Huye" ? "#27AE60" : "#6FCF97"}
                  stroke="#219653" 
                  strokeWidth="2"
                  onClick={() => handleRegionClick("Huye")}
                  className="mapRegion"
                />
                <text x="200" y="260" className="mapLabel">Huye</text>
                
                <path 
                  d="M50,150 L100,180 L130,250 L100,300 L50,320 L30,250 Z" 
                  fill={selectedRegion === "Rubavu" ? "#27AE60" : "#6FCF97"}
                  stroke="#219653" 
                  strokeWidth="2"
                  onClick={() => handleRegionClick("Rubavu")}
                  className="mapRegion"
                />
                <text x="80" y="240" className="mapLabel">Rubavu</text>
              </g>
            </svg>
            <button 
              onClick={() => window.open('https://www.google.com/maps/place/Rwanda', '_blank')} 
              className="mapButton"
            >
              Open full map
            </button>
          </div>
        </div>

        {/* Harvest Forecast */}
        <div className="card">
          <h3 className="cardTitle">Crop Harvest Forecast</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cropForecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="rice" stackId="1" stroke={PRIMARY_GREEN} fill={PRIMARY_GREEN} />
              <Area type="monotone" dataKey="beans" stackId="1" stroke={SECONDARY_GREEN} fill={SECONDARY_GREEN} />
              <Area type="monotone" dataKey="maize" stackId="1" stroke={LIGHT_GREEN} fill={LIGHT_GREEN} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Crop Filters */}
        <div className="cardWide">
          <h3 className="cardTitle">Available Crops</h3>
          <div className="filtersContainer">
            <div className="filterGroup">
              <label className="filterLabel">Crop Type</label>
              <select 
                className="filterSelect"
                value={selectedCrop}
                onChange={handleCropFilter}
              >
                {cropTypes.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>
            <div className="filterGroup">
              <label className="filterLabel">Location</label>
              <select 
                className="filterSelect"
                value={selectedLocation}
                onChange={handleLocationFilter}
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div className="filterGroup">
              <label className="filterLabel">Quality Grade</label>
              <select 
                className="filterSelect"
                value={selectedQuality}
                onChange={handleQualityFilter}
              >
                <option>All Grades</option>
                <option>Premium</option>
                <option>Standard</option>
                <option>Economy</option>
              </select>
            </div>
            <div className="filterGroup">
              <label className="filterLabel">Quantity (kg)</label>
              <select 
                className="filterSelect"
                value={selectedQuantity}
                onChange={handleQuantityFilter}
              >
                <option>Any Amount</option>
                <option>100 - 500</option>
                <option>500 - 1000</option>
                <option>1000+</option>
              </select>
            </div>
          </div>
          <button 
            onClick={handleSearch}
            className="searchButton"
          >
            <Search size={16} className="buttonIcon" />
            Search Suppliers
          </button>
        </div>

        {/* Search Results - Only shown after search */}
        {hasSearched && (
          <div className="cardWide resultsCard">
            <h3 className="cardTitle">Search Results</h3>
            {searchResults.length > 0 ? (
              <div className="resultsGrid">
                {searchResults.map(supplier => (
                  <div key={supplier.id} className="supplierCard">
                    <div className="supplierHeader">
                      <h4 className="supplierName">{supplier.name}</h4>
                      <span className="supplierLocation">
                        <MapPin size={14} className="locationIcon" />
                        {supplier.location}
                      </span>
                    </div>
                    <div className="supplierDetails">
                      <div className="detailItem">
                        <span className="detailLabel">Crops:</span>
                        <span className="detailValue">{supplier.crops.join(", ")}</span>
                      </div>
                      <div className="detailItem">
                        <span className="detailLabel">Quality:</span>
                        <span className="detailValue">{supplier.quality}</span>
                      </div>
                      <div className="detailItem">
                        <span className="detailLabel">Quantity:</span>
                        <span className="detailValue">{supplier.quantity} kg</span>
                      </div>
                    </div>
                    <button 
                      className="viewDetailsButton"
                      onClick={() => handleViewSupplierDetails(supplier)}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="noResults">
                <Info size={32} className="noResultsIcon" />
                <p className="noResultsText">No suppliers found matching your criteria.</p>
                <p className="noResultsSuggestion">Try adjusting your filters or selecting a different location.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplyDiscovery;