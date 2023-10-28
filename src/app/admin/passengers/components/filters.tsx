export const FiltersPassengers = () => {
  return (
    <div className='mt-5 flex justify-between'>
      <div className='flex items-center gap-2'>
        <input id='selectAll' type='checkbox' />
        <label htmlFor='#selectAll' className='text-black'>
          Seleccionar todo
        </label>
      </div>

      <div className='flex gap-1'>
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
