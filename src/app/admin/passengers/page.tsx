'use client'

import WhatsappIcon from '@/components/icons/whatsapp'
import {type Passenger} from '@/types'
import {useQuery} from '@tanstack/react-query'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
    type PaginationState
} from '@tanstack/react-table'
import axios from 'axios'
import NextLink from 'next/link'
import React, {useMemo, useState, type FC} from 'react'
import {FiltersPassengers} from './components/filters'
import {Pagination} from "@/components/pagination/pagination";

const PassengersPage: FC = () => {
    const columns = useMemo<Array<ColumnDef<Passenger>>>(
        () => [
            {
                header: 'id',
                accessorKey: 'id',
                cell: info => info.getValue()
            },
            {
                header: 'Fecha de creación',
                accessorKey: 'created_at',
                cell: info =>
                    Intl.DateTimeFormat('es-CO', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                        timeZone: 'America/Bogota'
                    }).format(new Date(info.getValue() as string))
            },
            {
                header: 'Nombre',
                accessorKey: 'name',
                cell: info => info.getValue()
            },
            {
                header: 'Genero',
                accessorKey: 'gender',
                cell: info => (info.getValue() === 'Male' ? 'Hombre' : 'Mujer')
            },
            {
                header: 'Celular',
                accessorKey: 'phone',
                cell: info => info.getValue()
            },
            {
                header: 'Email',
                accessorKey: 'email',
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
                    <div className='flex items-center space-x-3'>
                        <NextLink
                            href={`/admin/passengers/${info.row.original.id}`}
                        ></NextLink>
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

    const fetchPassengers = async (options: {
        pageIndex: number
        pageSize: number
    }) => {
        const {data} = await axios.get(
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

    const table = useReactTable({
        data: dataQuery.data?.passengers ?? defaultData,
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

    const totalPages = table.getPageCount();
    console.log(totalPages);
    const currentPage = table.getState().pagination.pageIndex;

    const pageButtons = [];

// Genera botones para cada número de página
    for (let page = 0; page < totalPages; page++) {
        const isCurrentPage = page === currentPage;

        if( (page === 0)||(page === totalPages)){
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


    }
    return (
        <main className='grid'>
            <FiltersPassengers/>
            <div className='relative overflow-x-auto'>
                <table className='w-full text-sm text-center'>
                    <thead className='text-xs  bg-gray-50 text-black '>
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
                            className='text-black bg-white border- hover:bg-gray-50'
                        >
                            {row.getVisibleCells().map(cell => (
                                <td
                                    key={cell.id}
                                    className='px-3 py-2 font-medium  whitespace-nowrap'
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

export default PassengersPage
