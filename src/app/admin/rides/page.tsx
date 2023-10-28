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
import { EyeIcon } from '@/components/icons/eye'
import {
  ClosedFilters,
  HistoryFilters,
  InputFilters
} from './components/filters'

export interface Trip {
  id: number
  driverId: null
  phoneNumber: string
  date: string
  status: number
  origin: string
  destination: string
  distance: string
  price: number
  genderPassenger: string
  comment: string
  paymentMethod: string
  startTime: string
  endTime: null
}

const RidesPage: FC = () => {
  const router = useRouter()
  function classNames(...classes: Array<string | boolean>) {
    return classes.filter(Boolean).join(' ')
  }
  const columns = useMemo<Array<ColumnDef<Trip>>>(
    () => [
      {
        header: 'Id',
        accessorKey: 'id',
        cell: info => info.getValue()
      },
      {
        header: 'Hora de solicitud',
        accessorKey: 'startTime',
        cell: info => info.getValue()
      },
      {
        header: 'Pasajero',
        accessorKey: 'name',
        cell: info => info.getValue()
      },
      {
        header: 'Conductor',
        accessorKey: 'driverId',
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
          >
            <EyeIcon />
          </button>
        )
      }
    ],
    []
  )
  useEffect(() => {
    if (user?.type === 'admin') router.replace('admin/empresas')
  }, [])

const [filter, setFilter] = useState<DriverStatus>(DriverStatus.pending)
const [trips, setTrips] = useState<any>([])

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

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
    data: trips,
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

  const totalPages = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex
  const pageButtons = []
  const { user } = useContext(AuthContext)

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
            className={({ selected }) =>
              classNames(
                'inline-block p-4 border-b-2 outline-none font-bold border-transparent rounded-t-lg hover:text-[--main-yellow] hover:border-[--main-yellow]',
                selected &&
                  'text-[--main-yellow] border-[--main-yellow] border-b-3'
              )
            }
          >
            Activas
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'inline-block p-4 border-b-2 outline-none font-bold border-transparent rounded-t-lg hover:text-[--main-yellow] hover:border-[--main-yellow]',
                selected &&
                  'text-[--main-yellow] border-[--main-yellow] border-b-3'
              )
            }
          >
            Cerradas
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'inline-block p-4 border-b-2 outline-none font-bold border-transparent rounded-t-lg hover:text-[--main-yellow] hover:border-[--main-yellow]',
                selected &&
                  'text-[--main-yellow] border-[--main-yellow] border-b-3'
              )
            }
          >
            Historial
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className='p-3'>
            <InputFilters />
          </Tab.Panel>
          <Tab.Panel className='p-3'>
            <ClosedFilters />
          </Tab.Panel>
          <Tab.Panel className='p-3'>
            <HistoryFilters />
          </Tab.Panel>
        </Tab.Panels>
        <>
          <div className='relative overflow-x-auto rounded-xl shadow '>
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
      </Tab.Group>
    </main>
  )
}

export default RidesPage
