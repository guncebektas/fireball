import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Flowbite} from "flowbite-react";
import {ConditionalLayout} from "./layouts/ConditionalLayout.jsx";
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import {faBell, faCheck, faCircleInfo, faClipboard, faClipboardList, faCodeMerge, faCoffee, faCog, faDashboard, faEnvelope, faEnvelopesBulk, faFile, faHeart, faHouse, faLifeRing, faMeteor, faMoneyBillWave, faPenRuler, faRightFromBracket, faRss, faStar, faStore, faSuitcase, faUser, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {LocaleProvider} from "./providers/i18n";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {ConnectionAlert} from "./components/alert/ConnectionAlert";
import SvgSprite from "./components/icon/svgSprite";

fontawesome.library.add(
  faBell,
  faCheck,
  faClipboard,
  faClipboardList,
  faCircleInfo,
  faCodeMerge,
  faCoffee,
  faCog,
  faDashboard,
  faEnvelope,
  faEnvelopesBulk,
  faFile,
  faGithub,
  faGoogle,
  faHeart,
  faHouse,
  faMeteor,
  faMoneyBillWave,
  faLifeRing,
  faPenRuler,
  faRightFromBracket,
  faRss,
  faStar,
  faStore,
  faSuitcase,
  faUser,
  faUserTie,
);

const customTheme = {
  button: {
    color: {
      default: "py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      primary: "w-full flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white !bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
    },
  },
};

export function App() {
  return (
    <Flowbite theme={{theme: customTheme}}>
      <BrowserRouter>
        <div className="antialiased bg-indigo-50 dark:bg-gray-800">
          <div className="min-h-screen mx-auto font-sans">
            <LocaleProvider>
              <SvgSprite/>
              <ConnectionAlert/>
              <ConditionalLayout/>
            </LocaleProvider>
          </div>
        </div>
      </BrowserRouter>
    </Flowbite>
  );
}
