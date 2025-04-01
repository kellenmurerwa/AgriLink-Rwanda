import { useState } from "react"
import "../DashboardStyles/Library.css"
import { Search, PieChart, FileText, Bookmark } from "lucide-react"

const Library = () => {
  const [activeResourceCategory, setActiveResourceCategory] = useState("all")
  const [activeResourceType, setActiveResourceType] = useState("All Types")
  const [sortOrder, setSortOrder] = useState("Newest")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for learning resources
  const learningCategories = [
    { id: "all", name: "All Resources", icon: "All" },
    { id: "crop", name: "Crop Management", icon: <PieChart size={20} /> },
    { id: "soil", name: "Soil Health", icon: <FileText size={20} /> },
    { id: "water", name: "Water Management", icon: <FileText size={20} /> },
    { id: "pest", name: "Pest Control", icon: <FileText size={20} /> },
    { id: "equipment", name: "Equipment", icon: <FileText size={20} /> },
    { id: "business", name: "Farm Business", icon: <FileText size={20} /> },
  ]

  const learningResources = [
    {
      id: 1,
      title: "Sustainable Crop Rotation Practices",
      category: "crop",
      type: "article",
      duration: "15 min read",
      bookmark: true,
    },
    { id: 2, title: "Soil Nutrient Management", category: "soil", type: "video", duration: "22 min", bookmark: false },
    {
      id: 3,
      title: "Water Conservation Techniques",
      category: "water",
      type: "article",
      duration: "10 min read",
      bookmark: true,
    },
    {
      id: 4,
      title: "Organic Pest Management",
      category: "pest",
      type: "course",
      duration: "4 modules",
      bookmark: false,
    },
    {
      id: 5,
      title: "Farm Equipment Maintenance",
      category: "equipment",
      type: "video",
      duration: "35 min",
      bookmark: false,
    },
    {
      id: 6,
      title: "Agricultural Business Planning",
      category: "business",
      type: "course",
      duration: "6 modules",
      bookmark: true,
    },
  ]

  // Function to filter resources based on category and type
  const getFilteredResources = () => {
    return learningResources.filter((resource) => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeResourceCategory === "all" || resource.category === activeResourceCategory
      const matchesType =
        activeResourceType === "All Types" ||
        (activeResourceType === "Articles" && resource.type === "article") ||
        (activeResourceType === "Videos" && resource.type === "video") ||
        (activeResourceType === "Courses" && resource.type === "course") ||
        (activeResourceType === "Bookmarked" && resource.bookmark)

      return matchesSearch && matchesCategory && matchesType
    })
  }

  // Function to sort resources
  const getSortedResources = (resources) => {
    if (sortOrder === "Newest") {
      return [...resources].sort((a, b) => b.id - a.id)
    } else if (sortOrder === "Most Popular") {
      return [...resources].sort((a, b) => (a.bookmark === b.bookmark ? 0 : a.bookmark ? -1 : 1))
    } else if (sortOrder === "Shortest") {
      return [...resources].sort((a, b) => {
        const getDuration = (resource) => {
          if (resource.type === "course") {
            return Number.parseInt(resource.duration.split(" ")[0]) * 30 // Approximate minutes per module
          } else {
            return Number.parseInt(resource.duration.split(" ")[0])
          }
        }
        return getDuration(a) - getDuration(b)
      })
    }
    return resources
  }

  // Toggle bookmark status
  const toggleBookmark = (resourceId) => {
    // In a real app, you would update state here
    console.log("Toggle bookmark for resource:", resourceId)
  }

  return (
    <div className="library-container">
      <div className="library-header">
        <h2>Knowledge Library</h2>
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="library-categories">
        {learningCategories.map((category) => (
          <button
            key={category.id}
            className={`category-card ${activeResourceCategory === category.id ? "active" : ""}`}
            onClick={() => setActiveResourceCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="resource-filters">
        <div className="filter-title">Filter by:</div>
        <div className="filter-options">
          <button
            className={`filter-button ${activeResourceType === "All Types" ? "active" : ""}`}
            onClick={() => setActiveResourceType("All Types")}
          >
            All Types
          </button>
          <button
            className={`filter-button ${activeResourceType === "Articles" ? "active" : ""}`}
            onClick={() => setActiveResourceType("Articles")}
          >
            Articles
          </button>
          <button
            className={`filter-button ${activeResourceType === "Videos" ? "active" : ""}`}
            onClick={() => setActiveResourceType("Videos")}
          >
            Videos
          </button>
          <button
            className={`filter-button ${activeResourceType === "Courses" ? "active" : ""}`}
            onClick={() => setActiveResourceType("Courses")}
          >
            Courses
          </button>
          <button
            className={`filter-button ${activeResourceType === "Bookmarked" ? "active" : ""}`}
            onClick={() => setActiveResourceType("Bookmarked")}
          >
            Bookmarked
          </button>
        </div>
        <div className="sort-dropdown">
          <span>Sort by: </span>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option>Newest</option>
            <option>Most Popular</option>
            <option>Shortest</option>
          </select>
        </div>
      </div>

      <div className="resource-list">
        <h3 className="section-title">Recommended for You</h3>
        <div className="resource-grid">
          {getSortedResources(getFilteredResources()).map((resource) => (
            <div key={resource.id} className="resource-card">
              <div className="resource-image">
                <img src="/placeholder.svg?height=320&width=180" alt={resource.title} />
                <span className={`resource-type ${resource.type}`}>{resource.type}</span>
                <button
                  className={`bookmark-button ${resource.bookmark ? "active" : ""}`}
                  onClick={() => toggleBookmark(resource.id)}
                >
                  <Bookmark size={16} />
                </button>
              </div>
              <div className="resource-content">
                <h4 className="resource-title">{resource.title}</h4>
                <div className="resource-meta">
                  <span className="resource-category">
                    {learningCategories.find((c) => c.id === resource.category)?.name}
                  </span>
                  <span className="resource-duration">{resource.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {getFilteredResources().length === 0 && (
          <div className="empty-state">
            <p>No resources found matching your filters.</p>
            <button
              className="btn-secondary"
              onClick={() => {
                setActiveResourceCategory("all")
                setActiveResourceType("All Types")
                setSearchQuery("")
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {getFilteredResources().length > 0 && (
          <>
            <h3 className="section-title">Most Popular</h3>
            <div className="resource-grid">
              {getSortedResources(getFilteredResources().filter((r) => r.bookmark))
                .slice(0, 3)
                .map((resource) => (
                  <div key={`popular-${resource.id}`} className="resource-card">
                    <div className="resource-image">
                      <img src="/placeholder.svg?height=320&width=180" alt={resource.title} />
                      <span className={`resource-type ${resource.type}`}>{resource.type}</span>
                      <button
                        className={`bookmark-button ${resource.bookmark ? "active" : ""}`}
                        onClick={() => toggleBookmark(resource.id)}
                      >
                        <Bookmark size={16} />
                      </button>
                    </div>
                    <div className="resource-content">
                      <h4 className="resource-title">{resource.title}</h4>
                      <div className="resource-meta">
                        <span className="resource-category">
                          {learningCategories.find((c) => c.id === resource.category)?.name}
                        </span>
                        <span className="resource-duration">{resource.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Library

