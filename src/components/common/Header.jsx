import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/Header.css'

const Header = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Failed to log out:', error)
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/dashboard" className="logo">
          <h1>Group Trip Planner</h1>
        </Link>

        <nav className="nav">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/trips/create" className="nav-link">New Trip</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
