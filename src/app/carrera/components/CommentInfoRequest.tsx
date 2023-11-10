import TripContext from '@/context/TripContext'
import React, { useContext } from 'react'
import { Input } from 'antd'

type RenderProps = {
  handleRender: any
}
const { TextArea } = Input

export const CommentInfoRequest = ({ handleRender }: RenderProps) => {
  const { comment, setComment } = useContext(TripContext)

  const handleOk = () => {
    handleRender('RequestDriver')
  }
  return (
    <section className='mt-20 px-8 py-4'>
      <div className='flex flex-col gap-4'>
        <h1 className='uppercase font-bold text-center pb-4 text-2xl'>
          Ofrezca su tarifa
        </h1>
        <TextArea
          placeholder='Cuéntanos...'
          className='placeholder:font-medium placeholder:text-gray-500 text-black p-2 shadow-sm text-xl font-medium'
          value={comment === '' ? '' : comment}
          onChange={e => setComment(e.target.value)}
          maxLength={70}
          showCount
        />
        <div
          className='flex flex-row w-full justify-between py-8'
          onClick={handleOk}
        >
          <button className='uppercase bg-[#FFB800] p-2 rounded-lg font-bold w-full text-xl shadow-sm'>
            Confirmar
          </button>
        </div>
      </div>
    </section>
  )
}
