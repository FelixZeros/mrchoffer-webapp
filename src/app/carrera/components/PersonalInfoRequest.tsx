'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import { Input } from 'antd'
import TripContext from '@/context/TripContext'
import toast from 'react-hot-toast'

type RenderProps = {
  handleRender: any
}
export const PersonalInfoRequest = ({ handleRender }: RenderProps) => {
  const { name, setName, phone, setPhone, gender, setGender } =
    useContext(TripContext)

  const handleOk = () => {
    if (name === '' || phone === '' || gender === '') {
      toast.error('Parece que has olvidado un campo.', {
        duration: 5000,
        style: {
          borderRadius: '50px',
          marginTop: '50px'
        }
      })
    } else {
      handleRender('RequestDriver')
    }
  }

  return (
    <section className='p-8'>
      <h1 className='uppercase font-bold text-center pb-4 text-2xl'>
        Identificación
      </h1>
      <div className='flex flex-col gap-4'>
        <Input
          placeholder='Nombre'
          className='placeholder:font-medium uppercase placeholder:text-black p-2 shadow-sm'
          value={name === '' ? '' : name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          placeholder='N° de Whatsapp'
          className='placeholder:font-medium uppercase placeholder:text-black p-2 shadow-sm'
          value={phone === '' ? '' : phone}
          onChange={e => setPhone(e.target.value)}
          type='number'
        />
      </div>
      <div className='flex items-center gap-8 justify-center py-4'>
        <button
          className='flex items-center justify-center min-w-[62px] min-h-[48px] bg-[#D9D9D9] p-2 rounded-lg shadow-sm'
          onClick={() => setGender('Masculino')}
        >
          <Image src='/images/fem.png' width={30} height={31} alt='masculino' />
        </button>
        <button
          onClick={() => setGender('Femenino')}
          className='flex items-center justify-center min-w-[62px] min-h-[48px] bg-[#FFB800] p-2 rounded-lg shadow-sm'
        >
          <Image src='/images/masc.png' width={22} height={34} alt='femenino' />
        </button>
      </div>
      <div className='flex flex-row w-full justify-between' onClick={handleOk}>
        <button className='uppercase bg-[#FFB800] p-2 rounded-lg font-bold w-full text-xl shadow-sm'>
          Confirmar
        </button>
      </div>
    </section>
  )
}
