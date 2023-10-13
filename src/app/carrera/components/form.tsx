'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
import { z } from 'zod'
import { RequestRide } from '@/types'
import { SearchIcon } from '@/components/icons/magnifyng-glass'
const schema = z.object({
  name: z.string(),
  email: z.string(),
  cellphone: z.string(),
  pickUpLocation: z.string(),
  destinationLocation: z.string(),
  paymentMethod: z.string(),
  gender: z.string(),
  offeredPrice: z.string(),
  comments: z.string()
})

export const RequestRideForm = () => {
  /*
  const { geoLocation } = useRequestTravel()
  useEffect(() => {
    if (!geoLocation) return
    setLatitude(geoLocation.latitude)
    setLongitude(geoLocation.longitude)
  }, [geoLocation])
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY as string,
    libraries: ['places']
    const { directionResponse, distance, duration, error } = useRoute({
      origin: position?.origin,
      destination: position?.destination
    })
  })
  await axios
    .post<RequestRide>(process.env.NEXT_PUBLIC_API + '/api/request-trip', {
      date: new Date(),
      status: 1,
      origin: values.pickUpLocation,
      destination: values.destinationLocation,
      distance: distance || 1000,
      phoneNumber: values.cellphone,
      price: Number(values.offeredPrice),
      genderPassenger: values.gender,
      comment: values.comments,
      paymentMethod: values.paymentMethod,
      startTime: '14:19:53'
    })
    .then(res => {
      if (res) setLoading(false)
      if (res.statusText === 'OK') setRequestMade(true)
      console.log(res)
    })
    .catch(err => setErrors(err))
*/

  const [latitude, setLatitude] = useState<any>()
  const [longitude, setLongitude] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<boolean>(false)
  const [requestMade, setRequestMade] = useState<boolean>(false)
  const center = { lat: latitude || null, lng: longitude || null }
  const [position, setPosition] = useState<{
    origin: string
    destination: string
  } | null>(null)

  const { handleSubmit, register, setValue, getValues } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema)
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true)
  }
  return (
    <>
      <section className='flex flex-col pt-[80px] w-full items-center'>
        {/*
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
              */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col pt-4 gap-4 text-black text-center justify-center items-center mb-10 max-w-[90vw]'
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
                {...register('cellphone')}
                placeholder='Whatsapp'
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

          <button
            type='button'
            className='py-3 rounded-xl w-full bg-white border shadow-lg borde pl-3 flex gap-3 '
          >
            {' '}
            <SearchIcon /> Origen{' '}
          </button>
          <button
            type='button'
            className='py-3 rounded-xl w-full bg-white border shadow-lg borde pl-3 flex gap-3 '
          >
            {' '}
            <SearchIcon /> Destino{' '}
          </button>

          <select
            required
            {...register('paymentMethod')}
            className='py-3 rounded-xl bg-white shadow-lg border px-3 w-full '
          >
            <option value=''>Método de pago</option>
            <option value='nequi'>Nequi</option>
            <option value='daviplata'>Daviplata</option>
          </select>

          <input
            required
            {...register('offeredPrice')}
            placeholder='$ Valor'
            min='0'
            type='number'
            className='py-3 rounded-xl bg-white shadow-lg border pl-3'
          />
          <div className='max-w-full'>
            <textarea
              {...register('comments')}
              placeholder='Comentarios'
              className='py-3 rounded-xl bg-white shadow-lg border pl-3'
            />
          </div>
          {!requestMade && (
            <button
              disabled={loading}
              type='submit'
              className={`bg-amber-400 rounded-2xl max-w-fit font-bold text-black px-3 py-2`}
            >
              {loading ? 'Solicitando...' : 'Solicitar servicio'}
            </button>
          )}
          {requestMade && (
            <span className='text-black'>
              {' '}
              Tu carrera ha sido solicitada, espera instrucciones en tu télefono
            </span>
          )}
        </form>
      </section>
    </>
  )
}
