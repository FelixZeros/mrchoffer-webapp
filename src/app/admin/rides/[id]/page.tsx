'use client'

import { type RideHistory } from '@/types'
import { Inter } from '@next/font/google'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  params: {
    id: string
  }
}

const RideDetails = (props: Props) => {
  const { id } = props.params

  const { data, isLoading } = useQuery(['ride', id], async () => {
    const { data } = await axios.get<RideHistory>(`/api/rides/${id}`)
    return data
  })

  const start = new Date(data?.start_time as string)
  const request = new Date(data?.request_time as string)
  const end = new Date(data?.end_time as string)

  // waiting time
  const waitingTime = start.getTime() - request.getTime()
  const waitingTimeMinutes = Math.floor(waitingTime / 60000)
  const waitingTimeHours = Math.floor(waitingTimeMinutes / 60)

  // ride time
  const rideTime = end.getTime() - start.getTime()
  const rideTimeMinutes = Math.floor(rideTime / 60000)
  const rideTimeHours = Math.floor(rideTimeMinutes / 60)

  return (
    <main className={inter.className}>
      <h1 className='text-4xl font-bold dark:text-gray-200 mb-10'>
        Solicitud de viaje #{id}
      </h1>
      {isLoading
        ? (
          <p>Cargando...</p>
          )
        : (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='col-span-2 h-full w-full'>
              <div
                className='bg-white overflow-hidden shadow rounded-3xl border drop-shadow'>
                <div className='px-4 py-5 sm:p-6 bg-gray-300'>
                  <h3 className='text-lg leading-6 font-medium text-black'>
                    <strong>INFORMAICON GENERAL</strong>
                  </h3>
                </div>

                <div className='border-t border-gray-200'>
                  <dl>
                    <div
                      className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 '>
                      <dt className='text-sm font-medium text-black'>
                        <strong>PASAJERO</strong>
                      </dt>
                      <dd
                        className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {data?.passengers?.name ?? 'No disponible'} (
                        {(data?.gender === 'Male' ? 'Hombre' : 'Mujer') ??
                          'No disponible'}
                        )
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className='border-t border-gray-200'>
                  <dl>
                    <div
                      className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-black'>
                        <strong>ORIGEN</strong>
                      </dt>
                      <dd
                        className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {data?.pickup_location ?? 'No disponible'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className='border-t border-gray-200'>
                  <dl>
                    <div
                      className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-black'>
                        <strong>DESTINO</strong>
                      </dt>
                      <dd
                        className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {data?.destination ?? 'No disponible'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className='border-t border-gray-200'>
                  <dl>
                    <div
                      className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-black'>
                        <strong>VALOR</strong>
                      </dt>
                      <dd
                        className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {Intl.NumberFormat('es-CO', {
                          style: 'currency',
                          currency: 'COP'
                        }).format(data?.final_price ?? 0)}
                      </dd>
                    </div>
                  </dl>
                </div>

                {data?.comments !== null && (
                  <div className='border-t border-gray-200'>
                    <dl>
                      <div
                        className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                        <dt className='text-sm font-medium text-black'>
                          <strong>COMENTARIO</strong>
                        </dt>
                        <dd
                          className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                          {data?.comments ?? 'No disponible'}
                        </dd>
                      </div>
                    </dl>
                  </div>
                )}

                <div className='border-t border-gray-200'>
                  <dl>
                    <div
                      className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-black'>
                        <strong>ACCIONES</strong>
                      </dt>
                      <dd
                        className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        <div className='flex flex-row space-x-4'>
                          <a
                            href={`https://wa.me/+57${
                              data?.passengers?.phone ?? ''
                            }`}
                            target='_blank'
                            rel='noreferrer'
                            className='px-3 py-2 text-sm font-medium'
                          >
                          <span>
                            <svg
                              width='24px'
                              height='24px'
                              viewBox='0 0 256 258'
                              version='1.1'
                              xmlns='http://www.w3.org/2000/svg'
                              preserveAspectRatio='xMidYMid'
                            >
                              <defs>
                                <linearGradient
                                  x1='49.9999726%'
                                  y1='100.000225%'
                                  x2='49.9999726%'
                                  y2='4.85578831e-05%'
                                  id='whatsappLinearGradient-1'
                                >
                                  <stop stopColor='#1FAF38' offset='0%'></stop>
                                  <stop
                                    stopColor='#60D669'
                                    offset='100%'
                                  ></stop>
                                </linearGradient>
                                <linearGradient
                                  x1='50.0000414%'
                                  y1='100.000108%'
                                  x2='50.0000414%'
                                  y2='-0.000129944756%'
                                  id='whatsappLinearGradient-2'
                                >
                                  <stop stopColor='#F9F9F9' offset='0%'></stop>
                                  <stop
                                    stopColor='#FFFFFF'
                                    offset='100%'
                                  ></stop>
                                </linearGradient>
                              </defs>
                              <g>
                                <path
                                  d='M5.46329987,127.456258 C5.45681909,149.133181 11.1210232,170.299417 21.890788,188.954998 L21.890788,188.954998 L4.43285541,252.697385 L69.6645263,235.593304 C87.6357369,245.388359 107.871333,250.558727 128.464668,250.563912 L128.464668,250.563912 L128.519107,250.563912 C196.334018,250.563912 251.537325,195.380046 251.565851,127.55347 L251.565851,127.55347 C251.578802,94.6855323 238.790922,63.7799755 215.557316,40.5282231 L215.557316,40.5282231 C192.327598,17.2777669 161.43241,4.46655548 128.513922,4.45229776 L128.513922,4.45229776 C60.6912344,4.45229776 5.49181531,59.6322745 5.46329987,127.456258'
                                  fill='url(#whatsappLinearGradient-1)'
                                ></path>
                                <path
                                  d='M1.07062531,127.416078 C1.06284837,149.873286 6.93054909,171.796478 18.0839762,191.11958 L18.0839762,191.11958 L0,257.147091 L67.5712334,239.429927 C86.1892261,249.581425 107.15067,254.933255 128.481518,254.941032 L128.481518,254.941032 L128.535957,254.941032 C198.783754,254.941032 255.970181,197.772751 256,127.518474 L256,127.518474 C256.011658,93.4697375 242.763642,61.4533745 218.700495,37.3681934 L218.700495,37.3681934 C194.63346,13.2856047 162.632651,0.0142577221 128.535957,0 L128.535957,0 C58.2751986,0 1.09914076,57.1592078 1.07062531,127.416078 L1.07062531,127.416078 Z M41.3098055,187.792346 L38.7874848,183.787222 C28.1810358,166.922929 22.5829356,147.435216 22.5907045,127.423855 L22.5907045,127.423855 C22.6140434,69.0294095 70.1376234,21.5213834 128.576138,21.5213834 L128.576138,21.5213834 C156.875124,21.5330488 183.472256,32.5646372 203.47584,52.5811829 L203.47584,52.5811829 C223.479424,72.5990247 234.486386,99.2091187 234.478613,127.510697 L234.478613,127.510697 C234.452686,185.906438 186.92781,233.420945 128.535957,233.420945 L128.535957,233.420945 L128.49448,233.420945 C109.481159,233.410576 90.8346512,228.305015 74.571775,218.656426 L74.571775,218.656426 L70.7014515,216.360933 L30.6035524,226.874058 L41.3098055,187.792346 Z'
                                  fill='url(#whatsappLinearGradient-2)'
                                ></path>
                                <path
                                  d='M96.6782434,74.1484502 C94.2920192,68.8445776 91.781364,68.7382928 89.5117939,68.6449695 C87.6544015,68.565904 85.5300009,68.5710189 83.4081926,68.5710189 C81.2837921,68.5710189 77.8334233,69.369521 74.9157749,72.5554738 C71.9955342,75.7427228 63.7675324,83.4470773 63.7675324,99.1163139 C63.7675324,114.786847 75.181487,129.928547 76.7718711,132.05554 C78.3648475,134.178645 98.8052363,167.362845 131.176746,180.128691 C158.081068,190.737732 163.556033,188.627589 169.395218,188.096165 C175.234404,187.566037 188.238742,180.394403 190.891975,172.957057 C193.546503,165.521006 193.546503,159.146509 192.750663,157.815356 C191.954823,156.488091 189.830423,155.690955 186.645766,154.099275 C183.459813,152.506298 167.802242,144.800648 164.883297,143.737799 C161.963057,142.676247 159.839952,142.146119 157.715552,145.334664 C155.592447,148.519321 149.492734,155.690955 147.634046,157.815356 C145.776654,159.943645 143.917965,160.209357 140.733309,158.61638 C137.547356,157.018219 127.289573,153.658582 115.121255,142.809751 C105.652831,134.367884 99.2614834,123.942897 97.4027949,120.754351 C95.5454026,117.569695 97.204483,115.84451 98.8013479,114.256719 C100.232305,112.82965 101.987301,110.538045 103.580277,108.679357 C105.169365,106.819372 105.699493,105.492108 106.761045,103.367707 C107.823894,101.242011 107.292469,99.382026 106.496629,97.7890496 C105.699493,96.1960732 99.5103455,80.4464749 96.6782434,74.1484502'
                                  fill='#FFFFFF'
                                ></path>
                              </g>
                            </svg>
                          </span>
                          </a>

                          <a
                            href={`tel:${data?.passengers?.phone ?? ''}`}
                            className='mt-2'
                          >
                          <span className='text-gray-900 dark:text-gray-200'>
                            <svg
                              width='30px'
                              height='30px'
                              className='fill-current'
                              viewBox='0 96 960 960'
                            >
                              <path
                                d='M795 936q-122 0-242.5-60T336 720q-96-96-156-216.5T120 261q0-19 13-32t32-13h140q14 0 24.5 9.5T343 251l27 126q2 14-.5 25.5T359 422L259 523q56 93 125.5 162T542 802l95-98q10-11 23-15.5t26-1.5l119 26q15 3 25 15t10 28v135q0 19-13 32t-32 13Z'></path>
                            </svg>
                          </span>
                          </a>
                        </div>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div
                className='bg-white overflow-hidden shadow rounded-3xl border mt-3 drop-shadow'>
                <div className='px-4 py-5 sm:p-6 bg-gray-300 '>
                  <h3 className='text-lg leading-6 font-medium text-black'>
                    <strong>INFORMAICON CONDUCTOR</strong>
                  </h3>
                </div>

                <div className='border-t border-gray-200'>
                  <dl>
                    <div
                      className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-black'>
                        <strong>NOMBRE</strong>
                      </dt>
                      <dd
                        className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {data?.drivers?.name ?? 'No disponible'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className='border-t border-gray-200'>
                  <dl>
                    <div
                      className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-black'>
                        <strong>VEHICULO</strong>
                      </dt>
                      <dd
                        className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {data?.drivers?.vehicles !== null
                          ? `(${data?.drivers?.vehicles.license_plate ?? ''}), (${
                            data?.drivers?.vehicles.brand ?? ''
                          }) (${data?.drivers?.vehicles.line ?? ''}) (${
                            data?.drivers?.vehicles.model ?? ''
                          }) - CC (${
                            data?.drivers?.vehicles.engine_displacement ?? ''
                          })`
                          : 'No disponible'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className='border-t border-gray-200'>
                  <dl>
                    <div
                      className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-black'>
                        <strong>ACCIONES</strong>
                      </dt>
                      <dd
                        className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        <div className='flex flex-row space-x-4'>
                          <a
                            href={`https://wa.me/+57${
                              data?.drivers?.phone ?? ''
                            }`}
                            target='_blank'
                            rel='noreferrer'
                            className='px-3 py-2 text-sm font-medium'
                          >
                          <span>
                            <svg
                              width='24px'
                              height='24px'
                              viewBox='0 0 256 258'
                              version='1.1'
                              xmlns='http://www.w3.org/2000/svg'
                              preserveAspectRatio='xMidYMid'
                            >
                              <defs>
                                <linearGradient
                                  x1='49.9999726%'
                                  y1='100.000225%'
                                  x2='49.9999726%'
                                  y2='4.85578831e-05%'
                                  id='whatsappLinearGradient-1'
                                >
                                  <stop stopColor='#1FAF38' offset='0%'></stop>
                                  <stop
                                    stopColor='#60D669'
                                    offset='100%'
                                  ></stop>
                                </linearGradient>
                                <linearGradient
                                  x1='50.0000414%'
                                  y1='100.000108%'
                                  x2='50.0000414%'
                                  y2='-0.000129944756%'
                                  id='whatsappLinearGradient-2'
                                >
                                  <stop stopColor='#F9F9F9' offset='0%'></stop>
                                  <stop
                                    stopColor='#FFFFFF'
                                    offset='100%'
                                  ></stop>
                                </linearGradient>
                              </defs>
                              <g>
                                <path
                                  d='M5.46329987,127.456258 C5.45681909,149.133181 11.1210232,170.299417 21.890788,188.954998 L21.890788,188.954998 L4.43285541,252.697385 L69.6645263,235.593304 C87.6357369,245.388359 107.871333,250.558727 128.464668,250.563912 L128.464668,250.563912 L128.519107,250.563912 C196.334018,250.563912 251.537325,195.380046 251.565851,127.55347 L251.565851,127.55347 C251.578802,94.6855323 238.790922,63.7799755 215.557316,40.5282231 L215.557316,40.5282231 C192.327598,17.2777669 161.43241,4.46655548 128.513922,4.45229776 L128.513922,4.45229776 C60.6912344,4.45229776 5.49181531,59.6322745 5.46329987,127.456258'
                                  fill='url(#whatsappLinearGradient-1)'
                                ></path>
                                <path
                                  d='M1.07062531,127.416078 C1.06284837,149.873286 6.93054909,171.796478 18.0839762,191.11958 L18.0839762,191.11958 L0,257.147091 L67.5712334,239.429927 C86.1892261,249.581425 107.15067,254.933255 128.481518,254.941032 L128.481518,254.941032 L128.535957,254.941032 C198.783754,254.941032 255.970181,197.772751 256,127.518474 L256,127.518474 C256.011658,93.4697375 242.763642,61.4533745 218.700495,37.3681934 L218.700495,37.3681934 C194.63346,13.2856047 162.632651,0.0142577221 128.535957,0 L128.535957,0 C58.2751986,0 1.09914076,57.1592078 1.07062531,127.416078 L1.07062531,127.416078 Z M41.3098055,187.792346 L38.7874848,183.787222 C28.1810358,166.922929 22.5829356,147.435216 22.5907045,127.423855 L22.5907045,127.423855 C22.6140434,69.0294095 70.1376234,21.5213834 128.576138,21.5213834 L128.576138,21.5213834 C156.875124,21.5330488 183.472256,32.5646372 203.47584,52.5811829 L203.47584,52.5811829 C223.479424,72.5990247 234.486386,99.2091187 234.478613,127.510697 L234.478613,127.510697 C234.452686,185.906438 186.92781,233.420945 128.535957,233.420945 L128.535957,233.420945 L128.49448,233.420945 C109.481159,233.410576 90.8346512,228.305015 74.571775,218.656426 L74.571775,218.656426 L70.7014515,216.360933 L30.6035524,226.874058 L41.3098055,187.792346 Z'
                                  fill='url(#whatsappLinearGradient-2)'
                                ></path>
                                <path
                                  d='M96.6782434,74.1484502 C94.2920192,68.8445776 91.781364,68.7382928 89.5117939,68.6449695 C87.6544015,68.565904 85.5300009,68.5710189 83.4081926,68.5710189 C81.2837921,68.5710189 77.8334233,69.369521 74.9157749,72.5554738 C71.9955342,75.7427228 63.7675324,83.4470773 63.7675324,99.1163139 C63.7675324,114.786847 75.181487,129.928547 76.7718711,132.05554 C78.3648475,134.178645 98.8052363,167.362845 131.176746,180.128691 C158.081068,190.737732 163.556033,188.627589 169.395218,188.096165 C175.234404,187.566037 188.238742,180.394403 190.891975,172.957057 C193.546503,165.521006 193.546503,159.146509 192.750663,157.815356 C191.954823,156.488091 189.830423,155.690955 186.645766,154.099275 C183.459813,152.506298 167.802242,144.800648 164.883297,143.737799 C161.963057,142.676247 159.839952,142.146119 157.715552,145.334664 C155.592447,148.519321 149.492734,155.690955 147.634046,157.815356 C145.776654,159.943645 143.917965,160.209357 140.733309,158.61638 C137.547356,157.018219 127.289573,153.658582 115.121255,142.809751 C105.652831,134.367884 99.2614834,123.942897 97.4027949,120.754351 C95.5454026,117.569695 97.204483,115.84451 98.8013479,114.256719 C100.232305,112.82965 101.987301,110.538045 103.580277,108.679357 C105.169365,106.819372 105.699493,105.492108 106.761045,103.367707 C107.823894,101.242011 107.292469,99.382026 106.496629,97.7890496 C105.699493,96.1960732 99.5103455,80.4464749 96.6782434,74.1484502'
                                  fill='#FFFFFF'
                                ></path>
                              </g>
                            </svg>
                          </span>
                          </a>

                          <a
                            href={`tel:${data?.drivers?.phone ?? ''}`}
                            className='mt-2'
                          >
                          <span className='text-gray-900 dark:text-gray-200'>
                            <svg
                              width='30px'
                              height='30px'
                              className='fill-current'
                              viewBox='0 96 960 960'
                            >
                              <path
                                d='M795 936q-122 0-242.5-60T336 720q-96-96-156-216.5T120 261q0-19 13-32t32-13h140q14 0 24.5 9.5T343 251l27 126q2 14-.5 25.5T359 422L259 523q56 93 125.5 162T542 802l95-98q10-11 23-15.5t26-1.5l119 26q15 3 25 15t10 28v135q0 19-13 32t-32 13Z'></path>
                            </svg>
                          </span>
                          </a>
                        </div>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div
              className='bg-white overflow-hidden shadow rounded-3xl col-span-2 border h-full w-full drop-shadow'>
              <div className='px-4 py-5 sm:p-6 bg-gray-300'>
                <h3 className='text-lg leading-6 font-medium text-black'>
                  <strong>INFORMAICON DEL VIAJE</strong>
                </h3>
              </div>

              <div className='border-t border-gray-200'>
                <dl>
                  <div
                    className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'><strong>#</strong></dt>
                    <dd
                      className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {id}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className='border-t border-gray-200'>
                <dl>
                  <div
                    className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-black'>
                      <strong>HORA DE SOLICITUD</strong>
                    </dt>
                    <dd
                      className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {Intl.DateTimeFormat('es-CO', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                        timeZone: 'America/Bogota'
                      }).format(new Date(data?.request_time as string))}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className='border-t border-gray-200'>
                <dl>
                  <div
                    className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-black'>
                      <strong>ESTADO</strong>
                    </dt>
                    <dd
                      className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {data?.status !== null ? data?.status : 'No disponible'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className='border-t border-gray-200'>
                <dl>
                  <div
                    className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-black'>
                      <strong>ALIADO</strong>
                    </dt>
                    <dd
                      className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {data?.affiliate_id !== null ? 'Si' : 'No'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className='border-t border-gray-200'>
                <dl>
                  <div
                    className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-black'>
                      <strong>TIEMPO DE ESPERA</strong>
                    </dt>
                    <dd
                      className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {waitingTimeMinutes > 0
                        ? `${waitingTimeHours}h ${waitingTimeMinutes}m`
                        : 'No disponible'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className='border-t border-gray-200'>
                <dl>
                  <div
                    className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-black'>
                      <strong>DURACION DE VIAJE</strong>
                    </dt>
                    <dd
                      className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {data?.status !== null
                        ? `${rideTimeHours}h ${rideTimeMinutes}m`
                        : 'No disponible'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className='border-t border-gray-200'>
                <dl>
                  <div
                    className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-black'>
                      <strong>PUNTUACION DE VIAJE</strong>
                    </dt>
                    <dd
                      className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {
                        (data !== undefined && data.rides?.driver_ratings?.length > 0) ? data.rides.driver_ratings[0].rating : 'No disponible'
                      }
                    </dd>
                  </div>
                </dl>
              </div>

              <div className='border-t border-gray-200'>
                <dl>
                  <div
                    className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-black'>
                      <strong>VALOR DE VIAJE</strong>
                    </dt>
                    <dd
                      className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {
                        Intl.NumberFormat('es-CO', {
                          style: 'currency',
                          currency: 'COP'
                        }).format(data?.final_price ?? 0)
                      }
                    </dd>

                  </div>
                </dl>
              </div>
              <div className='flex h-12 w-2/5 text-center m-3'>
              <button className=' bg-yellow-400 rounded-xl p-1 text-xs'> <strong>VER RECORRIDO</strong> </button>
              </div>
            </div>
          </div>
          )}
    </main>
  )
}

export default RideDetails
