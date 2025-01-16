import { Navbar } from 'flowbite-react';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../routes/enums/route";
import { useQRCodeStore } from "../../stores/useQRCodeStore";
import { QRCodeModal } from "../modals/QRCodeModal/QRCodeModal";
import { Icon } from "../icon/Icon";
export const NavMobile = () => {
  const {showMobileNavigation} = Meteor.settings.public.app;
  const openQRCodeModal = useQRCodeStore((state) => state.openQRCodeModal);
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  const navLinks = [
    {
      href: '#',
      icon: 'house',
      onClick: () => handleNavigate(ROUTE.HOME),
    },
    {
      href: '#',
      icon: 'star',
      onClick: () => handleNavigate(ROUTE.WALLET),
    },
    {
      href: "#",
      icon: 'qrcode',
      specialClass: "m-text bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 active:bg-primary-300 dark:bg-primary-600 dark:hover:bg-primary-900 dark:focus:ring-primary-800 dark:active:bg-primary-800 text-white dark:text-white rounded-full p-2 w-12 h-12 flex items-center justify-center transform scale-125 mt--20",
      onClick: openQRCodeModal, // Open QR Code modal
    },
    {
      href: '#',
      icon: 'store',
      onClick: () => handleNavigate(ROUTE.STORES),
    },
    {
      href: '#',
      icon: 'user',
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
          {navLinks.map(({href, icon, specialClass = "", onClick = null}, index) => (
            <Navbar.Link
              key={index}
              className={`flex-1 text-center nav-mobile nav-mobile-items ${specialClass}`}
              href={href}
              onClick={onClick}
            >
              <Icon icon={icon} />
            </Navbar.Link>
          ))}
        </ul>
      </Navbar>

      <QRCodeModal/>
    </>
  );
};
