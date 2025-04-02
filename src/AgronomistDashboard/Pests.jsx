import { useState } from "react"
import "../AgronomistStyles/Pests.css"
import { Bug, Search, Filter, Plus, AlertTriangle, Info } from "lucide-react"
import pest1 from '../images/Screenshot 2025-04-02 131305.png'
import pest2 from '../images/Screenshot 2025-04-02 131639.png'
import pest3 from '../images/Screenshot 2025-04-02 131728.png'
import pest4 from '../images/Screenshot 2025-04-02 131800.png'
import pest5 from '../images/Screenshot 2025-04-02 131836.png'

const Pests = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [pestData, setPestData] = useState([
    {
      id: 1,
      name: "Aphids",
      category: "insect",
      affectedCrops: ["Corn", "Wheat", "Vegetables"],
      symptoms: "Curling leaves, yellowing, stunted growth, sticky honeydew on leaves",
      treatment: "Neem oil, insecticidal soap, ladybugs as natural predators",
      severity: "medium",
      image: pest1,
    },
    {
      id: 2,
      name: "Powdery Mildew",
      category: "fungus",
      affectedCrops: ["Grapes", "Squash", "Cucumbers"],
      symptoms: "White powdery spots on leaves and stems",
      treatment: "Fungicides, baking soda solution, proper plant spacing",
      severity: "high",
      image: pest2,
    },
    {
      id: 3,
      name: "Corn Borer",
      category: "insect",
      affectedCrops: ["Corn"],
      symptoms: "Broken tassels, holes in stalks, sawdust-like frass",
      treatment: "Bt (Bacillus thuringiensis) sprays, crop rotation",
      severity: "high",
      image: pest3,
    },
    {
      id: 4,
      name: "Late Blight",
      category: "fungus",
      affectedCrops: ["Potatoes", "Tomatoes"],
      symptoms: "Dark water-soaked spots on leaves, white fuzzy growth",
      treatment: "Copper-based fungicides, remove infected plants",
      severity: "critical",
      image: pest4,
    },
    {
      id: 5,
      name: "Root-knot Nematodes",
      category: "nematode",
      affectedCrops: ["Vegetables", "Soybeans", "Cotton"],
      symptoms: "Stunted growth, yellowing, galls on roots",
      treatment: "Crop rotation, resistant varieties, soil solarization",
      severity: "medium",
      image:pest5,
    },
  ])

  const [newPest, setNewPest] = useState({
    name: "",
    category: "insect",
    affectedCrops: "",
    symptoms: "",
    treatment: "",
    severity: "medium",
    image: "/placeholder.svg?height=200&width=200",
  })

  const [selectedPest, setSelectedPest] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const handleAddPest = (e) => {
    e.preventDefault()
    const newPestObj = {
      id: pestData.length + 1,
      ...newPest,
      affectedCrops: newPest.affectedCrops.split(",").map((crop) => crop.trim()),
    }

    setPestData([...pestData, newPestObj])
    setNewPest({
      name: "",
      category: "insect",
      affectedCrops: "",
      symptoms: "",
      treatment: "",
      severity: "medium",
      image: "/placeholder.svg?height=200&width=200",
    })
    setShowAddModal(false)
  }

  const handlePestClick = (pest) => {
    setSelectedPest(pest)
    setShowDetailModal(true)
  }

  const filteredPests = pestData.filter((pest) => {
    const matchesSearch =
      pest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pest.symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pest.treatment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || pest.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "low":
        return "#8bc34a"
      case "medium":
        return "#ffc107"
      case "high":
        return "#ff9800"
      case "critical":
        return "#f44336"
      default:
        return "#8bc34a"
    }
  }

  return (
    <div className="pestsContainer">
      <div className="pestsHeader">
        <div className="pestsTitle">
          <Bug size={24} />
          <h2>Pest & Disease Management</h2>
        </div>
        <div className="pestsActions">
          <div className="searchContainer">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search pests or diseases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filterContainer">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="insect">Insects</option>
              <option value="fungus">Fungi</option>
              <option value="bacteria">Bacteria</option>
              <option value="virus">Viruses</option>
              <option value="nematode">Nematodes</option>
            </select>
            <Filter size={18} />
          </div>
          <button className="addButton" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="pestsGrid">
        {filteredPests.length === 0 ? (
          <div className="noPests">
            <AlertTriangle size={48} />
            <p>No pests or diseases found matching your criteria.</p>
          </div>
        ) : (
          filteredPests.map((pest) => (
            <div key={pest.id} className="pestCard" onClick={() => handlePestClick(pest)}>
              <div className="pestImage">
                <img src={pest.image || "/placeholder.svg"} alt={pest.name} />
                <div className="severityBadge" style={{ backgroundColor: getSeverityColor(pest.severity) }}>
                  {pest.severity.charAt(0).toUpperCase() + pest.severity.slice(1)}
                </div>
              </div>
              <div className="pestInfo">
                <h3>{pest.name}</h3>
                <span className="pestCategory">{pest.category.charAt(0).toUpperCase() + pest.category.slice(1)}</span>
                <div className="pestCrops">
                  <strong>Affects:</strong> {pest.affectedCrops.join(", ")}
                </div>
                <p className="pestSymptoms">{pest.symptoms}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Pest Modal */}
      {showAddModal && (
        <div className="modalOverlay">
          <div className="modal">
            <div className="modalHeader">
              <h3>Add New Pest or Disease</h3>
              <button onClick={() => setShowAddModal(false)} className="closeButton">
                ×
              </button>
            </div>
            <form onSubmit={handleAddPest}>
              <div className="formGroup">
                <label>Name</label>
                <input
                  type="text"
                  value={newPest.name}
                  onChange={(e) => setNewPest({ ...newPest, name: e.target.value })}
                  required
                />
              </div>
              <div className="formGroup">
                <label>Category</label>
                <select value={newPest.category} onChange={(e) => setNewPest({ ...newPest, category: e.target.value })}>
                  <option value="insect">Insect</option>
                  <option value="fungus">Fungus</option>
                  <option value="bacteria">Bacteria</option>
                  <option value="virus">Virus</option>
                  <option value="nematode">Nematode</option>
                </select>
              </div>
              <div className="formGroup">
                <label>Affected Crops (comma separated)</label>
                <input
                  type="text"
                  value={newPest.affectedCrops}
                  onChange={(e) => setNewPest({ ...newPest, affectedCrops: e.target.value })}
                  required
                />
              </div>
              <div className="formGroup">
                <label>Symptoms</label>
                <textarea
                  value={newPest.symptoms}
                  onChange={(e) => setNewPest({ ...newPest, symptoms: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <div className="formGroup">
                <label>Treatment</label>
                <textarea
                  value={newPest.treatment}
                  onChange={(e) => setNewPest({ ...newPest, treatment: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <div className="formGroup">
                <label>Severity</label>
                <select value={newPest.severity} onChange={(e) => setNewPest({ ...newPest, severity: e.target.value })}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div className="formActions">
                <button type="button" onClick={() => setShowAddModal(false)} className="cancelButton">
                  Cancel
                </button>
                <button type="submit" className="saveButton">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pest Detail Modal */}
      {showDetailModal && selectedPest && (
        <div className="modalOverlay">
          <div className="modal pestDetailModal">
            <div className="modalHeader">
              <h3>{selectedPest.name}</h3>
              <button onClick={() => setShowDetailModal(false)} className="closeButton">
                ×
              </button>
            </div>
            <div className="pestDetailContent">
              <div className="pestDetailImage">
                <img src={selectedPest.image || "/placeholder.svg"} alt={selectedPest.name} />
                <div
                  className="severityBadge large"
                  style={{ backgroundColor: getSeverityColor(selectedPest.severity) }}
                >
                  {selectedPest.severity.charAt(0).toUpperCase() + selectedPest.severity.slice(1)} Severity
                </div>
              </div>
              <div className="pestDetailInfo">
                <div className="infoSection">
                  <h4>Category</h4>
                  <p>{selectedPest.category.charAt(0).toUpperCase() + selectedPest.category.slice(1)}</p>
                </div>
                <div className="infoSection">
                  <h4>Affected Crops</h4>
                  <p>{selectedPest.affectedCrops.join(", ")}</p>
                </div>
                <div className="infoSection">
                  <h4>Symptoms</h4>
                  <p>{selectedPest.symptoms}</p>
                </div>
                <div className="infoSection">
                  <h4>Treatment</h4>
                  <p>{selectedPest.treatment}</p>
                </div>
                <div className="recommendationSection">
                  <div className="recommendationHeader">
                    <Info size={20} />
                    <h4>Recommendations</h4>
                  </div>
                  <ul>
                    <li>Monitor fields regularly for early detection</li>
                    <li>Consider preventative measures during high-risk seasons</li>
                    <li>Consult with farmers about resistant crop varieties</li>
                    <li>Document treatment effectiveness for future reference</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modalFooter">
              <button className="cancelButton" onClick={() => setShowDetailModal(false)}>
                Close
              </button>
              <button className="actionButton">Send Advisory to Farmers</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pests

