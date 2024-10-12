import React, {useState} from 'react';
import {Header} from "../components/header/Header.jsx";
import {Nav} from "../components/nav/Nav.jsx";
import {Router} from "../../routes/Router.js";
import {Auth} from "../pages/auth/Auth.jsx";
import {useTracker} from "meteor/react-meteor-data";
import {NavMobile} from "../components/nav/NavMobile";
import {Button, Modal, Navbar} from "flowbite-react";
import {LanguageSelector} from "../components/languageSelector/LanguageSelector";
import {Link} from "react-router-dom";
import {Credits} from "../components/credits/Credits";
import {useTranslator} from "../providers/i18n";
import {AboutUs} from "../pages/aboutUs/AboutUs";

const InnerLayout = () => {
  const t = useTranslator();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const handleOpenAboutModal = () => {
    setIsAboutModalOpen(true);
  };

  const handleCloseAboutModal = () => {
    setIsAboutModalOpen(false);
  };

  const {name, logo, icon} = Meteor.settings.public.app;

  const user = useTracker(() => { return Meteor.userId() });
  if (user) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };

    return (
      <section className="dark:bg-gray-800">
        <Header onToggleSidebar={handleToggleSidebar}/>
        <Nav isOpen={isSidebarOpen}/>

        <main className="px-4 md:ml-64 h-auto py-20">
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
          <img src={icon} alt={name} className="mr-3"/>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{name}</span>
        </Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Navbar.Link href="#" onClick={handleOpenAboutModal}>
            {t('About')}
          </Navbar.Link>
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

      <Modal show={isAboutModalOpen} onClose={handleCloseAboutModal}>
        <Modal.Header>{t('About')}</Modal.Header>
        <Modal.Body>
          <AboutUs fullPage={false}/>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={handleCloseAboutModal}>{t('Close')}</Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export const ConditionalLayout = ({...props}) => (
  <InnerLayout {...props} />
);
