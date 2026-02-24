import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../services/firebase'
import { useAuth } from './AuthContext'

const TripContext = createContext()

export const useTrip = () => {
  const context = useContext(TripContext)
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider')
  }
  return context
}

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()

  const createTrip = async (tripData) => {
    const tripRef = await addDoc(collection(db, 'trips'), {
      ...tripData,
      userId: currentUser.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      participants: [currentUser.uid],
      destinations: [],
      activities: []
    })
    return tripRef.id
  }

  const updateTrip = async (tripId, updates) => {
    const tripRef = doc(db, 'trips', tripId)
    await updateDoc(tripRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })
  }

  const deleteTrip = async (tripId) => {
    const tripRef = doc(db, 'trips', tripId)
    await deleteDoc(tripRef)
  }

  const getTrip = async (tripId) => {
    const tripRef = doc(db, 'trips', tripId)
    const tripSnap = await getDoc(tripRef)
    if (tripSnap.exists()) {
      return { id: tripSnap.id, ...tripSnap.data() }
    }
    return null
  }

  const fetchUserTrips = async () => {
    if (!currentUser) return

    setLoading(true)
    try {
      const q = query(
        collection(db, 'trips'),
        where('participants', 'array-contains', currentUser.uid),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      const tripsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setTrips(tripsData)
    } catch (error) {
      console.error('Error fetching trips:', error)
    } finally {
      setLoading(false)
    }
  }

  const addDestination = async (tripId, destination) => {
    const trip = await getTrip(tripId)
    const destinations = trip.destinations || []
    await updateTrip(tripId, {
      destinations: [...destinations, destination]
    })
  }

  const removeDestination = async (tripId, destinationIndex) => {
    const trip = await getTrip(tripId)
    const destinations = trip.destinations || []
    destinations.splice(destinationIndex, 1)
    await updateTrip(tripId, { destinations })
  }

  const addActivity = async (tripId, activity) => {
    const trip = await getTrip(tripId)
    const activities = trip.activities || []
    await updateTrip(tripId, {
      activities: [...activities, activity]
    })
  }

  useEffect(() => {
    if (currentUser) {
      fetchUserTrips()
    } else {
      setTrips([])
    }
  }, [currentUser])

  const value = {
    trips,
    loading,
    createTrip,
    updateTrip,
    deleteTrip,
    getTrip,
    fetchUserTrips,
    addDestination,
    removeDestination,
    addActivity
  }

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  )
}
