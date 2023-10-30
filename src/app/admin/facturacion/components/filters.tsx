import { CarIcon } from '@/components/icons/car'
import { SearchIcon } from '@/components/icons/magnifyng-glass'
import { CloseIcon } from '@/components/icons/x-mark'
import Link from 'next/link'

export const FiltersBilling = () => {
  return (
    <div className='flex justify-between my-4'>
      <div>
        <input
          type='text'
          className='rounded-lg bg-white shadow p-2'
          placeholder='Buscar...'
        />
      </div>

      <div className='flex gap-3'>
        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Estado</option>
        </select>

        <button className='bg-[--main-yellow] px-5 rounded-lg font-bold shadow text-black'>
          Filtrar
        </button>

        <Link
          href='admin/empresas/crear'
          className='bg-white px-5 items-center flex justify-center rounded-lg font-bold shadow text-black hover:bg-gray-200 transition-all'
        >
          + Crear nueva
        </Link>
      </div>
    </div>
  )
}

export const FiltersBillingCompany = () => {
  return (
    <header>
      <div className='flex justify-between my-4'>
        <div className='flex gap-3'>
          <div className='flex items-center relative'>
            <input
              type='text'
              className='rounded-lg bg-white shadow p-2'
              placeholder='Buscar...'
            />
            <div className='aboslute -translate-x-full px-2'>
              <SearchIcon />
            </div>
          </div>
          <div className='flex gap-3 rounded-lg shadow px-5 items-center justify-center'>
            <CarIcon />
            <p className=''>Carreras: </p>
          </div>
        </div>

        <div className='flex gap-3 shadow rounded-lg px-5 items-center justify-between'>
          <div>
            <p>Tiempo:</p>
          </div>
          <div className='bg-gray-300 rounded-lg px-3 mx-16'>Hoy</div>
          <div>
            <CloseIcon />
          </div>
        </div>

        <div className='flex gap-3'>
          <select className=' shadow p-2 rounded-lg bg-white text-black'>
            <option value=''>Fecha</option>
          </select>

          <button className='bg-[--main-yellow] px-5 rounded-lg font-bold shadow text-black'>
            Filtrar
          </button>

          <button className='bg-gray-300 px-5 rounded-lg font-bold shadow text-black'>
            Exportar
          </button>
        </div>
      </div>
    </header>
  )
}
