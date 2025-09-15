import React from 'react';
import {H2, H3} from "../../../components/heading/Headings";
import {useTranslator} from "../../../providers/i18n";

export const PrivacyPolicy = ({fullPage}) => {
  const {name} = Meteor.settings.public.app;
  const company = Meteor.settings.public.company;
  const t = useTranslator();
  const title = t('PrivacyPolicy');

  return (
    <>
      {fullPage && (
        <H2 text={title} showBackButton={true}/>
      )}

      <div className="text-lg text-gray-500 space-y-6 mt-4 mb-8">
        <H3 text={t('privacy.title.1')}/>
        <p>{t('privacy.content.1-1', {companyName: company.name, appName: name})}</p>

        <H3 text={t('privacy.title.2')}/>
        <p>{t('privacy.content.2-2')}</p>
        <p>{t('privacy.content.2-3', {companyName: company.name})}</p>
        <p>{t('privacy.content.2-4', {companyName: company.name})}</p>
        <p>{t('privacy.content.2-5')}</p>
        <p>{t('privacy.content.2-6', {companyName: company.name})}</p>
        <p>{t('privacy.content.2-7')}</p>
        <p>{t('privacy.content.2-8')}</p>
        <p>{t('privacy.content.2-9', {companyName: company.name})}</p>

        <H3 text={t('privacy.title.3')}/>
        <p>{t('privacy.content.3-1')}</p>

        <H3 text={t('privacy.title.4')}/>
        <p>{t('privacy.content.4-1')}</p>

        <H3 text={t('privacy.title.5')}/>
        <p>{t('privacy.content.5-1')}</p>
        <p>{t('privacy.content.5-2', {companyWebsite: company.website})}</p>
        <ul>
          <li>{t('privacy.content.5-3', {companyAddress: company.address})}</li>
          <li>{t('privacy.content.5-4', {companyMainEmail: company.email.main})}</li>
          <li>{t('privacy.content.5-5')}</li>
        </ul>
        <p>{t('privacy.content.5-7')}</p>
      </div>
    </>
  );
};
