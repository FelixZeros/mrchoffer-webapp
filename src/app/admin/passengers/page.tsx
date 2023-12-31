'use client'

import WhatsappIcon from '@/components/icons/whatsapp'
import { type Passenger } from '@/types'
import { useQuery } from '@tanstack/react-query'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState
} from '@tanstack/react-table'
import axios from 'axios'
import NextLink from 'next/link'
import React, { useMemo, useState, type FC, useEffect } from 'react'
import { FiltersPassengers } from './components/filters'
import { Pagination } from '@/components/pagination/pagination'
import { PhoneIcon } from '@/components/icons/phone'
import { EyeIcon } from '@/components/icons/eye'

const PassengersPage: FC = () => {
  const columns = useMemo<Array<ColumnDef<Passenger>>>(
    () => [
      {
        header: 'id',
        accessorKey: 'id',
        cell: info => info.getValue()
      },
      {
        header: 'Whatsapp',
        accessorKey: 'phoneNumber',
        cell: info => info.getValue()
      },
      {
        header: 'Genero',
        accessorKey: 'gender',
        cell: info => (info.getValue() === 'Male' ? 'Hombre' : 'Mujer')
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

            <NextLink href={`/admin/passengers/${info.row.original.id}`}>
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

  const fetchDataOptions = {
    pageIndex,
    pageSize
  }

  const fetchPassengers = async (options: {
    pageIndex: number
    pageSize: number
  }) => {
    const { data } = await axios.get(
      `/api/passengers?page=${options.pageIndex}&pageSize=${options.pageSize}`
    )

    return data
  }

  const dataQuery = useQuery(
    ['passengers', fetchDataOptions],
    async () => await fetchPassengers(fetchDataOptions),
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

  const [passengers, setPassenger] = useState<any>([])

  const getPassengers = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API + 'get-trips'}`)
      .then(response => setPassenger(response.data))
  }

  useEffect(() => {
    console.log(passengers)
  }, [passengers])

  useEffect(() => {
    getPassengers()
    setInterval(() => getPassengers(), 4000)
  }, [])
  const table = useReactTable({
    data: passengers ?? defaultData,
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

  for (let page = 0; page < totalPages; page++) {
    const isCurrentPage = page === currentPage

    if (page === 0 || page === totalPages) {
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
  }
  return (
    <main className='items-center w-full h-full '>
      <div className='p-1 h-[10%]  justify-center items-center'>
        <FiltersPassengers />
      </div>

      <div className='  w-full h-[90%] p-0 items-center justify-center overflow-y-auto overflow-x-auto'>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        table={table}
      />
    </main>
  )
}

export default PassengersPage
