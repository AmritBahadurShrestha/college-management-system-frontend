import * as React from 'react';

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

interface IProps {
    columns: any[]
    data: any[]
}

const Table:React.FC<IProps> = ({ columns, data=[] }) => {

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })  
    return (
        <div className='w-full rounded-t-lg shadow-md border border-gray-200 overflow-hidden'>
          <table className='w-full min-w-full text-sm text-gray-800 table-fixed'>
            <thead className='text-white sticky top-0 z-10 shadow-sm'>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, idx) => (
                    <th
                      key={header.id}
                      className={`
                        px-4 py-3 text-center font-bold tracking-wide
                        text-xs sm:text-sm md:text-base
                        bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400
                        text-white border-r border-gray-300 w-full bg-clip-padding break-words
                        ${idx === 0 ? 'rounded-tl-lg' : ''} 
                        ${idx === headerGroup.headers.length - 1 ? 'rounded-tr-lg' : ''}
                      `}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-100/50 transition-colors duration-200`}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className='px-4 py-3 text-center border-b border-gray-200 border-r last:border-r-0 break-words'
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
}

export default Table;
