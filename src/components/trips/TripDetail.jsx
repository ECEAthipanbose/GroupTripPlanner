import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTrip } from '../../contexts/TripContext'
import { format } from 'date-fns'
import MapComponent from '../maps/MapComponent'
import DestinationList from '../maps/DestinationList'
import '../../styles/TripDetail.css'

const TripDetail = () => {
  const { id } = useParams()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { getTrip, deleteTrip } = useTrip()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const tripData = await getTrip(id)
        if (tripData) {
          setTrip(tripData)
        } else {
          setError('Trip not found')
        }
      } catch (error) {
        setError('Failed to load trip')
      } finally {
        setLoading(false)
      }
    }

    fetchTrip()
  }, [id, getTrip])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await deleteTrip(id)
        navigate('/dashboard')
      } catch (error) {
        setError('Failed to delete trip')
      }
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Not set'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return format(date, 'MMMM dd, yyyy')
  }

  if (loading) {
    return <div className="loading">Loading trip details...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  if (!trip) {
    return <div className="error-message">Trip not found</div>
  }

  return (
    <div className="trip-detail-container">
      <div className="trip-detail-header">
        <div className="header-content">
          <h1>{trip.name}</h1>
          <span className={`status-badge ${trip.status?.toLowerCase()}`}>
            {trip.status || 'Planning'}
          </span>
        </div>
        <div className="header-actions">
          <Link to={`/trips/${id}/edit`} className="btn btn-primary">
            Edit Trip
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Trip
          </button>
        </div>
      </div>

      <div className="trip-detail-content">
        <div className="trip-info-section">
          <div className="info-card">
            <h3>Trip Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Description:</strong>
                <p>{trip.description || 'No description provided'}</p>
              </div>
              <div className="info-item">
                <strong>Start Date:</strong>
                <p>{formatDate(trip.startDate)}</p>
              </div>
              <div className="info-item">
                <strong>End Date:</strong>
                <p>{formatDate(trip.endDate)}</p>
              </div>
              <div className="info-item">
                <strong>Budget:</strong>
                <p>{trip.budget ? `$${trip.budget}` : 'Not set'}</p>
              </div>
              <div className="info-item">
                <strong>Participants:</strong>
                <p>{trip.participants?.length || 0} people</p>
              </div>
            </div>
          </div>

          <div className="destinations-section">
            <h3>Destinations</h3>
            <DestinationList tripId={id} destinations={trip.destinations || []} />
          </div>
        </div>

        <div className="map-section">
          <h3>Trip Map</h3>
          <MapComponent destinations={trip.destinations || []} />
        </div>
      </div>
    </div>
  )
}

export default TripDetail
