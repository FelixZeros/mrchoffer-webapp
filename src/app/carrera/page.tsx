'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRequestTravel } from '@/hooks/useRequestTravel'
import { z } from 'zod'
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer
} from '@react-google-maps/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const requestTravel = () => {
  const { geoLocation } = useRequestTravel()
  const [latitude, setLatitude] = useState<any>()
  const [longitude, setLongitude] = useState<any>()
  const [directionResponse, setDirectionResponse] =
    useState<google.maps.DirectionsResult | null>(null)

  const [errors, setErrors] = useState<Error[] | unknown | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const originRef = useRef<HTMLInputElement>(null)
  const destinationRef = useRef<HTMLInputElement>(null)
  const center = { lat: latitude || null, lng: longitude || null }

  useEffect(() => {
    if (!geoLocation) return
    setLatitude(geoLocation.latitude)
    setLongitude(geoLocation.longitude)
  }, [geoLocation])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY as string,
    libraries: ['places']
  })

  const schema = z.object({
    name: z.string(),
    email: z.string(),
    cellphone: z.string(),
    pickUpLocation: z.string(),
    destinationLocation: z.string(),
    gender: z.string(),
    offeredPrice: z.string(),
    comments: z.string()
  })

  const { handleSubmit, register, setValue, getValues } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema)
  })

  function onSubmit(values: z.infer<typeof schema>) {
    const { offeredPrice, ...rest } = values
    const dtoRequestRide = {
      offeredPrice: Number(values.offeredPrice),
      ...rest
    }
    console.log(dtoRequestRide)
  }

  const [route, setRoute] = useState<any>()

  useEffect(() => {
    setDirectionResponse(route)
  }, [route])

  const calculateRoute = async () => {
    if (!getValues('pickUpLocation') || !getValues('destinationLocation'))
      return
    const directionsService = new google.maps.DirectionsService()
    try {
      setIsLoading(true)
      const route = await directionsService.route({
        origin: getValues('pickUpLocation'),
        destination: getValues('destinationLocation'),
        travelMode: google.maps.TravelMode.DRIVING
      })
      setRoute(route)
    } catch (err) {
      setErrors(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setTimeout(() => setErrors(null), 3000)
  }, [errors])

  if (!isLoaded || !geoLocation) return <h1> Cargando... </h1>
  return (
    <main>
      <section className='flex flex-col'>
        <h1 className='text-2xl text-center font-bold'>Solicitud de Carrera</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col pt-4 gap-4'
        >
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Nombre completo</label>
            <input
              {...register('name')}
              className='w-full border rounded p-1 outline-none'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Correo</label>
            <input
              {...register('email')}
              className='w-full border rounded p-1 outline-none'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Teléfono</label>
            <input
              {...register('cellphone')}
              className='w-full border rounded p-1 outline-none'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Lugar de recogida</label>
            <Autocomplete>
              <input
                {...register('pickUpLocation')}
                onChange={evt => {
                  setValue('pickUpLocation', evt.target.value)
                  calculateRoute()
                }}
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
                {...register('destinationLocation')}
                onChange={evt => {
                  setValue('destinationLocation', evt.target.value)
                  calculateRoute()
                }}
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
            {directionResponse && (
              <DirectionsRenderer directions={directionResponse} />
            )}
          </GoogleMap>
          <div className='flex gap-10 justify-center'>
            <span className={!errors ? 'hidden' : ''}>Ocurrió un error</span>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <div className='flex flex-row-reverse items-center gap-2'>
              <label htmlFor='male'>Hombre</label>
              <input {...register('gender')} type='radio' value='male' />
            </div>
            <div className='flex flex-row-reverse items-center gap-2'>
              <label htmlFor='female'>Mujer</label>
              <input {...register('gender')} type='radio' value='famale' />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Precio ofrecido</label>
            <input
              type='number'
              {...register('offeredPrice')}
              className='w-full border rounded p-1 outline-none'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Comentarios</label>
            <textarea
              {...register('comments')}
              className='w-full border rounded p-1 outline-none resize-none'
              cols={30}
              rows={10}
            />
          </div>
          <button type='submit' className='bg-amber-400 rounded font-bold p-1'>
            Solicitar carrera
          </button>
        </form>
      </section>
    </main>
  )
}

export default requestTravel
