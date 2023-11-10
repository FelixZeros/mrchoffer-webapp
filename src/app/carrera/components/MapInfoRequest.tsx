import React, { useContext, useState } from 'react'
import {
  Autocomplete,
  GoogleMap,
  useJsApiLoader,
  MarkerF
} from '@react-google-maps/api'
import { Input } from 'antd'
import Image from 'next/image'
import toast from 'react-hot-toast'
import TripContext from '@/context/TripContext'

type RenderProps = {
  handleRender: any
}
export const MapInfoRequest = ({ handleRender }: RenderProps) => {
  const {
    selected,
    origin,
    setOrigin,
    destination,
    setDestination,
    setOriginCoords,
    setDestinationCoords
  } = useContext(TripContext)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: ['places']
  })
  const [center, setCenter] = useState({ lat: 10.464506, lng: -73.2582494 })
  const [search, setSearch] = useState<any>(null)
  const [stateSearch, setStateSearch] = useState<any>(false)
  const [address, setAddress] = useState<any>(
    selected === 1 ? origin : selected === 2 ? destination : ''
  )

  const onLoad = (autocomplete: any) => {
    setSearch(autocomplete)
  }

  const onPlaceChanged = () => {
    if (search !== null) {
      const place = search.getPlace()
      const { lat, lng } = place.geometry.location
      setStateSearch(true)
      setAddress(place.name)
      setCenter({ lat: lat(), lng: lng() })
    }
  }

  const handleDirect = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords
        setCenter({ lat: latitude, lng: longitude })
        setStateSearch(true)
        setAddress('UBICACIÓN ACTUAL')
      })
    }
  }

  const handleOk = () => {
    if (address === '') {
      toast.error('Te has olvidado de colocar una dirección.', {
        duration: 2000,
        style: {
          borderRadius: '50px',
          marginTop: '50px'
        }
      })
    } else {
      if (selected === 1) {
        setOrigin(address)
        setOriginCoords({
          latitude: center.lat,
          longitude: center.lng
        })
      }
      if (selected === 2) {
        setDestination(address)
        setDestinationCoords({
          latitude: center.lat,
          longitude: center.lng
        })
      }
      handleRender('TripInfoRequest')
    }
  }

  return (
    <section className='relative'>
      {isLoaded && (
        <>
          <Image
            src='/images/back.png'
            alt='back-arrow'
            width={32}
            height={32}
            className='absolute top-16 left-4 cursor-pointer z-10'
            onClick={() => handleRender('TripInfoRequest')}
          />
          <Image
            src='/images/direct.png'
            alt='direct'
            width={38}
            height={38}
            className='absolute bottom-[105px] right-8 cursor-pointer z-10'
            onClick={handleDirect}
          />
          <div
            className='flex flex-row w-full justify-between absolute bottom-2 z-10 px-8'
            onClick={handleOk}
          >
            <button className='uppercase bg-[#FFB800] p-2 rounded-lg font-bold w-full text-xl shadow-sm'>
              Confirmar
            </button>
          </div>
          <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
            <Input
              placeholder={selected === 1 ? 'Origen' : 'Destino'}
              value={address}
              defaultValue={
                selected === 1 ? origin : selected === 2 ? destination : ''
              }
              onChange={e => {
                setAddress(e.target.value)
              }}
              className='placeholder:font-medium uppercase placeholder:text-black p-2 shadow-sm absolute top-[60px] z-10 w-[80%] left-16'
            />
          </Autocomplete>
          <p className='bg-gray-500 rounded-lg absolute bottom-14 z-10 text-sm text-white text-center font-bold  shadow-md border px-4'>
            Si no encuentras tu dirección recuerda que puedes buscar un lugar
            que quede cerca de tu ubicación.
          </p>
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{
              width: '100%',
              height: '100vh',
              transition: '0.3s ease all'
            }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false
            }}
          >
            {stateSearch === true && <MarkerF position={center} />}
          </GoogleMap>
        </>
      )}
    </section>
  )
}
