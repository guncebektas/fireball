import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {ROUTE} from "./enums/route.js";
import {Admin} from "../ui/pages/admin/Admin.jsx";
import {Hello} from "../ui/pages/Hello.jsx";
import {Docs} from "../ui/pages/docs/Docs.jsx";
import {Profile} from "../ui/pages/profile/Profile.jsx";
import {Prices} from "../ui/pages/prices/Prices.jsx";
import {Tickets} from "../ui/pages/tickets/Tickets.jsx";
import {TicketForm} from "../ui/pages/tickets/TicketForm.jsx";
import {Settings} from "../ui/pages/settings/Settings.jsx";
import {ContactRequestForm} from "../ui/pages/contactRequests/ContactRequestForm";
import {ContactRequests} from "../ui/pages/contactRequests/ContactRequests";

export const Router = () => (
  <Routes>
    <Route path={ROUTE.ADMIN} element={<Admin/>}/>
    <Route path={ROUTE.CONTACT_FORM} element={<ContactRequestForm />} />
    <Route path={ROUTE.CONTACT_REQUESTS} element={<ContactRequests />} />
    <Route path={ROUTE.DOCS} element={<Docs/>}/>
    <Route path={ROUTE.HOME} element={<Hello/>}/>
    <Route path={ROUTE.PROFILE} element={<Profile/>}/>
    <Route path={ROUTE.PRICE} element={<Prices/>}/>
    <Route path={ROUTE.SETTINGS} element={<Settings/>}/>
    <Route path={ROUTE.TICKETS} element={<Tickets/>}/>
    <Route path={ROUTE.TICKET} element={<TicketForm/>}/>
  </Routes>
);
