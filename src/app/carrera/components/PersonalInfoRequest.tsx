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
  const {
    name,
    setName,
    phone,
    setPhone,
    setAmountFemale,
    setAmountMale,
    amountFemale,
    amountMale
  } = useContext(TripContext)

  const handleOk = () => {
    if (name === '' || phone === '') {
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
        <div className='bg-[#D9D9D9] flex flex-row-reverse rounded-lg w-[145px] h-16'>
          <div className='flex items-center'>
            <Image
              src='/images/fem.png'
              width={40}
              height={40}
              alt='masculino'
            />
          </div>
          <Input
            placeholder='Masculino'
            className='placeholder:font-medium uppercase placeholder:text-black p-2 shadow-sm text-base font-semibold text-center'
            value={amountMale === '' ? '' : amountMale}
            onChange={e => setAmountMale(e.target.value)}
            type='number'
          />
        </div>
        <div className='bg-[#D9D9D9] flex flex-row rounded-lg w-[121px] h-16'>
          <div className='flex items-center'>
            <Image
              src='/images/masc.png'
              width={40}
              height={40}
              alt='femenino'
            />
          </div>
          <Input
            placeholder='Mujeres'
            className='placeholder:font-medium uppercase placeholder:text-black p-2 shadow-sm text-base font-semibold text-center'
            value={amountFemale === '' ? '' : amountFemale}
            onChange={e => setAmountFemale(e.target.value)}
            type='number'
          />
        </div>
      </div>
      <div
        className='flex flex-row w-full justify-between pt-4'
        onClick={handleOk}
      >
        <button className='uppercase bg-[#FFB800] p-2 rounded-lg font-bold w-full text-xl shadow-sm'>
          Confirmar
        </button>
      </div>
    </section>
  )
}
