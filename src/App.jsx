import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { TripProvider } from './contexts/TripContext'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Profile from './components/auth/Profile'
import Dashboard from './components/trips/Dashboard'
import TripCreate from './components/trips/TripCreate'
import TripDetail from './components/trips/TripDetail'
import TripEdit from './components/trips/TripEdit'
import PrivateRoute from './components/common/PrivateRoute'
import Header from './components/common/Header'
import './styles/App.css'

function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/trips/create"
                  element={
                    <PrivateRoute>
                      <TripCreate />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/trips/:id"
                  element={
                    <PrivateRoute>
                      <TripDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/trips/:id/edit"
                  element={
                    <PrivateRoute>
                      <TripEdit />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </TripProvider>
    </AuthProvider>
  )
}

export default App
