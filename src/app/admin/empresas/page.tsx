'use client'
import { Company, Passenger, RideHistory } from '@/types'
import { useQuery } from '@tanstack/react-query'
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { FiltersAdmin } from './components/filters'

export default function EnterprisePage() {
  const router = useRouter()

  const columns = useMemo<Array<ColumnDef<Company>>>(
    () => [
      {
        header: 'id',
        accessorKey: 'id',
        cell: info => info.getValue()
      },
      {
        header: 'Nombre',
        accessorKey: 'name',
        cell: info => info.getValue()
      },
      {
        header: 'Departamento',
        accessorKey: 'departament',
        cell: info => info.getValue()
      },
      {
        header: 'Ciudad',
        accessorKey: 'city',
        cell: info => info.getValue()
      },
      {
        header: 'Teléfono',
        accessorKey: 'phone',
        cell: info => info.getValue()
      },
      {
        header: 'Conductores',
        accessorKey: 'drivers',
        cell: info => info.getValue()
      },
      {
        header: 'Acciones',
        cell: info => (
          <div className='flex items-center space-x-3'>
            <Link href={`/admin/company/${info.row.original.id}`}></Link>
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

  const [companies, setCompanies] = useState<Company[]>()

  const getCompanies = async () => {
    await axios
      .get(`http://localhost:5000/api/get-companys`)
      .then(res => setCompanies(res.data))
  }

  useEffect(() => {
    console.log(companies)
  }, [companies])

  useEffect(() => {
    getCompanies()
    setInterval(() => {
      getCompanies()
    }, 10000)
  }, [])

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

  const table = useReactTable({
    data: companies ?? [],
    columns,
    pageCount: companies?.length ?? -1,
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

  const totalPages = table.getPageCount() // Obtiene el número total de páginas
  const currentPage = table.getState().pagination.pageIndex // Obtiene la página actual

  const pageButtons = []

  // Genera botones para cada número de página
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
    <main className='items-center w-full h-full '>
      <div className='p-1 h-[10%]  justify-center items-center'>
        <FiltersAdmin />
      </div>

      <div className='h-[70%] max-h-[67%] overflow-x-auto overflow-y-auto'>
        <div className='relative'>
          <table className='text-sm text-center text-black '>
            <thead className='text-x bg-gray-50 '>
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
                  className='bg-white border-b hover:bg-gray-50 '
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className='px-2 py-2 w-full font-medium text-gray-900 whitespace-nowrap '
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
      </div>
    </main>
  )
}
