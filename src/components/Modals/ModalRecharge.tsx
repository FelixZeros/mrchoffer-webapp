import { ListPaymentMethods } from '@/utils/ListPaymentMethods'
import { Modal } from 'antd'
import React, { useState } from 'react'
import Image from 'next/image'

export const ModalRecharge = ({
  visible,
  setVisible,
  selectedCompany,
  selectedType,
  setError,
  setNice
}: any) => {
  const [step, setStep] = useState<any>(selectedType === 'Efectivo' ? 2 : 1)
  const [paymentMethod, setPaymentMethod] = useState<any>(
    selectedType === 'Efectivo' ? 'Efectivo' : null
  )
  const [plan, setPlan] = useState<any>(null)
  const [typeVehicle, setTypeVehicle] = useState<any>(null)
  const [amountVehicle, setAmountVehicle] = useState<any>(null)
  const [time, setTime] = useState<any>(null)
  const [amount, setAmount] = useState<any>(null)

  const handleRecharge = async () => {
    if (plan === 'Prepago') {
      const response = await fetch(
        ((process.env.NEXT_PUBLIC_API as string) +
          'asign-balance-company/' +
          selectedCompany?.id) as string,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: plan,
            amount: amount as number,
            paymentMethod:
              selectedType === 'Efectivo' ? 'Efectivo' : paymentMethod
          })
        }
      )
      const data = await response.json()
      if (data?.error) {
        setError(true)
        setNice(false)
        setVisible(false)
      }
      if (!data?.error) {
        setError(false)
        setNice(true)
        setVisible(false)
      }
    }
    if (plan === 'Postpago') {
      const response = await fetch(
        ((process.env.NEXT_PUBLIC_API as string) +
          'asign-balance-company/' +
          selectedCompany?.id) as string,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: plan,
            amount: amount as number,
            typeVehicle,
            amountVehicle,
            paymentMethod:
              selectedType === 'Efectivo' ? 'Efectivo' : paymentMethod,
            daysRecharge: time === 1 ? 15 : time === 2 ? 30 : 180
          })
        }
      )
      const data = await response.json()
      if (data?.error) {
        setError(true)
        setNice(false)
        setVisible(false)
      }
      if (!data?.error) {
        setError(false)
        setNice(true)
        setVisible(false)
      }
    }
  }

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        setStep(selectedType === 'Efectivo' ? 2 : 1)
        setPaymentMethod(null)
        setPlan(null)
        setTypeVehicle(null)
        setAmountVehicle(null)
        setTime(null)
        setVisible(false)
      }}
      footer={null}
      width={400}
    >
      {step === 1 && <ContentMethodType setPaymentMethod={setPaymentMethod} />}
      {step === 2 && <ContentPlan plan={plan} setPlan={setPlan} />}
      {step === 3 &&
        (plan === 'Postpago' ? (
          <ContentPlanOptions
            amount={amount}
            time={time}
            amountVehicle={amountVehicle}
            typeVehicle={typeVehicle}
            setTypeVehicle={setTypeVehicle}
            setAmountVehicle={setAmountVehicle}
            setTime={setTime}
            setAmount={setAmount}
          />
        ) : (
          plan === 'Prepago' && (
            <ContentPlanPrepago amount={amount} setAmount={setAmount} />
          )
        ))}
      {step === 4 && (
        <ContentPlanResume
          amount={amount}
          time={time}
          amountVehicle={amountVehicle}
          plan={plan}
        />
      )}

      <div className='flex flex-row justify-center gap-24 items-center mt-10'>
        <button
          className='bg-[#D9D9D9] uppercase font-bold px-5 py-2 rounded-lg shadow-md'
          onClick={(e: any) => {
            if (
              (selectedType !== 'Efectivo' && step !== 1) ||
              (selectedType === 'Efectivo' && step !== 2)
            ) {
              setStep(step - 1)
            } else {
              setStep(selectedType === 'Efectivo' ? 2 : 1)
              setPaymentMethod(null)
              setPlan(null)
              setTypeVehicle(null)
              setAmountVehicle(null)
              setTime(null)
              setVisible(false)
            }
          }}
        >
          {(selectedType === 'Efectivo' && step === 2) ||
          (selectedType !== 'Efectivo' && step === 1)
            ? 'Cancelar'
            : 'Atras'}
        </button>
        <button
          className='bg-[#FFB800] uppercase font-bold px-5 py-2 rounded-lg shadow-md'
          onClick={(e: any) => {
            if (step !== 4) {
              setStep(step + 1)
            } else {
              handleRecharge()
            }
          }}
        >
          <p>Siguiente</p>
        </button>
      </div>
    </Modal>
  )
}

const ContentMethodType = ({ setPaymentMethod }: any) => {
  return (
    <>
      <h1 className='font-bold text-center pb-4 text-2xl uppercase'>
        Elija el método de pago
      </h1>
      {ListPaymentMethods.map((item, index) => {
        if (item.name === 'Efectivo') return
        else {
          return (
            <div
              key={index}
              className='flex items-center p-4 w-full border-b  h-11 uppercase font-medium cursor-pointer'
              onClick={() => {
                setPaymentMethod(item.name)
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
          )
        }
      })}
    </>
  )
}
export const ContentMethodTypes = ({
  visible,
  setVisible,
  setPaymentMethod
}: any) => {
  return (
    <Modal
      visible={visible}
      onCancel={() => {
        setVisible(false)
      }}
      footer={null}
      width={400}
    >
      <h1 className='font-bold text-center pb-4 text-2xl uppercase'>
        Elija el método de pago
      </h1>
      {ListPaymentMethods.map((item, index) => {
        if (item.name === 'Efectivo') return
        else {
          return (
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
          )
        }
      })}
    </Modal>
  )
}

export const ContentPlanResumes = ({
  visible,
  setVisible,
  driverName,
  vehicle,
  amount,
  paymentMethod,
  handleSendRecharge
}: any) => {
  return (
    <Modal
      visible={visible}
      onCancel={() => {
        setVisible(false)
      }}
      footer={null}
      width={400}
    >
      <div>
        <h1 className='font-bold text-center pb-4 text-2xl uppercase'>
          Información de recarga
        </h1>
        <div>
          <h2 className='font-bold text-lg'>Conductor</h2>
          <p className='text-lg'>{driverName}</p>
          <h2 className='font-bold text-lg mt-2'>Vehículo</h2>
          <p className='text-lg'>{vehicle}</p>
          <h2 className='font-bold text-lg mt-2'>Valor:</h2>
          <p className='text-lg'>${amount}</p>
          <h2 className='font-bold text-lg mt-2'>Método de pago:</h2>
          {paymentMethod !== '' && (
            <Image
              src={
                paymentMethod === 'Nequi'
                  ? '/images/nequi.png'
                  : paymentMethod === 'Daviplata'
                  ? '/images/davivienda.png'
                  : paymentMethod === 'Bancolombia'
                  ? '/images/bancolombia.png'
                  : '/images/efectivo.png'
              }
              alt={paymentMethod}
              width={45}
              height={46}
            />
          )}
        </div>
        <div className='flex flex-row justify-center items-center gap-14 mt-10'>
          <button
            className='bg-[#D9D9D9] font-bold px-5 py-2 rounded-lg shadow-md'
            onClick={() => {
              setVisible(false)
            }}
          >
            Cancelar
          </button>
          <button
            className='bg-[#FFB800] font-bold px-5 py-2 rounded-lg shadow-md'
            onClick={handleSendRecharge}
          >
            <p>Continuar</p>
          </button>
        </div>
      </div>
    </Modal>
  )
}

const ContentPlan = ({ plan, setPlan }: any) => {
  return (
    <div className='flex flex-col w-full px-8 py-4 gap-4'>
      <h1 className='font-bold text-center pb-4 text-2xl uppercase'>
        Elige tu plan
      </h1>
      <div className='flex flex-row rounded-lg shadow-lg px-10 py-4 justify-between border items-center'>
        <p className='uppercase font-bold text-xl'>Prepago</p>
        <label
          className='relative flex cursor-pointer items-center rounded-full p-3'
          data-ripple-dark='true'
          onClick={() => setPlan('Prepago')}
        >
          <input
            id='html'
            name='type'
            type='radio'
            checked={plan === 'Prepago'}
            onChange={() => setPlan('Prepago')}
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-[#FFB800] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#FFB800] checked:before:bg-[#FFB800] hover:before:opacity-10"
          />
          <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#FFB800] opacity-0 transition-opacity peer-checked:opacity-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3.5 w-3.5'
              viewBox='0 0 16 16'
              fill='currentColor'
            >
              <circle data-name='ellipse' cx='8' cy='8' r='8'></circle>
            </svg>
          </div>
        </label>
      </div>
      <div className='flex flex-row rounded-lg shadow-lg px-10 py-4 justify-between border items-center'>
        <p className='uppercase font-bold text-xl'>Postpago</p>
        <label
          className='relative flex cursor-pointer items-center rounded-full p-3'
          data-ripple-dark='true'
          // onClick={() => setPlan('Postpago')}
        >
          <input
            id='html'
            name='type'
            type='radio'
            disabled
            // checked={plan === 'Postpago'}
            // onChange={() => setPlan('Postpago')}
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-[#FFB800] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#FFB800] checked:before:bg-[#FFB800] hover:before:opacity-10"
          />
          <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#FFB800] opacity-0 transition-opacity peer-checked:opacity-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3.5 w-3.5'
              viewBox='0 0 16 16'
              fill='currentColor'
            >
              <circle data-name='ellipse' cx='8' cy='8' r='8'></circle>
            </svg>
          </div>
        </label>
      </div>
    </div>
  )
}

const ContentPlanOptions = ({
  amountVehicle,
  amount,
  time,
  typeVehicle,
  setTypeVehicle,
  setAmountVehicle,
  setTime,
  setAmount
}: any) => {
  return (
    <div>
      <h1 className='font-bold text-center pb-4 text-2xl uppercase'>
        Arma tu plan
      </h1>
      <div className='flex flex-col gap-2'>
        <p className='font-bold text-lg'>Cantidad de vehículos activos</p>
        <div className='flex flex-row gap-4 items-center'>
          <input
            type='number'
            className='border shadow-md rounded-lg py-1 font-semibold indent-3 text-base w-1/3'
            placeholder='0'
            onChange={(e: any) => setAmountVehicle(e.target.value)}
            value={amountVehicle ? amountVehicle : ''}
          />
          <div
            className={
              typeVehicle === 'Carro'
                ? 'py-2 rounded-lg shadow-lg border px-2 cursor-pointer bg-[#FFB800] transition-all'
                : 'py-2 rounded-lg shadow-lg border px-2 cursor-pointer transition-all'
            }
            onClick={() => setTypeVehicle('Carro')}
          >
            <Image
              src='/images/mini-car.png'
              width={22}
              height={22}
              alt='car'
              className='object-contain'
            />
          </div>
          <div
            className={
              typeVehicle === 'Moto'
                ? 'py-2 rounded-lg shadow-lg border px-2 cursor-pointer bg-[#FFB800] transition-all'
                : 'py-2 rounded-lg shadow-lg border px-2 cursor-pointer transition-all'
            }
            onClick={() => setTypeVehicle('Moto')}
          >
            <Image
              src='/images/mini-bike.png'
              width={22}
              height={22}
              alt='car'
              className='object-contain'
            />
          </div>
        </div>
      </div>
      <div className='mt-2'>
        <p className='font-bold text-lg'>Elige el tiempo</p>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row-reverse items-center'>
            <p className='font-bold text-sm'>15 días</p>
            <label
              className='relative flex cursor-pointer items-center rounded-full p-3'
              data-ripple-dark='true'
              onClick={() => setTime(1)}
            >
              <input
                id='html'
                name='type'
                type='radio'
                checked={time === 1}
                onChange={() => setTime(1)}
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-[#FFB800] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#FFB800] checked:before:bg-[#FFB800] hover:before:opacity-10"
              />
              <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#FFB800] opacity-0 transition-opacity peer-checked:opacity-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-3.5 w-3.5'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                >
                  <circle data-name='ellipse' cx='8' cy='8' r='8'></circle>
                </svg>
              </div>
            </label>
          </div>
          <div className='flex flex-row-reverse items-center'>
            <p className='font-bold text-sm'>1 Mes</p>
            <label
              className='relative flex cursor-pointer items-center rounded-full p-3'
              data-ripple-dark='true'
              onClick={() => setTime(2)}
            >
              <input
                id='html'
                name='type'
                type='radio'
                checked={time === 2}
                onChange={() => setTime(2)}
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-[#FFB800] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#FFB800] checked:before:bg-[#FFB800] hover:before:opacity-10"
              />
              <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#FFB800] opacity-0 transition-opacity peer-checked:opacity-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-3.5 w-3.5'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                >
                  <circle data-name='ellipse' cx='8' cy='8' r='8'></circle>
                </svg>
              </div>
            </label>
          </div>
          <div className='flex flex-row-reverse items-center'>
            <p className='font-bold text-sm'>6 Meses</p>
            <label
              className='relative flex cursor-pointer items-center rounded-full p-3'
              data-ripple-dark='true'
              onClick={() => setTime(3)}
            >
              <input
                id='html'
                name='type'
                type='radio'
                checked={time === 3}
                onChange={() => setTime(3)}
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-[#FFB800] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#FFB800] checked:before:bg-[#FFB800] hover:before:opacity-10"
              />
              <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#FFB800] opacity-0 transition-opacity peer-checked:opacity-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-3.5 w-3.5'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                >
                  <circle data-name='ellipse' cx='8' cy='8' r='8'></circle>
                </svg>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className='mt-8 flex flex-col gap-2'>
        <p className='font-bold text-lg'>Valor Total</p>
        <input
          type='number'
          className='border shadow-md rounded-lg py-1 font-semibold indent-3 text-base w-1/2'
          placeholder='0'
          onChange={(e: any) => setAmount(e.target.value)}
          value={amount ? amount : ''}
        />
      </div>
    </div>
  )
}

const ContentPlanResume = ({ amountVehicle, amount, time, plan }: any) => {
  return (
    <>
      {plan === 'Postpago' && (
        <div>
          <h1 className='font-bold text-center pb-4 text-2xl uppercase'>
            Información del plan
          </h1>
          <div>
            <h2 className='font-bold text-lg'>Vehículos activos</h2>
            <p className='text-lg'>{amountVehicle}</p>
            <h2 className='font-bold text-lg mt-2'>Tiempo</h2>
            <p className='text-lg'>
              {time === 1 ? '15 días' : time === 2 ? '1 Mes' : '6 Meses'}
            </p>
            <h2 className='font-bold text-lg mt-2'>Valor:</h2>
            <p className='text-lg font-bold'>${amount}</p>
          </div>
        </div>
      )}
      {plan === 'Prepago' && (
        <div>
          <h1 className='font-bold text-center pb-4 text-2xl uppercase'>
            Información del plan
          </h1>
          <div>
            <h2 className='font-bold text-lg'>Valor a recargar:</h2>
            <p className='text-lg'>${amount}</p>
            <h2 className='font-bold text-lg mt-2'>Fecha:</h2>
            <p className='text-lg'>{new Date().toLocaleDateString()}</p>
            <h2 className='font-bold text-lg mt-2'>Hora:</h2>
            <p className='text-lg font-bold'>
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

const ContentPlanPrepago = ({ amount, setAmount }: any) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex=row gap-4 items-center'>
        <Image
          src='/images/money.png'
          width={38}
          height={38}
          alt='prepago'
          className='object-contain'
        />
        <h1 className='uppercase font-bold text-xl'>Recargar saldo</h1>
      </div>
      <input
        type='number'
        className='border shadow-md rounded-lg py-1 font-semibold indent-3 text-base'
        placeholder='0'
        onChange={(e: any) => setAmount(e.target.value)}
        value={amount ? amount : ''}
      />
    </div>
  )
}
