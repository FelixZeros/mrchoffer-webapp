import { BillIcon } from '@/components/icons/bill'
import { CreditCardIcon } from '@/components/icons/credit-card'
import { HouseIcon } from '@/components/icons/house'
import { SearchBar } from '../components/search-bar'
import { AvatarIcon } from '@/components/icons/avatar'
import { StarIcon } from '@/components/icons/star'

const RechargeCard = () => {
  return (
    <div className='m-5 p-5 shadow rounded-xl grid hover:-translate-y-1 hover:shadow-xl focus:shadow-xl transition-all cursor-pointer border border-transparent hover:border-blue-600 focus:border-blue-600'>
      <div className='flex items-center gap-2 font-bold'>
        <div className='text-[--main-yellow]'>
          <BillIcon />
        </div>
        Recargas
      </div>
      <input
        type='number'
        className='my-4 focus:outline-transparent p-3 shadow rounded-md border-none outline-none'
        placeholder='Ingrese un valor'
      />
      <div className='flex justify-between gap-2 mt-5'>
        <div className='flex-col justify-center'>
          <div className='flex justify-center'>
            <div className='p-4 rounded-md bg-[--main-yellow] my-2 shadow'>
              <HouseIcon />
            </div>
          </div>
          <strong>Punto físico</strong>
        </div>

        <div className='flex-col justify-center'>
          <div className='flex justify-center'>
            <div className='p-4 rounded-md bg-gray-600 my-2 shadow'>
              <CreditCardIcon />
            </div>
          </div>
          <strong>Transferencia</strong>
        </div>
      </div>
    </div>
  )
}

const CardDriver = () => {
  return (
    <div className='m-5 p-5 shadow rounded-xl grid hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-[--main-yellow]'>
      <span className='font-bold text-4xl my-3 flex items-center gap-2'>
        <figure className='grid gap-2'>
          <div className='flex justify-center'>
            <div className='p-5 rounded-full bg-[--main-yellow] w-fit'>
              <AvatarIcon fill='white' />
            </div>
          </div>
          <span className='text-sm text-center'>3.2</span>
          <div className='flex gap-1 justify-center'>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
        </figure>
        <div className='grid flex-1 text-center'>
          <span className='font-light'>Jairo Mendoza</span>
          <strong>COP $2.000</strong>
        </div>
      </span>
    </div>
  )
}

export default function RechargePage() {
  return (
    <section className=' w-full h-full grid grid-cols-3'>
      <div className='col-span-1 grid'>
        <SearchBar />
        <RechargeCard />
      </div>
      <div className='col-span-2'>
        <CardDriver />
        <CardDriver />
      </div>
    </section>
  )
}
