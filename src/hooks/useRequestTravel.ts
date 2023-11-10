import { useEffect, useState } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'

export const useRequestTravel = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: ['places']
  })
  const [geoLocation, setGeoLocation] = useState<any>(null)
  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)
  const [center, setCenter] = useState<any>({
    lat: 10.464506,
    lng: -73.2582494
  })
  const [renderStep, setRenderStep] = useState<string>('StartRequest')

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords
        setGeoLocation({ latitude, longitude })
      })
    }
  }, [])

  useEffect(() => {
    if (!geoLocation) {
      return
    }
    setLatitude(geoLocation.latitude)
    setLongitude(geoLocation.longitude)
  }, [geoLocation])

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      setCenter({ lat: latitude, lng: longitude })
    }
  }, [latitude, longitude])

  const handleRender = (Render: string) => {
    setRenderStep(Render)
  }

  return {
    geoLocation,
    center,
    isLoaded,
    handleRender,
    renderStep
  }
}
