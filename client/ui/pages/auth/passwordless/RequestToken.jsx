import React, {useRef} from 'react';
import {Button, Label, TextInput} from 'flowbite-react';

export const RequestToken = ({onStateChange}) => {
  /*
  profileInsert({_id: "Q3FusXa4iWb9SH7PQ"}, (error, response) => {
    console.log(error);
    console.log(response);
  });
  */

  const emailRef = useRef();

  const handleAlreadyHaveToken = () => {
    onStateChange(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
    };

    Accounts.requestLoginTokenForUser(
      {
        selector: {
          email: formData.email
        },
        userData: {
          email: formData.email
        }
      });
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">Request Token</h2>

      <div className="bg-white dark:bg-gray-900 py-8 px-4 mt-8 shadow sm:rounded-lg sm:px-10">
        <div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email Address"/>
              </div>
              <TextInput id="email" type="email" ref={emailRef} required/>
            </div>
            <div>
              <Button type="submit" className="w-full flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Request</Button>
            </div>
          </form>
          <div className="mt-3 flex justify-end">
            <Button className="text-blue" onClick={handleAlreadyHaveToken}>I already have a token</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
