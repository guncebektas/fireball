import React from 'react';
import { Navbar } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse, faMugSaucer, faQrcode, faBagShopping, faUser, faStar} from '@fortawesome/free-solid-svg-icons';

export const NavMobile = () => {
  return (
    <Navbar className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 sm:hidden">
      <ul className="flex justify-evenly w-full list-none p-0 m-0">
        <Navbar.Link className="flex-1 text-center" href="#">
          <FontAwesomeIcon icon={faHouse} size="lg"/>
        </Navbar.Link>
        <Navbar.Link className="flex-1 text-center" href="#">
          <FontAwesomeIcon icon={faStar} size="lg"/>
        </Navbar.Link>
        <Navbar.Link className="flex-1 text-center bg-blue-700 hover:bg-red-900 focus:ring-blue-300  active:bg-blue-300 dark:bg-blue-600 dark:hover:bg-red-900 dark:focus:ring-blue-800 dark:active:bg-blue-800 text-white rounded-full p-2 transform scale-125" href="#">
          <FontAwesomeIcon icon={faQrcode} size="lg"/>
        </Navbar.Link>
        <Navbar.Link className="flex-1 text-center" href="#">
          <FontAwesomeIcon icon={faBagShopping} size="lg"/>
        </Navbar.Link>
        <Navbar.Link className="flex-1 text-center" href="/profile">
          <FontAwesomeIcon icon={faUser} size="lg"/>
        </Navbar.Link>
      </ul>
    </Navbar>
  );
};
