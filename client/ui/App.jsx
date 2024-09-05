import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Flowbite} from "flowbite-react";
import {ConditionalLayout} from "./layouts/ConditionalLayout.jsx";
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import {faBell, faCheck, faClipboard, faClipboardList, faCodeMerge, faCoffee, faCog, faDashboard, faFile, faMeteor, faMoneyBillWave, faPenRuler, faSuitcase, faUser, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {LocaleProvider} from "./providers/i18n";

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
  faPenRuler,
  faSuitcase,
  faUser,
  faUserTie
);

export function App() {
  return (
    <Flowbite>
      <BrowserRouter>
        <div className="antialiased bg-indigo-50 dark:bg-gray-800">
          <div className="min-h-screen mx-auto">
            <LocaleProvider>
              <ConditionalLayout/>
            </LocaleProvider>
          </div>
        </div>
      </BrowserRouter>
    </Flowbite>
  );
}
