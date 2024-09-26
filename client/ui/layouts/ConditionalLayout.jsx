import React from 'react';
import {Header} from "../components/header/Header.jsx";
import {Nav} from "../components/nav/Nav.jsx";
import {Router} from "../../routes/Router.js";
import {Auth} from "../pages/auth/Auth.jsx";
import {useTracker} from "meteor/react-meteor-data";
import {NavMobile} from "../components/nav/NavMobile";
import {Navbar} from "flowbite-react";
import {LanguageSelector} from "../components/languageSelector/LanguageSelector";
import {Link} from "react-router-dom";
import {Credits} from "../components/credits/Credits";
import {useTranslator} from "../providers/i18n";

const InnerLayout = () => {
  const t = useTranslator();

  const {name, logo} = Meteor.settings.public.app;

  const user = useTracker(() => { return Meteor.userId() });
  if (user) {
    return (
      <section className="dark:bg-gray-800">
        <button data-drawer-target="drawer-navigation" data-drawer-toggle="drawer-navigation" aria-controls="drawer-navigation" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">{t('Open sidebar')}</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>

        <Header/>
        <Nav/>

        <main className="px-4 md:ml-64 h-auto sm:pt-20">
          <section className="bg-white px-4 py-5 sm:p-6 dark:bg-gray-900">
            <Router/>
          </section>
        </main>

        <NavMobile/>

        <Credits/>
      </section>
    );
  }

  return (
    <section className="dark:bg-gray-900">
      <Navbar rounded className="mb-3">
        <Navbar.Brand as={Link} href="/">
          <img src={logo} alt={name}/>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{name}</span>
        </Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Navbar.Link href="#">{t('About')}</Navbar.Link>
          <Navbar.Link href="#">{t('Contact')}</Navbar.Link>
          <Navbar.Link>
            <LanguageSelector/>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <main>
        <div className="mx-auto px-4 sm:px-6 lg:items-center lg:justify-between lg:py-16 lg:px-8">
          <Auth/>
        </div>
      </main>
    </section>
  );
};

export const ConditionalLayout = ({...props}) => (
  <InnerLayout {...props} />
);
