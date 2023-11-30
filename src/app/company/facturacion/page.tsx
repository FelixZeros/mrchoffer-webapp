'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { EyeIcon } from '@/components/icons/eye'
import { useRouter } from 'next/navigation'
import {
  DropdownDepartment,
  DropdownReference
} from '@/app/admin/empresas/components/Dropdowns'
import { AuthContext } from '@/auth/Auth-context'

const Page = () => {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const [data, setData] = useState<any>([])
  const [cash, setCash] = useState<any>(null)
  const [department, setDepartment] = useState<any>(null)
  const [reference, setReference] = useState<any>(null)
  const [initialData, setInitialData] = useState<any>([])
  const [balance, setBalance] = useState<any>(null)
  const [balanceTotal, setBalanceTotal] = useState<any>(null)
  const [handlingFee, setHandlingFee] = useState<any>(null)
  const [plan, setPlan] = useState<any>(null)

  console.log(user)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        (process.env.NEXT_PUBLIC_API as string) + 'get-facturations'
      )
      const responseSS = await fetch(
        (process.env.NEXT_PUBLIC_API as string) +
          'get-balance-company/' +
          user?.company?.id
      )
      const responseEmpr = await fetch(
        `${process.env.NEXT_PUBLIC_API as string}get-companys/${
          user?.company?.username
        }`
      )
      const companies = await responseEmpr.json()

      const activePlan = companies?.balance_companies?.find(
        (balance: any) => balance.active
      )

      const { balances, balanceTotal, balance, handlingFee } =
        await responseSS.json()
      const { amountTotalAdmin } = await response.json()
      setBalance(balanceTotal)
      setBalanceTotal(balanceTotal)
      setHandlingFee(handlingFee)
      setCash(amountTotalAdmin)
      setPlan(activePlan ? activePlan.type : 'Sin plan') // Establecer el plan o null si no hay uno activo
      setInitialData(balances)
      setData(balances)
    }
    fetchData()
  }, [])

  console.log(initialData)

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

  console.log(data)

  return (
    <section>
      <div>
        <div className='flex flex-row items-center justify-between'>
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
          <div className='flex w-1/2 flex-col gap-4'>
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
              <p className='font-bold text-3xl'>COP {balance ?? 0}</p>
              <p className='font-bold text-lg'>
                C. de manejo: {handlingFee ?? 0}%
              </p>
            </div>
            <div className='rounded-xl shadow-md py-4 px-10 flex flex-col gap-4'>
              <div className='flex flex-row gap-3 items-center'>
                <Image
                  src='/images/money.png'
                  width={36}
                  height={36}
                  alt='money'
                />
                <h2 className='font-semibold text-xl'>Mi saldo</h2>
              </div>
              <p className='font-bold text-4xl'>COP {cash ?? 0}</p>
            </div>
            <div className='rounded-xl shadow-md py-4 px-10 flex flex-col gap-4'>
              <div className='flex flex-row gap-3 items-center'>
                <Image
                  src='/images/money.png'
                  width={36}
                  height={36}
                  alt='money'
                />
                <h2 className='font-semibold text-xl'>Mi plan</h2>
              </div>
              <p className='font-bold text-4xl'>{plan}</p>
            </div>
          </div>
          <div className='w-full shadow-sm rounded-b-3xl border rounded-3xl'>
            <h1 className='font-semibold uppercase bg-[#FFB800] rounded-t-3xl border p-4'>
              Historial de facturación
            </h1>
            <div className='p-4 flex flex-col gap-4 uppercase'>
              {data?.length > 0 &&
                data?.map((balance: any) => (
                  <div
                    className='flex flex-col border shadow-md rounded-xl p-4 relative'
                    key={balance?.id}
                  >
                    <div className='flex flex-col gap-2'>
                      <div className='flex flex-row uppercase font-bold text-sm gap-10'>
                        <span className='font-normal'>
                          {new Date(balance?.createdAt).toLocaleTimeString()}{' '}
                        </span>
                        <span>
                          {new Date(balance?.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className='flex flex-row gap-4 items-center'>
                        <img
                          src={
                            balance?.driver?.photo ?? '/images/profilews.png'
                          }
                          alt='logo'
                          className='border rounded-full w-9 h-9 object-cover ml-2 shadow-sm'
                        />
                        <h3 className='font-semibold text-xl'>
                          {balance?.driver?.name}
                        </h3>
                      </div>
                      <div>
                        <div className='absolute top-4 right-4 flex flex-row gap-4 '>
                          <Image
                            src='/images/print.png'
                            width={18}
                            height={17}
                            alt='logo'
                          />
                        </div>

                        <div className='flex flex-row uppercase font-bold gap-4 items-center'>
                          <span>Valor:</span>
                          <span className='text-2xl flex flex-row items-center gap-2'>
                            COP {balance?.amount}{' '}
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
                                width={30}
                                height={30}
                              />
                            )}
                          </span>
                        </div>
                        <div className='flex flex-row uppercase font-bold gap-4 items-center'>
                          <span>Cuota de manejo:</span>
                          <span className='text-base'>
                            COP {balance?.handlingFee}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {data?.length === 0 && (
                <div className='flex flex-col items-center justify-center'>
                  <p className='text-xl font-bold'>
                    No hay datos de facturación
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page
