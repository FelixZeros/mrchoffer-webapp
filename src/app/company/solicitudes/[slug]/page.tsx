'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Rate } from 'antd'

const RequestTripPage = () => {
  const router = useRouter()
  const [trip, setTrip] = useState([])
  const [driver, setDriver] = useState([])
  const pathname = usePathname()

  useEffect(() => {
    async function getTrip() {
      const res = await fetch(
        (process.env.NEXT_PUBLIC_API as string) +
          'get-trip/' +
          pathname?.split('/')[3]
      )
      const data = await res.json()
      const resDriver = await fetch(
        (process.env.NEXT_PUBLIC_API as string) + 'drivers/' + data?.driverId
      )
      const dataDriver = await resDriver.json()
      setDriver(dataDriver)
      setTrip(data)
    }
    getTrip()
  }, [])

  console.log(driver)

  return (
    <section>
      <h1 className='font-bold text-3xl uppercase my-4'>
        Solicitud {'#'}
        {trip?.id}
      </h1>
      <div className='flex flex-row w-full gap-4'>
        <div className='flex flex-col w-1/2 gap-4'>
          <div className='w-full shadow-sm rounded-b-3xl border rounded-3xl'>
            <h1 className='font-semibold uppercase bg-[#DBDBDB] rounded-t-3xl border p-4'>
              Información general
            </h1>
            <div className='py-4 flex flex-col gap-4 uppercase'>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-2/5 uppercase font-semibold'>Pasajero</p>
                <p>{trip?.name}</p>
              </div>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-2/5 uppercase font-semibold'>Origen</p>
                <p>{trip?.textOrigin}</p>
              </div>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-2/5 uppercase font-semibold'>Destino</p>
                <p>{trip?.textDestination}</p>
              </div>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-2/5 uppercase font-semibold'>Valor</p>
                <p>COP {trip?.price}</p>
              </div>
              <div className='flex flex-row'>
                <p className='mx-4 w-2/5 uppercase font-semibold'>Acciones</p>
                <div className='flex flex-row justify-center gap-4 items-center'>
                  <Link
                    referrerPolicy='no-referrer'
                    target='_blank'
                    href={`https://wa.me/+57${trip?.phoneNumber}`}
                  >
                    <Image
                      src='/images/whatsapp.png'
                      width={17}
                      height={17}
                      alt='whatsapp'
                      className='cursor-pointer'
                    />
                  </Link>
                  <Image
                    alt='phone'
                    src='/images/phone.png'
                    width={17}
                    height={17}
                    className='cursor-pointer object-contain'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='w-full shadow-sm rounded-b-3xl border rounded-3xl'>
            <h1 className='font-semibold uppercase bg-[#DBDBDB] rounded-t-3xl border p-4'>
              Información del conductor
            </h1>
            <div className='py-4 flex flex-col gap-4 uppercase'>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-2/5 uppercase font-semibold'>Conductor</p>
                <p>{driver?.name}</p>
              </div>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-2/5 uppercase font-semibold'>Vehículo</p>
                <p>
                  {driver?.vehicle?.brand +
                    ' ' +
                    driver?.vehicle?.line +
                    ' ' +
                    driver?.vehicle?.model}
                </p>
              </div>
              <div className='flex flex-row'>
                <p className='mx-4 w-2/5 uppercase font-semibold'>Acciones</p>
                <div className='flex flex-row justify-center gap-4 items-center'>
                  <Link
                    referrerPolicy='no-referrer'
                    target='_blank'
                    href={`https://wa.me/+57${driver?.phone}`}
                  >
                    <Image
                      src='/images/whatsapp.png'
                      width={17}
                      height={17}
                      alt='whatsapp'
                      className='cursor-pointer'
                    />
                  </Link>
                  <Image
                    alt='phone'
                    src='/images/phone.png'
                    width={17}
                    height={17}
                    className='cursor-pointer object-contain'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-1/2 shadow-sm rounded-b-3xl border rounded-3xl'>
          <h1 className='font-semibold uppercase bg-[#DBDBDB] rounded-t-3xl border p-4'>
            Información del viaje
          </h1>
          <div className='py-4 flex flex-col gap-4 uppercase'>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>#</p>
              <p>{trip?.id}</p>
            </div>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>
                Hora de solicitud
              </p>
              <p>
                {new Date(trip?.createdAt).toLocaleDateString('es-CO', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                })}
              </p>
            </div>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>Estado</p>
              <p>
                {trip?.comment === '' ? 'No hay comentarios' : trip?.comment}
              </p>
            </div>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>
                Tiempo de espera
              </p>
              <p>
                {new Date(
                  new Date(trip?.updatedAt).getTime() -
                    new Date(trip?.createdAt).getTime()
                ).getMinutes()}{' '}
                minutos
              </p>
            </div>

            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>
                Duración del viaje
              </p>
              <p>
                {trip &&
                  trip.startTime &&
                  trip.endTime &&
                  (
                    (new Date(new Date().toDateString() + ' ' + trip.endTime) -
                      new Date(
                        new Date().toDateString() + ' ' + trip.startTime
                      )) /
                    (1000 * 60)
                  ).toFixed(2) + ' minutos'}
              </p>
            </div>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>
                Puntuación del viaje
              </p>
              <p>
                <Rate disabled value={trip?.rating ?? 1} />
              </p>
            </div>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>
                Valor del viaje
              </p>
              <p>COP {trip?.price}</p>
            </div>
            <div className='flex flex-row items-center justify-center'>
              <button className='bg-[#F9A826] rounded-3xl uppercase font-semibold py-2 px-4 mt-4'>
                Ver Recorrido
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RequestTripPage
