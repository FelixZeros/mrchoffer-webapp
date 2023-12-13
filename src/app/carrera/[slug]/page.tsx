'use client'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect, useContext } from 'react'
import { useRequestTravel } from '@/hooks/useRequestTravel'
import { GoogleMap, DirectionsRenderer, MarkerF } from '@react-google-maps/api'
import RenderComponent from '@/app/carrera/components/RenderComponent'
import ReturnComponent from '@/app/carrera/components/ReturnComponent'
import TripContext from '@/context/TripContext'

const requestTravel = () => {
  // const [socket, setSocket] = useState<any>(null)
  // const [counter, setCounter] = useState<number>(0)
  const { center, isLoaded, renderStep, handleRender } = useRequestTravel()
  const { originCoords, destinationCoords, setCompanyId, setDistance } =
    useContext(TripContext)
  const pathName = usePathname()
  const [companyData, setCompanyData] = useState<any>(null)
  const [renderDirection, setRenderDirection] = useState<any>(null)

  useEffect(() => {
    if (originCoords !== null && destinationCoords !== null) {
      getDestinationResult(originCoords, destinationCoords)
    }
  }, [originCoords, destinationCoords])

  useEffect(() => {
    async function getCompanyData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API as string}get-companys/${
          pathName?.split('/')[2]
        }`
      )
      const data = await res.json()
      setCompanyId(data?.id)
      setCompanyData(data)
    }
    getCompanyData()
  }, [])
  console.log(companyData)

  if (companyData === null || companyData.error) {
    return (
      <section className='w-screen h-screen flex flex-col items-center justify-center px-4'>
        <h1 className='text-3xl font-bold'>
          En unos momentos podrá realizar su solicitud, muchas gracias por su
          espera
        </h1>
      </section>
    )
  }

  const getDestinationResult = async (or: any, des: any) => {
    const directionsService = new google.maps.DirectionsService()

    await directionsService
      .route({
        origin: new google.maps.LatLng(or.latitude, or.longitude),
        destination: new google.maps.LatLng(des.latitude, des.longitude),
        travelMode: google.maps.TravelMode.DRIVING
      })
      .then(result => {
        setRenderDirection(result)
        setDistance(result?.routes[0]?.legs[0]?.distance?.value / 1000 + ' Kms')
      })
  }

  // useEffect(() => {s
  //   const socket = io(process.env.NEXT_PUBLIC_SOCKET_KEY as string)
  //   setSocket(socket)
  // }, [])

  // const handleSuggestionChangePrice = (trip: any) => {
  //   if (counter === 0) {
  //     socket.emit('client:request-trip', {
  //       ...trip,
  //       attempt: 1
  //     })
  //   }
  //   if (counter === 1) {
  //     socket.emit('client:request-trip', {
  //       ...trip,
  //       attempt: 2
  //     })
  //   }
  //   setCounter(counter + 1)

  //   if (counter === 1) {
  //     setTimeout(() => {
  //       setStateEnd(true) // Cambia el estado de la variable a true después de 30 segundos
  //     }, 30000)
  //   }

  //   setTimeout(() => {
  //     setStatePrice(true) // Cambia el estado de la variable a true después de 30 segundos
  //   }, 30000)
  // }

  return (
    <>
      {isLoaded && (
        <>
          {renderStep !== 'TripInfoRequest' &&
            renderStep !== 'MapInfoRequest' &&
            renderStep !== 'PaymentInfoRequest' &&
            renderStep !== 'CommentInfoRequest' && (
              <GoogleMap
                center={center}
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
                <MarkerF position={center} visible={false} />
                {renderDirection !== null && (
                  <DirectionsRenderer directions={renderDirection} />
                )}
              </GoogleMap>
            )}
          <section className='relative'>
            {renderStep !== 'StartRequest' &&
              renderStep !== 'TripInfoRequest' && (
                <ReturnComponent handleRender={handleRender} />
              )}
            <RenderComponent render={renderStep} handleRender={handleRender} />
          </section>
        </>
      )}
    </>
  )
}

export default requestTravel
