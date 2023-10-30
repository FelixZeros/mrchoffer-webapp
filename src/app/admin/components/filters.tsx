import { SearchIcon } from '@/components/icons/magnifyng-glass'

export const FiltersRequest = () => {
  return (
    <div className='flex justify-between my-4'>
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

      <div className='flex gap-3'>
        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Ciudad</option>
        </select>

        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Género</option>
        </select>

        <button className='bg-[--main-yellow] px-5 rounded-lg font-bold shadow text-black'>
          Filtrar
        </button>
      </div>
    </div>
  )
}

export const FiltersGenerics = () => {
  return (
    <div className='flex justify-between my-4'>
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

      <div className='flex gap-3'>
        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Ciudad</option>
        </select>

        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Calificación</option>
        </select>

        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>No. Carreras</option>
        </select>

        <button className='bg-[--main-yellow] px-5 rounded-lg font-bold shadow text-black'>
          Filtrar
        </button>
      </div>
    </div>
  )
}

export const BlockedFilters = () => {
  return (
    <div className='flex justify-between my-4'>
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

      <div className='flex gap-3'>
        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Ciudad</option>
        </select>

        <button className='bg-[--main-yellow] px-5 rounded-lg font-bold shadow text-black'>
          Filtrar
        </button>
      </div>
    </div>
  )
}
