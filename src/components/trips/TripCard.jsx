import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import '../../styles/TripCard.css'

const TripCard = ({ trip }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Not set'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return format(date, 'MMM dd, yyyy')
  }

  return (
    <div className="trip-card">
      <div className="trip-card-header">
        <h3>{trip.name}</h3>
        <span className="trip-status">{trip.status || 'Planning'}</span>
      </div>
      <div className="trip-card-body">
        <p className="trip-description">{trip.description}</p>
        <div className="trip-dates">
          <div className="date-item">
            <strong>Start:</strong> {formatDate(trip.startDate)}
          </div>
          <div className="date-item">
            <strong>End:</strong> {formatDate(trip.endDate)}
          </div>
        </div>
        <div className="trip-stats">
          <span className="stat-item">
            {trip.destinations?.length || 0} Destinations
          </span>
          <span className="stat-item">
            {trip.participants?.length || 0} Participants
          </span>
        </div>
      </div>
      <div className="trip-card-footer">
        <Link to={`/trips/${trip.id}`} className="btn btn-secondary">
          View Details
        </Link>
        <Link to={`/trips/${trip.id}/edit`} className="btn btn-outline">
          Edit
        </Link>
      </div>
    </div>
  )
}

export default TripCard
