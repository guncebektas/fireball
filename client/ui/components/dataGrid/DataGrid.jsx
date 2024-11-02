import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DataTable } from 'simple-datatables';
import { useTranslator } from '../../providers/i18n';
import { TableSkeleton } from '../skeletons/TableSkeleton';
import { Button } from 'flowbite-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import {Log} from 'meteor/logging';

const ItemType = 'ROW';

const DataGrid = ({ columns, data, loading, actions, orderable = false }) => {
  const t = useTranslator();
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const [isTableInitialized, setIsTableInitialized] = useState(false);
  const [items, setItems] = useState(data);

  useEffect(() => {
    setItems(data);
  }, [data]);

  // Initialize DataTable once data and rows are ready
  useEffect(() => {
    if (loading || isTableInitialized || !items.length) return;

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
          noRows: items.length ? '' : t('Nothing found'), // Prevent 'Nothing found' message with data
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

      dataTableRef.current = dtInstance;
      setIsTableInitialized(true);
    }
  }, [loading, t, isTableInitialized, items.length]);

  const moveRow = useCallback((dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];
    setItems(update(items, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragItem],
      ],
    }));
  }, [items]);

  const handleDragEnd = async (result) => {
    // if (!result.destination) return; // If dropped outside of a droppable area, do nothing

    // Create a new array from the existing data
    const reorderedData = Array.from(data);

    // Remove the dragged item from its original position
    const [movedItem] = reorderedData.splice(result.source.index, 1);

    // Insert the item into its new position
    reorderedData.splice(result.destination.index, 0, movedItem);

    // Update the order property for each item in the reorderedData
    const updatedData = reorderedData.map((item, index) => ({
      ...item, // Keep all existing properties
      order: index + 1 // Update order based on the new index
    }));

    // Call the Meteor method to save the order to the database
    try {
      await Meteor.call('faqs.updateOrder', updatedData); // Save the reordered array
    } catch (error) {
      Log.error(error);
    }
  };



  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
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
          {items.map((item, index) => (
            orderable ? (
              <OrderableRow
                key={item._id}
                index={index}
                id={item._id}
                data={item}
                columns={columns}
                actions={actions}
                moveRow={moveRow}
                onDragEnd={handleDragEnd}
              />
            ) : (
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
                          onClick={() => action.onClick(item._id)}
                          size="xs"
                        >
                          {action.icon && action.icon()} {action.label}
                        </Button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            )
          ))}
          </tbody>
        </table>
      </div>
    </DndProvider>
  );
};

const OrderableRow = ({ id, index, data, columns, actions, moveRow, onDragEnd }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    end: onDragEnd,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <tr
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="border-b"
    >
      {columns.map((col, index) => (
        <td key={index} className="px-6 py-4">{data[col.key]}</td>
      ))}
      {actions && (
        <td className="px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                color={action.color}
                className={action.classes}
                data-id={id}
                onClick={() => action.onClick(id)}
                size="xs"
              >
                {action.icon && action.icon()} {action.label}
              </Button>
            ))}
          </div>
        </td>
      )}
    </tr>
  );
};

export default DataGrid;
