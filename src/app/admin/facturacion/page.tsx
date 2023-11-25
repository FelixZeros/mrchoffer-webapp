'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { EyeIcon } from '@/components/icons/eye'
import { useRouter } from 'next/navigation'
import {
  DropdownDepartment,
  DropdownReference
} from '../empresas/components/Dropdowns'

const FacturationPage = () => {
  const router = useRouter()
  const [data, setData] = useState<any>([])
  const [cash, setCash] = useState<any>([])
  const [department, setDepartment] = useState<any>(null)
  const [reference, setReference] = useState<any>(null)
  const [initialData, setInitialData] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        (process.env.NEXT_PUBLIC_API as string) + 'get-facturations'
      )
      const { amountTotalAdmin, getBalanceCompany } = await response.json()
      setCash(amountTotalAdmin)
      setInitialData(getBalanceCompany)
      setData(getBalanceCompany)
    }
    fetchData()
  }, [])

  const handleFilter = () => {
    let filteredCompanies = [...initialData]

    const filters = {
      department,
      reference
    }

    Object.keys(filters).forEach(filterKey => {
      const filterValue = filters[filterKey]
      if (filterValue) {
        filteredCompanies = filteredCompanies.filter(company => {
          if (filterKey === 'department') {
            return company?.company?.department === filterValue
          }
          if (filterKey === 'reference') {
            return company?.reference === filterValue
          }
        })
      }
    })

    setData(filteredCompanies)
  }

  return (
    <section>
      <div>
        <div className='flex flex-row items-center justify-between'>
          <div className='rounded-xl shadow-md py-4 px-10 flex flex-col gap-4'>
            <div className='flex flex-row gap-3 items-center'>
              <Image
                src='/images/money.png'
                width={36}
                height={36}
                alt='money'
              />
              <h2 className='font-semibold text-xl'>Mis Ingresos</h2>
            </div>
            <p className='font-bold text-4xl'>COP {cash}</p>
          </div>
          <div>
            <div className='flex flex-row justify-center gap-4'>
              <DropdownDepartment
                setDepartment={setDepartment}
                department={department}
              />
              <DropdownReference
                setReference={setReference}
                reference={reference}
              />
            </div>
          </div>
          <div>
            <div className='flex flex-row justify-center gap-4 items-center'>
              <button
                className='bg-[#FFB800] uppercase font-bold px-5 py-3 rounded-lg shadow-md'
                onClick={handleFilter}
              >
                Filtrar
              </button>
              <button className='bg-[#D9D9D9] uppercase font-bold px-5 py-3 rounded-lg shadow-md flex items-center gap-2'>
                <p>Exportar</p>
              </button>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-row justify-center items-center gap-4 mt-6'>
          <div className='w-full shadow-sm rounded-b-3xl border rounded-3xl'>
            <h1 className='font-semibold uppercase bg-[#FFB800] rounded-t-3xl border p-4'>
              Historial de facturación
            </h1>
            <div className='p-4 flex flex-col gap-4 uppercase'>
              {data.length > 0 &&
                data?.map((balance: any) => (
                  <div
                    className='flex flex-col border shadow-md rounded-xl p-4 relative'
                    key={balance?.id}
                  >
                    <div className='flex flex-row gap-8 items-center'>
                      <div className='flex flex-col items-center'>
                        <h3 className='font-semibold text-xl'>
                          {balance?.company?.name}
                        </h3>
                        <p className='text-sm'>{balance?.company?.city}</p>
                        <img
                          src={balance?.company?.photo}
                          alt='logo'
                          className='border rounded-full w-9 h-9 object-cover ml-2 shadow-sm'
                        />
                      </div>
                      <div>
                        <div className='absolute top-4 right-4 flex flex-row gap-4 '>
                          <EyeIcon
                            classname='cursor-pointer'
                            onClick={() => {
                              router.push(
                                '/admin/empresas/' + balance?.company?.username
                              )
                            }}
                          />
                          <Image
                            src='/images/print.png'
                            width={18}
                            height={17}
                            alt='logo'
                          />
                        </div>
                        <div className='flex flex-row uppercase font-bold text-sm gap-10'>
                          <span className='font-normal'>
                            {new Date(balance?.createdAt).toLocaleTimeString()}{' '}
                          </span>
                          <span>
                            {new Date(balance?.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className='flex flex-row uppercase font-bold gap-10 items-center'>
                          <span>Valor:</span>
                          <span className='text-2xl'>${balance?.amount}</span>
                        </div>
                        <div className='flex flex-row uppercase font-bold gap-10 items-center'>
                          <span>Plan:</span>
                          <span className='text-base'>{balance?.name}</span>
                        </div>
                        <div className='flex flex-row uppercase font-bold gap-10 items-center'>
                          <span>Referencia:</span>
                          <span className='text-base'>
                            {balance?.reference}
                          </span>
                        </div>
                        <p
                          className={
                            balance?.status === 'Completada'
                              ? 'text-green-400 font-medium'
                              : 'text-red-600 font-medium'
                          }
                        >
                          {balance?.status}
                        </p>
                        <div className='absolute bottom-4 right-4 flex flex-col items-center'>
                          <p className='font-bold'>Método de pago</p>
                          {balance?.paymentMethod !== '' && (
                            <Image
                              src={
                                balance?.paymentMethod === 'Nequi'
                                  ? '/images/nequi.png'
                                  : balance?.paymentMethod === 'Daviplata'
                                  ? '/images/davivienda.png'
                                  : balance?.paymentMethod === 'Bancolombia'
                                  ? '/images/bancolombia.png'
                                  : '/images/efectivo.png'
                              }
                              alt={balance?.paymentMethod}
                              width={45}
                              height={46}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {data.length === 0 && (
                <div className='flex flex-col items-center justify-center'>
                  <p className='text-xl font-bold'>No hay facturas</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FacturationPage
