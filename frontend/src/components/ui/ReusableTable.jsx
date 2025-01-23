import React from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const ReusableTable = ({ columns, records, title, addAddress }) => {
  const formattedColumns = columns.map((col, index) => ({
    name: col.header,
    selector: col.accessor ? (row) => row[col.accessor] : undefined,
    cell: col.cell || undefined,
    sortable: true,
    // Apply sticky positioning for the last column (Manage)
    style: col.accessor === 'actions' ? { position: 'sticky', right: 0, backgroundColor: 'white', zIndex: 10 } : {},
  }));

  return (
    <div className="table-container p-3 shadow-sm bg-white rounded" style={{ overflowX: 'auto' }}>
      <div className="flex items-center justify-between mb-3">
        <h2 style={{ color: "--primary-color" }} className="mb-0 text-lg">{title}</h2>
        {addAddress && (
          <Link to={addAddress} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add {title}</Link>
        )}
      </div>

      <div style={{ overflow: 'auto' }}>
        <DataTable
          columns={formattedColumns}
          data={records}
          fixedHeader
          pagination
          highlightOnHover
          dense
          customStyles={{
            headCells: {
              style: {
                backgroundColor: 'rgb(212, 212, 212)',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                // color: '#2674b6',
                position: 'sticky',
                top: 0,
                zIndex: 1, // Ensure the header stays above the body
              },
            },
            cells: {
              style: {
                borderBottom: '1px solid rgb(212, 212, 212)',
                // fontSize: '0.7rem',
              },
            },
            table: {
              style: {
                position: 'relative',
              },
            },
            rows: {
              style: {
                position: 'relative',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ReusableTable;
