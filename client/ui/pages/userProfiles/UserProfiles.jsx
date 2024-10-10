import React, { useEffect, useRef, useState } from 'react';
import { H2 } from "../../components/heading/Headings.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { Button } from "flowbite-react";
import { useTranslator } from "../../providers/i18n";
import { USER_PROFILE_PUBLICATION } from "../../../../imports/modules/userProfiles/enums/publication";
import { userProfileRepository } from "../../../../imports/modules/userProfiles/userProfileRepository";
import { DataTable } from "simple-datatables";

const mockUserProfiles = Array.from({ length: 20 }, (v, i) => ({
  _id: `user${i + 1}`,
  firstname: `First${i + 1}`,
  lastname: `Last${i + 1}`,
  gender: i % 2 === 0 ? 'Male' : 'Female',
  email: `user${i + 1}@example.com`,
  phone: `123-456-789${i}`,
}));

export const UserProfiles = () => {
  const t = useTranslator();
  const tableRef = useRef(null); // Ref for table DOM element
  const [dataTableInstance, setDataTableInstance] = useState(null); // Hold DataTable instance
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Track items and loading state
  const { items, loading } = useTracker(() => {
    const handle = Meteor.subscribe(USER_PROFILE_PUBLICATION.PROFILES);

    return {
      loading: !handle.ready(),
      items: handle.ready() ? userProfileRepository.find().fetch() : []
      // items: mockUserProfiles
    };
  });

  // Log items (for debugging)
  console.log(items);

  const handleRemove = async (_id) => {
    // await contactRequestRemove(_id);
  };

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      return; // Do not initialize DataTable if data is still loading
    }

    setIsLoading(false); // Data has finished loading

    if (tableRef.current) {
      if (!dataTableInstance) {
        // Initialize DataTable if it hasn't been initialized yet
        const dtInstance = new DataTable(tableRef.current, {
          paging: true,
          perPage: 3,
          perPageSelect: [3, 5, 10, 15, 20, 25, 50, 100, 250, 500],
          searchable: true,
          sortable: true,
          labels: {
            placeholder: t("Search"),
            perPage: t("Rows"),
            noRows: t("Nothing found"),
            info: t("Showing {start} to {end} of {rows} entries"),
            // Pagination labels
            page: t("Page"),
            of: t("of"),
            next: t("Next"),
            previous: t("Previous"),
            first: t("First"),
            last: t("Last"),
            select: t("Select"),
            selectAll: t("Select all"),
            deselectAll: t("Deselect all"),
            showEntries: t("Show entries"),
          },
        });

        setDataTableInstance(dtInstance);
      } else {
        // Re-render or refresh DataTable when new data arrives
        dataTableInstance.update();
      }
    }
  }, [items, loading, dataTableInstance]);

  if (isLoading) {
    return <div>{t('Loading...')}</div>; // Show loading message while data is being fetched
  }

  return (
    <>
      <H2 text="User profiles" showBackButton={true}></H2>

      <div className="mt-2 w-full text-gray-500">
        <table id="sorting-table" ref={tableRef} className="min-w-full">
          <thead>
          <tr>
            <th>{t('First name')}</th>
            <th>{t('Last name')}</th>
            <th>{t('Gender')}</th>
            <th>{t('Email')}</th>
            <th>{t('Phone number')}</th>
            <th>{t('Actions')}</th>
          </tr>
          </thead>
          <tbody className="text-xs">
          {items.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="px-6 py-4">{item.firstname}</td>
              <td className="px-6 py-4">{item.lastname}</td>
              <td className="px-6 py-4">{item.gender}</td>
              <td className="px-6 py-4">{item.email}</td>
              <td className="px-6 py-4">{item.phone}</td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  <Button color="failure" onClick={() => handleRemove(item._id)}>{t('Delete')}</Button>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
