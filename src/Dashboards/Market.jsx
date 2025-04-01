"use client"

import { useState } from "react"
import {
  DollarSign,
  TrendingUp,
  Tag,
  Share2,
  AlertCircle,
  Check,
  X,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Calendar,
  Clock,
} from "lucide-react"

const MarketAccess = () => {
  // State management for modals and notifications
  const [showListCropModal, setShowListCropModal] = useState(false)
  const [showBuyerRequestsModal, setShowBuyerRequestsModal] = useState(false)
  const [showMarketPricesModal, setShowMarketPricesModal] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState({ message: "", type: "success" })
  const [activeCropFilter, setActiveCropFilter] = useState("All Crops")
  const [activeRequestFilter, setActiveRequestFilter] = useState("All Requests")
  const [sortOrder, setSortOrder] = useState({ field: "date", direction: "desc" })
  const [timeFilter, setTimeFilter] = useState("30") // Added state for time filter
  const [showContactModal, setShowContactModal] = useState(false) // Added state for contact modal
  const [selectedBuyer, setSelectedBuyer] = useState(null) // Added state to track selected buyer

  // Form state for listing a crop
  const [listingForm, setListingForm] = useState({
    cropType: "Corn",
    quantity: "",
    unit: "Tons",
    harvestDate: "",
    availableUntil: "",
    minPrice: "",
    qualityGrade: "Standard",
    growingMethod: {
      organic: false,
      nonGMO: false,
      pesticideFree: false,
    },
    notes: "",
  })

  // Contact form state
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
  })

  // Data for the component
  const cropListings = [
    {
      id: 1,
      crop: "Corn",
      quantity: "15 tons",
      expectedHarvest: "2025-08-20",
      minPrice: "$180/ton",
      status: "Listed",
      createdDate: "2025-03-15",
      views: 12,
      inquiries: 3,
    },
    {
      id: 2,
      crop: "Wheat",
      quantity: "10 tons",
      expectedHarvest: "2025-09-30",
      minPrice: "$210/ton",
      status: "Listed",
      createdDate: "2025-03-10",
      views: 8,
      inquiries: 1,
    },
  ]

  const buyerRequests = [
    {
      id: 1,
      buyer: "Midwest Grains Co.",
      crop: "Corn",
      quantity: "50 tons",
      priceOffered: "$185/ton",
      deliveryDate: "2025-09-10",
      status: "New",
      location: "Chicago, IL",
      rating: 4.8,
      requestDate: "2025-03-25",
    },
    {
      id: 2,
      buyer: "Local Organic Foods",
      crop: "Soybeans",
      quantity: "10 tons",
      priceOffered: "$320/ton",
      deliveryDate: "2025-10-30",
      status: "Pending",
      location: "Madison, WI",
      rating: 4.2,
      requestDate: "2025-03-22",
    },
    {
      id: 3,
      buyer: "State Agricultural Board",
      crop: "Wheat",
      quantity: "25 tons",
      priceOffered: "$215/ton",
      deliveryDate: "2025-10-15",
      status: "Negotiating",
      location: "Springfield, IL",
      rating: 4.9,
      requestDate: "2025-03-20",
    },
  ]

  const transactionHistory = [
    {
      id: 1,
      date: "2024-10-25",
      buyer: "Midwest Grains Co.",
      crop: "Corn",
      quantity: "20 tons",
      price: "$178/ton",
      rating: 4.5,
      status: "Completed",
      paymentStatus: "Paid",
    },
    {
      id: 2,
      date: "2024-09-15",
      buyer: "State Agricultural Board",
      crop: "Wheat",
      quantity: "15 tons",
      price: "$205/ton",
      rating: 5,
      status: "Completed",
      paymentStatus: "Paid",
    },
    {
      id: 3,
      date: "2024-08-30",
      buyer: "Local Organic Foods",
      crop: "Soybeans",
      quantity: "8 tons",
      price: "$310/ton",
      rating: 4.7,
      status: "Completed",
      paymentStatus: "Paid",
    },
  ]

  const marketPrices = [
    {
      crop: "Corn",
      localMarket: "$175/ton",
      regionalMarket: "$182/ton",
      nationalAverage: "$180/ton",
      trend: "up",
      lastUpdated: "2025-03-30",
    },
    {
      crop: "Wheat",
      localMarket: "$208/ton",
      regionalMarket: "$215/ton",
      nationalAverage: "$212/ton",
      trend: "down",
      lastUpdated: "2025-03-30",
    },
    {
      crop: "Soybeans",
      localMarket: "$315/ton",
      regionalMarket: "$325/ton",
      nationalAverage: "$320/ton",
      trend: "stable",
      lastUpdated: "2025-03-30",
    },
    {
      crop: "Barley",
      localMarket: "$160/ton",
      regionalMarket: "$165/ton",
      nationalAverage: "$162/ton",
      trend: "up",
      lastUpdated: "2025-03-30",
    },
  ]

  // Historical price data for charts
  const priceHistory = {
    Corn: [175, 177, 180, 179, 181, 180, 182, 183, 180, 178, 175, 177],
    Wheat: [208, 210, 212, 215, 214, 210, 209, 208, 210, 212, 211, 208],
    Soybeans: [315, 317, 320, 322, 321, 318, 315, 317, 319, 320, 318, 315],
    Barley: [160, 159, 157, 158, 160, 162, 161, 162, 163, 164, 162, 160],
  }

  // 90 days price history (extended data)
  const extendedPriceHistory = {
    Corn: [...Array(90)].map(() => Math.floor(Math.random() * 20) + 170),
    Wheat: [...Array(90)].map(() => Math.floor(Math.random() * 20) + 200),
    Soybeans: [...Array(90)].map(() => Math.floor(Math.random() * 30) + 300),
    Barley: [...Array(90)].map(() => Math.floor(Math.random() * 15) + 155),
  }

  // Helper functions
  const handleNotification = (message, type = "success") => {
    setNotification({ message, type })
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name.startsWith("growingMethod.")) {
      const method = name.split(".")[1]
      setListingForm({
        ...listingForm,
        growingMethod: {
          ...listingForm.growingMethod,
          [method]: checked,
        },
      })
    } else {
      setListingForm({
        ...listingForm,
        [name]: type === "checkbox" ? checked : value,
      })
    }
  }

  const handleContactFormChange = (e) => {
    const { name, value } = e.target
    setContactForm({
      ...contactForm,
      [name]: value,
    })
  }

  const handleListCropSubmit = (e) => {
    e.preventDefault()
    // Validate form
    if (!listingForm.quantity || !listingForm.harvestDate || !listingForm.minPrice) {
      handleNotification("Please fill out all required fields", "error")
      return
    }

    // Submit form logic would go here (API call)

    // Close modal and show success notification
    setShowListCropModal(false)
    handleNotification("Your crop has been listed successfully!")

    // Reset form
    setListingForm({
      cropType: "Corn",
      quantity: "",
      unit: "Tons",
      harvestDate: "",
      availableUntil: "",
      minPrice: "",
      qualityGrade: "Standard",
      growingMethod: {
        organic: false,
        nonGMO: false,
        pesticideFree: false,
      },
      notes: "",
    })
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // Validate form
    if (!contactForm.subject || !contactForm.message) {
      handleNotification("Please fill out all required fields", "error")
      return
    }

    // Submit form logic would go here (API call)

    // Close modal and show success notification
    setShowContactModal(false)
    handleNotification(`Your message has been sent to ${selectedBuyer.buyer}`)

    // Reset form
    setContactForm({
      subject: "",
      message: "",
    })
    setSelectedBuyer(null)
  }

  const handleRespondToBuyer = (requestId) => {
    // Logic to respond to buyer request
    handleNotification("Your response has been sent to the buyer")
  }

  const handleContactBuyer = (buyer) => {
    setSelectedBuyer(buyer)
    setShowContactModal(true)
  }

  const getMarketSuggestion = (crop) => {
    const cropData = marketPrices.find((item) => item.crop === crop)
    return cropData ? cropData.nationalAverage : "Unknown"
  }

  const sortData = (data, field, direction) => {
    return [...data].sort((a, b) => {
      if (direction === "asc") {
        return a[field] > b[field] ? 1 : -1
      } else {
        return a[field] < b[field] ? 1 : -1
      }
    })
  }

  const filterBuyerRequests = (requests, filter) => {
    if (filter === "All Requests") return requests
    return requests.filter((request) => request.status === filter)
  }

  const filterCrops = (data, filter) => {
    if (filter === "All Crops") return data
    return data.filter((item) => item.crop === filter)
  }

  const getChartData = () => {
    if (timeFilter === "7") {
      return {
        Corn: priceHistory.Corn.slice(0, 7),
        Wheat: priceHistory.Wheat.slice(0, 7),
        Soybeans: priceHistory.Soybeans.slice(0, 7),
        Barley: priceHistory.Barley.slice(0, 7),
      }
    } else if (timeFilter === "30") {
      return priceHistory
    } else if (timeFilter === "90") {
      return extendedPriceHistory
    } else {
      return priceHistory // Default to 30 days
    }
  }

  // Modal components
  const renderNotification = () => {
    if (!showNotification) return null

    return (
      <div className={`notification ${notification.type}`}>
        {notification.type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
        <span>{notification.message}</span>
      </div>
    )
  }

  const renderListCropModal = () => {
    if (!showListCropModal) return null

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>List Your Crop for Sale</h2>
            <button onClick={() => setShowListCropModal(false)} className="close-btn">
              ×
            </button>
          </div>
          <div className="modal-body">
            <form className="list-crop-form" onSubmit={handleListCropSubmit}>
              <div className="form-group">
                <label>
                  Crop Type <span className="required">*</span>
                </label>
                <select name="cropType" value={listingForm.cropType} onChange={handleFormChange}>
                  <option value="Corn">Corn</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Soybeans">Soybeans</option>
                  <option value="Rice">Rice</option>
                  <option value="Barley">Barley</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Quantity Available <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Amount"
                    name="quantity"
                    value={listingForm.quantity}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <select name="unit" value={listingForm.unit} onChange={handleFormChange}>
                    <option value="Tons">Tons</option>
                    <option value="Kilograms">Kilograms</option>
                    <option value="Pounds">Pounds</option>
                    <option value="Bushels">Bushels</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Expected Harvest Date <span className="required">*</span>
                  </label>
                  <input type="date" name="harvestDate" value={listingForm.harvestDate} onChange={handleFormChange} />
                </div>
                <div className="form-group">
                  <label>Available Until</label>
                  <input
                    type="date"
                    name="availableUntil"
                    value={listingForm.availableUntil}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Minimum Price <span className="required">*</span>
                  </label>
                  <div className="price-input">
                    <span className="currency-symbol">$</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      name="minPrice"
                      value={listingForm.minPrice}
                      onChange={handleFormChange}
                    />
                    <span className="per-unit">/{listingForm.unit.toLowerCase()}</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Quality Grade</label>
                  <select name="qualityGrade" value={listingForm.qualityGrade} onChange={handleFormChange}>
                    <option value="Premium">Premium</option>
                    <option value="Standard">Standard</option>
                    <option value="Economy">Economy</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Growing Method</label>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="growingMethod.organic"
                      checked={listingForm.growingMethod.organic}
                      onChange={handleFormChange}
                    />{" "}
                    Organic
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="growingMethod.nonGMO"
                      checked={listingForm.growingMethod.nonGMO}
                      onChange={handleFormChange}
                    />{" "}
                    Non-GMO
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="growingMethod.pesticideFree"
                      checked={listingForm.growingMethod.pesticideFree}
                      onChange={handleFormChange}
                    />{" "}
                    Pesticide-Free
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Additional Notes</label>
                <textarea
                  placeholder="Any other information buyers should know..."
                  name="notes"
                  value={listingForm.notes}
                  onChange={handleFormChange}
                ></textarea>
              </div>

              <div className="market-suggestion">
                <TrendingUp size={16} />
                <span>
                  Current market price for {listingForm.cropType}: {getMarketSuggestion(listingForm.cropType)}
                </span>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowListCropModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  List Crop
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const renderContactModal = () => {
    if (!showContactModal || !selectedBuyer) return null

    return (
      <div className="modal-overlay">
        <div className="modal-content contact-modal">
          <div className="modal-header">
            <h2>Contact {selectedBuyer.buyer}</h2>
            <button onClick={() => setShowContactModal(false)} className="close-btn">
              ×
            </button>
          </div>
          <div className="modal-body">
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="buyer-info">
                <div className="buyer-details">
                  <h3>{selectedBuyer.buyer}</h3>
                  <div className="buyer-rating">
                    <span className="stars">
                      {"★".repeat(Math.floor(selectedBuyer.rating))}
                      {"☆".repeat(5 - Math.floor(selectedBuyer.rating))}
                    </span>
                    <span className="rating-value">{selectedBuyer.rating}</span>
                  </div>
                  <p className="buyer-location">{selectedBuyer.location}</p>
                </div>
                <div className="request-summary">
                  <h4>Request Details</h4>
                  <p>
                    <strong>Crop:</strong> {selectedBuyer.crop}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {selectedBuyer.quantity}
                  </p>
                  <p>
                    <strong>Price Offered:</strong> {selectedBuyer.priceOffered}
                  </p>
                  <p>
                    <strong>Delivery By:</strong> {selectedBuyer.deliveryDate}
                  </p>
                </div>
              </div>

              <div className="form-group">
                <label>
                  Subject <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactFormChange}
                  placeholder="RE: Your request for Corn"
                />
              </div>

              <div className="form-group">
                <label>
                  Message <span className="required">*</span>
                </label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactFormChange}
                  placeholder="Enter your message here..."
                  rows={6}
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowContactModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <MessageCircle size={16} />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const renderBuyerRequestsModal = () => {
    if (!showBuyerRequestsModal) return null

    const filteredRequests = filterBuyerRequests(buyerRequests, activeRequestFilter)

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Buyer Requests</h2>
            <button onClick={() => setShowBuyerRequestsModal(false)} className="close-btn">
              ×
            </button>
          </div>
          <div className="modal-body">
            <div className="buyer-requests-filters">
              <button
                className={`filter ${activeRequestFilter === "All Requests" ? "active" : ""}`}
                onClick={() => setActiveRequestFilter("All Requests")}
              >
                All Requests
              </button>
              <button
                className={`filter ${activeRequestFilter === "New" ? "active" : ""}`}
                onClick={() => setActiveRequestFilter("New")}
              >
                New
              </button>
              <button
                className={`filter ${activeRequestFilter === "Pending" ? "active" : ""}`}
                onClick={() => setActiveRequestFilter("Pending")}
              >
                Pending
              </button>
              <button
                className={`filter ${activeRequestFilter === "Negotiating" ? "active" : ""}`}
                onClick={() => setActiveRequestFilter("Negotiating")}
              >
                Negotiating
              </button>
              <button
                className={`filter ${activeRequestFilter === "Accepted" ? "active" : ""}`}
                onClick={() => setActiveRequestFilter("Accepted")}
              >
                Accepted
              </button>
            </div>

            <div className="buyer-requests-list">
              {filteredRequests.length === 0 ? (
                <div className="empty-state">
                  <AlertCircle size={24} />
                  <p>
                    No {activeRequestFilter !== "All Requests" ? activeRequestFilter.toLowerCase() : ""} requests found
                  </p>
                </div>
              ) : (
                filteredRequests.map((request) => (
                  <div key={request.id} className={`request-card ${request.status.toLowerCase()}`}>
                    <div className="request-header">
                      <span className="request-status">{request.status}</span>
                      <h3>{request.buyer}</h3>
                      <div className="buyer-rating">
                        <span className="stars">
                          {"★".repeat(Math.floor(request.rating))}
                          {"☆".repeat(5 - Math.floor(request.rating))}
                        </span>
                        <span className="rating-value">{request.rating}</span>
                      </div>
                    </div>
                    <div className="request-details">
                      <div className="detail">
                        <span className="label">Crop:</span>
                        <span className="value">{request.crop}</span>
                      </div>
                      <div className="detail">
                        <span className="label">Quantity:</span>
                        <span className="value">{request.quantity}</span>
                      </div>
                      <div className="detail">
                        <span className="label">Price Offered:</span>
                        <span className="value price">{request.priceOffered}</span>
                      </div>
                      <div className="detail">
                        <span className="label">Delivery By:</span>
                        <span className="value">{request.deliveryDate}</span>
                      </div>
                      <div className="detail">
                        <span className="label">Location:</span>
                        <span className="value">{request.location}</span>
                      </div>
                      <div className="detail">
                        <span className="label">Request Date:</span>
                        <span className="value">{request.requestDate}</span>
                      </div>
                    </div>
                    <div className="market-suggestion">
                      <TrendingUp size={16} />
                      <span>
                        {request.priceOffered.replace("$", "") > getMarketSuggestion(request.crop).replace("$", "")
                          ? "This offer is above current market price!"
                          : "Current market price is " + getMarketSuggestion(request.crop)}
                      </span>
                    </div>
                    <div className="request-actions">
                      <button className="btn-secondary" onClick={() => handleContactBuyer(request)}>
                        <MessageCircle size={16} />
                        Contact Buyer
                      </button>
                      <button className="btn-primary" onClick={() => handleRespondToBuyer(request.id)}>
                        Respond
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderMarketPricesModal = () => {
    if (!showMarketPricesModal) return null

    const filteredPrices = filterCrops(marketPrices, activeCropFilter)
    const currentChartData = getChartData()
    const chartBars = timeFilter === "90" ? 30 : timeFilter === "7" ? 7 : 12

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Market Prices Comparison</h2>
            <button onClick={() => setShowMarketPricesModal(false)} className="close-btn">
              ×
            </button>
          </div>
          <div className="modal-body">
            <div className="market-prices-header">
              <div className="market-filters">
                <select value={activeCropFilter} onChange={(e) => setActiveCropFilter(e.target.value)}>
                  <option value="All Crops">All Crops</option>
                  <option value="Corn">Corn</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Soybeans">Soybeans</option>
                  <option value="Barley">Barley</option>
                </select>
                <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 90 Days</option>
                  <option value="365">Last Year</option>
                </select>
              </div>
              <button className="btn-secondary" onClick={() => handleNotification("Data exported to CSV")}>
                <Share2 size={16} />
                Export Data
              </button>
            </div>

            <div className="last-updated">
              <Clock size={14} />
              <span>Last updated: {filteredPrices[0]?.lastUpdated || "N/A"}</span>
            </div>

            <table className="market-prices-table">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Local Market</th>
                  <th>Regional Market</th>
                  <th>National Average</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrices.map((item, index) => (
                  <tr key={index}>
                    <td>{item.crop}</td>
                    <td>{item.localMarket}</td>
                    <td>{item.regionalMarket}</td>
                    <td>{item.nationalAverage}</td>
                    <td>
                      <span className={`trend-indicator ${item.trend}`}>
                        {item.trend === "up" && "↑"}
                        {item.trend === "down" && "↓"}
                        {item.trend === "stable" && "→"}
                        {item.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="price-chart">
              <h3>Price Trends (Last {timeFilter === "7" ? "7 Days" : timeFilter === "30" ? "30 Days" : "90 Days"})</h3>
              <div className="chart-area">
                <div className="chart-container">
                  {/* This would be a real chart component in production */}
                  <div className="chart-placeholder">
                    <div className="chart-line up" style={{ height: "70%" }}></div>
                    <div className="chart-line down" style={{ height: "40%" }}></div>
                    <div className="chart-line stable" style={{ height: "60%" }}></div>
                    <div className="chart-bars">
                      {[...Array(chartBars)].map((_, i) => {
                        const index = timeFilter === "90" ? i * 3 : i
                        return (
                          <div key={i} className="chart-bar">
                            {activeCropFilter === "Corn" || activeCropFilter === "All Crops" ? (
                              <div
                                className="corn-bar"
                                style={{ height: `${currentChartData.Corn[index] / 3.5}%` }}
                              ></div>
                            ) : null}
                            {activeCropFilter === "Wheat" || activeCropFilter === "All Crops" ? (
                              <div
                                className="wheat-bar"
                                style={{ height: `${currentChartData.Wheat[index] / 3.5}%` }}
                              ></div>
                            ) : null}
                            {activeCropFilter === "Soybeans" || activeCropFilter === "All Crops" ? (
                              <div
                                className="soybeans-bar"
                                style={{ height: `${currentChartData.Soybeans[index] / 3.5}%` }}
                              ></div>
                            ) : null}
                            {activeCropFilter === "Barley" || activeCropFilter === "All Crops" ? (
                              <div
                                className="barley-bar"
                                style={{ height: `${currentChartData.Barley[index] / 3.5}%` }}
                              ></div>
                            ) : null}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="color-box corn"></span>
                    <span>
                      Corn -{" "}
                      {activeCropFilter === "Corn" || activeCropFilter === "All Crops"
                        ? marketPrices[0].nationalAverage
                        : "N/A"}
                    </span>
                  </div>
                  <div className="legend-item">
                    <span className="color-box wheat"></span>
                    <span>
                      Wheat -{" "}
                      {activeCropFilter === "Wheat" || activeCropFilter === "All Crops"
                        ? marketPrices[1].nationalAverage
                        : "N/A"}
                    </span>
                  </div>
                  <div className="legend-item">
                    <span className="color-box soybeans"></span>
                    <span>
                      Soybeans -{" "}
                      {activeCropFilter === "Soybeans" || activeCropFilter === "All Crops"
                        ? marketPrices[2].nationalAverage
                        : "N/A"}
                    </span>
                  </div>
                  <div className="legend-item">
                    <span className="color-box barley"></span>
                    <span>
                      Barley -{" "}
                      {activeCropFilter === "Barley" || activeCropFilter === "All Crops"
                        ? marketPrices[3].nationalAverage
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="market-insights">
              <h3>Market Insights</h3>
              <ul className="insights-list">
                <li className="insight-item up">
                  <TrendingUp size={16} />
                  <span>Corn prices are trending up by 3% this month</span>
                </li>
                <li className="insight-item down">
                  <TrendingUp size={16} className="down" />
                  <span>Wheat prices are 2% lower than the regional average</span>
                </li>
                <li className="insight-item">
                  <Calendar size={16} />
                  <span>Best time to sell corn is projected to be in September</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render individual sections of the component
  const renderActiveListings = () => {
    return (
      <div className="listings-section">
        <div className="section-header">
          <h3>Your Active Listings</h3>
          <button className="btn-primary add-listing-btn" onClick={() => setShowListCropModal(true)}>
            <Tag size={16} />
            List New Crop
          </button>
        </div>

        {cropListings.length === 0 ? (
          <div className="empty-state">
            <p>You don't have any active crop listings.</p>
            <button className="btn-secondary" onClick={() => setShowListCropModal(true)}>
              Create Your First Listing
            </button>
          </div>
        ) : (
          <div className="listings-table-container">
            <table className="listings-table">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Quantity</th>
                  <th>Expected Harvest</th>
                  <th>Min. Price</th>
                  <th>Views</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cropListings.map((listing) => (
                  <tr key={listing.id}>
                    <td>{listing.crop}</td>
                    <td>{listing.quantity}</td>
                    <td>{listing.expectedHarvest}</td>
                    <td className="price">{listing.minPrice}</td>
                    <td>
                      {listing.views} <span className="inquiries">({listing.inquiries} inquiries)</span>
                    </td>
                    <td>
                      <span className={`status-badge ${listing.status.toLowerCase()}`}>{listing.status}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          title="Edit Listing"
                          onClick={() => handleNotification("Editing feature coming soon!")}
                        >
                          <FileText size={16} />
                        </button>
                        <button
                          className="btn-icon"
                          title="Promote Listing"
                          onClick={() => handleNotification("Your listing has been promoted!")}
                        >
                          <TrendingUp size={16} />
                        </button>
                        <button
                          className="btn-icon danger"
                          title="Delete Listing"
                          onClick={() => handleNotification("Listing removed successfully")}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }

  const renderBuyerRequests = () => {
    return (
      <div className="buyer-requests-section">
        <div className="section-header">
          <h3>
            Buyer Requests{" "}
            <span className="badge">{buyerRequests.filter((req) => req.status === "New").length} new</span>
          </h3>
          <button className="btn-secondary view-all-btn" onClick={() => setShowBuyerRequestsModal(true)}>
            View All
          </button>
        </div>

        <div className="request-cards">
          {buyerRequests
            .filter((req) => req.status === "New")
            .slice(0, 1)
            .map((request) => (
              <div key={request.id} className="request-card-preview">
                <div className="request-preview-header">
                  <span className="request-status new">New</span>
                  <h4>{request.buyer}</h4>
                </div>
                <div className="request-preview-details">
                  <p>
                    <strong>Wants:</strong> {request.quantity} of {request.crop}
                  </p>
                  <p>
                    <strong>Offering:</strong> <span className="price">{request.priceOffered}</span>
                  </p>
                  <p>
                    <strong>Delivery by:</strong> {request.deliveryDate}
                  </p>
                </div>
                <div className="request-preview-actions">
                  <button className="btn-primary" onClick={() => setShowBuyerRequestsModal(true)}>
                    View Details
                  </button>
                </div>
              </div>
            ))}

          {buyerRequests.filter((req) => req.status === "New").length === 0 && (
            <div className="empty-state">
              <p>No new buyer requests at this time.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderMarketInsights = () => {
    return (
      <div className="market-insights-section">
        <div className="section-header">
          <h3>Market Insights</h3>
          <button className="btn-secondary view-prices-btn" onClick={() => setShowMarketPricesModal(true)}>
            <DollarSign size={16} />
            View Market Prices
          </button>
        </div>

        <div className="price-trends">
          <div className="crop-price-cards">
            {marketPrices.slice(0, 3).map((item, index) => (
              <div key={index} className={`price-card ${item.trend}`}>
                <div className="price-card-header">
                  <h4>{item.crop}</h4>
                  <span className={`trend-indicator ${item.trend}`}>
                    {item.trend === "up" && "↑"}
                    {item.trend === "down" && "↓"}
                    {item.trend === "stable" && "→"}
                  </span>
                </div>
                <div className="price-card-body">
                  <div className="current-price">
                    <span className="price-label">Current Price</span>
                    <span className="price-value">{item.nationalAverage}</span>
                  </div>
                  <div className="price-mini-chart">
                    {priceHistory[item.crop].map((price, i) => (
                      <div
                        key={i}
                        className="chart-bar"
                        style={{
                          height: `${(price / (item.crop === "Soybeans" ? 325 : item.crop === "Wheat" ? 215 : 185)) * 100}%`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="price-card-footer">
                  <span className="change-label">
                    {item.trend === "up" ? "Up" : item.trend === "down" ? "Down" : "Stable"} from yesterday
                  </span>
                  <span className="change-value">
                    {item.trend === "up" ? "+2.3%" : item.trend === "down" ? "-1.8%" : "0%"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="market-actions">
            <button className="btn-secondary" onClick={() => setShowMarketPricesModal(true)}>
              View Price History
            </button>
            <button className="btn-secondary" onClick={() => handleNotification("Price alerts set successfully!")}>
              <AlertCircle size={16} />
              Set Price Alerts
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderTransactionHistory = () => {
    return (
      <div className="transaction-history-section">
        <div className="section-header">
          <h3>Transaction History</h3>
          <div className="sort-controls">
            <span>Sort by:</span>
            <button 
         className={`sort-btn ${sortOrder.field === 'date' ? 'active' : ''}`}
      onClick={() => setSortOrder({
    field: 'date',
    direction: sortOrder.field === 'date' && sortOrder.direction === 'desc' ? 'asc' : 'desc'
  })}
>
  Date
  {sortOrder.field === 'date' && (
    sortOrder.direction === 'desc' ? <ChevronDown size={14} /> : <ChevronUp size={14} />
  )}
</button>
            <button
              className="sort-btn"
              onClick={() =>
                setSortOrder({
                  field: "price",
                  direction: sortOrder.field === "price" && sortOrder.direction === "desc" ? "asc" : "desc",
                })
              }
            >
              Price
              {sortOrder.field === "price" &&
                (sortOrder.direction === "desc" ? <ChevronDown size={14} /> : <ChevronUp size={14} />)}
            </button>
          </div>
        </div>

        <div className="transaction-table-container">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Buyer</th>
                <th>Crop</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {sortData(transactionHistory, sortOrder.field, sortOrder.direction).map((transaction) => (
                <tr key={transaction.id}>
                  <td className="date-cell">{transaction.date}</td>
                  <td>{transaction.buyer}</td>
                  <td>{transaction.crop}</td>
                  <td>{transaction.quantity}</td>
                  <td className="price">{transaction.price}</td>
                  <td>
                    <span className={`status-badge ${transaction.status.toLowerCase()}`}>{transaction.status}</span>
                  </td>
                  <td>
                    <div className="rating">
                      <span className="stars">
                        {"★".repeat(Math.floor(transaction.rating))}
                        {"☆".repeat(5 - Math.floor(transaction.rating))}
                      </span>
                      <span className="rating-value">{transaction.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {transactionHistory.length === 0 && (
            <div className="empty-state">
              <p>No transactions recorded yet.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Main component render
  return (
    <div className="market-access-container">
      <header className="market-access-header">
        <h2>Market Access</h2>
        <p>Connect with buyers, track prices, and manage your crop sales</p>
      </header>

      <div className="market-access-grid">
        <div className="main-column">
          {renderActiveListings()}
          {renderBuyerRequests()}
        </div>

        <div className="side-column">
          {renderMarketInsights()}
          {renderTransactionHistory()}
        </div>
      </div>

      {renderListCropModal()}
      {renderBuyerRequestsModal()}
      {renderMarketPricesModal()}
      {renderContactModal()}
      {renderNotification()}
    </div>
  )
}

export default MarketAccess

