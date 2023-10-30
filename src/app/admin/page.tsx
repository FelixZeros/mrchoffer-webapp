'use client'

import { EyeIcon } from '@/components/icons/eye'
import { PhoneIcon } from '@/components/icons/phone'
import WhatsappIcon from '@/components/icons/whatsapp'
import { DriverStatus } from '@/types'
import { Tab } from '@headlessui/react'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type PaginationState,
  useReactTable
} from '@tanstack/react-table'
import axios from 'axios'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { type FC, useMemo, useState, useEffect, useContext } from 'react'
import {
  BlockedFilters,
  FiltersGenerics,
  FiltersRequest
} from './components/filters'
import { Pagination } from '@/components/pagination/pagination'
import { AuthContext } from '@/auth/Auth-context'
import { Driver } from '@/interfaces/output'

function classNames(...classes: Array<string | boolean>) {
  return classes.filter(Boolean).join(' ')
}

const AdminPage = () => {
  const columns = useMemo<Array<ColumnDef<Driver>>>(
    () => [
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
              <WhatsappIcon />
            </a>

            <a
              href={`tel:${info.row.original.phone}`}
              target='_blank'
              className='px-2 py-1 text-sm font-medium leading-5 text-white hover:bg-slate-100 rounded-md'
              rel='noreferrer'
            >
              <PhoneIcon />
            </a>

            <NextLink href={`/admin/drivers/${info.row.original.id}`}>
              <EyeIcon />
            </NextLink>
          </div>
        )
      }
    ],
    []
  )

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const router = useRouter()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user?.type === 'admin') router.replace('admin/empresas')
  }, [user])

  const [drivers, setDrivers] = useState<Driver[]>([])
  const defaultData = useMemo(() => drivers, [drivers])

  const handleFilters = (filter: string) => {
    switch (filter) {
      case 'requests':
        getDrivers()
        break
      case 'actives':
        setDrivers(defaultData.filter(driver => driver.status === 1))
        break
      case 'refused':
        setDrivers(defaultData.filter(driver => driver.status === 2))
        break
    }
  }

  const getDrivers = async () => {
    if (user?.company)
      await axios
        .get(
          `${
            process.env.NEXT_PUBLIC_API +
            'request-driver-company/' +
            user?.company.id
          }`
        )
        .then(res => {
          setDrivers([])
          res.data.forEach((user: any) =>
            setDrivers(prev => [...prev, user.driver])
          )
        })
  }

  useEffect(() => {
    getDrivers()
  }, [])

  const [filter, setFilter] = useState<DriverStatus>(DriverStatus.pending)

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

  const table = useReactTable({
    data: drivers ?? defaultData,
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
    user && (
      <main className='grid'>
        <Tab.Group>
          <Tab.List className='text-sm border justify-self-center shadow rounded-lg w-fit space-x-12 px-16 font-medium text-center text-black bg-white'>
            <Tab
              onClick={() => {
                handleFilters('requests')
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
                handleFilters('actives')
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
              <FiltersRequest />
            </Tab.Panel>
            <Tab.Panel className='p-3'>
              <FiltersGenerics />
            </Tab.Panel>
            <Tab.Panel className='p-3'>
              <FiltersRequest />
            </Tab.Panel>
            <Tab.Panel className='p-3'>
              <FiltersGenerics />
            </Tab.Panel>
            <Tab.Panel className='p-3'>
              <BlockedFilters />
            </Tab.Panel>
          </Tab.Panels>
          <div className='relative overflow-x-auto rounded-xl shadow'>
            <table className='w-full text-sm text-center'>
              <thead className='text-xs  bg-gray-50 text-black '>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th scope='col' className='px-2 py-2' key={header.id}>
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
                    className='text-black bg-white border- hover:bg-gray-50'
                  >
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className='px-2 py-2 font-medium  whitespace-nowrap'
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
        </Tab.Group>
      </main>
    )
  )
}

export default AdminPage
