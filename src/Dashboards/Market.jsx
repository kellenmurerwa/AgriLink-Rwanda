"use client"

import { useState } from "react"
import {
  TrendingUp,
  Tag,
  Share2,
  AlertCircle,
  Check,
  X,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  Edit,
  Trash2,
  ArrowUpRight,
  BarChart3,
  Star,
  StarHalf,
} from "lucide-react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import "../DashboardStyles/Market.css"

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
  const [activeTab, setActiveTab] = useState("listings")

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

  // Generate 30 days of price history data for charts
  const generatePriceHistory = (basePrice, volatility) => {
    const today = new Date()
    const data = []

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      // Create some random price fluctuation
      const randomFactor = Math.random() * volatility * 2 - volatility
      const price = Number.parseFloat((basePrice + randomFactor).toFixed(2))

      data.push({
        date: date.toISOString().split("T")[0],
        price: price,
      })
    }

    return data
  }

  // Price history data for the last 30 days
  const priceHistoryData = {
    Corn: generatePriceHistory(180, 8),
    Wheat: generatePriceHistory(212, 10),
    Soybeans: generatePriceHistory(320, 15),
    Barley: generatePriceHistory(162, 7),
  }

  // Combined data for multi-line chart
  const combinedPriceData = priceHistoryData.Corn.map((item, index) => ({
    date: item.date,
    Corn: item.price,
    Wheat: priceHistoryData.Wheat[index].price,
    Soybeans: priceHistoryData.Soybeans[index].price,
    Barley: priceHistoryData.Barley[index].price,
  }))

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

  // Render star rating
  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
      <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="star-filled" />
        ))}
        {hasHalfStar && <StarHalf className="star-filled" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} className="star-empty" />
        ))}
        <span className="rating-value">{rating}</span>
      </div>
    )
  }

  // Render notification
  const renderNotification = () => {
    if (!showNotification) return null

    return (
      <div className="notification">
        <div className={`notification-content ${notification.type}`}>
          <div className="notification-icon">{notification.type === "success" ? <Check /> : <AlertCircle />}</div>
          <div className="notification-text">
            <h5>{notification.type === "success" ? "Success" : "Error"}</h5>
            <p>{notification.message}</p>
          </div>
        </div>
      </div>
    )
  }

  // Render list crop modal
  const renderListCropModal = () => {
    if (!showListCropModal) return null

    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <div>
              <h2>List Your Crop for Sale</h2>
              <p>Fill out the details below to list your crop on the marketplace.</p>
            </div>
            <button onClick={() => setShowListCropModal(false)} className="close-button">
              <X />
            </button>
          </div>

          <form onSubmit={handleListCropSubmit} className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="cropType">
                  Crop Type <span className="required">*</span>
                </label>
                <div>
                  <select id="cropType" name="cropType" value={listingForm.cropType} onChange={handleFormChange}>
                    <option value="Corn">Corn</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Soybeans">Soybeans</option>
                    <option value="Rice">Rice</option>
                    <option value="Barley">Barley</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="quantity">
                  Quantity <span className="required">*</span>
                </label>
                <div className="quantity-group">
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={listingForm.quantity}
                    onChange={handleFormChange}
                  />
                  <select name="unit" value={listingForm.unit} onChange={handleFormChange}>
                    <option value="Tons">Tons</option>
                    <option value="Kilograms">Kilograms</option>
                    <option value="Pounds">Pounds</option>
                    <option value="Bushels">Bushels</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="harvestDate">
                  Harvest Date <span className="required">*</span>
                </label>
                <div>
                  <input
                    id="harvestDate"
                    name="harvestDate"
                    type="date"
                    value={listingForm.harvestDate}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="availableUntil">Available Until</label>
                <div>
                  <input
                    id="availableUntil"
                    name="availableUntil"
                    type="date"
                    value={listingForm.availableUntil}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="minPrice">
                  Minimum Price <span className="required">*</span>
                </label>
                <div className="price-input">
                  <span className="price-symbol">$</span>
                  <input
                    id="minPrice"
                    name="minPrice"
                    type="number"
                    placeholder="0.00"
                    value={listingForm.minPrice}
                    onChange={handleFormChange}
                  />
                  <span className="price-unit">/{listingForm.unit.toLowerCase()}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="qualityGrade">Quality Grade</label>
                <div>
                  <select
                    id="qualityGrade"
                    name="qualityGrade"
                    value={listingForm.qualityGrade}
                    onChange={handleFormChange}
                  >
                    <option value="Premium">Premium</option>
                    <option value="Standard">Standard</option>
                    <option value="Economy">Economy</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Growing Method</label>
                <div className="checkbox-group">
                  <div className="checkbox">
                    <input
                      id="organic"
                      name="growingMethod.organic"
                      type="checkbox"
                      checked={listingForm.growingMethod.organic}
                      onChange={handleFormChange}
                    />
                    <label htmlFor="organic">Organic</label>
                  </div>
                  <div className="checkbox">
                    <input
                      id="nonGMO"
                      name="growingMethod.nonGMO"
                      type="checkbox"
                      checked={listingForm.growingMethod.nonGMO}
                      onChange={handleFormChange}
                    />
                    <label htmlFor="nonGMO">Non-GMO</label>
                  </div>
                  <div className="checkbox">
                    <input
                      id="pesticideFree"
                      name="growingMethod.pesticideFree"
                      type="checkbox"
                      checked={listingForm.growingMethod.pesticideFree}
                      onChange={handleFormChange}
                    />
                    <label htmlFor="pesticideFree">Pesticide-Free</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Additional Notes</label>
                <div>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    placeholder="Any other information buyers should know..."
                    value={listingForm.notes}
                    onChange={handleFormChange}
                  ></textarea>
                </div>
              </div>

              <div className="market-suggestion">
                <TrendingUp className="suggestion-icon" />
                <div>
                  <h4>Market Suggestion</h4>
                  <p>
                    Current market price for {listingForm.cropType}: {getMarketSuggestion(listingForm.cropType)}
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" onClick={() => setShowListCropModal(false)} className="button secondary">
                Cancel
              </button>
              <button type="submit" className="button primary">
                List Crop
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Render contact modal
  const renderContactModal = () => {
    if (!showContactModal || !selectedBuyer) return null

    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Contact {selectedBuyer.buyer}</h2>
            <button onClick={() => setShowContactModal(false)} className="close-button">
              <X />
            </button>
          </div>

          <form onSubmit={handleContactSubmit} className="modal-body">
            <div className="buyer-info">
              <div className="buyer-header">
                <div className="buyer-avatar">{selectedBuyer.buyer.charAt(0)}</div>
                <div>
                  <h3>{selectedBuyer.buyer}</h3>
                  {renderStarRating(selectedBuyer.rating)}
                </div>
              </div>

              <div className="buyer-details">
                <div>
                  <p className="label">Crop:</p>
                  <p className="value">{selectedBuyer.crop}</p>
                </div>
                <div>
                  <p className="label">Quantity:</p>
                  <p className="value">{selectedBuyer.quantity}</p>
                </div>
                <div>
                  <p className="label">Price Offered:</p>
                  <p className="value price">{selectedBuyer.priceOffered}</p>
                </div>
                <div>
                  <p className="label">Delivery By:</p>
                  <p className="value">{selectedBuyer.deliveryDate}</p>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">
                Subject <span className="required">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={contactForm.subject}
                onChange={handleContactFormChange}
                placeholder="RE: Your request for Corn"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                Message <span className="required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={contactForm.message}
                onChange={handleContactFormChange}
                placeholder="Enter your message here..."
              ></textarea>
            </div>

            <div className="modal-footer">
              <button type="button" onClick={() => setShowContactModal(false)} className="button secondary">
                Cancel
              </button>
              <button type="submit" className="button primary">
                <MessageCircle className="button-icon" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Render buyer requests modal
  const renderBuyerRequestsModal = () => {
    if (!showBuyerRequestsModal) return null

    const filteredRequests = filterBuyerRequests(buyerRequests, activeRequestFilter)

    return (
      <div className="modal-overlay">
        <div className="modal large">
          <div className="modal-header">
            <div>
              <h2>Buyer Requests</h2>
              <p>View and respond to requests from potential buyers.</p>
            </div>
            <button onClick={() => setShowBuyerRequestsModal(false)} className="close-button">
              <X />
            </button>
          </div>

          <div className="modal-body">
            <div className="filter-buttons">
              {["All Requests", "New", "Pending", "Negotiating", "Accepted"].map((filter) => (
                <button
                  key={filter}
                  className={`filter-button ${activeRequestFilter === filter ? "active" : ""}`}
                  onClick={() => setActiveRequestFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="requests-container">
              {filteredRequests.length === 0 ? (
                <div className="empty-state">
                  <AlertCircle className="empty-icon" />
                  <h3>No requests found</h3>
                  <p>
                    No {activeRequestFilter !== "All Requests" ? activeRequestFilter.toLowerCase() : ""} requests at
                    this time.
                  </p>
                </div>
              ) : (
                <div className="requests-list">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className={`request-card ${request.status.toLowerCase()}`}>
                      <div className="request-header">
                        <div>
                          <span className={`status-badge ${request.status.toLowerCase()}`}>{request.status}</span>
                          <h3>{request.buyer}</h3>
                          <div className="request-meta">
                            {renderStarRating(request.rating)}
                            <span className="separator">•</span>
                            <span>{request.location}</span>
                          </div>
                        </div>
                        <div className="request-date">
                          <p>Request Date: {request.requestDate}</p>
                        </div>
                      </div>

                      <div className="request-details">
                        <div>
                          <p className="label">Crop:</p>
                          <p className="value">{request.crop}</p>
                        </div>
                        <div>
                          <p className="label">Quantity:</p>
                          <p className="value">{request.quantity}</p>
                        </div>
                        <div>
                          <p className="label">Price Offered:</p>
                          <p className="value price">{request.priceOffered}</p>
                        </div>
                        <div>
                          <p className="label">Delivery By:</p>
                          <p className="value">{request.deliveryDate}</p>
                        </div>
                      </div>

                      <div className="market-suggestion">
                        <TrendingUp className="suggestion-icon" />
                        <p>
                          {request.priceOffered.replace("$", "") > getMarketSuggestion(request.crop).replace("$", "")
                            ? "This offer is above current market price!"
                            : "Current market price is " + getMarketSuggestion(request.crop)}
                        </p>
                      </div>

                      <div className="request-actions">
                        <button onClick={() => handleContactBuyer(request)} className="button secondary">
                          <MessageCircle className="button-icon" />
                          Contact Buyer
                        </button>
                        <button onClick={() => handleRespondToBuyer(request.id)} className="button primary">
                          Respond
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render market prices modal
  const renderMarketPricesModal = () => {
    if (!showMarketPricesModal) return null

    const filteredPrices = filterCrops(marketPrices, activeCropFilter)

    return (
      <div className="modal-overlay">
        <div className="modal large">
          <div className="modal-header">
            <div>
              <h2>Market Prices Comparison</h2>
              <p>View and analyze current market prices for different crops.</p>
            </div>
            <button onClick={() => setShowMarketPricesModal(false)} className="close-button">
              <X />
            </button>
          </div>

          <div className="modal-body">
            <div className="filter-controls">
              <div className="filter-selects">
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

              <button onClick={() => handleNotification("Data exported to CSV")} className="button secondary">
                <Share2 className="button-icon" />
                Export Data
              </button>
            </div>

            <div className="last-updated">
              <Clock className="update-icon" />
              <span>Last updated: {filteredPrices[0]?.lastUpdated || "N/A"}</span>
            </div>

            <div className="table-container">
              <table className="data-table">
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
                      <td className="crop-name">{item.crop}</td>
                      <td>{item.localMarket}</td>
                      <td>{item.regionalMarket}</td>
                      <td className="price">{item.nationalAverage}</td>
                      <td>
                        <span className={`trend-badge ${item.trend}`}>
                          {item.trend === "up" && <ArrowUpRight className="trend-icon" />}
                          {item.trend === "down" && <ArrowUpRight className="trend-icon down" />}
                          {item.trend.charAt(0).toUpperCase() + item.trend.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="chart-section">
              <h3>Price Trends (Last {timeFilter === "7" ? "7" : timeFilter === "30" ? "30" : "90"} Days)</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={combinedPriceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return `${date.getMonth() + 1}/${date.getDate()}`
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [`$${value}`, name]}
                      labelFormatter={(label) => {
                        const date = new Date(label)
                        return date.toLocaleDateString()
                      }}
                    />
                    <Legend />
                    {activeCropFilter === "All Crops" || activeCropFilter === "Corn" ? (
                      <Line
                        type="monotone"
                        dataKey="Corn"
                        stroke="#4ade80"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 6 }}
                      />
                    ) : null}
                    {activeCropFilter === "All Crops" || activeCropFilter === "Wheat" ? (
                      <Line
                        type="monotone"
                        dataKey="Wheat"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 6 }}
                      />
                    ) : null}
                    {activeCropFilter === "All Crops" || activeCropFilter === "Soybeans" ? (
                      <Line
                        type="monotone"
                        dataKey="Soybeans"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 6 }}
                      />
                    ) : null}
                    {activeCropFilter === "All Crops" || activeCropFilter === "Barley" ? (
                      <Line
                        type="monotone"
                        dataKey="Barley"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 6 }}
                      />
                    ) : null}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="insights-section">
              <h3>Market Insights</h3>
              <div className="insights-list">
                <div className="insight-card up">
                  <TrendingUp className="insight-icon" />
                  <p>Corn prices are trending up by 3% this month</p>
                </div>
                <div className="insight-card down">
                  <TrendingUp className="insight-icon down" />
                  <p>Wheat prices are 2% lower than the regional average</p>
                </div>
                <div className="insight-card info">
                  <Calendar className="insight-icon" />
                  <p>Best time to sell corn is projected to be in September</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main component render
  return (
    <div className="market-access">
      <div className="page-header">
        <h1>Market Access</h1>
        <p>Connect with buyers, track prices, and manage your crop sales</p>
      </div>

      <div className="market-overview">
        {/* Market Overview Card */}
        <div className="overview-chart">
          <div className="card-header">
            <h2>Market Overview</h2>
            <p>Current market trends and price analysis</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={combinedPriceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return `${date.getMonth() + 1}/${date.getDate()}`
                  }}
                />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [`$${value}`, name]}
                  labelFormatter={(label) => {
                    const date = new Date(label)
                    return date.toLocaleDateString()
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Corn"
                  stroke="#4ade80"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="Wheat"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="Soybeans"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="Barley"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-controls">
            <button onClick={() => setShowMarketPricesModal(true)} className="button secondary">
              <BarChart3 className="button-icon" />
              View Detailed Analysis
            </button>
            <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* Price Summary Cards */}
        <div className="price-cards">
          {marketPrices.slice(0, 3).map((item, index) => (
            <div key={index} className={`price-card ${item.trend}`}>
              <div className="price-card-header">
                <h3>{item.crop}</h3>
                <span className={`trend-badge ${item.trend}`}>
                  {item.trend === "up" && <ArrowUpRight className="trend-icon" />}
                  {item.trend === "down" && <ArrowUpRight className="trend-icon down" />}
                  {item.trend.charAt(0).toUpperCase() + item.trend.slice(1)}
                </span>
              </div>
              <div className="price-card-body">
                <div className="price-info">
                  <p className="price-label">National Average</p>
                  <p className="price-value">{item.nationalAverage}</p>
                </div>
                <div className="mini-chart">
                  {priceHistoryData[item.crop].slice(-7).map((price, i) => (
                    <div
                      key={i}
                      className={`chart-bar ${item.trend}`}
                      style={{
                        height: `${(price.price / (item.crop === "Soybeans" ? 325 : item.crop === "Wheat" ? 215 : 185)) * 40}px`,
                        opacity: 0.5 + i * 0.07,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="price-card-footer">
                <span>Local: {item.localMarket}</span>
                <span>Regional: {item.regionalMarket}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tabs">
        <nav className="tab-nav">
          <button
            onClick={() => setActiveTab("listings")}
            className={`tab-button ${activeTab === "listings" ? "active" : ""}`}
          >
            Your Listings
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`tab-button ${activeTab === "requests" ? "active" : ""}`}
          >
            Buyer Requests
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`tab-button ${activeTab === "history" ? "active" : ""}`}
          >
            Transaction History
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Listings Tab */}
        {activeTab === "listings" && (
          <div className="listings-tab">
            <div className="section-header">
              <h2>Your Active Listings</h2>
              <button onClick={() => setShowListCropModal(true)} className="button primary">
                <Tag className="button-icon" />
                List New Crop
              </button>
            </div>

            {cropListings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon-container">
                  <Tag className="empty-icon" />
                </div>
                <h3>No Active Listings</h3>
                <p>You don't have any active crop listings.</p>
                <button onClick={() => setShowListCropModal(true)} className="button primary">
                  Create Your First Listing
                </button>
              </div>
            ) : (
              <div className="table-container">
                <table className="data-table">
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
                        <td className="crop-name">{listing.crop}</td>
                        <td>{listing.quantity}</td>
                        <td>{listing.expectedHarvest}</td>
                        <td className="price">{listing.minPrice}</td>
                        <td>
                          {listing.views}
                          <span className="inquiries">({listing.inquiries} inquiries)</span>
                        </td>
                        <td>
                          <span className="status-badge">{listing.status}</span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              onClick={() => handleNotification("Editing feature coming soon!")}
                              className="icon-button"
                            >
                              <Edit />
                            </button>
                            <button
                              onClick={() => handleNotification("Your listing has been promoted!")}
                              className="icon-button"
                            >
                              <TrendingUp />
                            </button>
                            <button
                              onClick={() => handleNotification("Listing removed successfully")}
                              className="icon-button delete"
                            >
                              <Trash2 />
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
        )}

        {/* Buyer Requests Tab */}
        {activeTab === "requests" && (
          <div className="requests-tab">
            <div className="section-header">
              <h2>
                Buyer Requests
                {buyerRequests.filter((req) => req.status === "New").length > 0 && (
                  <span className="new-badge">{buyerRequests.filter((req) => req.status === "New").length} new</span>
                )}
              </h2>
              <button onClick={() => setShowBuyerRequestsModal(true)} className="button secondary">
                View All Requests
              </button>
            </div>

            <div className="request-cards">
              {buyerRequests
                .filter((req) => req.status === "New")
                .slice(0, 2)
                .map((request) => (
                  <div key={request.id} className="request-card new">
                    <div className="request-header">
                      <div>
                        <span className="status-badge new">New</span>
                        <h3>{request.buyer}</h3>
                      </div>
                      <div>{renderStarRating(request.rating)}</div>
                    </div>
                    <div className="request-details">
                      <div>
                        <p className="label">Wants:</p>
                        <p className="value">
                          {request.quantity} of {request.crop}
                        </p>
                      </div>
                      <div>
                        <p className="label">Offering:</p>
                        <p className="value price">{request.priceOffered}</p>
                      </div>
                      <div>
                        <p className="label">Delivery by:</p>
                        <p className="value">{request.deliveryDate}</p>
                      </div>
                      <div>
                        <p className="label">Location:</p>
                        <p className="value">{request.location}</p>
                      </div>
                    </div>
                    <button onClick={() => setShowBuyerRequestsModal(true)} className="button primary full-width">
                      View Details
                    </button>
                  </div>
                ))}

              {buyerRequests.filter((req) => req.status === "New").length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon-container">
                    <MessageCircle className="empty-icon" />
                  </div>
                  <h3>No New Requests</h3>
                  <p>There are no new buyer requests at this time.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Transaction History Tab */}
        {activeTab === "history" && (
          <div className="history-tab">
            <div className="section-header">
              <h2>Transaction History</h2>
              <div className="sort-controls">
                <span>Sort by:</span>
                <button
                  className={`sort-button ${sortOrder.field === "date" ? "active" : ""}`}
                  onClick={() =>
                    setSortOrder({
                      field: "date",
                      direction: sortOrder.field === "date" && sortOrder.direction === "desc" ? "asc" : "desc",
                    })
                  }
                >
                  Date
                  {sortOrder.field === "date" &&
                    (sortOrder.direction === "desc" ? (
                      <ChevronDown className="sort-icon" />
                    ) : (
                      <ChevronUp className="sort-icon" />
                    ))}
                </button>
                <button
                  className={`sort-button ${sortOrder.field === "price" ? "active" : ""}`}
                  onClick={() =>
                    setSortOrder({
                      field: "price",
                      direction: sortOrder.field === "price" && sortOrder.direction === "desc" ? "asc" : "desc",
                    })
                  }
                >
                  Price
                  {sortOrder.field === "price" &&
                    (sortOrder.direction === "desc" ? (
                      <ChevronDown className="sort-icon" />
                    ) : (
                      <ChevronUp className="sort-icon" />
                    ))}
                </button>
              </div>
            </div>

            <div className="table-container">
              <table className="data-table">
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
                      <td>{transaction.date}</td>
                      <td className="buyer-name">{transaction.buyer}</td>
                      <td>{transaction.crop}</td>
                      <td>{transaction.quantity}</td>
                      <td className="price">{transaction.price}</td>
                      <td>
                        <span className="status-badge">{transaction.status}</span>
                      </td>
                      <td>{renderStarRating(transaction.rating)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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

