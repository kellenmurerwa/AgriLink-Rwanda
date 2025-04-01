
import { useState } from "react"
import "../AgronomistStyles/Calendar.css"
import { CalendarIcon, Plus, ChevronLeft, ChevronRight } from "lucide-react"

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showAddEventModal, setShowAddEventModal] = useState(false)
  const [events, setEvents] = useState([
    { id: 1, date: new Date(2025, 3, 5), title: "Soil Testing", type: "test", farmerId: "F001" },
    { id: 2, date: new Date(2025, 3, 10), title: "Pest Inspection", type: "inspection", farmerId: "F002" },
    { id: 3, date: new Date(2025, 3, 15), title: "Fertilizer Application", type: "application", farmerId: "F003" },
    { id: 4, date: new Date(2025, 3, 20), title: "Harvest Planning", type: "planning", farmerId: "F001" },
  ])
  const [newEvent, setNewEvent] = useState({ title: "", type: "test", farmerId: "" })

  const renderHeader = () => {
    const dateFormat = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" })

    return (
      <div className="header">
        <div className="headerLeft">
          <CalendarIcon size={24} />
          <h2>{dateFormat.format(currentMonth)}</h2>
        </div>
        <div className="headerRight">
          <button onClick={prevMonth} className="navButton">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextMonth} className="navButton">
            <ChevronRight size={20} />
          </button>
          <button onClick={() => setShowAddEventModal(true)} className="addButton">
            <Plus size={16} />
            <span>Add Event</span>
          </button>
        </div>
      </div>
    )
  }

  const renderDays = () => {
    const days = []
    const dateFormat = new Intl.DateTimeFormat("en-US", { weekday: "short" })

    const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i - startDate.getDay())
      days.push(
        <div className="dayName" key={i}>
          {dateFormat.format(day)}
        </div>,
      )
    }

    return <div className="days">{days}</div>
  }

  const renderCells = () => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
    const startDate = new Date(monthStart)
    startDate.setDate(startDate.getDate() - startDate.getDay())

    const endDate = new Date(monthEnd)
    if (endDate.getDay() !== 6) {
      endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))
    }

    const rows = []
    let days = []
    const day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day)
        const formattedDate = cloneDay.getDate()
        const isCurrentMonth = cloneDay.getMonth() === currentMonth.getMonth()
        const isToday = isSameDay(cloneDay, new Date())
        const isSelected = isSameDay(cloneDay, selectedDate)

        // Get events for this day
        const dayEvents = events.filter((event) => isSameDay(event.date, cloneDay))

        days.push(
          <div
            className={`cell ${isCurrentMonth ? "current" : "disabled"} ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
            key={cloneDay.toString()}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <div className="eventContainer">
              {dayEvents.map((event) => (
                <div key={event.id} className={`event ${event.type}`}>
                  {event.title}
                </div>
              ))}
            </div>
          </div>,
        )
        day.setDate(day.getDate() + 1)
      }
      rows.push(
        <div className="row" key={day.toString()}>
          {days}
        </div>,
      )
      days = []
    }

    return <div className="body">{rows}</div>
  }

  const onDateClick = (day) => {
    setSelectedDate(day)
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const isSameDay = (a, b) => {
    return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()
  }

  const handleAddEvent = (e) => {
    e.preventDefault()
    const newEventObj = {
      id: events.length + 1,
      date: selectedDate,
      title: newEvent.title,
      type: newEvent.type,
      farmerId: newEvent.farmerId,
    }

    setEvents([...events, newEventObj])
    setNewEvent({ title: "", type: "test", farmerId: "" })
    setShowAddEventModal(false)
  }

  return (
    <div className="calendarContainer">
      <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>

      {showAddEventModal && (
        <div className="modalOverlay">
          <div className="modal">
            <div className="modalHeader">
              <h3>Add New Event</h3>
              <button onClick={() => setShowAddEventModal(false)} className="closeButton">
                ×
              </button>
            </div>
            <form onSubmit={handleAddEvent}>
              <div className="formGroup">
                <label>Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                />
              </div>
              <div className="formGroup">
                <label>Event Type</label>
                <select value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}>
                  <option value="test">Soil Test</option>
                  <option value="inspection">Inspection</option>
                  <option value="application">Application</option>
                  <option value="planning">Planning</option>
                </select>
              </div>
              <div className="formGroup">
                <label>Farmer ID</label>
                <input
                  type="text"
                  value={newEvent.farmerId}
                  onChange={(e) => setNewEvent({ ...newEvent, farmerId: e.target.value })}
                  required
                />
              </div>
              <div className="formGroup">
                <label>Date</label>
                <input type="text" value={selectedDate.toLocaleDateString()} disabled />
              </div>
              <div className="formActions">
                <button type="button" onClick={() => setShowAddEventModal(false)} className="cancelButton">
                  Cancel
                </button>
                <button type="submit" className="saveButton">
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar

