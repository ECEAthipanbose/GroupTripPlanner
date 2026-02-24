import React, { useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import { useTrip } from '../../contexts/TripContext'
import LocationSearch from './LocationSearch'
import '../../styles/DestinationList.css'

const DestinationListContent = ({ tripId, destinations }) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const { addDestination, removeDestination } = useTrip()

  const handlePlaceSelect = async (placeData) => {
    try {
      await addDestination(tripId, placeData)
      setShowAddForm(false)
      window.location.reload() // Refresh to show new destination
    } catch (error) {
      console.error('Error adding destination:', error)
    }
  }

  const handleRemove = async (index) => {
    if (window.confirm('Remove this destination?')) {
      try {
        await removeDestination(tripId, index)
        window.location.reload() // Refresh to show updated list
      } catch (error) {
        console.error('Error removing destination:', error)
      }
    }
  }

  return (
    <div className="destination-list">
      {destinations.length === 0 ? (
        <p className="empty-message">No destinations added yet.</p>
      ) : (
        <ul className="destinations">
          {destinations.map((destination, index) => (
            <li key={index} className="destination-item">
              <div className="destination-info">
                <span className="destination-number">{index + 1}</span>
                <div className="destination-details">
                  <h4>{destination.name}</h4>
                  <p>{destination.address}</p>
                  {destination.description && (
                    <p className="destination-description">{destination.description}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleRemove(index)}
                className="btn btn-danger btn-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {showAddForm ? (
        <div className="add-destination-form">
          <LocationSearch onPlaceSelect={handlePlaceSelect} />
          <button
            onClick={() => setShowAddForm(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary"
        >
          Add Destination
        </button>
      )}
    </div>
  )
}

const DestinationList = ({ tripId, destinations }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return (
      <div className="map-error">
        Google Maps API key not configured.
      </div>
    )
  }

  return (
    <Wrapper apiKey={apiKey} libraries={['places']}>
      <DestinationListContent tripId={tripId} destinations={destinations} />
    </Wrapper>
  )
}

export default DestinationList
