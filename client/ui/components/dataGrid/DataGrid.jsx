import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'simple-datatables';
import { useTranslator } from '../../providers/i18n';
import { TableSkeleton } from '../skeletons/TableSkeleton';
import { Button } from 'flowbite-react';

const DataGrid = ({ columns, data, loading, actions }) => {
  const t = useTranslator();
  const tableRef = useRef(null); // Ref for table DOM element
  const dataTableRef = useRef(null); // Ref for DataTable instance
  const [isTableInitialized, setIsTableInitialized] = useState(false); // Track initialization

  useEffect(() => {
    if (loading || isTableInitialized) return; // Wait for data to finish loading and avoid re-initializing

    // Ensure the table is not already initialized and there's a valid DOM reference
    if (tableRef.current) {
      const dtInstance = new DataTable(tableRef.current, {
        paging: true,
        perPage: 10,
        perPageSelect: [3, 5, 10, 15, 20, 25, 50, 100, 250, 500],
        searchable: true,
        sortable: true,
        labels: {
          placeholder: t('Search'),
          perPage: t('Rows'),
          noRows: t('Nothing found'),
          info: t('Showing {start} to {end} of {rows} entries'),
          page: t('Page'),
          of: t('of'),
          next: t('Next'),
          previous: t('Previous'),
          first: t('First'),
          last: t('Last'),
          select: t('Select'),
          selectAll: t('Select all'),
          deselectAll: t('Deselect all'),
          showEntries: t('Show entries'),
        },
      });

      dataTableRef.current = dtInstance; // Store the DataTable instance
      setIsTableInitialized(true); // Mark table as initialized
    }
  }, [loading, t, isTableInitialized]);

  if (loading) {
    return <TableSkeleton />; // Show loading message while data is being fetched
  }

  return (
    <div className="mt-2 w-full text-gray-500 bg-white dark:bg-gray-900">
      <table ref={tableRef} className="min-w-full">
        <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{t(col.label)}</th>
          ))}
          {actions && <th>{t('Actions')}</th>}
        </tr>
        </thead>
        <tbody className="text-xs">
        {data.map((item) => (
          <tr key={item._id} className="border-b">
            {columns.map((col, index) => (
              <td key={index} className="px-6 py-4">{item[col.key]}</td>
            ))}
            {actions && (
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      color={action.color}
                      className={action.classes}
                      data-id={item._id}
                      onClick={() => action.onClick(item._id)} // Pass row's _id
                      size="xs"
                    >
                      {action.icon && action.icon()} {t(action.label)}
                    </Button>
                  ))}
                </div>
              </td>
            )}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
