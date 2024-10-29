import React from 'react';
import { Navbar } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faQrcode, faStar, faStore, faUser } from '@fortawesome/free-solid-svg-icons';
import { Meteor } from 'meteor/meteor';
import { QRCodeModal } from "../modals/QRCodeModal";
import { ROUTE } from "../../../routes/enums/route";
import { useNavigate } from "react-router-dom";
import {useQRCodeStore} from "../../stores/useQRCodeStore";

export const NavMobile = () => {
  const { showMobileNavigation } = Meteor.settings.public.app;
  const openQRCodeModal = useQRCodeStore((state) => state.openQRCodeModal);
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  const navLinks = [
    {
      href: '#',
      icon: faHouse,
      onClick: () => handleNavigate(ROUTE.HOME),
    },
    {
      href: '#',
      icon: faStar,
      onClick: () => handleNavigate(ROUTE.WALLET),
    },
    {
      href: "#",
      icon: faQrcode,
      specialClass: "bg-blue-700 hover:bg-red-900 focus:ring-blue-300 active:bg-blue-300 dark:bg-blue-600 dark:hover:bg-red-900 dark:focus:ring-blue-800 dark:active:bg-blue-800 text-white dark:text-white rounded-full p-2 w-12 h-12 flex items-center justify-center transform scale-125 mt--20",
      onClick: openQRCodeModal, // Open QR Code modal
    },
    {
      href: '#',
      icon: faStore,
      onClick: () => handleNavigate(ROUTE.STORES),
    },
    {
      href: '#',
      icon: faUser,
      onClick: () => handleNavigate(ROUTE.PROFILE),
    },
  ];

  if (!showMobileNavigation) {
    return null;
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

      <QRCodeModal />
    </>
  );
};
