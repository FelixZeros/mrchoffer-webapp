'use client'

import { type RideHistory } from '@/types'
import { Inter } from '@next/font/google'
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
import { useMemo, useState, type FC } from 'react'
import { FiltersRides } from './components/filters'

const inter = Inter({ subsets: ['latin'] })

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

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
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
    const { data } = await axios.get(
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
           Entradas
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
          <Tab.Panel className='p-3'></Tab.Panel>
          <Tab.Panel className='p-3'></Tab.Panel>
          <Tab.Panel className='p-3'></Tab.Panel>
          <Tab.Panel className='p-3'></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

        <FiltersRides/>

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
                className='bg-white border-b  hover:bg-gray-50'
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

      <div className='h-2' />

      <nav aria-label='Page navigation example'>
        <ul className='inline-flex items-center -space-x-px'>
          <li>
            <button
              onClick={() => {
                table.previousPage()
              }}
              className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              <span className='sr-only'>Anterior</span>
              <svg
                aria-hidden='true'
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </li>
          {}
          <li>
            <button
              onClick={() => {
                table.nextPage()
              }}
              className='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              <span className='sr-only'>Siguiente</span>
              <svg
                aria-hidden='true'
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </main>
  )
}

export default RidesPage
