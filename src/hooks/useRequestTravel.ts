import { useEffect, useState } from 'react'

export const useRequestTravel = () => {
  const [geoLocation, setGeoLocation] = useState<any>(null)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords
        setGeoLocation({ latitude, longitude })
      })
    }
  }, [])

  return { geoLocation }
}
