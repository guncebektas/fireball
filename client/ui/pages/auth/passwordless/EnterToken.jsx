import React from 'react';
import {Button, Label, TextInput} from 'flowbite-react';

export const EnterToken = ({onStateChange}) => {
  const handleAlreadyHaveToken = () => {
    onStateChange(true);
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">Login</h2>

      <div className="bg-white dark:bg-gray-900 py-8 px-4 mt-8 shadow sm:rounded-lg sm:px-10">
        <div>
          <form className="space-y-6">
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor="token" value="Your token"/>
              </div>
              <TextInput id="token" type="text" required/>
            </div>
            <div>
              <Button type="submit" className="w-full flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</Button>
            </div>
          </form>
          <div className="mt-3 flex justify-end">
            <Button className="text-blue" onClick={handleAlreadyHaveToken}>I don't have a token yet</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
