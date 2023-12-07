import React, {useState} from 'react';
import {Button, Label, TextInput} from "flowbite-react";
import {H2} from "../../components/heading/H2.jsx";
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {PROFILE_PUBLICATION} from "../../../../imports/modules/profile/enums/publication.js";
import {profileRepository} from "../../../../imports/modules/profile/profileRepository.js";
import {profileUpdate} from "../../../../imports/modules/profile/profile.methods.js";

export const Profile = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
  });

  const user = useTracker(() => Meteor.user(), []);

  useTracker(() => {
    const handle = Meteor.subscribe(PROFILE_PUBLICATION.ME);
    if (handle.ready()) {
      const me = profileRepository.findOne({_id: Meteor.userId()}) || {};

      setFormData({
        email: user?.emails[0].address || '',
        firstname: me.firstname || '',
        lastname: me.lastname || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    profileUpdate({firstname: formData.firstname, lastname: formData.lastname}, (error, response) => {
      console.log(error);
      console.log(response);
    });
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      <H2 text="Profile"></H2>
      <div className="grid grid-flow-col justify-stretch space-x-4">
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email"/>
            </div>
            <TextInput id="email" type="text" value={formData.email} disabled/>
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor="firstname" value="Firstname"/>
            </div>
            <TextInput id="firstname" type="text" value={formData.firstname} onChange={handleInputChange}/>
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor="lastname" value="Lastname"/>
            </div>
            <TextInput id="lastname" type="text" value={formData.lastname} onChange={handleInputChange}/>
          </div>
          <div>
            <Button type="submit" className="w-full flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
