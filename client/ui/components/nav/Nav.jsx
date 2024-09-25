import React from "react";
import {NavItem} from "./NavItem.jsx";
import {ROUTE} from "../../../routes/enums/route.js";
import {Sidebar} from 'flowbite-react';
import {HiOutlineMinusSm, HiOutlinePlusSm, HiShoppingBag} from "react-icons/hi";
import {twMerge} from "tailwind-merge";
import {NavFooter} from "./NavFooter";

export const Nav = () => {
  return (
    <Sidebar
      aria-label="Sidenav"
      id="drawer-navigation"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-200 dark:border-gray-700"
      >
      <div className="overflow-y-auto pt-16 px-3 h-full">
        <ul className="space-y-2">
          <li>
            <NavItem link={ROUTE.HOME} icon="dashboard" text="Dashboard"/>
          </li>
          <ul>
            <Sidebar.Collapse
              icon={HiShoppingBag}
              label="Parent"
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])}/>;
              }}
            >
              <Sidebar.Item href="#">Sub item</Sidebar.Item>
              <Sidebar.Item href="#">Sub item</Sidebar.Item>
              <Sidebar.Item href="#">Sub item</Sidebar.Item>
              <Sidebar.Item href="#">Sub item</Sidebar.Item>
            </Sidebar.Collapse>
          </ul>
          <li>
            <NavItem link={ROUTE.PRICE} icon="money-bill-wave" text="Prices"/>
          </li>
        </ul>
        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <li>
            <NavItem link={ROUTE.RSS_FEED_LIST} icon="rss" text="RSS"/>
          </li>
        </ul>
        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <li>
            <NavItem link={ROUTE.TICKETS} icon="clipboard-list" text="Ticket"/>
          </li>
        </ul>
        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <li>
            <NavItem link={ROUTE.CONTACT_FORM} icon="clipboard" text="Contact us"/>
          </li>
          <li>
            <NavItem link={ROUTE.CONTACT_REQUESTS} icon="clipboard" text="Contact request"/>
          </li>
        </ul>
        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <li>
            <NavItem link={ROUTE.DOCS} icon="clipboard" text="Docs"/>
          </li>
        </ul>
      </div>

      <NavFooter/>
    </Sidebar>
  )
};
