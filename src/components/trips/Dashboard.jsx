import React from 'react'
import { Link } from 'react-router-dom'
import { useTrip } from '../../contexts/TripContext'
import { useAuth } from '../../contexts/AuthContext'
import TripCard from './TripCard'
import '../../styles/Dashboard.css'

const Dashboard = () => {
  const { trips, loading } = useTrip()
  const { currentUser } = useAuth()

  if (loading) {
    return <div className="loading">Loading trips...</div>
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {currentUser?.displayName || 'Traveler'}!</h1>
        <Link to="/trips/create" className="btn btn-primary">
          Create New Trip
        </Link>
      </div>

      <div className="trips-section">
        <h2>Your Trips</h2>
        {trips.length === 0 ? (
          <div className="empty-state">
            <p>You haven't created any trips yet.</p>
            <Link to="/trips/create" className="btn btn-primary">
              Create Your First Trip
            </Link>
          </div>
        ) : (
          <div className="trips-grid">
            {trips.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
