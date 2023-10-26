'use client'

import { type Driver } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, type FC } from 'react'
import WhatsappIcon from '@/components/icons/whatsapp'
import Image from 'next/image'
import { StarIcon } from '@/components/icons/star'
import { ImageIcon } from '@/components/icons/image'

type Props = {
  params: {
    id: string
  }
}

  return (
    <section>
      <span className='text-black text-[40px] font-bold leading-loose'>
        Andrés parra
      </span>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2  lg:grid-cols-4 '>
        <div className='col-span-2 h-full w-full '>
          <div className='bg-white overflow-hidden h-full shadow rounded-xl border'>
            <div className='px-4 py-5 sm:p-6 bg-gray-300'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Datos básicos
              </h3>
            </div>

            <div className='border-t border-gray-200 items-center flex justify-center py-2'>
              <Image src={''} alt='Avatar' className='w-24 h-24 rounded-full' />
            </div>

            <div className='border-t border-gray-200'>
              <dl>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-bold text-black'>Cédula</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {}
                  </dd>
                </div>
              </dl>
            </div>

            <div className='border-t border-gray-200'>
              <dl>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-bold text-black'>Nombre</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'></dd>
                </div>
              </dl>
            </div>

            <div className='border-t border-gray-200'>
              <dl>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-bold text-black'>Ciudad</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'></dd>
                </div>
              </dl>
            </div>

            <div className='border-t border-gray-200'>
              <dl>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-bold text-black'>Calificación</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex'>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </dd>
                </div>
              </dl>
            </div>

            <div className='border-t border-gray-200'>
              <dl>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 text-center sm:gap-4 sm:px-6 h-full items-center grid place-content-center'>
                  <div className='text-sm font-medium justify-self-center text-black border rounded-lg border-[--main-yellow] shadow-md w-fit p-2'>
                    <div className='flex justify-center'>
                      <ImageIcon />
                    </div>
                    <a href={''} target='_blank' rel='noreferrer'>
                      Ver foto de cédula (Frente)
                    </a>
                  </div>

                  <div className='text-sm font-medium justify-self-center text-black border rounded-lg border-[--main-yellow] shadow-md w-fit p-2'>
                    <div className='flex justify-center'>
                      <ImageIcon />
                    </div>
                    <a href={''} target='_blank' rel='noreferrer'>
                      Ver foto de cédula (Atras)
                    </a>
                  </div>

                  <div className='text-sm font-medium justify-self-center text-black border rounded-lg border-[--main-yellow] shadow-md w-fit p-2'>
                    <div className='flex justify-center'>
                      <ImageIcon />
                    </div>
                    <a href={''} target='_blank' rel='noreferrer'>
                      Ver foto de licencia (Frente)
                    </a>
                  </div>

                  <div className='text-sm font-medium justify-self-center text-black border rounded-lg border-[--main-yellow] shadow-md w-fit p-2'>
                    <div className='flex justify-center'>
                      <ImageIcon />
                    </div>
                    <a href={''} target='_blank' rel='noreferrer'>
                      Ver foto de licencia (Atras)
                    </a>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className='bg-white overflow-hidden shadow rounded-lg col-span-2 border h-full w-full'>
          <div className='px-4 py-5 sm:p-6 bg-gray-300'>
            <h3 className='text-lg leading-6 font-medium text-gray-900 '>
              Información del vehículo
            </h3>
          </div>

          <div className='border-t border-gray-200'>
            <dl>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-bold text-black'>
                  N° Tarjeta de propiedad
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {}
                </dd>
              </div>
            </dl>
          </div>

          <div className='border-t border-gray-200'>
            <dl>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-bold text-black'>
                  Tipo de vehículo
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {}
                </dd>
              </div>
            </dl>
          </div>

          <div className='border-t border-gray-200'>
            <dl>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-bold text-black'>Marca</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {}
                </dd>
              </div>
            </dl>
          </div>

          <div className='border-t border-gray-200'>
            <dl>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-bold text-black'>Linea</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {}
                </dd>
              </div>
            </dl>
          </div>

          <div className='border-t border-gray-200'>
            <dl>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-bold text-black'>Modelo</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {}
                </dd>
              </div>
            </dl>
          </div>

          <div className='border-t border-b border-gray-200'>
            <dl>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-bold text-black'>Color</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {}
                </dd>
              </div>
            </dl>
          </div>

          <div className='grid grid-cols-2 py-2 '>
            <div className='text-sm font-medium text-center justify-self-center grid-cols-1 text-black border rounded-lg border-[--main-yellow] shadow-md w-fit p-2'>
              <div className='flex justify-center'>
                <ImageIcon />
              </div>
              <a href={''} target='_blank' rel='noreferrer'>
                Ver tarjeta de propiedad <br /> Parte Frontal
              </a>
            </div>

            <div className='text-sm font-medium text-center justify-self-center grid-cols-1 text-black border rounded-lg border-[--main-yellow] shadow-md w-fit p-2'>
              <div className='flex justify-center'>
                <ImageIcon />
              </div>
              <a href={''} target='_blank' rel='noreferrer'>
                Ver tarjeta de propiedad <br /> Parte trasera
              </a>
            </div>
          </div>
          <div className='border-t border-gray-200'>
            <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <button
                disabled={isLoading}
                className='px-3 py-2 text-sm font-medium mt-2 rounded-lg bg-[--main-yellow] text-white outline-none w-full disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'
              >
                Aceptar
              </button>
              <button
                disabled={isLoading}
                className='px-3 py-2 text-sm font-medium mt-2 rounded-lg bg-red-600 text-white outline-none w-full disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'
              >
                Rechazar
              </button>
              <button
                disabled={isLoading}
                className='px-3 py-2 text-sm font-medium mt-2 rounded-lg bg-gray-300 text-white outline-none w-full disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'
              >
                Archivar
              </button>
            </div>
            <div className='border-t border-gray-200'>
              <dl>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-bold text-black'>
                    <button
                      disabled={isLoading}
                      className='px-3 py-2 text-sm font-medium mt-2 rounded-lg bg-[--main-yellow] text-white outline-none w-full disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'
                    >
                      Ver historial <br /> de carreras
                    </button>
                  </dt>

                  <dt className='px-3 py-2 text-sm font-medium mt-2 rounded-lg shadow grid place-content-center text-white outline-none w-full disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'>
                    <a
                      href={`https://wa.me/+57${driver?.phone}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <span>
                        <WhatsappIcon />
                      </span>
                    </a>
                  </dt>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DriverPage
