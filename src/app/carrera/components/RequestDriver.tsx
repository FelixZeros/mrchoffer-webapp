'use client'
import React, { useContext, useState, useEffect } from 'react'
import Image from 'next/image'
import TripContext from '@/context/TripContext'
import { usePathname } from 'next/navigation'

type RenderProps = {
  handleRender: any
}

export const RequestDriver = ({ handleRender }: RenderProps) => {
  const {
    name,
    phone,
    gender,
    comment,
    origin,
    destination,
    paymentMethod,
    price,
    sendRequest
  } = useContext(TripContext)
  const pathName = usePathname()
  const [state, setState] = useState<any>(null)

  return (
    <section className='px-8 py-4'>
      <h1 className='uppercase font-bold text-center pb-4 text-2xl'>
        Solicitar conductor
      </h1>
      <div className='pb-4'>
        <div
          onClick={() => handleRender('PersonalInfoRequest')}
          className='flex items-center p-4 w-full border rounded-xl h-11 uppercase font-medium shadow-sm cursor-pointer'
        >
          <p>{name === '' ? 'Identificación' : name + ', ' + phone}</p>
          {gender === 'Masculino' && (
            <Image
              src='/images/fem.png'
              alt='masculino'
              width={16}
              height={26}
              className='ml-auto'
            />
          )}
          {gender === 'Femenino' && (
            <Image
              src='/images/masc.png'
              alt='femenino'
              width={16}
              height={26}
              className='ml-auto'
            />
          )}
        </div>
      </div>
      <div className='pb-4'>
        <div
          onClick={() => handleRender('TripInfoRequest')}
          className='flex items-center p-4 w-full border rounded-xl h-11 uppercase font-medium shadow-sm cursor-pointer'
        >
          <p>{origin === '' ? 'Recorrido' : origin + ' - ' + destination}</p>
        </div>
      </div>
      <div className='pb-4'>
        <div
          onClick={() => handleRender('PaymentInfoRequest')}
          className='flex items-center justify-between p-2 w-full border rounded-xl h-11 uppercase font-medium shadow-sm cursor-pointer'
        >
          <p>{price !== '' && price !== 0 ? '$ ' + price : '$ COP'}</p>
          {paymentMethod !== '' && paymentMethod !== 'Efectivo' && (
            <Image
              src={
                paymentMethod === 'Nequi'
                  ? '/images/nequi.png'
                  : paymentMethod === 'Daviplata'
                  ? '/images/davivienda.png'
                  : '/images/bancolombia.png'
              }
              alt={paymentMethod}
              width={40}
              height={40}
              className='ml-auto'
            />
          )}
        </div>
      </div>
      <div className='flex flex-row w-full justify-between'>
        <button
          // disabled={state}
          className='disabled:cursor-not-allowed disabled:bg-[#ceb576] uppercase bg-[#FFB800] p-2 rounded-lg font-bold w-[73%] shadow-sm'
          onClick={() => {
            setState(true)
            sendRequest()
          }}
        >
          Solicitar servicio
        </button>

        <button
          className='bg-[#FFB800] p-2 rounded-lg shadow-sm relative'
          onClick={() => handleRender('CommentInfoRequest')}
        >
          <Image src='/images/comment.png' alt='img' width={40} height={37} />
        </button>
        {comment !== '' && (
          <p className='absolute bg-[#292929] rounded-full px-2 text-white font-bold text-sm right-7 bottom-14'>
            1
          </p>
        )}
      </div>
    </section>
  )
}
