export const Filters = () => {
  return (
    <div className='flex justify-between my-4'>
      <div>
        <input
          type='text'
          className='rounded-lg bg-white shadow p-2'
          placeholder='Buscar...'
        />
      </div>

      <div className='flex gap-1'>
        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Ciudad</option>
        </select>

        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Calificación</option>
        </select>

        <select className=' shadow p-2 rounded-lg bg-white text-black'>
          <option value=''>Género</option>
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
