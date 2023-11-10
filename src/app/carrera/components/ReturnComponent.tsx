import Image from 'next/image'
import React from 'react'

type RenderProps = {
  handleRender?: any
}

const RenderComponent = ({ handleRender }: RenderProps) => {
  return (
    <Image
      src='/images/equis.png'
      alt='img'
      width={15}
      height={16}
      className='absolute top-4 right-4 cursor-pointer'
      onClick={() => handleRender('StartRequest')}
    />
  )
}

export default RenderComponent
