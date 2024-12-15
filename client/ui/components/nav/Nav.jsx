import React, {useEffect} from "react";
import {NavItem} from "./NavItem.jsx";
import {ROUTE} from "../../../routes/enums/route.js";
import {Sidebar} from 'flowbite-react';
import {HiOutlineMinusSm, HiOutlinePlusSm, HiShoppingBag} from "react-icons/hi";
import {twMerge} from "tailwind-merge";
import {NavFooter} from "./NavFooter";
import {useTranslator} from "../../providers/i18n";
import {useAppStore} from "../../stores/useAppStore";

export const Nav = ({isOpen}) => {
  const t = useTranslator();
  const { isSidebarOpen } = useAppStore();

  const {showDummyPages} = Meteor.settings.public;

  return (
    <>
      <Sidebar
        aria-label="Sidenav"
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="overflow-y-auto pt-16 px-3 h-full">
          <ul className="space-y-2">
            <li>
              <NavItem link={ROUTE.HOME} icon="house" text={t('Dashboard')}/>
            </li>
          </ul>
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <NavItem link={ROUTE.WALLET} icon="star" text={t('Wallet')}/>
            </li>
            <li>
              <NavItem link={ROUTE.STORES} icon="store" text={t('Stores')}/>
            </li>
            <li>
              <NavItem link={ROUTE.HELP} icon="life-ring" text={t('Help')}/>
            </li>
            <li>
              <NavItem link={ROUTE.ABOUT_US} icon="circle-info" text={t('About us')}/>
            </li>
          </ul>
          {showDummyPages ?
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
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
              <li>
                <NavItem link={ROUTE.DOCS} icon="clipboard" text={t('Documents')}/>
              </li>
              <li>
                <NavItem link={ROUTE.PRICE} icon="money-bill-wave" text={t('Prices')}/>
              </li>
              <li>
                <NavItem link={ROUTE.RSS_FEED_LIST} icon="rss" text="RSS"/>
              </li>
            </ul>
          : '' }
        </div>
        <NavFooter/>
      </Sidebar>
    </>
  );
};
