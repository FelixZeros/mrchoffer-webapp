'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Rate } from 'antd'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [requestInfo, setRequestInfo] = useState<any>(null)
  const [vehicleInfo, setVehicleInfo] = useState<any>(null)

  useEffect(() => {
    try {
      const requestInfo = JSON.parse(
        searchParams?.getAll('requestInfo') as string
      )
      setRequestInfo(requestInfo)
    } catch (error) {
      setRequestInfo(null)
    }
  }, [searchParams])

  useEffect(() => {
    async function getVehicleInfo() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}drivers/${requestInfo?.driver.id}`
      )
      const data = await response.json()
      setVehicleInfo(data)
    }
    if (requestInfo !== null) {
      getVehicleInfo()
    }
  }, [requestInfo])

  const handleSendRequest = async (type: number) => {
    if (type === 1) {
      await fetch(
        (process.env.NEXT_PUBLIC_API as string) + 'request-driver-company/',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: requestInfo?.id,
            companyId: requestInfo?.companyId,
            driverId: requestInfo?.driverId,
            response: true,
            status: 2,
            comment: 'Se ha aceptado la solicitud'
          })
        }
      )
      router.back()
    }
    if (type === 2) {
      await fetch(
        (process.env.NEXT_PUBLIC_API as string) + 'request-driver-company/',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: requestInfo?.id,
            companyId: requestInfo?.companyId,
            driverId: requestInfo?.driverId,
            response: true,
            status: 3,
            comment: 'Se ha rechazado la solicitud'
          })
        }
      )
      router.back()
    }

    if (type === 3) {
      await fetch(
        (process.env.NEXT_PUBLIC_API as string) + 'request-driver-company/',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: requestInfo?.id,
            companyId: requestInfo?.companyId,
            driverId: requestInfo?.driverId,
            response: true,
            status: 4,
            comment: 'Se ha desactivado la solicitud'
          })
        }
      )
      router.back()
    }
  }

  if (requestInfo === null) {
    return (
      <h1 className='self-center font-bold text-2xl'>
        No tiene acceso para ver esta información
      </h1>
    )
  } else {
    return (
      <section>
        <div className='flex flex-row justify-between'>
          <h1 className='uppercase font-bold text-3xl my-4'>
            {requestInfo?.driver?.name}
          </h1>
          <Image
            src='/images/equis.png'
            width={15}
            height={16}
            alt='close'
            className='object-contain cursor-pointer'
            onClick={() => {
              router.back()
            }}
          />
        </div>
        <div className='flex flex-row w-full gap-8 justify-center'>
          <div className='w-1/2 shadow-sm rounded-b-3xl border rounded-3xl'>
            <h1 className='font-semibold uppercase bg-[#DBDBDB] rounded-t-3xl border p-4'>
              Datos básicos
            </h1>
            <div className='py-4 flex flex-col gap-4 uppercase'>
              <div className='w-full flex flex-col items-center justify-center py-2'>
                <Image
                  src={requestInfo?.driver?.photo ?? '/images/profilews.png'}
                  width={72}
                  height={72}
                  alt='image'
                  className='rounded-full'
                />
              </div>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-2/5 uppercase font-semibold'>Cédula</p>
                <p>{requestInfo?.driver.identification}</p>I
              </div>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-2/5 uppercase font-semibold'>
                  Departamento
                </p>
                <p>{requestInfo?.driver.department}</p>
              </div>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-2/5 uppercase font-semibold'>Ciudad</p>
                <p>{requestInfo?.driver.city}</p>
              </div>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-2/5 uppercase font-semibold'>
                  Calificación
                </p>
                <Rate disabled value={requestInfo?.driver.rating ?? 1} />
              </div>
            </div>
            <div className='flex flex-col py-8 gap-8'>
              <div className='flex flex-row justify-center gap-8'>
                <div
                  className='flex flex-col items-center border-2 border-[#FFB800] rounded-xl p-2 gap-2 cursor-pointer'
                  onClick={() => {
                    window.open(requestInfo?.driver?.photoIdentificationFront)
                  }}
                >
                  <Image
                    src='/images/image.png'
                    width={26}
                    height={22}
                    alt='image'
                  />
                  <p className='text-sm text-center'>
                    Ver Cédula Parte Frontal
                  </p>
                </div>
                <div
                  className='flex flex-col items-center border-2 border-[#FFB800] rounded-xl p-2 gap-2 cursor-pointer'
                  onClick={() => {
                    window.open(requestInfo?.driver?.photoIdentificationBack)
                  }}
                >
                  <Image
                    src='/images/image.png'
                    width={26}
                    height={22}
                    alt='image'
                  />
                  <p className='text-sm text-center'>
                    Ver Cédula Parte Trasera
                  </p>
                </div>
              </div>
              <div className='flex flex-row justify-center gap-8'>
                <div
                  className='flex flex-col items-center border-2 border-[#FFB800] rounded-xl p-2 gap-2 cursor-pointer'
                  onClick={() => {
                    window.open(requestInfo?.driver?.photoDriverLicenseFront)
                  }}
                >
                  <Image
                    src='/images/image.png'
                    width={26}
                    height={22}
                    alt='image'
                  />
                  <p className='text-sm text-center'>
                    Ver Licencia Parte Frontal
                  </p>
                </div>
                <div
                  className='flex flex-col items-center border-2 border-[#FFB800] rounded-xl p-2 gap-2 cursor-pointer'
                  onClick={() => {
                    window.open(requestInfo?.driver?.photoDriverLicenseBack)
                  }}
                >
                  <Image
                    src='/images/image.png'
                    width={26}
                    height={22}
                    alt='image'
                  />
                  <p className='text-sm text-center'>
                    Ver Licencia Parte Trasera
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='w-1/2 shadow-sm rounded-b-3xl border rounded-3xl'>
            <h1 className='font-semibold uppercase bg-[#DBDBDB] rounded-t-3xl border p-4'>
              Información del vehículo
            </h1>
            <div className='py-4 flex flex-col gap-4 uppercase'>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-3/5 uppercase font-semibold'>
                  N° Tarjeta de propiedad
                </p>
                <p>{vehicleInfo?.vehicle?.numberPropertyCard}</p>
              </div>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-3/5 uppercase font-semibold'>
                  Tipo de vehículo
                </p>
                <p>{vehicleInfo?.vehicle?.typeVehicle}</p>
              </div>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-3/5 uppercase font-semibold'>Marca</p>
                <p>{vehicleInfo?.vehicle?.brand}</p>
              </div>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-3/5 uppercase font-semibold'>Línea</p>
                <p>{vehicleInfo?.vehicle?.line}</p>
              </div>
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-3/5 uppercase font-semibold'>Modelo</p>
                <p>{vehicleInfo?.vehicle?.model}</p>
              </div>{' '}
              <div className='flex flex-row border-b pb-4'>
                <p className='mx-4 w-3/5 uppercase font-semibold'>Color</p>
                <p>{vehicleInfo?.vehicle?.color}</p>
              </div>
              <div className='flex flex-row justify-center gap-8 px-14'>
                <div
                  className='flex flex-col items-center border-2 border-[#FFB800] rounded-xl p-2 gap-2 cursor-pointer'
                  onClick={() => {
                    window.open(vehicleInfo.vehicle?.photoPropertyCardFront)
                  }}
                >
                  <Image
                    src='/images/image.png'
                    width={26}
                    height={22}
                    alt='image'
                  />
                  <p className='text-xs text-center capitalize'>
                    Ver Tarjeta de Propiedad Parte Frontal
                  </p>
                </div>
                <div
                  className='flex flex-col items-center border-2 border-[#FFB800] rounded-xl p-2 gap-2 cursor-pointer'
                  onClick={() => {
                    window.open(vehicleInfo.vehicle?.photoPropertyCardFront)
                  }}
                >
                  <Image
                    src='/images/image.png'
                    width={26}
                    height={22}
                    alt='image'
                  />
                  <p className='text-xs text-center capitalize'>
                    Ver Tarjeta de Propiedad Parte Trasera
                  </p>
                </div>
              </div>
              <div className='w-full flex flex-row justify-center items-center gap-6 mt-4'>
                <button
                  disabled={
                    requestInfo?.status !== 1 && requestInfo?.status !== 4
                  }
                  className='bg-[#FFB800] rounded-xl py-2 px-4 uppercase font-semibold disabled:cursor-not-allowed'
                  onClick={() => {
                    handleSendRequest(1)
                  }}
                >
                  Aceptar
                </button>
                <button
                  disabled={
                    requestInfo?.status !== 1 && requestInfo?.status !== 4
                  }
                  className='bg-[#D00000] text-white rounded-xl py-2 px-4 uppercase font-semibold disabled:cursor-not-allowed'
                  onClick={() => {
                    handleSendRequest(2)
                  }}
                >
                  Rechazar
                </button>
                <button
                  className='bg-[#D9D9D9] rounded-xl py-2 px-4 uppercase font-semibold'
                  onClick={() => {
                    handleSendRequest(3)
                  }}
                >
                  Archivar
                </button>
              </div>
              <div
                className='self-center px-4 py-2 rounded-md shadow-md border-[0.5px] cursor-pointer'
                onClick={() => {
                  window.open(`https://wa.me/57${requestInfo?.driver?.phone}`)
                }}
              >
                <Image
                  src='/images/ws.png'
                  width={29}
                  height={30}
                  alt='whatsapp'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Page
