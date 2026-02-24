import React, { useEffect, useRef, useState } from 'react'
import '../../styles/LocationSearch.css'

const LocationSearch = ({ onPlaceSelect }) => {
  const inputRef = useRef(null)
  const [autocomplete, setAutocomplete] = useState(null)

  useEffect(() => {
    if (!window.google || !inputRef.current) return

    const autocompleteInstance = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ['(cities)'],
        fields: ['place_id', 'geometry', 'name', 'formatted_address'],
      }
    )

    autocompleteInstance.addListener('place_changed', () => {
      const place = autocompleteInstance.getPlace()

      if (!place.geometry || !place.geometry.location) {
        console.error('No geometry data for this place')
        return
      }

      const placeData = {
        name: place.name,
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        placeId: place.place_id,
      }

      onPlaceSelect(placeData)
      inputRef.current.value = ''
    })

    setAutocomplete(autocompleteInstance)
  }, [onPlaceSelect])

  return (
    <div className="location-search">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a destination..."
        className="location-search-input"
      />
    </div>
  )
}

export default LocationSearch
