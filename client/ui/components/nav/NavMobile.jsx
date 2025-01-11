import React from 'react';
import {Navbar} from 'flowbite-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Meteor} from 'meteor/meteor';
import {QRCodeModal} from "../modals/QRCodeModal/QRCodeModal";
import {ROUTE} from "../../../routes/enums/route";
import {useNavigate} from "react-router-dom";
import {useQRCodeStore} from "../../stores/useQRCodeStore";

export const NavMobile = () => {
  const {showMobileNavigation, customIcons} = Meteor.settings.public.app;
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
      specialClass: "bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 active:bg-primary-300 dark:bg-primary-600 dark:hover:bg-primary-900 dark:focus:ring-primary-800 dark:active:bg-primary-800 text-white dark:text-white rounded-full p-2 w-12 h-12 flex items-center justify-center transform scale-125 mt--20",
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

  console.log(customIcons[navLinks[0].icon]);

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
              {customIcons[icon] ?
                <svg className="svg-inline--fa fa-life-ring w-6 h-5 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  <use href={`#${icon}`}/>
                </svg>
                :
                <FontAwesomeIcon
                  icon={icon}
                  className="w-6 h-5 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
              }
            </Navbar.Link>
          ))}
        </ul>
      </Navbar>

      <QRCodeModal/>
    </>
  );
};
