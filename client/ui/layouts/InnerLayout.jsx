import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Navbar, NavbarCollapse, NavbarLink, NavbarToggle} from "flowbite-react";
import {useTracker} from "meteor/react-meteor-data";
import React, {useState} from 'react';
import {Router} from "../../routes/Router.js";
import {useRouteUtility} from "../../shared/utilities/RouteUtility.js";
import {Credits} from "../components/credits/Credits";
import {Header} from "../components/header/Header.jsx";
import {LanguageSelector} from "../components/languageSelector/LanguageSelector";
import {StoreMenuModal} from "../components/modals/StoreMenuModal/StoreMenuModal";
import {CartModal} from "../components/modals/CartModal";
import {Nav} from "../components/nav/Nav.jsx";
import {NavMobile} from "../components/nav/NavMobile";
import {AboutUs} from "../pages/aboutUs/AboutUs";
import {useTranslator} from "../providers/i18n";
import {PrivacyPolicy} from "../pages/auth/legal/PrivacyPolicy";
import {PublicRouter} from "../../routes/PublicRouter";
import {ROUTE} from "../../routes/enums/route";
import {Link} from "react-router-dom";

export const InnerLayout = () => {
  const t = useTranslator();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] = useState(false);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const {isHomepage} = useRouteUtility();

  const handleOpenAboutModal = () => {
    setIsAboutModalOpen(true);
  };

  const handleCloseAboutModal = () => {
    setIsAboutModalOpen(false);
  };

  const handleOpenPrivacyPolicyModal = () => {
    setIsPrivacyPolicyModalOpen(true);
  };

  const handleClosePrivacyPolicyModal = () => {
    setIsPrivacyPolicyModalOpen(false);
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const {name, logo} = Meteor.settings.public.app;

  const user = useTracker(() => {
    return Meteor.userId()
  });

  if (user) {
    return (
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <Header onToggleSidebar={handleToggleSidebar}/>

        <Nav isOpen={isSidebarOpen}/>

        <main className="p-4 md:ml-64 h-auto pt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <NavMobile/>
            <StoreMenuModal/>
            <CartModal/>

            <Credits/>
          </div>
        </main>
      </div>
    );

    return (
      <section className="dark:bg-gray-900 min-h-screen">
        <Header onToggleSidebar={handleToggleSidebar}/>

        <Nav isOpen={isSidebarOpen}/>

        <main className="p-4 md:ml-64 h-auto pt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Router/>
          </div>
        </main>

        <NavMobile/>
        <StoreMenuModal/>
        <CartModal/>

        <Credits/>
      </section>
    );
  }

  return (
    <>
      <Navbar rounded className="mb-3">
        <div className="flex items-center">
          <Link to={ROUTE.HOME}>
            <img src={logo} alt={name} style={{'width': 'auto', 'height': '24px'}}/>
          </Link>
        </div>

        <NavbarToggle/>

        <NavbarCollapse>
          <NavbarLink href="#" onClick={handleOpenAboutModal}>
            {t('About')}
          </NavbarLink>
          <NavbarLink href="#" onClick={handleOpenPrivacyPolicyModal}>
            {t('Privacy policy')}
          </NavbarLink>
          <NavbarLink>
            <LanguageSelector/>
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>

      <main>
        <div className="mx-auto px-4 sm:px-6 lg:items-center lg:justify-between lg:py-16 lg:px-8">
          <PublicRouter/>
        </div>
      </main>

      <Modal dismissible show={isAboutModalOpen} onClose={handleCloseAboutModal} size="lg">
        <ModalHeader>{t('About')}</ModalHeader>
        <ModalBody className="m-modal-body">
          <AboutUs fullPage={false}/>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={handleCloseAboutModal}>{t('Close')}</Button>
        </ModalFooter>
      </Modal>

      <Modal dismissible show={isPrivacyPolicyModalOpen} onClose={handleClosePrivacyPolicyModal} size="lg">
        <ModalHeader>{t('Privacy policy')}</ModalHeader>
        <ModalBody className="m-modal-body">
          <PrivacyPolicy fullPage={false}/>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={handleClosePrivacyPolicyModal}>{t('Close')}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
