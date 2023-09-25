'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRequestTravel } from '@/hooks/useRequestTravel'
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  Marker,
  DirectionsRenderer
} from '@react-google-maps/api'

const requestTravel = () => {
  const { geoLocation } = useRequestTravel()
  useEffect(() => {
    if( !geoLocation ) return;
    setLatitude(geoLocation.latitude)
    setLongitude(geoLocation.longitude)
  }, [geoLocation])

  const [ latitude, setLatitude] = useState<any>()
  const [ longitude, setLongitude] = useState<any>()
  const [directionResponse, setDirectionResponse] = useState<any>(null)

  
  const center = { lat: latitude, lng: longitude }
  
  const originRef = useRef(null)
  const destinationRef = useRef(null)
  
  
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY as string,
    libraries: ['places']
  })
  
  const calculateRoute = async () => {
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef?.current?.value,
      destination: destinationRef?.current?.value,
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionResponse(results)
  }

  if (!isLoaded) return <h1>Cargando...</h1>

  return (
    <main>
      <section className='flex flex-col'>
        <h1 className='text-2xl text-center font-bold'>Solicitud de Carrera</h1>
        <form className='flex flex-col pt-4 gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Lugar de recogida</label>
            <Autocomplete>
              <input
                ref={originRef}
                className='w-full border rounded p-1 outline-none'
                type='text'
              />
            </Autocomplete>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Lugar de destino</label>
            <Autocomplete>
              <input
                ref={destinationRef}
                className='w-full border rounded p-1 outline-none'
                type='text'
              />
            </Autocomplete>
          </div>
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '450px' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false
            }}
          >
            <Marker position={center} />
            { directionResponse && <DirectionsRenderer directions={directionResponse}/>}
          </GoogleMap>
          <div>
            <button type='button' onClick={calculateRoute}>Marcar ruta</button>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <div className='flex flex-row-reverse items-center gap-2'>
              <label htmlFor='male'>Hombre</label>
              <input type='checkbox' />
            </div>
            <div className='flex flex-row-reverse items-center gap-2'>
              <label htmlFor='female'>Mujer</label>
              <input type='checkbox' />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Precio ofrecido</label>
            <input
              className='w-full border rounded p-1 outline-none'
              type='number'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Comentarios</label>
            <textarea
              className='w-full border rounded p-1 outline-none resize-none'
              name=''
              id=''
              cols={30}
              rows={10}
            />
          </div>
          <button className='bg-amber-400 rounded font-bold p-1'>
            Solicitar carrera
          </button>
        </form>
      </section>
    </main>
  )
}

export default requestTravel
