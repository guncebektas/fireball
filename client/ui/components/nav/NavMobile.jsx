import { Navbar } from 'flowbite-react';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../routes/enums/route";
import { useQRCodeStore } from "../../stores/useQRCodeStore";
import { QRCodeModal } from "../modals/QRCodeModal/QRCodeModal";
import { Icon } from "../icon/Icon";
import { useTranslator } from "../../providers/i18n";

export const NavMobile = () => {
  const t = useTranslator();

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
      label: 'Dashboard',
      specialClass: 'pr-1 mr-0',
      onClick: () => handleNavigate(ROUTE.HOME),
    },
    {
      href: '#',
      icon: 'star',
      label: 'Wallet',
      specialClass: 'pr-1 mr-0',
      onClick: () => handleNavigate(ROUTE.WALLET),
    },
    {
      href: "#",
      icon: 'qrcode',
      specialClass: "m-text bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 active:bg-primary-300 dark:bg-primary-600 dark:hover:bg-primary-900 dark:focus:ring-primary-800 dark:active:bg-primary-800 text-white dark:text-white rounded-full p-2 w-12 h-12 flex items-center justify-center transform scale-150 ml--3 mt--20 mx-3",
      onClick: openQRCodeModal, // Open QR Code modal
    },
    {
      href: '#',
      icon: 'store',
      label: 'Stores',
      onClick: () => handleNavigate(ROUTE.STORES),
    },
    {
      href: '#',
      icon: 'user',
      label: 'Profile',
      onClick: () => handleNavigate(ROUTE.PROFILE),
    },
  ];

  if (!showMobileNavigation) {
    return null;
  }

  return (
    <>
      <Navbar className="fixed right-0 bottom-0 left-0 bg-white border-t border-secondary-200 z-10 sm:hidden">
        {/** Nav Mobile */}
        <ul className="flex w-full list-none p-0 m-0">
          {navLinks.map(({href, icon, label = "", specialClass = "", onClick = null}, index) => (
            <Navbar.Link
              key={index}
              className={`flex-1 text-center text-secondary-200 !border-none ${specialClass}`}
              href={href}
              onClick={onClick}
            >
              <Icon icon={icon} />
              <span className="text-xs font-medium text-center">
                {t(label)}
              </span>
            </Navbar.Link>
          ))}
        </ul>
      </Navbar>

      <QRCodeModal/>
    </>
  );
};
