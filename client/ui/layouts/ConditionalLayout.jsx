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
import {CartModal} from "../components/modals/CartModal";

const InnerLayout = () => {
  const t = useTranslator();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenAboutModal = () => {
    setIsAboutModalOpen(true);
  };

  const handleCloseAboutModal = () => {
    setIsAboutModalOpen(false);
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const {name, logo, icon} = Meteor.settings.public.app;

  const user = useTracker(() => { return Meteor.userId() });

  if (user) {
    return (
      <section className="dark:bg-gray-800">
        <Header onToggleSidebar={handleToggleSidebar}/>

        <Nav isOpen={isSidebarOpen}/>

        <main className="px-0 md:px-4 py-16 md:pt-20 md:ml-64 h-auto">
          <section className="bg-white px-4 py-5 sm:p-6 dark:bg-gray-900">
            <Router/>
          </section>
        </main>

        <NavMobile/>
        <CartModal/>

        <Credits/>
      </section>
    );
  }

  return (
    <>
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
      </section>

      <Modal dismissible show={isAboutModalOpen} onClose={handleCloseAboutModal} size="lg">
        <Modal.Header>{t('About')}</Modal.Header>
        <Modal.Body className="m-modal-body">
          <AboutUs fullPage={false}/>
        </Modal.Body>
        <Modal.Footer>
          <Button color="default" onClick={handleCloseAboutModal}>{t('Close')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const ConditionalLayout = ({...props}) => (
  <InnerLayout {...props} />
);
