'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const ShowCompany = () => {
  const [companyInfo, setCompanyInfo] = useState<any>(null)
  const [daysRemaining, setDaysRemaining] = useState<number>(0)
  const [balance, setBalance] = useState<any>(null)
  const [plan, setPlan] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  const getCompanies = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}get-companys/${pathname?.split('/')[3]}`
    )
    const companies = await response.json()

    // Obtener los días restantes
    const daysRemaining = companies?.balance_companies
      .filter((company: any) => company.active === false)
      .map((company: any) => company.daysRecharge)
      .reduce((acc: any, curr: any) => acc + curr, 0)

    // Obtener el plan activo
    const activePlan = companies.balance_companies.find(
      (balance: any) => balance.active
    )
    setBalance(balance)
    setDaysRemaining(daysRemaining)
    setPlan(activePlan ? activePlan.type : 'Sin plan') // Establecer el plan o null si no hay uno activo
    setCompanyInfo(companies)
  }

  useEffect(() => {
    getCompanies()
  }, [])

  console.log(balance)

  return (
    <section>
      <div className='flex flex-row items-center relative '>
        <Image
          src='/images/equis.png'
          width={15}
          height={16}
          alt='cross'
          className='absolute right-10 cursor-pointer'
          onClick={() => router.back()}
        />
        <h1 className='text-4xl font-bold uppercase'>{companyInfo?.name}</h1>
        <img
          src={companyInfo?.photo}
          alt='logo'
          className='border rounded-full w-9 h-9 object-cover ml-2 shadow-sm'
        />
      </div>
      <div className='w-full flex flex-row justify-center items-center gap-4 mt-6'>
        <div className='w-1/2 shadow-sm rounded-b-3xl border rounded-3xl'>
          <h1 className='font-semibold uppercase bg-[#FFB800] rounded-t-3xl border p-4'>
            Información general
          </h1>
          <div className='py-4 flex flex-col gap-4 uppercase'>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>Nombre</p>
              <p>{companyInfo?.name}</p>
            </div>
            <div className='flex flex-row border-b pb-4 items-center'>
              <p className='mx-4 w-2/6 uppercase font-semibold'>
                Link carreras
              </p>
              <p className='lowercase text-xs'>
                {process.env.NEXT_PUBLIC_FRONTEND +
                  'carrera/' +
                  companyInfo?.username}
              </p>
            </div>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>
                Tipo de persona
              </p>
              <p>{companyInfo?.typePerson}</p>
            </div>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>
                Tipo de documento
              </p>
              <p>{companyInfo?.typeDocument}</p>
            </div>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>
                N° de Documento
              </p>
              <p>{companyInfo?.document}</p>
            </div>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>Departamento</p>
              <p>{companyInfo?.department}</p>
            </div>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>Ciudad</p>
              <p>{companyInfo?.city}</p>
            </div>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 max-w-[40%] min-w-[30%] w-2/5 uppercase font-semibold'>
                Contacto
              </p>
              <div className='max-w-[60%] flex flex-col items-center gap-2 uppercase text-xs'>
                <div className='flex flex-row items-center'>
                  <Image
                    src='/images/whatsapp.png'
                    width={13}
                    height={14}
                    alt='phone'
                    className='object-contain mr-1'
                  />
                  <Link
                    href={('https://wa.me/' + companyInfo?.phone) as string}
                  >
                    {companyInfo?.phone}
                  </Link>
                </div>
                <div className='flex flex-row items-center'>
                  <Image
                    src='/images/email.png'
                    width={13}
                    height={14}
                    alt='phone'
                    className='object-contain ml-4 mr-1'
                  />
                  <Link
                    href={('mailto:' + companyInfo?.user?.email) as string}
                    className='overflow-hidden'
                  >
                    {companyInfo?.user?.email}
                  </Link>
                </div>
              </div>
            </div>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>Tipo de plan</p>
              <p>{plan ?? 'Sin plan'}</p>
            </div>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>
                Días restantes
              </p>
              <p>{daysRemaining ?? 0}</p>
            </div>
            <div className='flex flex-row border-b pb-4'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>Saldo</p>
              <p>{daysRemaining ?? 0}</p>
            </div>
            <div className='flex flex-row'>
              <p className='mx-4 w-2/5 uppercase font-semibold'>
                Vehículos en línea
              </p>
              <p>{companyInfo?.driver_companies?.length ?? 0}</p>
            </div>
          </div>
        </div>
        <div className='w-1/2 shadow-sm rounded-b-3xl border rounded-3xl'>
          <h1 className='font-semibold uppercase bg-[#FFB800] rounded-t-3xl border p-4'>
            Historial de facturación
          </h1>
          <div className='p-4 flex flex-col gap-4 uppercase'>
            {companyInfo?.balance_companies?.map((balance: any) => (
              <div
                className='flex flex-col border shadow-md rounded-xl p-4 relative'
                key={balance?.id}
              >
                <Image
                  src='/images/print.png'
                  width={18}
                  height={17}
                  alt='logo'
                  className='absolute top-4 right-4'
                />
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
                  <span className='text-base'>{balance?.reference}</span>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShowCompany
