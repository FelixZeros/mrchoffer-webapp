'use client'
import { useEffect, useState } from 'react'

const DriverInformationPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='col-span-2 h-full w-full'>
      <div className='bg-white overflow-hidden shadow rounded-lg border'>
        <div className='px-4 py-5 sm:p-6'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Datos del conductor
          </h3>
        </div>

        <div className='border-t border-gray-200 items-center flex justify-center py-2'>
          <img
            src={
              'https://img.freepik.com/vector-gratis/avatar-personaje-empresario-aislado_24877-60111.jpg?w=2000'
            }
            alt='Avatar'
            className='w-60 h-w-60 rounded-full'
          />
        </div>

        <div className='border-t border-gray-200'>
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Nombre</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {/* name */}
              </dd>
            </div>
          </dl>
        </div>

        <div className='border-t border-gray-200'>
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Placa</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {/* LicensePlate */}
              </dd>
            </div>
          </dl>
        </div>

        <div className='border-t border-gray-200'>
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Color del vehículo
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {/* cellphone */}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <button className='px-3 py-2 text-sm font-medium mt-2 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-0 outline-none w-full disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'>
        Rechazar
      </button>
    </div>
  )
}

export default DriverInformationPage
