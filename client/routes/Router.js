import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTE } from "./enums/route.js";
import { AboutUs } from "../ui/pages/aboutUs/AboutUs";
import { Admin } from "../ui/pages/admin/Admin.jsx";
import { ContactRequestForm } from "../ui/pages/contactRequests/ContactRequestForm";
import { Docs } from "../ui/pages/docs/Docs.jsx";
import { Faqs } from "../ui/pages/help/Faqs";
import { Hello } from "../ui/pages/Hello.jsx";
import { Profile } from "../ui/pages/userProfile/Profile.jsx";
import { Prices } from "../ui/pages/prices/Prices.jsx";
import { TicketForm } from "../ui/pages/tickets/TicketForm.jsx";
import { Settings } from "../ui/pages/admin/settings/Settings.jsx";
import { Stores } from "../ui/pages/stores/Stores";
import { Wallet } from "../ui/pages/wallet/Wallet";
import { Help } from "../ui/pages/help/Help";
import { UserProfiles } from "../ui/pages/admin/userProfiles/UserProfiles";
import { ResetPassword } from "../ui/pages/auth/password/ResetPassword";
import { ContactRequestList } from "../ui/pages/admin/settings/contactRequests/ContactRequestList";
import { FaqsList } from "../ui/pages/admin/settings/faqs/FaqsList";
import { TicketsList } from "../ui/pages/admin/settings/tickets/TicketsList.jsx";
import { ticketAddBridge, ticketEditBridge } from "../../imports/modules/app/tickets/schemas/ticketSchema";
import {Checkout} from "../ui/pages/checkout/Checkout";

// Lazy-loaded components
const RssFeedList = lazy(() => import('../ui/pages/rssFeed/RssFeedList'));

export const Router = () => (
  <Suspense fallback={<div>Loading...</div>}>
      <Routes>
          <Route path={ROUTE.ABOUT_US} element={<AboutUs />} />
          <Route path={ROUTE.ADMIN} element={<Admin />} />
          <Route path={ROUTE.CHECKOUT} element={<Checkout />} />
          <Route path={ROUTE.CONTACT_FORM} element={<ContactRequestForm />} />
          <Route path={ROUTE.DOCS} element={<Docs />} />
          <Route path={ROUTE.FAQS} element={<Faqs />} />
          <Route path={ROUTE.HOME} element={<Hello />} />
          <Route path={ROUTE.HELP} element={<Help />} />
          <Route path={ROUTE.PRICE} element={<Prices />} />
          <Route path={ROUTE.PROFILE} element={<Profile />} />
          <Route path={ROUTE.RESET_PASSWORD} element={<ResetPassword />} />
          {/* Lazy-loaded route */}
          <Route path={ROUTE.RSS_FEED_LIST} element={<RssFeedList />} />
          <Route path={ROUTE.SETTINGS} element={<Settings />} />
          <Route path={ROUTE.SETTINGS_ABOUT_US} element={<AboutUs />} />
          <Route path={ROUTE.SETTINGS_CONTACT_REQUESTS_LIST} element={<ContactRequestList />} />
          <Route path={ROUTE.SETTINGS_FAQS_LIST} element={<FaqsList />} />
          <Route path={ROUTE.SETTINGS_TICKETS_FORM} element={<TicketForm schema={ticketEditBridge} />} />
          <Route path={ROUTE.SETTINGS_TICKETS_LIST} element={<TicketsList />} />
          <Route path={ROUTE.STORES} element={<Stores />} />
          <Route path={ROUTE.TICKETS_FORM} element={<TicketForm schema={ticketAddBridge} />} />
          <Route path={ROUTE.USER_PROFILES} element={<UserProfiles />} />
          <Route path={ROUTE.WALLET} element={<Wallet />} />
      </Routes>
  </Suspense>
);
