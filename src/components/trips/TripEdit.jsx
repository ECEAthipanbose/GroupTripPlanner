import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTrip } from '../../contexts/TripContext'
import '../../styles/TripForm.css'

const TripEdit = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: 'Planning'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingTrip, setLoadingTrip] = useState(true)
  const { getTrip, updateTrip } = useTrip()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const trip = await getTrip(id)
        if (trip) {
          setFormData({
            name: trip.name || '',
            description: trip.description || '',
            startDate: trip.startDate || '',
            endDate: trip.endDate || '',
            budget: trip.budget || '',
            status: trip.status || 'Planning'
          })
        }
      } catch (error) {
        setError('Failed to load trip')
      } finally {
        setLoadingTrip(false)
      }
    }

    fetchTrip()
  }, [id, getTrip])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      return setError('End date must be after start date')
    }

    try {
      setError('')
      setLoading(true)
      await updateTrip(id, formData)
      navigate(`/trips/${id}`)
    } catch (error) {
      setError('Failed to update trip: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loadingTrip) {
    return <div className="loading">Loading trip...</div>
  }

  return (
    <div className="trip-form-container">
      <div className="trip-form-card">
        <h2>Edit Trip</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Trip Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Summer Europe Adventure"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your trip..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date *</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="budget">Budget (USD)</label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g., 5000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Planning">Planning</option>
                <option value="Confirmed">Confirmed</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(`/trips/${id}`)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Updating...' : 'Update Trip'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TripEdit
