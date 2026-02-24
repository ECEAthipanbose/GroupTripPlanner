import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../../styles/Profile.css'

const Profile = () => {
  const { currentUser, updateUserProfile, logout } = useAuth()
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError('')
      setSuccess('')
      setLoading(true)
      await updateUserProfile({ displayName })
      setSuccess('Profile updated successfully!')
    } catch (error) {
      setError('Failed to update profile: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      setError('Failed to log out')
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile Settings</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="profile-info">
          <div className="info-item">
            <strong>Email:</strong>
            <span>{currentUser?.email}</span>
          </div>
          <div className="info-item">
            <strong>User ID:</strong>
            <span>{currentUser?.uid}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              placeholder="Enter your display name"
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>

        <div className="profile-actions">
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
