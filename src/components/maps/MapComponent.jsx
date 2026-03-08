import React, { useEffect, useRef, useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import '../../styles/Map.css'

const Map = ({ destinations }) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (!mapRef.current) return

    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
      zoom: 4,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
    })

    setMap(googleMap)
  }, [])

  useEffect(() => {
    if (!map || !destinations || destinations.length === 0) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    const bounds = new window.google.maps.LatLngBounds()

    // Add markers for each destination
    destinations.forEach((destination, index) => {
      if (destination.lat && destination.lng) {
        const marker = new window.google.maps.Marker({
          position: { lat: destination.lat, lng: destination.lng },
          map: map,
          title: destination.name,
          label: `${index + 1}`,
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 5px 0;">${destination.name}</h3>
              <p style="margin: 0;">${destination.description || ''}</p>
            </div>
          `,
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })

        markersRef.current.push(marker)
        bounds.extend(marker.getPosition())
      }
    })

    // Fit map to show all markers
    if (markersRef.current.length > 0) {
      map.fitBounds(bounds)
    }

    // Draw route if there are multiple destinations
    if (destinations.length > 1) {
      const directionsService = new window.google.maps.DirectionsService()
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true,
      })

      const waypoints = destinations.slice(1, -1).map(dest => ({
        location: { lat: dest.lat, lng: dest.lng },
        stopover: true,
      }))

      const request = {
        origin: { lat: destinations[0].lat, lng: destinations[0].lng },
        destination: { lat: destinations[destinations.length - 1].lat, lng: destinations[destinations.length - 1].lng },
        waypoints: waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      }

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result)
        }
      })
    }
  }, [map, destinations])

  return <div ref={mapRef} className="map-container" />
}

const MapComponent = ({ destinations }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return (
      <div className="map-error">
        Google Maps API key not configured. Please add VITE_GOOGLE_MAPS_API_KEY to your .env file.
      </div>
    )
  }

  return (
    <Wrapper apiKey={apiKey}>
      <Map destinations={destinations} />
    </Wrapper>
  )
}

export default MapComponent
