import { useState } from "react"
import { Filter, MapPin, List, Search } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "../Charts/Charts.jsx"
import "../BuyersDashStyles/SupplyDiscovery.css"

 function SupplyDiscovery() {
  const [viewMode, setViewMode] = useState("list")

  return (
    <div className="supply-discovery">
      <div className="supply-discovery-header">
        <h1 className="supply-discovery-title">Supply Discovery</h1>
        <p className="supply-discovery-subtitle">Find and source agricultural products from farmers across Rwanda</p>
      </div>

      <div className="supply-discovery-content">
        <div className="supply-discovery-sidebar">
          <div className="supply-discovery-card">
            <div className="supply-discovery-card-header">
              <h2 className="supply-discovery-card-title">
                <Filter size={18} className="supply-discovery-card-icon" />
                Filters
              </h2>
            </div>
            <div className="supply-discovery-card-content">
              <div className="supply-discovery-filter-group">
                <label className="supply-discovery-filter-label">Crop Type</label>
                <select className="supply-discovery-filter-select">
                  <option value="all">All Crops</option>
                  <option value="coffee">Coffee</option>
                  <option value="tea">Tea</option>
                  <option value="maize">Maize</option>
                  <option value="beans">Beans</option>
                  <option value="cassava">Cassava</option>
                  <option value="bananas">Bananas</option>
                </select>
              </div>

              <div className="supply-discovery-filter-group">
                <label className="supply-discovery-filter-label">Province</label>
                <select className="supply-discovery-filter-select">
                  <option value="all">All Provinces</option>
                  <option value="kigali">Kigali</option>
                  <option value="eastern">Eastern Province</option>
                  <option value="western">Western Province</option>
                  <option value="northern">Northern Province</option>
                  <option value="southern">Southern Province</option>
                </select>
              </div>

              <div className="supply-discovery-filter-group">
                <label className="supply-discovery-filter-label">Quantity (tons)</label>
                <input type="range" min="0" max="100" defaultValue="50" className="supply-discovery-filter-range" />
                <div className="supply-discovery-filter-range-labels">
                  <span>0</span>
                  <span>50+</span>
                  <span>100+</span>
                </div>
              </div>

              <div className="supply-discovery-filter-group">
                <label className="supply-discovery-filter-label">Quality Rating</label>
                <div className="supply-discovery-filter-rating">
                  <span className="supply-discovery-filter-star active">★</span>
                  <span className="supply-discovery-filter-star active">★</span>
                  <span className="supply-discovery-filter-star active">★</span>
                  <span className="supply-discovery-filter-star">★</span>
                  <span className="supply-discovery-filter-star">★</span>
                  <span className="supply-discovery-filter-rating-text">3+</span>
                </div>
              </div>

              <div className="supply-discovery-filter-group">
                <label className="supply-discovery-filter-label">Availability</label>
                <select className="supply-discovery-filter-select">
                  <option value="available">Available Now</option>
                  <option value="upcoming">Upcoming Harvest</option>
                  <option value="all">All</option>
                </select>
              </div>

              <button className="btn-primary supply-discovery-filter-button">Apply Filters</button>
            </div>
          </div>

          <div className="supply-discovery-card">
            <div className="supply-discovery-card-header">
              <h2 className="supply-discovery-card-title">
                <MapPin size={18} className="supply-discovery-card-icon" />
                Rwanda Map
              </h2>
            </div>
            <div className="supply-discovery-card-content">
              <div className="supply-discovery-map">
                <img
                  src="/placeholder.svg?height=300&width=240&text=Rwanda+Map"
                  alt="Rwanda Map"
                  className="supply-discovery-map-image"
                />
                <div className="supply-discovery-map-legend">
                  <div className="supply-discovery-map-legend-item">
                    <span className="supply-discovery-map-legend-dot" style={{ backgroundColor: "#4d7c0f" }}></span>
                    <span>Coffee</span>
                  </div>
                  <div className="supply-discovery-map-legend-item">
                    <span className="supply-discovery-map-legend-dot" style={{ backgroundColor: "#b45309" }}></span>
                    <span>Tea</span>
                  </div>
                  <div className="supply-discovery-map-legend-item">
                    <span className="supply-discovery-map-legend-dot" style={{ backgroundColor: "#0369a1" }}></span>
                    <span>Maize</span>
                  </div>
                </div>
              </div>
              <button className="supply-discovery-map-button">View Interactive Map</button>
            </div>
          </div>
        </div>

        <div className="supply-discovery-main">
          <div className="supply-discovery-card">
            <div className="supply-discovery-card-header">
              <h2 className="supply-discovery-card-title">Available Crops</h2>
              <div className="supply-discovery-view-toggle">
                <button
                  className={`supply-discovery-view-button ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <List size={16} />
                  List
                </button>
                <button
                  className={`supply-discovery-view-button ${viewMode === "map" ? "active" : ""}`}
                  onClick={() => setViewMode("map")}
                >
                  <MapPin size={16} />
                  Map
                </button>
              </div>
            </div>
            <div className="supply-discovery-card-content">
              <div className="supply-discovery-search">
                <Search size={18} className="supply-discovery-search-icon" />
                <input
                  type="text"
                  placeholder="Search crops, farmers, or locations..."
                  className="supply-discovery-search-input"
                />
              </div>

              {viewMode === "list" ? (
                <div className="supply-discovery-products">
                  {[
                    {
                      id: 1,
                      name: "Arabica Coffee",
                      farmer: "Musanze Coffee Cooperative",
                      location: "Musanze, Northern",
                      quantity: "50 tons",
                      price: "4,500 RWF/kg",
                      rating: 4.8,
                      image: "/placeholder.svg?height=200&width=300&text=Coffee",
                    },
                    {
                      id: 2,
                      name: "Green Tea Leaves",
                      farmer: "Eastern Tea Growers",
                      location: "Nyagatare, Eastern",
                      quantity: "30 tons",
                      price: "2,800 RWF/kg",
                      rating: 4.5,
                      image: "/placeholder.svg?height=200&width=300&text=Tea",
                    },
                    {
                      id: 3,
                      name: "Organic Maize",
                      farmer: "Southern Maize Farmers",
                      location: "Huye, Southern",
                      quantity: "80 tons",
                      price: "350 RWF/kg",
                      rating: 4.3,
                      image: "/placeholder.svg?height=200&width=300&text=Maize",
                    },
                    {
                      id: 4,
                      name: "Red Beans",
                      farmer: "Karongi Bean Producers",
                      location: "Karongi, Western",
                      quantity: "45 tons",
                      price: "600 RWF/kg",
                      rating: 4.6,
                      image: "/placeholder.svg?height=200&width=300&text=Beans",
                    },
                    {
                      id: 5,
                      name: "Fresh Cassava",
                      farmer: "Rwamagana Cassava Coop",
                      location: "Rwamagana, Eastern",
                      quantity: "60 tons",
                      price: "280 RWF/kg",
                      rating: 4.2,
                      image: "/placeholder.svg?height=200&width=300&text=Cassava",
                    },
                    {
                      id: 6,
                      name: "Green Bananas",
                      farmer: "Rubavu Banana Growers",
                      location: "Rubavu, Western",
                      quantity: "40 tons",
                      price: "320 RWF/kg",
                      rating: 4.4,
                      image: "/placeholder.svg?height=200&width=300&text=Bananas",
                    },
                  ].map((product) => (
                    <div key={product.id} className="supply-discovery-product-card">
                      <div className="supply-discovery-product-image">
                        <img src={product.image || "/placeholder.svg"} alt={product.name} />
                        <span className="supply-discovery-product-badge">Available</span>
                      </div>
                      <div className="supply-discovery-product-content">
                        <h3 className="supply-discovery-product-title">{product.name}</h3>
                        <div className="supply-discovery-product-rating">
                          <span className="supply-discovery-product-rating-stars">
                            {"★".repeat(Math.floor(product.rating))}
                          </span>
                          <span className="supply-discovery-product-rating-value">{product.rating}</span>
                        </div>
                        <div className="supply-discovery-product-details">
                          <p>Quantity: {product.quantity}</p>
                          <p>Location: {product.location}</p>
                          <p>Farmer: {product.farmer}</p>
                        </div>
                        <div className="supply-discovery-product-footer">
                          <span className="supply-discovery-product-price">{product.price}</span>
                          <button className="btn-primary supply-discovery-product-button">View Details</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="supply-discovery-map-view">
                  <img
                    src="/placeholder.svg?height=600&width=800&text=Interactive+Rwanda+Map"
                    alt="Rwanda Interactive Map"
                    className="supply-discovery-map-view-image"
                  />
                  <div className="supply-discovery-map-view-overlay">
                    <p>Interactive map showing farmer locations and available produce across Rwanda</p>
                    <button className="btn-primary">Enable Location Services</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="supply-discovery-card">
            <div className="supply-discovery-card-header">
              <h2 className="supply-discovery-card-title">Harvest Forecasts</h2>
              <select className="supply-discovery-card-select">
                <option>By Region</option>
                <option>By Crop</option>
              </select>
            </div>
            <div className="supply-discovery-card-content">
              <div className="supply-discovery-chart" style={{ height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Jan", Coffee: 400, Tea: 240, Maize: 240 },
                      { name: "Feb", Coffee: 300, Tea: 139, Maize: 221 },
                      { name: "Mar", Coffee: 200, Tea: 980, Maize: 229 },
                      { name: "Apr", Coffee: 278, Tea: 390, Maize: 200 },
                      { name: "May", Coffee: 189, Tea: 480, Maize: 218 },
                      { name: "Jun", Coffee: 239, Tea: 380, Maize: 250 },
                      { name: "Jul", Coffee: 349, Tea: 430, Maize: 210 },
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Coffee" fill="#4d7c0f" />
                    <Bar dataKey="Tea" fill="#004d00" />
                    <Bar dataKey="Maize" fill="#008000" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="supply-discovery-forecast-summary">
                <div className="supply-discovery-forecast-item">
                  <h3 className="supply-discovery-forecast-title">Coffee</h3>
                  <div className="supply-discovery-forecast-value">12,500 tons</div>
                  <div className="supply-discovery-forecast-period">Expected in next 30 days</div>
                  <div className="supply-discovery-forecast-change positive">+15% vs last year</div>
                </div>

                <div className="supply-discovery-forecast-item">
                  <h3 className="supply-discovery-forecast-title">Tea</h3>
                  <div className="supply-discovery-forecast-value">8,750 tons</div>
                  <div className="supply-discovery-forecast-period">Expected in next 30 days</div>
                  <div className="supply-discovery-forecast-change positive">+8% vs last year</div>
                </div>

                <div className="supply-discovery-forecast-item">
                  <h3 className="supply-discovery-forecast-title">Maize</h3>
                  <div className="supply-discovery-forecast-value">9,200 tons</div>
                  <div className="supply-discovery-forecast-period">Expected in next 30 days</div>
                  <div className="supply-discovery-forecast-change positive">+12% vs last year</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplyDiscovery;