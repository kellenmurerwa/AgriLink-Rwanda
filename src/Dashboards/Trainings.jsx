import { useState, useRef } from "react"
import "../DashboardStyles/Trainings.css"
import { Search, Calendar, Award, Download, X, CheckCircle, AlertCircle, FileText, ChevronRight } from "lucide-react"

const TrainingPrograms = () => {
  const [activeTab, setActiveTab] = useState("training")
  const [currentModule, setCurrentModule] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [progressFilter, setProgressFilter] = useState("All Progress")
  const [programDeadline, setProgramDeadline] = useState("All Deadlines")

  // Modal states
  const [showEligibilityModal, setShowEligibilityModal] = useState(false)
  const [showDeadlineModal, setShowDeadlineModal] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState(null)

  // Eligibility check state
  const [eligibilityStep, setEligibilityStep] = useState(1)
  const [eligibilityAnswers, setEligibilityAnswers] = useState({
    farmSize: "",
    farmType: "",
    experience: "",
    sustainable: false,
  })

  // Lesson video state
  const [showLessonModal, setShowLessonModal] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [lessonProgress, setLessonProgress] = useState(0)
  const lessonTimerRef = useRef(null)

  // Sample data for training modules
  const [trainingModules, setTrainingModules] = useState([
    {
      id: 1,
      title: "Organic Certification Process",
      description: "Learn the complete process for getting your farm certified organic",
      totalLessons: 5,
      completedLessons: 3,
      estimatedHours: 4,
      tags: ["certification", "organic", "regulations"],
      lessons: [
        { title: "Introduction to Organic Certification", duration: 20, completed: true },
        { title: "Core Requirements and Standards", duration: 25, completed: true },
        { title: "Documentation and Record Keeping", duration: 30, completed: true },
        { title: "Inspection Process", duration: 35, completed: false },
        { title: "Maintaining Certification", duration: 30, completed: false },
      ],
    },
    {
      id: 2,
      title: "Sustainable Irrigation Systems",
      description: "Water-saving irrigation techniques for different crop types",
      totalLessons: 4,
      completedLessons: 1,
      estimatedHours: 3,
      tags: ["water", "irrigation", "sustainability"],
      lessons: [
        { title: "Introduction to Water Conservation", duration: 20, completed: true },
        { title: "Drip Irrigation Systems", duration: 25, completed: false },
        { title: "Rainwater Harvesting", duration: 30, completed: false },
        { title: "Irrigation Scheduling", duration: 25, completed: false },
      ],
    },
    {
      id: 3,
      title: "Farm Financial Management",
      description: "Essential accounting and financial planning for small to medium farms",
      totalLessons: 6,
      completedLessons: 0,
      estimatedHours: 5,
      tags: ["finance", "business", "planning"],
      lessons: [
        { title: "Farm Accounting Basics", duration: 20, completed: false },
        { title: "Budgeting for Agricultural Operations", duration: 25, completed: false },
        { title: "Cash Flow Management", duration: 30, completed: false },
        { title: "Financial Analysis for Farms", duration: 35, completed: false },
        { title: "Tax Planning for Farmers", duration: 30, completed: false },
        { title: "Securing Agricultural Loans", duration: 25, completed: false },
      ],
    },
  ])

  // Sample data for government programs
  const governmentPrograms = [
    {
      id: 1,
      title: "Rwanda Agricultural Development Program",
      deadline: "April 15, 2025",
      fundingAmount: "500,000 - 1,500,000 RWF",
      eligibility: "Small to medium farms implementing sustainable practices",
      description:
        "Grants for research and education projects that advance sustainable agriculture practices in Rwanda.",
      category: "Sustainability",
      daysUntilDeadline: 15,
    },
    {
      id: 2,
      title: "Environmental Quality Incentives Program",
      deadline: "June 30, 2025",
      fundingAmount: "Up to 2,500,000 RWF",
      eligibility: "Farmers implementing conservation practices",
      description:
        "Financial assistance for implementing conservation practices that improve soil, water, plant, animal, air, and energy resources.",
      category: "Conservation",
      daysUntilDeadline: 90,
    },
    {
      id: 3,
      title: "Beginning Farmer Development Program",
      deadline: "May 22, 2025",
      fundingAmount: "250,000 - 1,000,000 RWF",
      eligibility: "Farmers with less than 10 years of experience",
      description:
        "Support for farmers just starting their agricultural operations with training, education, and technical assistance.",
      category: "Beginning Farmers",
      daysUntilDeadline: 52,
    },
  ]

  // Handler for selecting a module
  const handleModuleSelect = (module) => {
    setCurrentModule(module)
  }

  // Handler for module completion
  const handleModuleProgress = (moduleId, lessonIndex) => {
    const module = trainingModules.find((m) => m.id === moduleId)
    if (!module) return

    setCurrentLesson({
      moduleId,
      lessonIndex,
      title: module.lessons[lessonIndex].title,
      duration: module.lessons[lessonIndex].duration,
    })
    setLessonProgress(0)
    setShowLessonModal(true)

    // Start the lesson timer
    lessonTimerRef.current = setInterval(() => {
      setLessonProgress((prev) => {
        const newProgress = prev + 1
        // If lesson is complete
        if (newProgress >= 100) {
          clearInterval(lessonTimerRef.current)

          // Update the module with completed lesson
          const updatedModules = trainingModules.map((m) => {
            if (m.id === moduleId) {
              const updatedLessons = [...m.lessons]
              updatedLessons[lessonIndex].completed = true

              return {
                ...m,
                completedLessons: m.completedLessons + 1,
                lessons: updatedLessons,
              }
            }
            return m
          })

          setTrainingModules(updatedModules)

          // Close the modal after a short delay
          setTimeout(() => {
            setShowLessonModal(false)
            setCurrentLesson(null)
          }, 1500)
        }
        return newProgress
      })
    }, module.lessons[lessonIndex].duration * 10) // Speed up for demo
  }

  // Handler for closing the lesson modal
  const handleCloseLessonModal = () => {
    if (lessonTimerRef.current) {
      clearInterval(lessonTimerRef.current)
    }
    setShowLessonModal(false)
    setCurrentLesson(null)
  }

  // Handler for eligibility check
  const handleEligibilityCheck = () => {
    setEligibilityStep(1)
    setEligibilityAnswers({
      farmSize: "",
      farmType: "",
      experience: "",
      sustainable: false,
    })
    setShowEligibilityModal(true)
  }

  // Handler for eligibility form submission
  const handleEligibilitySubmit = (e) => {
    e.preventDefault()

    if (eligibilityStep < 4) {
      setEligibilityStep(eligibilityStep + 1)
    } else {
      // Show results
      setTimeout(() => {
        setEligibilityStep(5)
      }, 1000)
    }
  }

  // Handler for viewing deadline details
  const handleViewDeadlines = () => {
    setShowDeadlineModal(true)
  }

  // Handler for downloading program info
  const handleDownloadInfo = (program) => {
    setSelectedProgram(program)
    setShowDownloadModal(true)

    // Simulate download after 2 seconds
    setTimeout(() => {
      setShowDownloadModal(false)

      // Show success notification
      const notification = document.createElement("div")
      notification.className = "notification success"
      notification.innerHTML = `
        <CheckCircle size={20} />
        <span>Program information downloaded successfully!</span>
      `
      document.body.appendChild(notification)

      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.classList.add("fade-out")
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 500)
      }, 3000)
    }, 2000)
  }

  // Handler for applying to a program
  const handleApplyNow = (program) => {
    setSelectedProgram(program)
    setShowApplyModal(true)
  }

  // Handler for saving a program for later
  const handleSaveForLater = (program) => {
    // Show success notification
    const notification = document.createElement("div")
    notification.className = "notification success"
    notification.innerHTML = `
      <CheckCircle size={20} />
      <span>${program.title} saved to your bookmarks!</span>
    `
    document.body.appendChild(notification)

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.add("fade-out")
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 500)
    }, 3000)
  }

  // Filter modules based on search, category, and progress
  const filteredModules = trainingModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = categoryFilter === "All Categories" || module.tags.includes(categoryFilter.toLowerCase())

    const matchesProgress =
      progressFilter === "All Progress" ||
      (progressFilter === "Not Started" && module.completedLessons === 0) ||
      (progressFilter === "In Progress" &&
        module.completedLessons > 0 &&
        module.completedLessons < module.totalLessons) ||
      (progressFilter === "Completed" && module.completedLessons === module.totalLessons)

    return matchesSearch && matchesCategory && matchesProgress
  })

  // Filter programs by category and deadline
  const filteredPrograms = governmentPrograms.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "All Categories" || program.category === categoryFilter

    // Deadline filtering logic
    let matchesDeadline = true
    if (programDeadline === "Next 30 Days") {
      matchesDeadline = program.daysUntilDeadline <= 30
    } else if (programDeadline === "Next 90 Days") {
      matchesDeadline = program.daysUntilDeadline <= 90
    } else if (programDeadline === "Next 6 Months") {
      matchesDeadline = program.daysUntilDeadline <= 180
    }

    return matchesSearch && matchesCategory && matchesDeadline
  })

  // Get recommended programs based on eligibility answers
  const getRecommendedPrograms = () => {
    const { farmSize, farmType, experience, sustainable } = eligibilityAnswers

    return governmentPrograms.filter((program) => {
      // Simple matching logic
      if (program.category === "Beginning Farmers" && experience === "less-than-5") {
        return true
      }
      if (program.category === "Sustainability" && sustainable) {
        return true
      }
      if (farmSize === "small" && program.title.includes("Development")) {
        return true
      }
      return false
    })
  }

  return (
    <div className="training-programs-container">
      <div className="tabs-navigation">
        <button
          className={`tab-button ${activeTab === "training" ? "active" : ""}`}
          onClick={() => setActiveTab("training")}
        >
          <Award size={18} />
          <span>Training</span>
        </button>
        <button
          className={`tab-button ${activeTab === "programs" ? "active" : ""}`}
          onClick={() => setActiveTab("programs")}
        >
          <Calendar size={18} />
          <span>Subsidies & Programs</span>
        </button>
      </div>

      {activeTab === "training" && (
        <div className="training-container">
          {currentModule ? (
            <div className="module-details">
              <div className="module-header">
                <button className="back-button" onClick={() => setCurrentModule(null)}>
                  ← Back to Modules
                </button>
                <h2>{currentModule.title}</h2>
              </div>

              <div className="module-progress-bar">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(currentModule.completedLessons / currentModule.totalLessons) * 100}%` }}
                  ></div>
                </div>
                <div className="progress-text">
                  {currentModule.completedLessons} of {currentModule.totalLessons} lessons completed
                </div>
              </div>

              <div className="module-content">
                <div className="module-description">
                  <h3>About this Module</h3>
                  <p>{currentModule.description}</p>
                  <div className="module-meta">
                    <div className="meta-item">
                      <Calendar size={16} />
                      <span>Duration: {currentModule.estimatedHours} hours</span>
                    </div>
                    <div className="meta-item">
                      <Award size={16} />
                      <span>Certificate upon completion</span>
                    </div>
                  </div>
                  <div className="module-tags">
                    {currentModule.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="module-lessons">
                  <h3>Lessons</h3>
                  <div className="lessons-list">
                    {currentModule.lessons.map((lesson, index) => (
                      <div key={index} className={`lesson-item ${lesson.completed ? "completed" : ""}`}>
                        <div className="lesson-status">
                          {lesson.completed ? "✓" : index === currentModule.completedLessons ? "▶" : ""}
                        </div>
                        <div className="lesson-content">
                          <h4>
                            Lesson {index + 1}: {lesson.title}
                          </h4>
                          <p>Duration: {lesson.duration} minutes</p>
                        </div>
                        <button
                          className="lesson-button"
                          onClick={() => {
                            if (lesson.completed) {
                              // Review lesson
                              handleModuleProgress(currentModule.id, index)
                            } else if (index === currentModule.completedLessons) {
                              // Continue with next lesson
                              handleModuleProgress(currentModule.id, index)
                            }
                          }}
                        >
                          {lesson.completed
                            ? "Review"
                            : index === currentModule.completedLessons
                              ? "Continue"
                              : "Start"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="training-header">
                <h2>Training Modules</h2>
                <div className="training-actions">
                  <div className="search-box">
                    <Search size={16} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search modules..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="training-filters">
                    <select
                      className="filter-select"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option>All Categories</option>
                      <option>Certification</option>
                      <option>Water</option>
                      <option>Finance</option>
                      <option>Business</option>
                    </select>
                    <select
                      className="filter-select"
                      value={progressFilter}
                      onChange={(e) => setProgressFilter(e.target.value)}
                    >
                      <option>All Progress</option>
                      <option>Not Started</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="my-progress-section">
                <h3>My Learning Progress</h3>
                <div className="progress-stats">
                  <div className="stat-card">
                    <div className="stat-value">
                      {
                        trainingModules.filter((m) => m.completedLessons > 0 && m.completedLessons < m.totalLessons)
                          .length
                      }
                    </div>
                    <div className="stat-label">Modules In Progress</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">
                      {trainingModules.filter((m) => m.completedLessons === m.totalLessons).length}
                    </div>
                    <div className="stat-label">Modules Completed</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">
                      {trainingModules.reduce((total, module) => {
                        const completedLessonsTime = module.lessons
                          .filter((lesson) => lesson.completed)
                          .reduce((sum, lesson) => sum + lesson.duration, 0)
                        return total + Math.round(completedLessonsTime / 60)
                      }, 0)}
                    </div>
                    <div className="stat-label">Hours Learned</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">
                      {trainingModules.filter((m) => m.completedLessons === m.totalLessons).length}
                    </div>
                    <div className="stat-label">Certificates Earned</div>
                  </div>
                </div>
              </div>

              <div className="current-modules-section">
                <h3>Continue Learning</h3>
                {filteredModules.length > 0 ? (
                  <div className="modules-list">
                    {filteredModules.map((module) => (
                      <div key={module.id} className="module-card" onClick={() => handleModuleSelect(module)}>
                        <div className="module-image">
                          <img src="/placeholder.svg?height=320&width=180" alt={module.title} />
                          <div className="module-progress">
                            <div className="progress-text">
                              {Math.round((module.completedLessons / module.totalLessons) * 100)}% Complete
                            </div>
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: `${(module.completedLessons / module.totalLessons) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="module-content">
                          <h4 className="module-title">{module.title}</h4>
                          <p className="module-description">{module.description}</p>
                          <div className="module-meta">
                            <span className="lessons-count">{module.totalLessons} Lessons</span>
                            <span className="time-estimate">{module.estimatedHours} Hours</span>
                          </div>
                          <div className="module-tags">
                            {module.tags.map((tag, index) => (
                              <span key={index} className="tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No modules found matching your filters.</p>
                    <button
                      className="btn-secondary"
                      onClick={() => {
                        setCategoryFilter("All Categories")
                        setProgressFilter("All Progress")
                        setSearchQuery("")
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === "programs" && (
        <div className="programs-container">
          <div className="programs-header">
            <h2>Government Subsidies & Programs</h2>
            <div className="programs-actions">
              <div className="search-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="programs-filters">
                <select
                  className="filter-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Sustainability</option>
                  <option>Beginning Farmers</option>
                  <option>Conservation</option>
                </select>
                <select
                  className="filter-select"
                  value={programDeadline}
                  onChange={(e) => setProgramDeadline(e.target.value)}
                >
                  <option>All Deadlines</option>
                  <option>Next 30 Days</option>
                  <option>Next 90 Days</option>
                  <option>Next 6 Months</option>
                </select>
              </div>
            </div>
          </div>

          <div className="program-alerts">
            <div className="alert">
              <div className="alert-icon">!</div>
              <div className="alert-content">
                <h4>Upcoming Deadline</h4>
                <p>The Environmental Quality Incentives Program application deadline is in 30 days.</p>
              </div>
              <button className="alert-button" onClick={handleViewDeadlines}>
                View Details
              </button>
            </div>
          </div>

          <div className="eligibility-checker">
            <h3>Eligibility Check Tool</h3>
            <p>Answer a few questions to find programs you may qualify for</p>
            <button className="eligibility-button" onClick={handleEligibilityCheck}>
              Start Eligibility Check
            </button>
          </div>

          <div className="programs-list">
            <h3>Available Programs</h3>
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program) => (
                <div key={program.id} className="program-card">
                  <div className="program-content">
                    <h4 className="program-title">{program.title}</h4>
                    <p className="program-description">{program.description}</p>
                    <div className="program-details">
                      <div className="detail-item">
                        <span className="detail-label">Deadline:</span>
                        <span className="detail-value">{program.deadline}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Funding:</span>
                        <span className="detail-value">{program.fundingAmount}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Eligibility:</span>
                        <span className="detail-value">{program.eligibility}</span>
                      </div>
                    </div>
                  </div>
                  <div className="program-actions">
                    <button className="program-button primary" onClick={() => handleApplyNow(program)}>
                      Apply Now
                    </button>
                    <button className="program-button secondary" onClick={() => handleSaveForLater(program)}>
                      Save for Later
                    </button>
                    <button className="program-button secondary" onClick={() => handleDownloadInfo(program)}>
                      <Download size={16} />
                      <span>Download Info</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No programs found matching your filters.</p>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setCategoryFilter("All Categories")
                    setProgramDeadline("All Deadlines")
                    setSearchQuery("")
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Eligibility Check Modal */}
      {showEligibilityModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Program Eligibility Check</h3>
              <button className="close-button" onClick={() => setShowEligibilityModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-content">
              {eligibilityStep < 5 ? (
                <form onSubmit={handleEligibilitySubmit}>
                  {eligibilityStep === 1 && (
                    <div className="eligibility-step">
                      <h4>Step 1: Farm Size</h4>
                      <div className="form-group">
                        <label>What is the size of your farm?</label>
                        <div className="radio-group">
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="farmSize"
                              value="small"
                              checked={eligibilityAnswers.farmSize === "small"}
                              onChange={() => setEligibilityAnswers({ ...eligibilityAnswers, farmSize: "small" })}
                              required
                            />
                            <span>Small (Less than 5 hectares)</span>
                          </label>
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="farmSize"
                              value="medium"
                              checked={eligibilityAnswers.farmSize === "medium"}
                              onChange={() => setEligibilityAnswers({ ...eligibilityAnswers, farmSize: "medium" })}
                            />
                            <span>Medium (5-20 hectares)</span>
                          </label>
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="farmSize"
                              value="large"
                              checked={eligibilityAnswers.farmSize === "large"}
                              onChange={() => setEligibilityAnswers({ ...eligibilityAnswers, farmSize: "large" })}
                            />
                            <span>Large (More than 20 hectares)</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {eligibilityStep === 2 && (
                    <div className="eligibility-step">
                      <h4>Step 2: Farm Type</h4>
                      <div className="form-group">
                        <label>What type of farming do you primarily do?</label>
                        <div className="radio-group">
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="farmType"
                              value="crops"
                              checked={eligibilityAnswers.farmType === "crops"}
                              onChange={() => setEligibilityAnswers({ ...eligibilityAnswers, farmType: "crops" })}
                              required
                            />
                            <span>Crop farming</span>
                          </label>
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="farmType"
                              value="livestock"
                              checked={eligibilityAnswers.farmType === "livestock"}
                              onChange={() => setEligibilityAnswers({ ...eligibilityAnswers, farmType: "livestock" })}
                            />
                            <span>Livestock</span>
                          </label>
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="farmType"
                              value="mixed"
                              checked={eligibilityAnswers.farmType === "mixed"}
                              onChange={() => setEligibilityAnswers({ ...eligibilityAnswers, farmType: "mixed" })}
                            />
                            <span>Mixed farming</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {eligibilityStep === 3 && (
                    <div className="eligibility-step">
                      <h4>Step 3: Farming Experience</h4>
                      <div className="form-group">
                        <label>How long have you been farming?</label>
                        <div className="radio-group">
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="experience"
                              value="less-than-5"
                              checked={eligibilityAnswers.experience === "less-than-5"}
                              onChange={() =>
                                setEligibilityAnswers({ ...eligibilityAnswers, experience: "less-than-5" })
                              }
                              required
                            />
                            <span>Less than 5 years</span>
                          </label>
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="experience"
                              value="5-10"
                              checked={eligibilityAnswers.experience === "5-10"}
                              onChange={() => setEligibilityAnswers({ ...eligibilityAnswers, experience: "5-10" })}
                            />
                            <span>5-10 years</span>
                          </label>
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="experience"
                              value="more-than-10"
                              checked={eligibilityAnswers.experience === "more-than-10"}
                              onChange={() =>
                                setEligibilityAnswers({ ...eligibilityAnswers, experience: "more-than-10" })
                              }
                            />
                            <span>More than 10 years</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {eligibilityStep === 4 && (
                    <div className="eligibility-step">
                      <h4>Step 4: Sustainable Practices</h4>
                      <div className="form-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={eligibilityAnswers.sustainable}
                            onChange={() =>
                              setEligibilityAnswers({
                                ...eligibilityAnswers,
                                sustainable: !eligibilityAnswers.sustainable,
                              })
                            }
                          />
                          <span>Do you implement sustainable farming practices?</span>
                        </label>
                        <p className="form-help">
                          Examples include: organic farming, water conservation, soil health practices, etc.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="modal-footer">
                    {eligibilityStep > 1 && (
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => setEligibilityStep(eligibilityStep - 1)}
                      >
                        Previous
                      </button>
                    )}
                    <button type="submit" className="primary-button">
                      {eligibilityStep < 4 ? "Next" : "Submit"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="eligibility-results">
                  <div className="results-header">
                    <CheckCircle size={40} className="success-icon" />
                    <h4>Eligibility Check Complete!</h4>
                  </div>

                  <p>Based on your answers, you may be eligible for the following programs:</p>

                  <div className="recommended-programs">
                    {getRecommendedPrograms().map((program) => (
                      <div key={program.id} className="recommended-program">
                        <h5>{program.title}</h5>
                        <p>{program.description}</p>
                        <button
                          className="primary-button"
                          onClick={() => {
                            setShowEligibilityModal(false)
                            handleApplyNow(program)
                          }}
                        >
                          Apply Now
                        </button>
                      </div>
                    ))}

                    {getRecommendedPrograms().length === 0 && (
                      <div className="no-programs">
                        <AlertCircle size={24} className="alert-icon" />
                        <p>No matching programs found based on your criteria.</p>
                      </div>
                    )}
                  </div>

                  <div className="modal-footer">
                    <button className="secondary-button" onClick={() => setShowEligibilityModal(false)}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Deadline Details Modal */}
      {showDeadlineModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Upcoming Program Deadlines</h3>
              <button className="close-button" onClick={() => setShowDeadlineModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-content">
              <div className="deadlines-list">
                {governmentPrograms
                  .sort((a, b) => a.daysUntilDeadline - b.daysUntilDeadline)
                  .map((program) => (
                    <div key={program.id} className="deadline-item">
                      <div className="deadline-info">
                        <h4>{program.title}</h4>
                        <p>Deadline: {program.deadline}</p>
                        <p className="days-left">
                          {program.daysUntilDeadline <= 30 ? (
                            <span className="urgent">{program.daysUntilDeadline} days left</span>
                          ) : (
                            <span>{program.daysUntilDeadline} days left</span>
                          )}
                        </p>
                      </div>
                      <button
                        className="primary-button"
                        onClick={() => {
                          setShowDeadlineModal(false)
                          handleApplyNow(program)
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  ))}
              </div>

              <div className="modal-footer">
                <button className="secondary-button" onClick={() => setShowDeadlineModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Downloading Program Information</h3>
              <button className="close-button" onClick={() => setShowDownloadModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-content">
              <div className="download-progress">
                <div className="download-icon">
                  <FileText size={48} />
                </div>
                <h4>{selectedProgram?.title}</h4>
                <div className="progress-bar">
                  <div className="progress-fill animate"></div>
                </div>
                <p>Preparing your download...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apply Now Modal */}
      {showApplyModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Apply for Program</h3>
              <button className="close-button" onClick={() => setShowApplyModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-content">
              <div className="apply-form">
                <h4>{selectedProgram?.title}</h4>
                <p>Complete the application form below to apply for this program.</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setShowApplyModal(false)

                    // Show success notification
                    const notification = document.createElement("div")
                    notification.className = "notification success"
                    notification.innerHTML = `
                    <CheckCircle size={20} />
                    <span>Application submitted successfully!</span>
                  `
                    document.body.appendChild(notification)

                    // Remove notification after 3 seconds
                    setTimeout(() => {
                      notification.classList.add("fade-out")
                      setTimeout(() => {
                        document.body.removeChild(notification)
                      }, 500)
                    }, 3000)
                  }}
                >
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" required />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" required />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" required />
                  </div>

                  <div className="form-group">
                    <label>Farm Name</label>
                    <input type="text" required />
                  </div>

                  <div className="form-group">
                    <label>Why are you applying for this program?</label>
                    <textarea rows={4} required></textarea>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" required />
                      <span>I confirm that all information provided is accurate and complete.</span>
                    </label>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="secondary-button" onClick={() => setShowApplyModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="primary-button">
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Modal */}
      {showLessonModal && (
        <div className="modal-overlay">
          <div className="modal lesson-modal">
            <div className="modal-header">
              <h3>Lesson: {currentLesson?.title}</h3>
              <button className="close-button" onClick={handleCloseLessonModal}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-content">
              <div className="lesson-video">
                <div className="video-placeholder">
                  <img src="/placeholder.svg?height=400&width=600" alt="Lesson video" />
                  {lessonProgress >= 100 ? (
                    <div className="lesson-complete">
                      <CheckCircle size={48} className="success-icon" />
                      <h4>Lesson Complete!</h4>
                    </div>
                  ) : (
                    <div className="play-button">▶</div>
                  )}
                </div>

                <div className="lesson-progress-bar">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${lessonProgress}%` }}></div>
                  </div>
                  <div className="progress-text">
                    {lessonProgress < 100 ? `${lessonProgress}% complete` : "Completed!"}
                  </div>
                </div>

                <div className="lesson-navigation">
                  <button className="nav-button">
                    <ChevronRight size={18} className="rotate-180" />
                    <span>Previous</span>
                  </button>
                  <button className="nav-button">
                    <span>Next</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TrainingPrograms

