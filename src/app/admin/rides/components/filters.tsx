import { CarIcon } from '@/components/icons/car'
import { CloseIcon } from '@/components/icons/x-mark'

export const InputFilters = () => {
  return (
    <div className='flex justify-between my-4'>
      <div>
        <input
          type='text'
          className='rounded-lg bg-white shadow p-2'
          placeholder='Buscar...'
        />
                <input
          type='text'
          className='rounded-lg bg-white shadow p-2'
        />
      </div>

      <div className='flex gap-3'>
        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Estado</option>
        </select>

        <button className='bg-[--main-yellow] px-5 rounded-lg font-bold shadow text-black'>
          Filtrar
        </button>
      </div>
    </div>
  )
}

export const ClosedFilters = ({ carrers = 0 }: { carrers: number }) => {
  return (
    <div className='flex justify-between my-4'>
      <div className='flex gap-3'>
        <input
          type='text'
          className='rounded-lg bg-white shadow p-2'
          placeholder='Buscar...'
        />
        <div className='flex gap-3 rounded-lg shadow px-5 items-center justify-center'>
          <CarIcon />
          <p className=''>Carreras: </p>
          {carrers}
        </div>
      </div>

      <div className='flex gap-3 shadow rounded-lg px-5 items-center justify-between'>
        <div>
          <p>Tiempo:</p>
        </div>
        <div className='bg-gray-300 rounded-lg px-3 mx-16'>Hoy</div>
        <div>
          <CloseIcon/>
        </div>
      </div>

      <div className='flex gap-3'>
        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Calificación</option>
        </select>

        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Estado</option>
        </select>

        <button className='bg-[--main-yellow] px-5 rounded-lg font-bold shadow text-black'>
          Filtrar
        </button>
      </div>
    </div>
  )
}

export const HistoryFilters = () => {
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
          <option value=''>Calificación</option>
        </select>
        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Fecha</option>
        </select>
        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Tiempo</option>
        </select>
        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Estado</option>
        </select>

        <button className='bg-[--main-yellow] px-5 rounded-lg font-bold shadow text-black'>
          Filtrar
        </button>

        <button className='bg-gray-300 px-5 rounded-lg font-bold shadow text-black'>
          Exportar
        </button>
      </div>
    </div>
  )
}
