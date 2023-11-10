'use client'
import React, { useState, useEffect, useContext } from 'react'
import { useRequestTravel } from '@/hooks/useRequestTravel'
import { GoogleMap } from '@react-google-maps/api'
import RenderComponent from '@/app/carrera/components/RenderComponent'
import ReturnComponent from '@/app/carrera/components/ReturnComponent'
import TripContext from '@/context/TripContext'

const requestTravel = () => {
  // const [socket, setSocket] = useState<any>(null)
  // const [counter, setCounter] = useState<number>(0)
  const { center, isLoaded, renderStep, handleRender } = useRequestTravel()
  const { origin, destination } = useContext(TripContext)

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
              ></GoogleMap>
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
