import React, {useRef} from 'react';
import {Button, Label, TextInput, Modal} from 'flowbite-react';
import {STATE_AUTH_PASSWORD_FORM} from "./enums/state.js";
import {useTranslator} from "../../../providers/i18n";
import { useState } from "react";
import PasswordInput from "../../../components/form/PasswordInput";
import {Alert} from "../../../components/alert/Alert"

export const Login = ({onStateChange}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const t = useTranslator();
  const emailRef = useRef();
  const passwordRef = useRef();
  const codeRef = useRef();

  const handleState = (state) => {
    onStateChange(state);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setOpenAlert(false);

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    Meteor.loginWithPassword(formData.email, formData.password, (error, response) => {
      if (error) {
        console.error(error);

        if (error.error === "no-2fa-code") {
          setOpenModal(true)
        } else {
          setOpenAlert(true)
          setErrorMessage(error.reason)
        }

        return;
      }

      location.reload();
    });
  };

  const handleLogin2FA = (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      code: codeRef.current.value
    };

    Meteor.loginWithPasswordAnd2faCode(formData.email, formData.password, formData.code, error => {
      if (error) {
        console.error("Error trying to log in (user with 2fa)", error);
        return;
      }

      location.reload();
    });
  }

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="md" initialFocus={codeRef}>
        <Modal.Header>2FA</Modal.Header>
        <form className="space-y-6" onSubmit={handleLogin2FA}>
          <Modal.Body>
            <div className="space-y-6">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="code" value="Code"/>
                </div>
                <TextInput id="code" ref={codeRef} required/>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" className="w-full flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</Button>
          </Modal.Footer>
        </form>
      </Modal>

      <div className="flex flex-col items-center justify-center mx-auto mb-4 text-4xl scale-150">
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 400 400">
          <g fill="#DE4F4F">
            <path
              d="M286.575 306.886L44.755 49.922l256.962 241.82c4.312 4.056 4.518 10.837.46 15.146-4.053 4.31-10.832 4.518-15.144.46-.15-.14-.318-.31-.458-.462M251.032 325.01L68.692 127.528 266.177 309.87c4.35 4.013 4.618 10.794.604 15.144-4.018 4.35-10.794 4.617-15.146.604-.2-.19-.413-.406-.602-.607M214.083 325.542L92.907 194.272 224.18 315.446c2.898 2.676 3.077 7.197.402 10.098-2.677 2.896-7.195 3.082-10.097.402-.136-.125-.277-.272-.402-.405M315.612 234.685L189.102 98.078 325.71 224.585c2.896 2.684 3.067 7.203.387 10.1-2.682 2.895-7.2 3.066-10.098.387-.13-.123-.268-.258-.388-.387M304.697 272.93L121.567 74.655l198.274 183.13c4.35 4.017 4.62 10.796.605 15.144-4.017 4.352-10.797 4.617-15.146.604-.205-.19-.418-.404-.603-.605M176.31 314.783l-57.647-62.695 62.692 57.65c1.453 1.334 1.547 3.596.215 5.045-1.338 1.453-3.598 1.55-5.05.215-.072-.07-.144-.143-.21-.215M311.093 189.297l-57.65-62.694 62.696 57.646c1.45 1.335 1.546 3.597.21 5.048-1.335 1.45-3.595 1.547-5.05.21-.07-.065-.143-.143-.207-.21"></path>
          </g>
        </svg>
        <span className="hidden md:block self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">
          SaaS Boilerplate
        </span>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          {t('Login')}
        </h2>

        <div className="bg-white dark:bg-gray-900 py-8 px-4 mt-8 shadow sm:rounded-lg sm:px-10">
          <div>
            <Alert show={openAlert} color="failure" iconName="warning">
              <span className="font-medium">Error:</span> {errorMessage}
            </Alert>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="mb-1">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email Address"/>
                </div>
                <TextInput id="email" type="email" placeholder="Enter your email" ref={emailRef} required/>
              </div>
              <div className="mb-1">
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password"/>
                </div>
                <PasswordInput ref={passwordRef} required/>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <button type="button" className="font-medium text-gray-500 dark:text-gray-400 hover:underline" onClick={() => handleState(STATE_AUTH_PASSWORD_FORM.FORGOTTEN_PASSWORD)}>Forgotten password?</button>
              </div>
              <div>
                <Button type="submit" className="w-full flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</Button>
              </div>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <button className="font-medium hover:underline mx-1" onClick={() => handleState(STATE_AUTH_PASSWORD_FORM.REGISTER)}>Register</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
};
