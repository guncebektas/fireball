import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const TableSkeleton = ({ rows = 12, columns = 5 }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
        <tr>
          {Array(columns)
            .fill()
            .map((_, i) => (
              <th key={i} className="py-4 px-1">
                <Skeleton height={30} />
              </th>
            ))}
        </tr>
        </thead>
        <tbody>
        {Array(rows)
          .fill()
          .map((_, i) => (
            <tr key={i}>
              {Array(columns)
                .fill()
                .map((_, j) => (
                  <td key={j} className="p-2 px-1">
                    <Skeleton height={20} />
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
