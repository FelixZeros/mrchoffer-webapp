'use client'
import { useEffect, useState } from 'react'
interface useRouteProps {
  origin?: string
  destination?: string
}

export const useRoute = ({ origin, destination }: useRouteProps) => {
  const [directionResponse, setDirectionResponse] =
    useState<google.maps.DirectionsResult | null>(null)
  const [distance, setDistance] = useState<any>(null)
  const [duration, setDuration] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)

  const getDestinationResult = async () => {
    if (!origin || !destination) return

    setLoading(true)
    const directionsService = new google.maps.DirectionsService()

    await directionsService
      .route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING
      })
      .then(result => {
        setDirectionResponse(result)
        setDistance(result.routes[0].legs[0].distance?.value)
        setDuration(result.routes[0].legs[0].duration?.value)
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getDestinationResult()
  }, [origin, destination])

  return { directionResponse, distance, duration, loading, error }
}
