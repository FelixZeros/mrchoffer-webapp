// @flow
import * as React from 'react';
import {LeftArrow} from "@/components/icons/left-arrow";
import {RightArrow} from "@/components/icons/right-arrow";
import {Table} from "@tanstack/table-core";

interface Props {
  table: Table<any>
  totalPages: number
  currentPage: number
}

export const Pagination = ({table, totalPages, currentPage}: Props) => {


  const pageButtons = [];

// Genera botones para cada número de página
  for (let page = 0; page < totalPages; page++) {
    const isCurrentPage = page === currentPage;

    pageButtons.push(
      <li key={page}>
        <button
          onClick={() => table.setPageIndex(page)}
          className={` flex items-center px-3 py-2 w-full h-full border-2 transition-all border-l-0 border-[--main-yellow] hover:bg-[--main-yellow] text-black  bg-[--main-yellow] ${isCurrentPage ? 'bg-[--main-yellow]' : 'bg-white'}`}
        >
          {page + 1}
        </button>
      </li>
    );
  }



  return (
    <div>
      <nav className='flex justify-end'>
        <ul
          className='inline-flex  items-center  '>
          <li>
            <button
              onClick={() => {

                table.previousPage()
              }}
              disabled={!table.getCanPreviousPage()}
              className='flex items-center px-3 py-2 border-2  border-[--main-yellow] disabled:bg-white h-full rounded-l-lg text-black bg-[--main-yellow]'
            >
              <LeftArrow/>
              Anterior
            </button>
          </li>
          {pageButtons}
          <li>

            <button
              onClick={() => {
                table.nextPage()

              }}
              disabled={!table.getCanNextPage()}
              className='flex items-center  px-3 py-2 disabled:bg-white h-full  border-2  border-[--main-yellow] rounded-r-lg  text-black bg-[--main-yellow]'
            >
              Siguiente
              <RightArrow/>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
