'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer
} from '@react-google-maps/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRoute } from '../hooks/useRoute'
import { z } from 'zod'
import { SearchIcon } from '@/components/icons/magnifyng-glass'
import { CheckIcon } from '@/components/icons/check'
import { CreateTrip } from '@/services/create-ride.service'

const schema = z.object({
  name: z.string(),
  cellphone: z.string(),
  pickUpLocation: z.string(),
  destinationLocation: z.string(),
  paymentMethod: z.string(),
  gender: z.string(),
  offeredPrice: z.string(),
  comments: z.string()
})

type props = {
  socket: any
  handleSuggestionChangePrice: (trip: any) => void
  statePrice: boolean
  stateEnd: boolean
}

export const RequestRideForm = ({
  socket,
  handleSuggestionChangePrice,
  statePrice,
  stateEnd
}: props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: ['places']
  })

  const [position, setPosition] = useState<{
    origin: string
    destination: string
  } | null>(null)

  const [latitude, setLatitude] = useState<any>()
  const [longitude, setLongitude] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<Error | unknown | null>()
  const [requestMade, setRequestMade] = useState<boolean>(false)
  const center = { lat: latitude || null, lng: longitude || null }
  const [selectOrigin, setSelectOrigin] = useState<boolean>(false)
  const [selectDestination, setSelectDestination] = useState<boolean>(false)
  const inputOriginRef = useRef<HTMLInputElement | null>(null)
  const inputDestinationRef = useRef<HTMLInputElement | null>(null)

  const { directionResponse, distance } = useRoute({
    origin: position?.origin,
    destination: position?.destination
  })

  const { handleSubmit, register, setValue, getValues, control } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema)
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    // await CreateTrip({
    //   values: {
    //     ...values,
    //     distance
    //   },
    //   setErrors,
    //   setLoading,
    //   setRequestMade
    // })
    // setLoading(true)
    // if (!statePrice) {
    //   setTimeout(() => {
    //     setLoading(false)
    //   }, 30000)
    // }
    // handleSuggestionChangePrice({
    //   ...values,
    //   distance
    // })
  }

  useEffect(() => {
    control._reset()
    setPosition({ origin: '', destination: '' })
    setTimeout(() => {
      setRequestMade(false)
    }, 10000)
  }, [requestMade])

  console.log(stateEnd)
  if (stateEnd) {
    return (
      <>
        <p className='mt-40 text-center'>
          No han aceptado tu solicitud, presiona el botón para solicitar otra.
        </p>
        <button>Solicitar carrera</button>
      </>
    )
  }

  return (
    <>
      <main>
        <section className='h-screen absolute top-0 left-0 w-screen'>
          {isLoaded && (
            <>
              <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{
                  width: '100%',
                  height: '70vh',
                  transition: '0.3s ease all',
                  transform:
                    selectOrigin || selectDestination
                      ? 'translateY(0)'
                      : 'translateY(-100%)',
                  position: 'absolute'
                }}
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
              <div className='mt-[70vh] h-[30vh] grid place-content-center'>
                {selectOrigin && (
                  <>
                    <div className='relative'>
                      <div className='absolute h-full grid place-content-center'>
                        <div className='flex items-center gap-2 pl-[10px]'>
                          <SearchIcon />
                        </div>
                      </div>
                      <div className='flex gap-3'>
                        <Autocomplete>
                          <input
                            {...control}
                            {...register('pickUpLocation')}
                            onChange={evt => {
                              setValue('pickUpLocation', evt.target.value)
                              setPosition({
                                destination: getValues('destinationLocation'),
                                origin: inputOriginRef.current!.value
                              })
                            }}
                            ref={inputOriginRef}
                            placeholder={
                              !position?.origin ? 'Origen' : position.origin
                            }
                            className='py-3 rounded-xl bg-white shadow-lg border pl-[34px]'
                          />
                        </Autocomplete>
                        <button
                          disabled={!inputOriginRef.current?.value}
                          onClick={evt => {
                            setSelectOrigin(false)
                            setValue(
                              'pickUpLocation',
                              inputOriginRef.current!.value
                            )
                            setPosition({
                              destination: getValues('destinationLocation'),
                              origin: inputOriginRef.current!.value
                            })
                          }}
                          className='cursor-pointer rounded-xl shadow-lg grid place-content-center px-5 border bg-[--main-yellow] disabled:bg-gray-300'
                        >
                          <CheckIcon />
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {selectDestination && (
                  <>
                    <div className='relative'>
                      <div className='absolute h-full grid place-content-center'>
                        <div className='flex items-center pl-[10px]'>
                          <SearchIcon />
                        </div>
                      </div>
                      <div className='flex gap-3'>
                        <Autocomplete>
                          <input
                            {...control}
                            {...register('destinationLocation')}
                            onChange={evt => {
                              setValue('destinationLocation', evt.target.value)
                              setPosition({
                                destination: inputDestinationRef.current!.value,
                                origin: getValues('pickUpLocation')
                              })
                            }}
                            ref={inputDestinationRef}
                            placeholder={
                              !position?.destination
                                ? 'Destino'
                                : position.destination
                            }
                            className='py-3 rounded-xl bg-white shadow-lg border pl-[34px]'
                          />
                        </Autocomplete>
                        <button
                          disabled={!inputDestinationRef.current?.value}
                          onClick={evt => {
                            setSelectDestination(false)
                            setValue(
                              'destinationLocation',
                              inputDestinationRef.current!.value
                            )
                            setPosition({
                              destination: inputDestinationRef.current!.value,
                              origin: getValues('pickUpLocation')
                            })
                          }}
                          className='cursor-pointer rounded-xl shadow-lg grid place-content-center px-5 border bg-[--main-yellow] disabled:bg-gray-300'
                        >
                          <CheckIcon />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </section>
        <section
          className={`flex flex-col pt-[80px] transition-transform w-screen items-center ${
            selectOrigin && '-translate-x-full'
          } ${selectDestination && '-translate-x-full'}`}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col pt-4 gap-4 text-black text-center justify-center items-center z-50 mb-10 max-w-[95vw]'
          >
            <h1 className='font-bold text-2xl'> Solicitar conductor </h1>

            <div className='grid gap-4 w-full'>
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
                <input
                  type='hidden'
                  {...register('pickUpLocation')}
                  value={inputOriginRef.current?.value}
                />
                <input
                  type='hidden'
                  {...register('destinationLocation')}
                  value={inputDestinationRef.current?.value}
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

              <div
                onClick={() => setSelectOrigin(true)}
                className='py-3 cursor-pointer z-50 rounded-xl w-full bg-white border shadow-lg borde px-3 flex gap-3 truncate '
              >
                <SearchIcon /> {!position?.origin ? 'Origen' : position.origin}
              </div>
              <div
                onClick={() => setSelectDestination(true)}
                className='py-3 cursor-pointer z-50 rounded-xl w-full bg-white border shadow-lg borde px-3 flex gap-3 truncate '
              >
                <SearchIcon />{' '}
                {!position?.destination ? 'Destino' : position.destination}
              </div>

              <select
                required
                {...register('paymentMethod')}
                className='py-3 rounded-xl bg-white shadow-lg border px-3 w-full '
              >
                <option value=''>Método de pago</option>
                <option value='nequi'>Nequi</option>
                <option value='daviplata'>Daviplata</option>
              </select>
              {statePrice && (
                <p>Tal vez deberías subir el valor de la carrera</p>
              )}
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
            </div>
            {!requestMade && (
              <button
                disabled={loading}
                type='submit'
                className={`bg-amber-400 rounded-2xl shadow-lg max-w-fit font-bold text-black px-3 py-2 disabled:bg-gray-300`}
              >
                {loading ? 'Solicitando...' : 'Solicitar servicio'}
              </button>
            )}
            {requestMade && (
              <span className='text-black'>
                {' '}
                Tu carrera ha sido solicitada, espera instrucciones en tu
                télefono
              </span>
            )}
          </form>
        </section>
      </main>
    </>
  )
}
