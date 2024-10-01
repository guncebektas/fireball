import React from 'react';
import {H2} from "../../components/heading/Headings.jsx";
import {useTracker} from "meteor/react-meteor-data";
import {Button, Table} from "flowbite-react";
import {useTranslator} from "../../providers/i18n";
import {USER_PROFILE_PUBLICATION} from "../../../../imports/modules/userProfiles/enums/publication";
import {userProfileRepository} from "../../../../imports/modules/userProfiles/userProfileRepository";

export const UserProfiles = () => {
  const t = useTranslator();

  const items = useTracker(() => {
    const handle = Meteor.subscribe(USER_PROFILE_PUBLICATION.PROFILES);

    if (!handle.ready()) {
      return [];
    }

    return userProfileRepository.find().fetch();
  });

  console.log(items);

  const handleRemove = async (_id) => {
    // await contactRequestRemove(_id);
  };

  return (
    <>
      <H2 text="User profiles" showBackButton={true}></H2>

      <div className="mt-2 w-full text-gray-500 text-lg">
        <Table striped hoverable className="w-full">
          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item._id}>
                <Table.Cell>{item.firstname}</Table.Cell>
                <Table.Cell>{item.lastname}</Table.Cell>
                <Table.Cell>{item.gender}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.phone}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-wrap gap-2">
                    <Button color="failure" onClick={() => handleRemove(item._id)}>{t('Delete')}</Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};
