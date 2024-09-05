import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavItem} from "./NavItem.jsx";
import {ROUTE} from "../../../routes/enums/route.js";
import {Sidebar, Tooltip} from 'flowbite-react';
import {HiOutlineMinusSm, HiOutlinePlusSm, HiShoppingBag} from "react-icons/hi";
import {twMerge} from "tailwind-merge";

export const Nav = () => {
  return (
    <Sidebar
      aria-label="Sidenav"
      id="drawer-navigation"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      >
      <div className="overflow-y-auto pt-16 sm:pt-14 px-3 h-full">
        <ul className="space-y-2">
          <li>
            <NavItem link={ROUTE.HOME} icon="dashboard" text="Dashboard"/>
          </li>
          <ul>
            <Sidebar.Collapse
              icon={HiShoppingBag}
              label="E-commerce"
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])}/>;
              }}
            >
              <Sidebar.Item href="#">Products</Sidebar.Item>
              <Sidebar.Item href="#">Sales</Sidebar.Item>
              <Sidebar.Item href="#">Refunds</Sidebar.Item>
              <Sidebar.Item href="#">Shipping</Sidebar.Item>
            </Sidebar.Collapse>
          </ul>
          <li>
            <NavItem link={ROUTE.PRICE} icon="money-bill-wave" text="Prices"/>
          </li>
          <li>
            <NavItem link={ROUTE.DOCS} icon="file" text="Docs"/>
          </li>
        </ul>
        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <li>
            <NavItem link={ROUTE.TICKETS} icon="clipboard-list" text="Ticket"/>
          </li>
        </ul>
        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <li>
            <NavItem link={ROUTE.DOCS} icon="clipboard" text="Docs"/>
          </li>
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center p-4 space-x-4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <Link to={ROUTE.ADMIN} data-tooltip-target="tooltip-admin" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
          <FontAwesomeIcon icon="user-tie"/>
        </Link>
        <div id="tooltip-admin" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip">
          Admin
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        <Link to={ROUTE.SETTINGS} data-tooltip-target="tooltip-settings" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
          <FontAwesomeIcon icon="cog"/>
        </Link>
        <div id="tooltip-settings" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip">
          Settings
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </Sidebar>
)
  ;
};
