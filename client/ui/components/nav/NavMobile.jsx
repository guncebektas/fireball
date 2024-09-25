import React, { useState } from 'react';
import { Navbar } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStar, faQrcode, faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Meteor } from 'meteor/meteor';
import {QRCodeModal} from "../modals/QRCodeModal";
import {ROUTE} from "../../../routes/enums/route";

export const NavMobile = () => {
  const { showMobileNavigation } = Meteor.settings.public.app;
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);

  const navLinks = [
    { href: ROUTE.HOME, icon: faHouse },
    { href: "#", icon: faStar },
    {
      href: "#",
      icon: faQrcode,
      specialClass:
        "bg-blue-700 hover:bg-red-900 focus:ring-blue-300 active:bg-blue-300 dark:bg-blue-600 dark:hover:bg-red-900 dark:focus:ring-blue-800 dark:active:bg-blue-800 text-white rounded-full p-2 transform scale-125",
      onClick: () => setIsQRCodeModalOpen(true),
    },
    { href: ROUTE.STORES, icon: faBagShopping },
    { href: ROUTE.PROFILE, icon: faUser },
  ];

  if (!showMobileNavigation) {
    return null; // Don't render if navigation is hidden
  }

  return (
    <>
      <Navbar className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 sm:hidden">
        <ul className="flex justify-evenly w-full list-none p-0 m-0">
          {navLinks.map(({ href, icon, specialClass = "", onClick = null }, index) => (
            <Navbar.Link
              key={index}
              className={`flex-1 text-center ${specialClass}`}
              href={href}
              onClick={onClick}
            >
              <FontAwesomeIcon icon={icon} size="lg" />
            </Navbar.Link>
          ))}
        </ul>
      </Navbar>

      {/* Render the QRCodeModal */}
      <QRCodeModal
        isOpen={isQRCodeModalOpen}
        onClose={() => setIsQRCodeModalOpen(false)}
      />
    </>
  );
};
