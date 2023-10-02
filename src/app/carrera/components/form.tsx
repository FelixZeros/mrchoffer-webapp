'use client'

import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer
} from '@react-google-maps/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRoute } from '../hooks/useRoute'
import { useRequestTravel } from '@/hooks/useRequestTravel'

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

export const RequestRideForm = () => {
  const { geoLocation } = useRequestTravel()
  const [latitude, setLatitude] = useState<any>()
  const [longitude, setLongitude] = useState<any>()
  const center = { lat: latitude || null, lng: longitude || null }
  const [position, setPosition] = useState<{
    origin: string
    destination: string
  } | null>(null)

  useEffect(() => {
    if (!geoLocation) return
    setLatitude(geoLocation.latitude)
    setLongitude(geoLocation.longitude)
  }, [geoLocation])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY as string,
    libraries: ['places']
  })

  const { directionResponse, error, loading } = useRoute({
    origin: position?.origin,
    destination: position?.destination
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

  return (
    <>
      {isLoaded && (
        <section className='flex flex-col pt-[80px] w-full items-center'>
          {geoLocation && (
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
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col pt-4 gap-4 text-black text-center px-10 mb-10'
          >
            <h1 className='font-bold text-2xl'> Solicitar conductor </h1>

            <div className='grid gap-4'>
              <div className='flex flex-col'>
                <input
                  {...register('name')}
                  placeholder='Nombre'
                  required
                  className='py-3 rounded-xl bg-white shadow-lg border pl-3 '
                />
              </div>

              <div className='flex flex-col'>
                <input
                  placeholder='Correo'
                  required
                  {...register('email')}
                  className='py-3 rounded-xl bg-white shadow-lg border  pl-3 '
                />
              </div>
              <div className='flex flex-col'>
                <input
                  {...register('cellphone')}
                  placeholder='Teléfono'
                  required
                  className='py-3 rounded-xl bg-white shadow-lg border pl-3 '
                />
              </div>

              <select
                required
                {...register('gender')}
                className='py-3 rounded-xl bg-white shadow-lg border px-3 '
              >
                <option value=''>Género</option>
                <option value='male'>Hombre</option>
                <option value='female'>Mujer</option>
                <option value='other'>otro</option>
              </select>
            </div>

            <div className='mt-10 grid gap-4'>
              <Autocomplete>
                <input
                  required
                  {...register('pickUpLocation')}
                  placeholder='Lugar de recogida'
                  onChange={evt => {
                    setValue('pickUpLocation', evt.target.value)
                    setPosition({
                      origin: evt.target.value,
                      destination: getValues('destinationLocation')
                    })
                  }}
                  className='py-3 rounded-xl w-full bg-white border shadow-lg borde pl-3 '
                  type='text'
                />
              </Autocomplete>

              <Autocomplete>
                <input
                  required
                  {...register('destinationLocation')}
                  placeholder='Lugar de destino'
                  onChange={evt => {
                    setValue('destinationLocation', evt.target.value)
                    setPosition({
                      destination: evt.target.value,
                      origin: getValues('pickUpLocation')
                    })
                  }}
                  className='py-3 rounded-xl w-full bg-white shadow-lg border pl-3'
                  type='text'
                />
              </Autocomplete>
            </div>

            <input
              required
              {...register('offeredPrice')}
              placeholder='Precio'
              min='0'
              type='number'
              className='py-3 rounded-xl bg-white shadow-lg border pl-3'
            />
            <div className='flex flex-col'>
              <textarea
                {...register('comments')}
                placeholder='Comentarios'
                className='py-3 rounded-xl bg-white shadow-lg border pl-3'
                cols={30}
                rows={10}
              />
            </div>
            <button
              type='submit'
              className='bg-amber-400 rounded font-bold text-white p-1 h-14'
            >
              Solicitar carrera
            </button>
          </form>
        </section>
      )}
    </>
  )
}
