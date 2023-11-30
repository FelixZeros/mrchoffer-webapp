'use client'
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { EyeIconClassname } from '@/components/icons/eye'
import { useRouter } from 'next/navigation'
import {
  ContentPlanResumes,
  ContentMethodTypes
} from '@/components/Modals/ModalRecharge'
import { ModalNice, ModalError } from '@/components/Modals/Modals'
import { AuthContext } from '@/auth/Auth-context'

const RechargePage = () => {
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const [data, setData] = useState<any>([])
  const [selectedCompany, setSelectedCompany] = useState<any>(null)
  const [price, setPrice] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState<any>(null)
  const [visiblePaymentMethod, setVisiblePaymentMethod] = useState<any>(false)
  const [visibleResumes, setVisibleResumes] = useState<any>(false)
  const [selectedType, setSelectedType] = useState<any>('Efectivo')
  const [minFee, setMinFee] = useState<any>(null)
  const [maxFee, setMaxFee] = useState<any>(null)
  const [nice, setNice] = useState<any>(false)
  const [error, setError] = useState<any>(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        (process.env.NEXT_PUBLIC_API as string) +
          'driverCompany/' +
          user?.company?.id
      )
      const data = await response.json()
      setData(data)
    }
    fetchData()
  }, [])

  const handleRecharge = () => {
    if (selectedCompany === null) return
    if (price === null || price === 0) return
    if (selectedCompany && selectedType) {
      setVisibleResumes(true)
    }
  }

  const handleSave = async () => {
    if (minFee === null || maxFee === null) return
    if (minFee >= maxFee) return
    try {
      const response = await fetch(
        (process.env.NEXT_PUBLIC_API as string) +
          'asing-fee-company/' +
          user?.company?.id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            minFee,
            maxFee
          })
        }
      )
      const data = await response.json()
      if (data?.error) {
        setError(true)
        return
      }

      window.location.reload()
    } catch (e) {
      setError(true)
    }
  }

  const handleSendRecharge = async () => {
    try {
      const response = await fetch(
        (process.env.NEXT_PUBLIC_API as string) + 'driverCompany/asignAmount/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            companyId: user?.company?.id,
            driverId: selectedCompany?.id,
            amount: price,
            paymentMethod,
            dateStart: new Date().toISOString().slice(0, 10)
          })
        }
      )
      const data = await response.json()
      if (data?.error) {
        setError(true)
        setVisibleResumes(false)
        setPaymentMethod(null)
        setSelectedType(null)
        setSelectedCompany(null)
      }
      if (!data?.error) {
        setNice(true)
        setVisibleResumes(false)
        setPaymentMethod(null)
        setSelectedType(null)
        setSelectedCompany(null)
      }
    } catch (e) {
      setError(true)
    }
  }

  return (
    <section className='flex flex-row justify-center gap-20 min-h-screen mt-20'>
      <ContentMethodTypes
        visible={visiblePaymentMethod}
        setVisible={setVisiblePaymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <ContentPlanResumes
        visible={visibleResumes}
        setVisible={setVisibleResumes}
        driverName={selectedCompany?.name}
        amount={price}
        paymentMethod={paymentMethod}
        vehicle={
          selectedCompany?.vehicle?.brand +
          ' ' +
          selectedCompany?.vehicle?.plate
        }
        handleSendRecharge={handleSendRecharge}
      />
      <ModalNice nice={nice} setNice={setNice} />
      <ModalError error={error} setError={setError} />

      <div className='flex flex-col gap-4 items-center'>
        <div className='rounded-xl shadow-md py-4 px-14 flex flex-col gap-4'>
          <div className='flex flex-row gap-3 items-center'>
            <Image src='/images/money.png' width={36} height={36} alt='money' />
            <h2 className='font-semibold text-xl'>Recargas</h2>
          </div>
          <input
            type='number'
            className='
            border-gray-300 rounded-xl px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition-all shadow-md
          '
            placeholder='Ingrese un valor'
            onChange={e => {
              setPrice(e.target.value)
            }}
          />
          <div className='flex flex-row justify-center items-center gap-14'>
            <div className='flex flex-col items-center justify-center gap-3 cursor-pointer'>
              <div
                className={
                  selectedType === 'Efectivo'
                    ? 'bg-[#FFB800] px-2 py-4 rounded-md shadow-lg hover:ring-2 hover:ring-[#181818] ring-2 ring-[#181818] transition-all'
                    : 'bg-[#FFB800] px-2 py-4 rounded-md shadow-lg hover:ring-2 hover:ring-[#181818] transition-all'
                }
                onClick={() => {
                  setSelectedType('Efectivo')
                  setPaymentMethod('Efectivo')
                }}
              >
                <Image
                  src='/images/cash-flow.png'
                  width={38}
                  height={24}
                  alt='money'
                  className='object-cover ml-0.5'
                />
              </div>
              <p className='font-bold text-lg'>Efectivo</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-2 cursor-pointer'>
              <div
                className={
                  selectedType === 'Transferencia'
                    ? 'bg-white px-2 py-4 rounded-md shadow-lg hover:ring-2 hover:ring-[#FFB800] ring-2 ring-[#FFB800] transition-all'
                    : 'bg-white px-2 py-4 rounded-md shadow-lg hover:ring-2 hover:ring-[#FFB800] transition-all'
                }
                onClick={() => {
                  setSelectedType('Transferencia')
                  setVisiblePaymentMethod(true)
                }}
              >
                <Image
                  src='/images/transfer.png'
                  width={38}
                  height={24}
                  alt='money'
                  className='object-cover ml-0.5'
                />
              </div>
              <p className='font-bold text-lg'>Transferencia</p>
            </div>
          </div>
          <button
            className='self-center bg-[#FFB800] px-4 py-3 rounded-xl shadow-lg w-[70%] font-bold disabled:cursor-not-allowed disabled:bg-[#D9D9D9]'
            onClick={handleRecharge}
          >
            Recargar
          </button>
        </div>
        <div className='rounded-xl shadow-md py-4 px-14 flex flex-col gap-4'>
          <div className='flex flex-row gap-3 items-center'>
            <Image
              src='/images/tarifa.png'
              width={17}
              height={19}
              alt='money'
            />
            <h2 className='font-semibold text-xl'>Tarifa</h2>
          </div>
          <div>
            <label htmlFor='Min'>
              <p className='text-lg m-0 p-0'>Min</p>
            </label>
            <input
              type='number'
              className='
            border-gray-300 rounded-xl px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition-all shadow-md
          '
              placeholder='Ingrese un valor'
              onChange={e => {
                setMinFee(e.target.value)
              }}
            />
          </div>
          <div>
            <label htmlFor='Max'>
              <p className='text-lg m-0 p-0'>Max</p>
            </label>
            <input
              type='number'
              className='
            border-gray-300 rounded-xl px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition-all shadow-md
          '
              placeholder='Ingrese un valor'
              onChange={e => {
                setMaxFee(e.target.value)
              }}
            />
          </div>
          <button
            className='self-center bg-[#FFB800] px-4 py-3 rounded-xl shadow-lg w-[70%] font-bold disabled:cursor-not-allowed disabled:bg-[#D9D9D9]'
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </div>

      <div className='flex flex-col w-[60%] gap-5'>
        {data?.length > 0 &&
          data?.map((company: any, index: number) => (
            <>
              <div
                className={
                  selectedCompany?.id === company?.id
                    ? 'shadow-lg py-4 px-[51px] flex flex-row rounded-2xl uppercase items-center justify-between  transition-all hover:ring-2 hover:ring-[#FFB800] ring-2 ring-[#FFB800]'
                    : 'shadow-lg py-4 px-[51px] flex flex-row rounded-2xl uppercase items-center justify-between transition-all hover:ring-2 hover:ring-[#FFB800]'
                }
                onClick={() => {
                  setSelectedCompany(company)
                }}
              >
                <img
                  src={company?.photo ?? '/images/profilews.png'}
                  alt='company'
                  className='w-[60px] h-[60px] object-cover rounded-full border'
                />
                <div className='flex flex-col items-center'>
                  <h2 className='font-bold text-3xl'>{company?.name}</h2>
                  <p className='text-sm font-medium'>{company?.city}</p>
                </div>
                <EyeIconClassname
                  classname='w-12 h-12 cursor-pointer'
                  onClick={() => router.push(`/company/conductores`)}
                />
              </div>
            </>
          ))}
      </div>
    </section>
  )
}

export default RechargePage
