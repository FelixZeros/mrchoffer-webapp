import { SearchIcon } from "@/components/icons/magnifyng-glass"

export const SearchBar = () => {
  return (
    <div className='flex items-center relative'>
      <input
        type='text'
        className='rounded-lg bg-white shadow mx-5 p-2 w-full'
        placeholder='Buscar...'
      />
      <div className='aboslute -translate-x-full pr-10'>
        <SearchIcon />
      </div>
    </div>
  )
}
