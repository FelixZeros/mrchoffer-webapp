'use client'
import { HeadBar } from './components/head'
import { RequestRideForm } from './components/form'

const requestTravel = () => {
  
  /* if (!isLoaded || !geoLocation) return <h1> Cargando... </h1> */
  return (
    <main className='absolute left-0 top-0 w-screen bg-white'>
      <HeadBar />
      <RequestRideForm/>
    </main>
  )
}

export default requestTravel
