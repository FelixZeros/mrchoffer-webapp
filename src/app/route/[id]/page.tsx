'use client'
import React, { useEffect, useState } from 'react'
import { useRequestTravel } from '@/hooks/useRequestTravel'
import { GoogleMap, MarkerF } from '@react-google-maps/api'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import io from 'socket.io-client'
import { Modal, Input } from 'antd'
import Link from 'next/link'

const { TextArea } = Input

const DriverRealTime = () => {
  const { isLoaded } = useRequestTravel()
  const [socket, setSocket] = useState<any>(null)
  const [tripData, setTripData] = useState<any>(null)
  const [duration, setDuration] = useState<any>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [visibleCancel, setVisibleCancel] = useState<boolean>(false)
  const [visibleArrived, setVisibleArrived] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_KEY)
    setSocket(socket)
  }, [])

  const pathName = usePathname()
  const [location, setLocation] = useState<any>(null)
  const [comment, setComment] = useState<string>('')

  useEffect(() => {
    const getTripData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API as string}get-trip-byIdFront/${
          pathName?.split('/')[2]
        }`
      )
      const data = await res.json()
      if (!data?.idFront) {
        setTripData(null)
      } else {
        setTripData(data)
      }
    }
    getTripData()
  }, [])

  useEffect(() => {
    socket?.on(
      `server:send-driver-location-${tripData?.idFront}`,
      (data: any) => {
        setLocation({
          lat: data?.res?.latitude,
          lng: data?.res?.longitude
        })
        setDuration(data?.info?.duration)
      }
    )
    socket?.on(`server:arrived-trip-${tripData?.idFront}`, (data: any) => {
      console.log('llegó')
      setVisibleArrived(true)
      setDisabled(true)
    })
  }, [socket && tripData])

  if (tripData === null && (tripData?.status !== 4 || tripData?.status === 5)) {
    return (
      <section className='w-screen h-screen flex flex-col items-center justify-center px-4'>
        <h1 className='text-3xl font-bold'>
          No se ha asignado un viaje a este conductor.
        </h1>
      </section>
    )
  }
  if (tripData !== null && (tripData?.status === 4 || tripData?.status === 5)) {
    return (
      <section className='w-screen h-screen flex flex-col items-center justify-center px-4'>
        <h1 className='text-3xl font-bold'>Este viaje ha sido cancelado</h1>
        <p>Motivo: {tripData?.comment}</p>
      </section>
    )
  }

  if (tripData !== null && tripData?.status === 3) {
    return (
      <section className='w-screen h-screen flex flex-col items-center justify-center px-4'>
        <h1 className='text-3xl font-bold'>Este viaje ya finalizó</h1>
      </section>
    )
  }
  console.log(tripData)
  return (
    <section className='mt-12 bg-[#292929] min-h-screen'>
      <Modal
        visible={visibleCancel}
        onCancel={() => setVisibleCancel(false)}
        footer={null}
        centered={true}
        width={400}
      >
        <div className='flex flex-col gap-4'>
          <h1 className='uppercase font-bold text-center pb-4 text-2xl'>
            Cancelar carrera
          </h1>
          <TextArea
            placeholder='Cuéntanos el motivo...'
            className='placeholder:font-medium placeholder:text-gray-500 text-black p-2 shadow-sm text-xl font-medium'
            onChange={e => setComment(e.target.value)}
            maxLength={70}
            showCount
          />
          <div
            className='flex flex-row w-full justify-between py-8'
            onClick={() => {
              setVisibleCancel(false)
              socket.emit('client:cancel-trip', {
                id: tripData?.idFront,
                cancelBy: 1,
                comment
              })
              setTimeout(() => {
                window.location.reload()
              }, 2000)
            }}
          >
            <button className='uppercase bg-[#FFB800] p-2 rounded-lg font-bold w-full text-xl shadow-sm'>
              Confirmar
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        centered={true}
        width={400}
      >
        <div className='flex flex-col gap-4'>
          <h1 className='uppercase font-bold text-center pb-4 text-2xl'>
            Comentarios
          </h1>
          <TextArea
            placeholder='No hay comentarios...'
            className='placeholder:font-medium placeholder:text-gray-500 text-black p-2 shadow-sm text-xl font-medium'
            value={comment === '' ? '' : tripData?.comment}
          />
          <div
            className='flex flex-row w-full justify-between py-8'
            onClick={() => {
              setVisible(false)
            }}
          >
            <button className='uppercase bg-[#FFB800] p-2 rounded-lg font-bold w-full text-xl shadow-sm'>
              Confirmar
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        visible={visibleArrived}
        onCancel={() => {
          setVisibleArrived(false)
        }}
        footer={null}
        centered={true}
        width={400}
      >
        <div className='flex flex-col items-center justify-center h-72'>
          <h1 className='text-3xl font-bold'>Información</h1>
          <p className='font-normal text-xl mt-4'>
            El conductor ya llegó al sitio designado
          </p>
        </div>
      </Modal>
      {isLoaded && tripData?.status === 2 && (
        <GoogleMap
          center={{
            lat: location?.lat ? location?.lat : tripData?.latitudeOrigin,
            lng: location?.lng ? location?.lng : tripData?.longitudeOrigin
          }}
          zoom={15}
          mapContainerStyle={{
            width: '100%',
            height: '60vh',
            transition: '0.3s ease all'
          }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        >
          <MarkerF
            position={location}
            options={{
              icon: '/images/car.png'
            }}
          />
        </GoogleMap>
      )}
      <div className='bg-[#292929] py-3 px-6 flex flex-row items-center justify-between'>
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <Image
              src={
                tripData?.driver?.photo === null
                  ? '/images/profile.png'
                  : tripData?.driver?.photo
              }
              width={62}
              height={46}
              alt='profile'
            />
            <p className='text-white font-semibold'>{tripData?.driver?.name}</p>
          </div>
          <div className='flex items-center gap-2 mt-3'>
            <div className='bg-[#FFB800] w-[20px] rounded-full h-[20px] items-center flex justify-center'>
              <p className='text-white font-semibold'>A</p>
            </div>
            <p className='text-white font-medium'>{tripData?.textOrigin}</p>
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <div className='bg-[#D2D2D2] w-[20px] rounded-full h-[20px] items-center flex justify-center'>
              <p className='text-black font-semibold'>B</p>
            </div>
            <p className='text-white font-medium'>
              {tripData?.textDestination}
            </p>
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <p className='text-white font-semibold'>
              {tripData?.paymentMethod} - {tripData?.price} COP
            </p>
            {tripData?.paymentMethod !== '' &&
              tripData?.paymentMethod !== 'Efectivo' && (
                <Image
                  src={
                    tripData?.paymentMethod === 'Nequi'
                      ? '/images/nequi.png'
                      : tripData?.paymentMethod === 'Daviplata'
                      ? '/images/davivienda.png'
                      : '/images/bancolombia.png'
                  }
                  alt={tripData?.paymentMethod}
                  width={20}
                  height={20}
                />
              )}
          </div>
          <p className='text-white text-sm mt-1'>
            {tripData?.vehicle?.brand} {tripData?.vehicle?.model}{' '}
            {tripData?.vehicle?.color}
          </p>
        </div>
        <div className='flex flex-col items-center'>
          <Image
            src='/images/car-driver.png'
            width={40}
            height={40}
            alt='car'
          />
          <p className='text-sm bg-white font-semibold rounded-lg px-1 uppercase'>
            {tripData?.vehicle?.plate}
          </p>
          <p className='text-sm text-white font-medium mt-1'>
            {duration ? duration : '0'} Min
          </p>
        </div>
      </div>
      <div className='flex flex-row w-full justify-between px-8 mt-6'>
        <button
          disabled={disabled}
          className='disabled:cursor-not-allowed disabled:bg-[#ceb576] uppercase bg-[#FFB800] p-2 rounded-lg font-bold w-[73%] shadow-sm'
          onClick={() => {
            setVisibleCancel(true)
          }}
        >
          Cancelar
        </button>

        <button
          className='bg-[#FFB800] p-2 rounded-lg shadow-sm relative'
          onClick={() => {
            setVisible(true)
          }}
        >
          <Image src='/images/comment.png' alt='img' width={40} height={37} />
        </button>
        {tripData?.comment !== '' && (
          <p className='absolute bg-[#292929] rounded-full px-2 text-white font-bold text-sm right-7 bottom-14'>
            1
          </p>
        )}
      </div>
    </section>
  )
}

export default DriverRealTime
