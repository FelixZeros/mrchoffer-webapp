import Image from 'next/image'
export const HeadBar = () => {
  return (
    <nav className='w-screen h-[55px] bg-[#FFB800] top-0 left-0 absolute z-10 flex items-center justify-center'>
      <Image src='/images/logo.png' width={57} height={29} alt='logo' />
    </nav>
  )
}
