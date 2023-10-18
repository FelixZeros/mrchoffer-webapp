'use client'

import {type RideHistory} from '@/types'
import {Inter} from '@next/font/google'
import {useQuery} from '@tanstack/react-query'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState
} from '@tanstack/react-table'
import axios from 'axios'
import {Tab} from '@headlessui/react'
import {useRouter} from 'next/navigation'
import React, {useMemo, useState, type FC} from 'react'
import {
  ClosedFilters, HistoryFilters,
  InputFilters
} from "@/app/admin/rides/components/filters";
import {LeftArrow} from "@/components/icons/left-arrow";
import {RightArrow} from "@/components/icons/right-arrow";
import {Pagination} from "@/components/pagination/pagination";


const inter = Inter({subsets: ['latin']})

const RidesPage: FC = () => {
  const router = useRouter()

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

  const [{pageIndex, pageSize}, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const fetchDataOptions = {
    pageIndex,
    pageSize
  }

  const fetchRides = async (options: {
    pageIndex: number
    pageSize: number
  }) => {
    const {data} = await axios.get(
      `/api/rides?page=${options.pageIndex}&pageSize=${options.pageSize}`
    )
    return data
  }

  const dataQuery = useQuery(
    ['rides', fetchDataOptions],
    async () => await fetchRides(fetchDataOptions),
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
    data: dataQuery.data?.rides ?? defaultData,
    columns,
    pageCount: dataQuery.data?.rides?.length ?? -1,
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true
  })

  function classNames(...classes: Array<string | boolean>) {
    return classes.filter(Boolean).join(' ')
  }

  const totalPages = table.getPageCount(); // Obtiene el número total de páginas
  const currentPage = table.getState().pagination.pageIndex; // Obtiene la página actual

  const pageButtons = [];

// Genera botones para cada número de página
  for (let page = 0; page < totalPages; page++) {
    const isCurrentPage = page === currentPage;

    pageButtons.push(
      <li key={page}>
        <button
          onClick={() => table.setPageIndex(page)}
          className={`flex items-center gap-1 px-3 py-2 leading-tight rounded-l-lg rounded-r-lg border-2  border-[--main-yellow] text-black bg-[--main-yellow] m-0.5 ${isCurrentPage ? 'bg-amber-50' : ''}`}
        >
          {page + 1}
        </button>
      </li>
    );
  }
  return (
    <main className='grid'>
      <Tab.Group>
        <Tab.List
          className='text-sm border justify-self-center shadow rounded-lg w-fit space-x-12 px-16 font-medium text-center text-black bg-white'>
          <Tab
            className={({selected}) =>
              classNames(
                'inline-block p-4 border-b-2 outline-none font-bold border-transparent rounded-t-lg hover:text-[--main-yellow] hover:border-[--main-yellow]',
                selected &&
                'text-[--main-yellow] border-[--main-yellow] border-b-3'
              )
            }
          >
            Entradas
          </Tab>
          <Tab
            className={({selected}) =>
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
            className={({selected}) =>
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
            <InputFilters/>
          </Tab.Panel>
          <Tab.Panel className='p-3'>
            <ClosedFilters/>
          </Tab.Panel>
          <Tab.Panel className='p-3'>
            <HistoryFilters/>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-center text-black overflow-auto'>
          <thead className='text-x bg-gray-50 '>
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
              className='bg-white border-b hover:bg-gray-50 '
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <div className='h-2'/>

      <Pagination totalPages={totalPages} currentPage={currentPage}
                  table={table}/>
    </main>
  )
}

export default RidesPage
