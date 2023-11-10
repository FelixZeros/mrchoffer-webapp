import React, { useContext, useState } from 'react'
import TripContext from '@/context/TripContext'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Input, Modal } from 'antd'
import { ListPaymentMethods } from '@/utils/ListPaymentMethods'

type RenderProps = {
  handleRender: any
}
export const PaymentInfoRequest = ({ handleRender }: RenderProps) => {
  const { price, setPrice, paymentMethod, setPaymentMethod } =
    useContext(TripContext)
  const [visible, setVisible] = useState(false)

  const handleOk = () => {
    if (price === 0 || price === '' || paymentMethod === '') {
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

  const onOk = () => {
    setVisible(false)
  }

  return (
    <>
      <Modal
        visible={visible}
        onOk={onOk}
        onCancel={() => {
          setVisible(false)
        }}
        footer={null}
        width={350}
        centered
      >
        <h1 className='font-bold text-center pb-4 text-2xl'>
          Elija el método de pago
        </h1>
        {ListPaymentMethods.map((item, index) => (
          <div
            key={index}
            className='flex items-center p-4 w-full border-b  h-11 uppercase font-medium cursor-pointer'
            onClick={() => {
              setPaymentMethod(item.name)
              setVisible(false)
            }}
          >
            <p>{item.name}</p>
            {item?.img !== '' && (
              <Image
                src={item.img}
                alt={item.name}
                width={40}
                height={40}
                className='ml-auto'
              />
            )}
          </div>
        ))}
      </Modal>

      <section className='mt-20 px-8 py-4'>
        <div className='flex flex-col gap-4'>
          <h1 className='uppercase font-bold text-center pb-4 text-2xl'>
            Ofrezca su tarifa
          </h1>
          <Input
            placeholder=''
            className='placeholder:font-medium uppercase placeholder:text-black p-2 shadow-sm text-2xl font-medium'
            value={price === 0 ? '' : price}
            onChange={e => setPrice(e.target.value)}
            type='number'
            prefix={
              <span className='text-black font-medium text-2xl'>COP</span>
            }
          />
          <div
            className='w-full bg-[#292929] flex justify-between items-center p-3 rounded-xl shadow-sm cursor-pointer'
            onClick={() => {
              setVisible(true)
            }}
          >
            <p className='uppercase text-white font-semibold'>
              {paymentMethod === '' ? 'Método de pago' : paymentMethod}
            </p>
            <Image
              src='/images/arrow-right-white.png'
              alt='arrow-right'
              width={12}
              height={16}
            />
          </div>
          <div
            className='flex flex-row w-full justify-between py-8'
            onClick={handleOk}
          >
            <button className='uppercase bg-[#FFB800] p-2 rounded-lg font-bold w-full text-xl shadow-sm'>
              Confirmar
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
