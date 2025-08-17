import {Button, Modal, Navbar} from "flowbite-react";
import {useTracker} from "meteor/react-meteor-data";
import React, {useState} from 'react';
import {Router} from "../../routes/Router.js";
import {useRouteUtility} from "../../shared/utilities/RouteUtility.js";
import {Credits} from "../components/credits/Credits";
import {Header} from "../components/header/Header.jsx";
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
import {onChangeLocale} from "../../../imports/modules/shared/functions/onChangeLocale";
import i18n from "meteor/universe:i18n";

const InnerLayout = () => {
  const t = useTranslator();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] = useState(false);

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const currentLanguage = i18n.getLocale();
  const {supportedLanguages} = Meteor.settings.public.app;
  const languageLabel = <img src={`/online/images/flags/${currentLanguage}.svg`} alt={t("Language")} className="w-5 mr-1 pt-1"/>;


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

  const handleOpenLanguageModal = () => {
    setIsLanguageModalOpen(true);
  }

  const handleCloseLanguageModal = () => {
    setIsLanguageModalOpen(false);
  }

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const {name, logo} = Meteor.settings.public.app;

  const user = useTracker(() => {
    return Meteor.userId()
  });

  if (user) {
    return (
      <section className="dark:bg-gray-900 min-h-screen">
        <Header onToggleSidebar={handleToggleSidebar}/>

        <Nav isOpen={isSidebarOpen}/>

        <main className="px-0 md:px-4 py-16 md:pt-20 md:ml-64 h-auto">
          <section className={`bg-white dark:bg-gray-900 ${isHomepage ? '' : 'px-4 py-5 sm:p-0'}`}>
            <Router/>
          </section>
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
        <Navbar.Brand>
          <Link to={ROUTE.HOME}>
            <img src={logo} alt={name} style={{'width': 'auto', 'height': '24px'}}/>
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle/>

        <Navbar.Collapse>
          <Navbar.Link href="#" onClick={handleOpenAboutModal}>
            {t('About')}
          </Navbar.Link>
          <Navbar.Link href="#" onClick={handleOpenPrivacyPolicyModal}>
            {t('Privacy policy')}
          </Navbar.Link>
          <Navbar.Link href="#" onClick={handleOpenLanguageModal}>
            {languageLabel}
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <main>
        <div className="mx-auto px-4 sm:px-6 lg:items-center lg:justify-between lg:py-16 lg:px-8">
          <PublicRouter/>
        </div>
      </main>

      <Modal dismissible show={isAboutModalOpen} onClose={handleCloseAboutModal} size="lg">
        <Modal.Header>{t('About')}</Modal.Header>
        <Modal.Body className="m-modal-body">
          <AboutUs fullPage={false}/>
        </Modal.Body>
        <Modal.Footer>
          <Button color="default" onClick={handleCloseAboutModal}>{t('Close')}</Button>
        </Modal.Footer>
      </Modal>

      <Modal dismissible show={isPrivacyPolicyModalOpen} onClose={handleClosePrivacyPolicyModal} size="lg">
        <Modal.Header>{t('Privacy policy')}</Modal.Header>
        <Modal.Body className="m-modal-body">
          <PrivacyPolicy fullPage={false}/>
        </Modal.Body>
        <Modal.Footer>
          <Button color="default" onClick={handleClosePrivacyPolicyModal}>{t('Close')}</Button>
        </Modal.Footer>
      </Modal>

      <Modal dismissible show={isLanguageModalOpen} onClose={handleCloseLanguageModal} size="lg">
        <Modal.Header>{t('Language')}</Modal.Header>
        <Modal.Body className="m-modal-body">
          {supportedLanguages.map(({languageCode, languageLabel}) => (
            <Button color="default"  key={languageCode} onClick={() => onChangeLocale(languageCode)} className={'w-100 mb-3 cursor-pointer'}>
              <img src={`/online/images/flags/${languageCode}.svg`} alt={languageLabel} className="w-5 mr-1 pt-1 float-left"/>
              {languageLabel}
            </Button>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button color="default" onClick={handleCloseLanguageModal}>{t('Close')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const ConditionalLayout = ({...props}) => (
  <InnerLayout {...props} />
);
