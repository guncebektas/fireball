import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {ROUTE} from "./enums/route.js";
import {AboutUs} from "../ui/pages/aboutUs/AboutUs";
import {Admin} from "../ui/pages/admin/Admin.jsx";
import {ContactRequestForm} from "../ui/pages/contactRequests/ContactRequestForm";
import {ContactRequests} from "../ui/pages/contactRequests/ContactRequests";
import {Docs} from "../ui/pages/docs/Docs.jsx";
import {Faqs} from "../ui/pages/help/Faqs";
import {Hello} from "../ui/pages/Hello.jsx";
import {Profile} from "../ui/pages/profile/Profile.jsx";
import {Prices} from "../ui/pages/prices/Prices.jsx";
import {RssFeedList} from "../ui/pages/rssFeed/RssFeedList";
import {Tickets} from "../ui/pages/tickets/Tickets.jsx";
import {TicketForm} from "../ui/pages/tickets/TicketForm.jsx";
import {Settings} from "../ui/pages/settings/Settings.jsx";
import {Stores} from "../ui/pages/stores/Stores";
import {Wallet} from "../ui/pages/wallet/Wallet";
import {Help} from "../ui/pages/help/Help";

export const Router = () => (
  <Routes>
    <Route path={ROUTE.ABOUT_US} element={<AboutUs/>}/>
    <Route path={ROUTE.ADMIN} element={<Admin/>}/>
    <Route path={ROUTE.CONTACT_FORM} element={<ContactRequestForm />} />
    <Route path={ROUTE.CONTACT_REQUESTS} element={<ContactRequests />} />
    <Route path={ROUTE.DOCS} element={<Docs/>}/>
    <Route path={ROUTE.FAQS} element={<Faqs/>}/>
    <Route path={ROUTE.HOME} element={<Hello/>}/>
    <Route path={ROUTE.HELP} element={<Help/>}/>
    <Route path={ROUTE.PRICE} element={<Prices/>}/>
    <Route path={ROUTE.PROFILE} element={<Profile/>}/>
    <Route path={ROUTE.RSS_FEED_LIST} element={<RssFeedList/>}/>
    <Route path={ROUTE.SETTINGS} element={<Settings/>}/>
    <Route path={ROUTE.STORES} element={<Stores/>}/>
    <Route path={ROUTE.TICKETS} element={<Tickets/>}/>
    <Route path={ROUTE.TICKET} element={<TicketForm/>}/>
    <Route path={ROUTE.WALLET} element={<Wallet/>}/>
  </Routes>
);
