'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { EyeIconClassname } from '@/components/icons/eye'
import { useRouter } from 'next/navigation'
import { ModalRecharge } from '@/components/Modals/ModalRecharge'
import { ModalNice, ModalError } from '@/components/Modals/Modals'

const RechargePage = () => {
  const router = useRouter()
  const [cash, setCash] = useState<any>(null)
  const [data, setData] = useState<any>([])
  const [initialData, setInitialData] = useState<any>([])
  const [companys, setCompanys] = useState<any>(null)
  const [selectedCompany, setSelectedCompany] = useState<any>(null)
  const [selectedType, setSelectedType] = useState<any>('Efectivo')
  const [visible, setVisible] = useState<any>(false)
  const [nice, setNice] = useState<any>(false)
  const [error, setError] = useState<any>(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        (process.env.NEXT_PUBLIC_API as string) + 'get-facturations'
      )
      const responseCompany = await fetch(
        (process.env.NEXT_PUBLIC_API as string) + 'get-companys'
      )
      const { amountTotalAdmin, getBalanceCompany } = await response.json()
      const dataCompany = await responseCompany.json()
      setCash(amountTotalAdmin)
      setCompanys(dataCompany)
      setInitialData(getBalanceCompany)
      setData(getBalanceCompany)
    }
    fetchData()
  }, [])

  const handleRecharge = () => {
    if (selectedCompany === null) return
    if (selectedCompany && selectedType) {
      setVisible(true)
    }
  }

  return (
    <section className='flex flex-row justify-center gap-20 min-h-screen mt-20'>
      <ModalRecharge
        visible={visible}
        setVisible={setVisible}
        selectedCompany={selectedCompany}
        selectedType={selectedType}
        setNice={setNice}
        setError={setError}
      />
      <ModalNice nice={nice} setNice={setNice} />
      <ModalError error={error} setError={setError} />

      <div className='flex flex-col gap-4 items-center'>
        <div className='rounded-xl shadow-md py-4 px-14 flex flex-col gap-4'>
          <div className='flex flex-row gap-3 items-center'>
            <Image src='/images/money.png' width={36} height={36} alt='money' />
            <h2 className='font-semibold text-xl'>Mis Ingresos</h2>
          </div>
          <p className='font-bold text-4xl'>COP {cash ?? 0}</p>
        </div>
        <div className='flex flex-row justify-center items-center gap-14'>
          <div className='flex flex-col items-center justify-center gap-3 cursor-pointer'>
            <div
              className={
                selectedType === 'Efectivo'
                  ? 'bg-[#FFB800] px-2 py-4 rounded-md shadow-lg hover:ring-2 hover:ring-[#181818] ring-2 ring-[#181818] transition-all'
                  : 'bg-[#D9D9D9] px-2 py-4 rounded-md shadow-lg hover:ring-2 hover:ring-[#FFB800] transition-all'
              }
              onClick={() => {
                setSelectedType('Efectivo')
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
                  ? 'bg-[#FFB800] px-2 py-4 rounded-md shadow-lg hover:ring-2 hover:ring-[#181818] ring-2 ring-[#181818] transition-all'
                  : 'bg-[#D9D9D9] px-2 py-4 rounded-md shadow-lg hover:ring-2 hover:ring-[#FFB800] transition-all'
              }
              onClick={() => {
                setSelectedType('Transferencia')
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
          disabled={cash === 0}
          className='bg-[#FFB800] px-4 py-3 rounded-xl shadow-lg w-[70%] font-bold disabled:cursor-not-allowed disabled:bg-[#D9D9D9]'
          onClick={handleRecharge}
        >
          Recargar
        </button>
      </div>
      <div className='flex flex-col w-[60%] gap-5'>
        {companys?.length > 0 &&
          companys?.map((company: any, index: number) => (
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
                  src={company?.photo}
                  alt='company'
                  className='w-[91px] h-[91px] object-cover rounded-full border'
                />
                <div className='flex flex-col items-center'>
                  <h2 className='font-bold text-3xl'>{company?.name}</h2>
                  <p className='text-sm font-medium'>{company?.city}</p>
                </div>
                <EyeIconClassname
                  classname='w-12 h-12 cursor-pointer'
                  onClick={() =>
                    router.push(`/admin/empresas/${company?.username}`)
                  }
                />
              </div>
            </>
          ))}
      </div>
    </section>
  )
}

export default RechargePage
