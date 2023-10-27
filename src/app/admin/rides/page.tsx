'use client'

import { Driver, DriverStatus, type RideHistory } from '@/types'
import { useQuery } from '@tanstack/react-query'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState
} from '@tanstack/react-table'
import axios from 'axios'
import { Tab } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState, type FC, useContext, useEffect } from 'react'
import { Pagination } from '@/components/pagination/pagination'
import { AuthContext } from '@/auth/Auth-context'
import { FiltersGenerics, BlockedFilters } from '../components/filters'

const RidesPage: FC = () => {
  const router = useRouter()
  function classNames(...classes: Array<string | boolean>) {
    return classes.filter(Boolean).join(' ')
  }
  const columns = useMemo<Array<ColumnDef<RideHistory>>>(
    () => [
      {
        header: 'Id',
        accessorKey: 'id',
        cell: info => info.getValue()
      },
      {
        header: 'Hora de solicitud',
        accessorKey: 'request_time',
        cell: info =>
          Intl.DateTimeFormat('es-CO', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'America/Bogota'
          }).format(new Date(info.getValue() as string))
      },
      {
        header: 'Pasajero',
        accessorKey: 'passengers.name',
        cell: info => info.getValue()
      },
      {
        header: 'Conductor',
        accessorKey: 'drivers.name',
        cell: info => info.getValue() ?? 'No disponible'
      },
      {
        header: 'Estado',
        accessorKey: 'status',
        cell: info =>
          info.getValue() !== null ? info.getValue() : 'No disponible'
      },
      {
        id: 'actions',
        cell: info => (
          <button
            onClick={e => {
              e.stopPropagation()
              router.push(`/admin/rides/${info.row.original.id}`)
            }}
            className='text-blue-500 hover:text-blue-700'
          >
            Ver
          </button>
        )
      }
    ],
    []
  )

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const fetchDataOptions = {
    pageIndex,
    pageSize
  }

  const fetchDrivers = async (
    filter: DriverStatus,
    options: {
      pageIndex: number
      pageSize: number
    }
  ) => {
    const { data } = await axios.get<Driver[]>(
      `/api/drivers?status=${filter}&page=${options.pageIndex}&pageSize=${options.pageSize}`
    )

    /*
    const transformedData = data.map(driver => {
       const { data: photoUrl } = supabase.storage 
      .from('avatars')
      .getPublicUrl(driver.photo_url)
      return {
          ...driver,
          photo_url: photoUrl.publicUrl
        }
    })
    
    return transformedData
    */
  }

  const [filter, setFilter] = useState<DriverStatus>(DriverStatus.pending)
  const { data, isLoading } = useQuery(
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

  const [trips, setTrips] = useState<any>([])
  const getTrips = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API + 'get-trips'}`)
      .then(response => setTrips(response.data))
  }

  useEffect(() => {
    getTrips()
    const interval = setInterval(() => getTrips(), 4000)
    return clearInterval(interval)
  }, [])

  const table = useReactTable({
    data: trips?? defaultData,
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

  const totalPages = table.getPageCount() // Obtiene el número total de páginas
  const currentPage = table.getState().pagination.pageIndex // Obtiene la página actual

  const pageButtons = []
  const { user } = useContext(AuthContext)
  useEffect(() => {
    if (user?.type === 'admin') router.replace('admin/empresas')
  }, [])

  for (let page = 0; page < totalPages; page++) {
    const isCurrentPage = page === currentPage

    pageButtons.push(
      <li key={page}>
        <button
          onClick={() => table.setPageIndex(page)}
          className={`flex items-center gap-1 px-3 py-2 leading-tight rounded-l-lg rounded-r-lg border-2  border-[--main-yellow] text-black bg-[--main-yellow] m-0.5 ${
            isCurrentPage ? 'bg-amber-50' : ''
          }`}
        >
          {page + 1}
        </button>
      </li>
    )
  }
  return (
    <main className='grid'>
      <Tab.Group>
        <Tab.List className='text-sm border justify-self-center shadow rounded-lg w-fit space-x-12 px-16 font-medium text-center text-black bg-white'>
          <Tab
            onClick={() => {
              setFilter(DriverStatus.pending)
            }}
            className={({ selected }) =>
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
            className={({ selected }) =>
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
            className={({ selected }) =>
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
            className={({ selected }) =>
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
            className={({ selected }) =>
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
            className={({ selected }) =>
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
          <Tab.Panel className='p-3'>
            <FiltersGenerics />
          </Tab.Panel>
          <Tab.Panel className='p-3'>
            <FiltersGenerics />
          </Tab.Panel>
          <Tab.Panel className='p-3'>
            <FiltersGenerics />
          </Tab.Panel>
          <Tab.Panel className='p-3'>
            <FiltersGenerics />
          </Tab.Panel>
          <Tab.Panel className='p-3'>
            <FiltersGenerics />
          </Tab.Panel>
          <Tab.Panel className='p-3'>
            <BlockedFilters />
          </Tab.Panel>
        </Tab.Panels>
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

            <div className='h-2' />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              table={table}
            />
          </>
        )}
      </Tab.Group>
    </main>
  )
}

export default RidesPage
