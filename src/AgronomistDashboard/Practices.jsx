import { useState } from "react";
import "../AgronomistStyles/Practices.css";
import { BookOpen, Search, Filter, ChevronDown, ChevronUp, ExternalLink, Download } from 'lucide-react';

const Practices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [expandedPractice, setExpandedPractice] = useState(null);

  const practices = [
    {
      id: 1,
      title: "Crop Rotation Best Practices",
      category: "cultivation",
      summary: "Effective crop rotation strategies to improve soil health and reduce pest pressure.",
      content: `
        <h3>Benefits of Crop Rotation</h3>
        <ul>
          <li>Improves soil structure and fertility</li>
          <li>Reduces soil erosion and increases organic matter</li>
          <li>Helps control pests, diseases, and weeds</li>
          <li>Manages nutrient requirements</li>
        </ul>
        
        <h3>Recommended Rotation Sequences</h3>
        <p>For optimal results, follow these rotation guidelines:</p>
        <ol>
          <li>Rotate deep-rooted crops with shallow-rooted crops</li>
          <li>Alternate legumes with non-legumes</li>
          <li>Avoid planting crops from the same family in succession</li>
          <li>Include cover crops in your rotation plan</li>
        </ol>
        
        <h3>Sample 4-Year Rotation Plan</h3>
        <p>Year 1: Legumes (soybeans, beans, peas)<br>
        Year 2: Leaf crops (lettuce, cabbage, spinach)<br>
        Year 3: Fruit crops (tomatoes, peppers, eggplant)<br>
        Year 4: Root crops (carrots, potatoes, onions)</p>
      `,
      lastUpdated: "2025-03-15"
    },
    {
      id: 2,
      title: "Integrated Pest Management (IPM)",
      category: "pest-control",
      summary: "Comprehensive approach to pest management that minimizes environmental impact.",
      content: `
        <h3>IPM Principles</h3>
        <p>Integrated Pest Management is a sustainable approach that combines different pest management practices to minimize economic, health, and environmental risks.</p>
        
        <h3>Key Components</h3>
        <ul>
          <li><strong>Prevention:</strong> Use resistant varieties and cultural practices to prevent pest problems</li>
          <li><strong>Monitoring:</strong> Regularly inspect crops to detect pest issues early</li>
          <li><strong>Identification:</strong> Correctly identify pests to apply appropriate control measures</li>
          <li><strong>Action Thresholds:</strong> Determine when action is necessary based on economic or health risks</li>
          <li><strong>Control Methods:</strong> Use a combination of biological, cultural, mechanical, and chemical controls</li>
        </ul>
        
        <h3>Implementation Steps</h3>
        <ol>
          <li>Develop a monitoring plan for key pests</li>
          <li>Establish action thresholds for each pest</li>
          <li>Identify and implement preventive measures</li>
          <li>Select appropriate control methods when thresholds are reached</li>
          <li>Evaluate results and adjust strategies as needed</li>
        </ol>
      `,
      lastUpdated: "2025-02-28"
    },
    {
      id: 3,
      title: "Soil Health Management",
      category: "soil",
      summary: "Techniques to maintain and improve soil fertility and structure for optimal crop production.",
      content: `
        <h3>Soil Health Indicators</h3>
        <p>Healthy soil should have good structure, adequate organic matter, and diverse microbial activity.</p>
        
        <h3>Management Practices</h3>
        <ul>
          <li><strong>Soil Testing:</strong> Conduct regular soil tests to monitor nutrient levels and pH</li>
          <li><strong>Cover Crops:</strong> Plant cover crops to prevent erosion and add organic matter</li>
          <li><strong>Reduced Tillage:</strong> Minimize soil disturbance to preserve soil structure</li>
          <li><strong>Organic Amendments:</strong> Add compost and other organic materials to improve soil fertility</li>
          <li><strong>Crop Rotation:</strong> Implement diverse crop rotations to enhance soil health</li>
        </ul>
        
        <h3>Recommended Soil Amendments</h3>
        <table>
          <tr>
            <th>Amendment</th>
            <th>Benefits</th>
            <th>Application Rate</th>
          </tr>
          <tr>
            <td>Compost</td>
            <td>Improves soil structure, adds nutrients</td>
            <td>2-3 tons per acre</td>
          </tr>
          <tr>
            <td>Green Manure</td>
            <td>Adds nitrogen, increases organic matter</td>
            <td>Plant as cover crop</td>
          </tr>
          <tr>
            <td>Lime</td>
            <td>Adjusts pH, improves nutrient availability</td>
            <td>Based on soil test</td>
          </tr>
        </table>
      `,
      lastUpdated: "2025-03-10"
    },
    {
      id: 4,
      title: "Water Conservation Techniques",
      category: "irrigation",
      summary: "Efficient irrigation methods and water management strategies for sustainable farming.",
      content: `
        <h3>Water Conservation Strategies</h3>
        <p>Implementing efficient water management practices is essential for sustainable agriculture, especially in water-scarce regions.</p>
        
        <h3>Irrigation Methods</h3>
        <ul>
          <li><strong>Drip Irrigation:</strong> Delivers water directly to plant roots, reducing evaporation</li>
          <li><strong>Micro-sprinklers:</strong> Provides targeted irrigation with less water loss than conventional sprinklers</li>
          <li><strong>Subsurface Irrigation:</strong> Applies water below the soil surface, minimizing evaporation</li>
        </ul>
        
        <h3>Water Management Practices</h3>
        <ol>
          <li>Schedule irrigation based on crop water requirements and soil moisture levels</li>
          <li>Implement rainwater harvesting systems to capture and store rainfall</li>
          <li>Use soil moisture sensors to optimize irrigation timing</li>
          <li>Apply mulch to reduce evaporation from soil surface</li>
          <li>Maintain irrigation systems to prevent leaks and ensure efficient operation</li>
        </ol>
        
        <h3>Water Conservation Benefits</h3>
        <p>Efficient water management not only conserves a valuable resource but also reduces energy costs, minimizes nutrient leaching, and can improve crop quality and yield.</p>
      `,
      lastUpdated: "2025-01-20"
    },
    {
      id: 5,
      title: "Sustainable Fertilizer Application",
      category: "soil",
      summary: "Optimize nutrient management while minimizing environmental impact through proper fertilizer use.",
      content: `
        <h3>Principles of Sustainable Fertilization</h3>
        <p>Proper fertilizer management ensures crops receive adequate nutrition while minimizing environmental impacts and optimizing economic returns.</p>
        
        <h3>The 4R Nutrient Stewardship</h3>
        <ul>
          <li><strong>Right Source:</strong> Match fertilizer type to crop needs</li>
          <li><strong>Right Rate:</strong> Apply the correct amount based on soil tests and crop requirements</li>
          <li><strong>Right Time:</strong> Apply fertilizers when crops can best utilize nutrients</li>
          <li><strong>Right Place:</strong> Place fertilizers where crops can access them efficiently</li>
        </ul>
        
        <h3>Application Methods</h3>
        <p>Different application methods offer varying benefits:</p>
        <ul>
          <li><strong>Broadcasting:</strong> Uniform application across the field surface</li>
          <li><strong>Banding:</strong> Placing fertilizer in bands near plant roots</li>
          <li><strong>Fertigation:</strong> Applying fertilizers through irrigation systems</li>
          <li><strong>Foliar Application:</strong> Spraying nutrients directly on plant leaves</li>
        </ul>
        
        <h3>Environmental Considerations</h3>
        <p>Implement buffer zones near water bodies, avoid application before heavy rainfall, and consider using controlled-release fertilizers to reduce nutrient runoff and leaching.</p>
      `,
      lastUpdated: "2025-02-05"
    }
  ];

  const categories = [
    { id: "cultivation", name: "Cultivation" },
    { id: "pest-control", name: "Pest Control" },
    { id: "soil", name: "Soil Management" },
    { id: "irrigation", name: "Irrigation" }
  ];

  const filteredPractices = practices.filter(practice => {
    const matchesSearch = practice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          practice.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || practice.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const togglePracticeExpand = (id) => {
    if (expandedPractice === id) {
      setExpandedPractice(null);
    } else {
      setExpandedPractice(id);
    }
  };

  return (
    <div className="practicesContainer">
      <div className="practicesHeader">
        <div className="practicesTitle">
          <BookOpen size={24} />
          <h2>Best Practices</h2>
        </div>
        <div className="practicesActions">
          <div className="searchContainer">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search best practices..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filterContainer">
            <button 
              className="filterButton"
              onClick={() => setShowCategoryFilter(!showCategoryFilter)}
            >
              <Filter size={16} />
              <span>
                {selectedCategory === "all" 
                  ? "All Categories" 
                  : categories.find(c => c.id === selectedCategory)?.name}
              </span>
              {showCategoryFilter ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {showCategoryFilter && (
              <div className="filterMenu">
                <button 
                  className={`filterOption ${selectedCategory === "all" ? "active" : ""}`}
                  onClick={() => { setSelectedCategory("all"); setShowCategoryFilter(false); }}
                >
                  All Categories
                </button>
                {categories.map(category => (
                  <button 
                    key={category.id}
                    className={`filterOption ${selectedCategory === category.id ? "active" : ""}`}
                    onClick={() => { setSelectedCategory(category.id); setShowCategoryFilter(false); }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button className="exportButton">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="practicesList">
        {filteredPractices.length === 0 ? (
          <div className="noPractices">
            <p>No best practices found matching your criteria.</p>
          </div>
        ) : (
          filteredPractices.map(practice => (
            <div key={practice.id} className="practiceCard">
              <div 
                className="practiceHeader"
                onClick={() => togglePracticeExpand(practice.id)}
              >
                <div className="practiceInfo">
                  <h3>{practice.title}</h3>
                  <span className="practiceCategory">
                    {categories.find(c => c.id === practice.category)?.name}
                  </span>
                </div>
                <div className="practiceActions">
                  <span className="lastUpdated">Updated: {practice.lastUpdated}</span>
                  {expandedPractice === practice.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>
              
              <div className="practiceSummary">
                {practice.summary}
              </div>
              
              {expandedPractice === practice.id && (
                <div className="practiceContent">
                  <div dangerouslySetInnerHTML={{ __html: practice.content }} />
                  
                  <div className="practiceFooter">
                    <button className="practiceButton">
                      <ExternalLink size={16} />
                      <span>View Full Document</span>
                    </button>
                    <button className="practiceButton">
                      <Download size={16} />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Practices;
