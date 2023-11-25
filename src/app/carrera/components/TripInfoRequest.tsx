'use client'
import React, { useContext, useRef, useState } from 'react'
import { Input } from 'antd'
import TripContext from '@/context/TripContext'
import toast from 'react-hot-toast'
import { Autocomplete } from '@react-google-maps/api'
import Image from 'next/image'

type RenderProps = {
  handleRender: any
}
export const TripInfoRequest = ({ handleRender }: RenderProps) => {
  const {
    origin,
    destination,
    setOriginCoords,
    setDestinationCoords,
    setOrigin,
    setDestination,
    selected,
    setSelected
  } = useContext(TripContext)

  const [search, setSearch] = useState<any>(null)
  const [searchTwo, setSearchTwo] = useState<any>(null)
  const autocompleteRef = useRef(null)

  const handleOk = () => {
    if (origin === '' || destination === '') {
      toast.error('Parece que has olvidado un campo.', {
        duration: 2000,
        style: {
          borderRadius: '50px',
          marginTop: '50px'
        }
      })
    } else {
      handleRender('RequestDriver')
    }
  }

  const onLoad = (autocomplete: any) => {
    setSearch(autocomplete)
  }

  const onLoadTwo = (autocomplete: any) => {
    setSearchTwo(autocomplete)
  }

  const onPlaceChanged = () => {
    if (selected === 1) {
      if (search !== null) {
        const place = search.getPlace()
        const { lat, lng } = place.geometry.location
        setOrigin(place.name)
        setOriginCoords({
          latitude: lat(),
          longitude: lng()
        })
      }
    }
    if (selected === 2) {
      if (searchTwo !== null) {
        const place = searchTwo.getPlace()
        const { lat, lng } = place.geometry.location
        setDestination(place.name)
        setDestinationCoords({
          latitude: lat(),
          longitude: lng()
        })
      }
    }
  }

  const handleSendMapView = (selected: any) => {
    if (selected === 1) {
      setSelected(1)
      handleRender('MapInfoRequest')
    } else {
      setSelected(2)
      handleRender('MapInfoRequest')
    }
  }

  return (
    <section className='mt-20 px-8 py-4'>
      <div className='flex flex-col'>
        <Autocomplete
          onPlaceChanged={onPlaceChanged}
          onLoad={onLoad}
          ref={autocompleteRef}
        >
          <Input
            placeholder='Origen'
            className='placeholder:font-medium uppercase placeholder:text-black p-2 shadow-sm'
            value={origin === '' ? '' : origin}
            onChange={e => setOrigin(e.target.value)}
            onClick={() => setSelected(1)}
          />
        </Autocomplete>
        <div
          className='py-4 flex items-center gap-3 cursor-pointer w-auto'
          onClick={() => {
            handleSendMapView(1)
          }}
        >
          <Image
            src='/images/ubi-yellow.png'
            width={12}
            height={16}
            alt='ubicacion'
          />
          <p className='text-base font-medium text-[#FFB800] '>
            Seleccionar en el mapa
          </p>
        </div>
        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoadTwo}>
          <Input
            placeholder='Destino'
            className='placeholder:font-medium uppercase placeholder:text-black p-2 shadow-sm'
            value={destination === '' ? '' : destination}
            onChange={e => setDestination(e.target.value)}
            onClick={() => setSelected(2)}
          />
        </Autocomplete>
      </div>

      <div
        className='py-4 flex items-center gap-3 cursor-pointer w-auto'
        onClick={() => {
          handleSendMapView(2)
        }}
      >
        <Image
          src='/images/ubi-yellow.png'
          width={12}
          height={16}
          alt='ubicacion'
        />
        <p className='text-base font-medium text-[#FFB800] '>
          Seleccionar en el mapa
        </p>
      </div>
      <div className='flex flex-row w-full justify-between' onClick={handleOk}>
        <button className='uppercase bg-[#FFB800] p-2 rounded-lg font-bold w-full text-xl shadow-sm'>
          Confirmar
        </button>
      </div>
    </section>
  )
}
