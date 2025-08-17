import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ROUTE} from "./enums/route.js";
import {AboutUs} from "../ui/pages/aboutUs/AboutUs";
import {PrivacyPolicy} from "../ui/pages/auth/legal/PrivacyPolicy";
import {Auth} from "../ui/pages/auth/Auth";
import {Stores} from "../ui/pages/stores/Stores";

export const PublicRouter = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Auth/>}/>
      <Route path={ROUTE.ABOUT_US} element={<AboutUs/>}/>
      <Route path={ROUTE.PRIVACY_POLICY} element={<PrivacyPolicy/>}/>
      <Route path={ROUTE.STORES} element={<Stores/>}/>
    </Routes>
  </Suspense>
);
