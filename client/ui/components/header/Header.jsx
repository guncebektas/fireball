import React, {useEffect} from "react";
import {DarkThemeToggle} from "flowbite-react";
import {HeaderLogo} from "./HeaderLogo.jsx";
import {HeaderSearch} from "./HeaderSearch.jsx";
import {HeaderToggleButton} from "./HeaderToggleButton.jsx";
import {HeaderNotifications} from "./HeaderNotifications.jsx";
import {HeaderOrganization} from "./HeaderOrganization.jsx";
import {HeaderProfile} from "./HeaderProfile.jsx";
import {LanguageSelector} from "../languageSelector/LanguageSelector";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {isSearchEnabled} from "../../../../imports/modules/shared/functions/isSearchEnabled";
import {useTranslator} from "../../providers/i18n";

export const Header = ({ onToggleSidebar }) => {
  const t = useTranslator();

  useEffect(() => {
    const theme = localStorage.getItem('color-theme');
    const htmlElement = document.querySelector('html');

    if (theme === 'dark') {
      htmlElement.classList.add('dark');

      // Trigger dark mode toggle only if the button exists
      const buttonElement = document.querySelector('button[aria-label*="Toggle dark mode"]');
      if (buttonElement) {
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
        buttonElement.dispatchEvent(clickEvent);
      }
    } else {
      htmlElement.classList.remove('dark');
    }

    // Function to handle changes in the 'dark' class
    const handleDarkModeChange = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDarkMode = htmlElement.classList.contains('dark');
          // localStorage.setItem('color-theme', isDarkMode ? 'dark' : 'light');
        }
      }
    };

    // Set up MutationObserver
    const observer = new MutationObserver(handleDarkModeChange);
    observer.observe(htmlElement, { attributes: true, attributeFilter: ['class'] });

    // Clean up MutationObserver when component unmounts
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 fixed top-0 right-0 left-0 px-4 py-2.5 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <HeaderToggleButton onClick={onToggleSidebar} />
          <HeaderLogo />
          <HeaderSearch />
        </div>
        <div className="flex items-center lg:order-2">
          {isSearchEnabled() && (
            <button
              type="button"
              data-drawer-toggle="drawer-navigation"
              aria-controls="drawer-navigation"
              className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">{t('Toggle search')}</span>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          )}
          <DarkThemeToggle />
          <HeaderNotifications />
          <HeaderOrganization />
          <div className="header-dropdown-wrapper p-2.5">
            <HeaderProfile />
          </div>
          <div className="header-dropdown-wrapper p-2.5">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};
