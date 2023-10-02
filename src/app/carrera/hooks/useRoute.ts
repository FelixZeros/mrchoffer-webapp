'use client'
import { useJsApiLoader } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
interface useRouteProps {
  origin?: string
  destination?: string
}

export const useRoute = ({ origin, destination }: useRouteProps) => {
  const [directionResponse, setDirectionResponse] =
    useState<google.maps.DirectionsResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)
  
  const getDestinationResult = async () => {
    if( !origin || !destination) return;

    setLoading(true)
    const directionsService = new google.maps.DirectionsService()

    await directionsService.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING
      })

      .then(result => setDirectionResponse(result))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getDestinationResult()
  }, [origin, destination])

  return { directionResponse, loading, error }
}
