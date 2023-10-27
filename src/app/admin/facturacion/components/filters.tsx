import Link from "next/link"


export const FiltersBilling = () => {


    return     <div className='flex justify-between my-4'>
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
}