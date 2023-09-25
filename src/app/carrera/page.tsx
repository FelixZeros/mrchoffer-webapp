'use client'
import React from 'react'
import { useRequestTravel } from '@/hooks/useRequestTravel'

const requestTravel = () => {
  const { geoLocation } = useRequestTravel()

  return (
    <main>
      <section className='flex flex-col'>
        <h1 className='text-2xl text-center font-bold'>Solicitud de Carrera</h1>
        <form className='flex flex-col pt-4 gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Lugar de recogida</label>
            <input
              className='w-full border rounded p-1 outline-none'
              type='text'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Lugar de destino</label>
            <input
              className='w-full border rounded p-1 outline-none'
              type='text'
            />
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <div className='flex flex-row-reverse items-center gap-2'>
              <label htmlFor='male'>Hombre</label>
              <input type='checkbox' />
            </div>
            <div className='flex flex-row-reverse items-center gap-2'>
              <label htmlFor='female'>Mujer</label>
              <input type='checkbox' />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Precio ofrecido</label>
            <input
              className='w-full border rounded p-1 outline-none'
              type='number'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nombre'>Comentarios</label>
            <textarea
              className='w-full border rounded p-1 outline-none resize-none'
              name=''
              id=''
              cols={30}
              rows={10}
            />
          </div>
          <button className='bg-amber-400 rounded font-bold p-1'>
            Solicitar carrera
          </button>
        </form>
      </section>
    </main>
  )
}

export default requestTravel
