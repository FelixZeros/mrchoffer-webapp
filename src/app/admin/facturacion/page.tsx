import { CarIcon } from '@/components/icons/car'
import { FiltersBillingCompany } from './components/filters'
import { BillIcon } from '@/components/icons/bill'
import { AvatarIcon } from '@/components/icons/avatar'

const CardIncome = () => {
  return (
    <div className='m-5 p-5 shadow rounded-xl grid hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-blue-600'>
      <div className='flex items-center gap-2 font-bold'>
        <div className='text-[--main-yellow]'>
          <BillIcon />
        </div>
        Mis ingresos
      </div>
      <span className='font-bold text-4xl my-3'>COP 720.000</span>
      <div className='grid gap-2 mt-5'>
        <span>
          Ingresos totales: <strong>$1.200.000</strong>{' '}
        </span>
        <span>
          Cuota de manejo: <strong>$480.000</strong>{' '}
        </span>
      </div>
    </div>
  )
}
const CardBalance = () => {
  return (
    <div className='m-5 p-5 shadow rounded-xl grid hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-blue-600'>
      <div className='flex items-center gap-2 font-bold'>
        <div className='text-[--main-yellow]'>
          <BillIcon />
        </div>
        Saldo
      </div>
      <span className='font-bold text-4xl my-3'>COP 500.000</span>
      <div className='grid gap-2 mt-5'>
        <span className='text-red-600'>Recuerda recargar tu cuenta</span>
      </div>
      <button className='shadow bg-[--main-yellow] px-9 py-3 mt-5 rounded font-bold hover:shadow-xl transition-all hover:-translate-y-1'>
        Recargar
      </button>
    </div>
  )
}

const CardMyPlan = () => {
  return (
    <div className='m-5 p-5 shadow rounded-xl md:flex md:justify-between md:items-center hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-blue-600'>
      <div>
        <strong className='text-4xl'>Mi plan</strong>
        <p>Prepago</p>
      </div>
      <button className='shadow bg-[--main-yellow] px-9 py-3 mt-5 rounded font-bold hover:shadow-xl transition-all hover:-translate-y-1'>
        Cambiar
      </button>
    </div>
  )
}

const CardRide = () => {
  return (
    <div className='m-5 p-5 shadow rounded-xl grid hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-[--main-yellow]'>
      <div className='flex items-center gap-2 font-bold'>
        <div className='text-[--main-yellow]'>14:56</div>
        20/5/2023
      </div>
      <span className='font-bold text-4xl my-3 flex items-center gap-2'>
        <div className='p-5 rounded-full bg-[--main-yellow]'>
          <AvatarIcon fill='white' />
        </div>
        Jairo Mendoza
      </span>
      <div className='grid gap-2 mt-5'>
        <span>
          Valor: <strong>$50.000</strong>
        </span>
        <span>
          Cuota de manejo: <strong>$20.000</strong>
        </span>
      </div>
    </div>
  )
}

const BillingPage = () => {
  return (
    <main className='items-center w-full h-full'>
      <div className='w-full h-[90%] max-h-[90%] p-0 items-center overflow-hidden justify-center'>
        <div className='relative'>
          <FiltersBillingCompany />
        </div>

        <div className='flex justify-center w-full h-3/4 overflow-auto'>
          <div className='w-1/3'>
            <CardIncome />
            <CardBalance />
            <CardMyPlan />
          </div>
          <div className='w-2/3'>
            <CardRide />
            <CardRide />
          </div>
        </div>
      </div>
    </main>
  )
}

export default BillingPage
