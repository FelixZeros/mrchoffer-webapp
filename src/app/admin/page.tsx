'use client'

import {EyeIcon} from '@/components/icons/eye'
import {LeftArrow} from '@/components/icons/left-arrow'
import {PhoneIcon} from '@/components/icons/phone'
import {RightArrow} from '@/components/icons/right-arrow'
import WhatsappIcon from '@/components/icons/whatsapp'
import {type Driver, DriverStatus} from '@/types'
import {Tab} from '@headlessui/react'
import {Inter} from '@next/font/google'
import {useSupabaseClient} from '@supabase/auth-helpers-react'
import {useQuery} from '@tanstack/react-query'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type PaginationState,
  useReactTable
} from '@tanstack/react-table'
import axios from 'axios'
import NextLink from 'next/link'
import {type FC, useMemo, useState} from 'react'
import {Filters} from './components/filter'

const inter = Inter({subsets: ['latin']})

function classNames(...classes: Array<string | boolean>) {
  return classes.filter(Boolean).join(' ')
}

const AdminPage: FC = () => {
  const columns = useMemo<Array<ColumnDef<Driver>>>(
    () => [
      {
        header: 'Cédula',
        accessorKey: 'id',
        cell: info => info.getValue()
      },
      {
        header: 'Nombre',
        accessorKey: 'name',
        cell: info => info.getValue()
      },
      {
        header: 'Ciudad',
        accessorKey: 'city',
        cell: info => info.getValue()
      },
      {
        id: 'rating',
        header: 'Calificación',
        accessorKey: 'rating',
        cell: info => info.getValue()
      },
      {
        header: 'Número de carreras',
        accessorKey: 'rides',
        cell: info => info.getValue()
      },
      {
        header: 'Acciones',
        cell: info => (
          <div className='flex items-center justify-center space-x-3'>
            <a
              href={`https://wa.me/+57${info.row.original.phone}`}
              target='_blank'
              className='px-2 py-1 text-sm font-medium leading-5 text-white hover:bg-slate-100 rounded-md'
              rel='noreferrer'
            >
              <WhatsappIcon/>
            </a>

            <a
              href={`tel:${info.row.original.phone}`}
              target='_blank'
              className='px-2 py-1 text-sm font-medium leading-5 text-white hover:bg-slate-100 rounded-md'
              rel='noreferrer'
            >
              <PhoneIcon/>
            </a>

            <NextLink href={`/admin/drivers/${info.row.original.id}`}>
              <EyeIcon/>
            </NextLink>
          </div>
        )
      }
    ],
    []
  )

  const [{pageIndex, pageSize}, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const fetchDataOptions = {
    pageIndex,
    pageSize
  }

  const supabase = useSupabaseClient()
  const fetchDrivers = async (
    filter: DriverStatus,
    options: {
      pageIndex: number
      pageSize: number
    }
  ) => {
    const {data} = await axios.get<Driver[]>(
      `/api/drivers?status=${filter}&page=${options.pageIndex}&pageSize=${options.pageSize}`
    )

    const transformedData = data.map(driver => {
      const {data: photoUrl} = supabase.storage
        .from('avatars')
        .getPublicUrl(driver.photo_url)
      return {
        ...driver,
        photo_url: photoUrl.publicUrl
      }
    })

    return transformedData
  }

  const [filter, setFilter] = useState<DriverStatus>(DriverStatus.pending)
  const {data, isLoading} = useQuery(
    ['drivers', filter, fetchDataOptions],
    async () => await fetchDrivers(filter, fetchDataOptions),
    {
      keepPreviousData: true
    }
  )

  const defaultData = useMemo(() => [], [])

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    state: {
      pagination,
      columnVisibility: {
        id: false
      }
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true
  })

  return (
    <main className='grid'>
      <Tab.Group>
        <Tab.List
          className='text-sm border justify-self-center shadow rounded-lg w-fit space-x-12 px-16 font-medium text-center text-black bg-white'>
          <Tab
            onClick={() => {
              setFilter(DriverStatus.pending)
            }}
            className={({selected}) =>
              classNames(
                'inline-block p-4 border-b-2 outline-none font-bold border-transparent rounded-t-lg hover:text-[--main-yellow] hover:border-[--main-yellow]',
                selected &&
                'text-[--main-yellow] border-[--main-yellow] border-b-3'
              )
            }
          >
            Solicitudes
          </Tab>
          <Tab
            onClick={() => {
              setFilter(DriverStatus.accepted)
            }}
            className={({selected}) =>
              classNames(
                'inline-block p-4 border-b-2 outline-none font-bold border-transparent rounded-t-lg hover:text-[--main-yellow] hover:border-[--main-yellow]',
                selected &&
                'text-[--main-yellow] border-[--main-yellow] border-b-3'
              )
            }
          >
            Activos
          </Tab>
          <Tab
            onClick={() => {
              setFilter(DriverStatus.rejected)
            }}
            className={({selected}) =>
              classNames(
                'inline-block p-4 border-b-2 outline-none font-bold border-transparent rounded-t-lg hover:text-[--main-yellow] hover:border-[--main-yellow]',
                selected &&
                'text-[--main-yellow] border-[--main-yellow] border-b-3'
              )
            }
          >
            Rechazados
          </Tab>
          <Tab
            onClick={() => {
              setFilter(DriverStatus.archived)
            }}
            className={({selected}) =>
              classNames(
                'inline-block p-4 border-b-2 outline-none font-bold border-transparent rounded-t-lg hover:text-[--main-yellow] hover:border-[--main-yellow]',
                selected &&
                'text-[--main-yellow] border-[--main-yellow] border-b-3'
              )
            }
          >
            Archivados
          </Tab>
          <Tab
            onClick={() => {
              setFilter(DriverStatus.archived)
            }}
            className={({selected}) =>
              classNames(
                'inline-block p-4 border-b-2 outline-none font-bold border-transparent rounded-t-lg hover:text-[--main-yellow] hover:border-[--main-yellow]',
                selected &&
                'text-[--main-yellow] border-[--main-yellow] border-b-3'
              )
            }
          >
            Inhabilitados
          </Tab>
          <Tab
            onClick={() => {
              setFilter(DriverStatus.archived)
            }}
            className={({selected}) =>
              classNames(
                'inline-block p-4 border-b-2 outline-none font-bold border-transparent rounded-t-lg hover:text-[--main-yellow] hover:border-[--main-yellow]',
                selected &&
                'text-[--main-yellow] border-[--main-yellow] border-b-3'
              )
            }
          >
            Bloqueados
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className='p-3'></Tab.Panel>
          <Tab.Panel className='p-3'></Tab.Panel>
          <Tab.Panel className='p-3'></Tab.Panel>
          <Tab.Panel className='p-3'></Tab.Panel>
        </Tab.Panels>
        <Filters/>
        {isLoading && <div>Cargando...</div>}
        {!isLoading && data !== undefined && (
          <>
            <div className='relative overflow-x-auto rounded-xl shadow'>
              <table className='w-full text-sm text-center '>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th scope='col' className='px-6 py-3' key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr
                    key={row.id}
                    className='bg-white border- hover:bg-gray-50'
                  >
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap'
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                </tbody>
              </table>
            </div>

            <div className='h-2'/>

            <nav className='flex justify-end'>
              <ul className='inline-flex  items-center -space-x-px'>
                <li>
                  <button
                    onClick={() => {
                      table.previousPage()
                    }}
                    className='flex items-center gap-1 px-3 py-2 ml-0 leading-tight rounded-l-lg text-black bg-[--main-yellow]'
                  >
                    <LeftArrow/>
                    Anterior
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      table.nextPage()
                    }}
                    className='flex items-center gap-1 px-3 py-2 leading-tight rounded-r-lg text-black bg-[--main-yellow]'
                  >
                    Siguiente
                    <RightArrow/>
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </Tab.Group>
    </main>
  )
}

export default AdminPage
