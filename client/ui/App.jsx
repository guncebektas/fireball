import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Flowbite} from "flowbite-react";
import {ConditionalLayout} from "./layouts/ConditionalLayout.jsx";
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import {faBell, faCheck, faClipboard, faClipboardList, faCodeMerge, faCoffee, faCog, faDashboard, faEnvelope, faEnvelopesBulk, faFile, faHeart, faMeteor, faMoneyBillWave, faPenRuler, faRightFromBracket, faRss, faStar, faStore, faSuitcase, faUser, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {LocaleProvider} from "./providers/i18n";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {ConnectionAlert} from "./components/alert/ConnectionAlert";

fontawesome.library.add(
  faBell,
  faCheck,
  faClipboard,
  faClipboardList,
  faCodeMerge,
  faCoffee,
  faCog,
  faDashboard,
  faFile,
  faMoneyBillWave,
  faMeteor,
  faHeart,
  faPenRuler,
  faRss,
  faSuitcase,
  faUser,
  faUserTie,
  faEnvelope,
  faEnvelopesBulk,
  faStar,
  faStore,
  faRightFromBracket,
  faGithub,
  faGoogle,
);

const customTheme = {
  button: {
    color: {
      primary: "w-full flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
    },
  },
};

export function App() {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <BrowserRouter>
        <div className="antialiased bg-indigo-50 dark:bg-gray-800">
          <div className="min-h-screen mx-auto">
            <LocaleProvider>
              <ConnectionAlert/>
              <ConditionalLayout/>
            </LocaleProvider>
          </div>
        </div>
      </BrowserRouter>
    </Flowbite>
  );
}
