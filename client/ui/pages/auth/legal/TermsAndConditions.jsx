import React from 'react';
import {H2, H3} from "../../../components/heading/Headings";
import {useTranslator} from "../../../providers/i18n";

export const TermsAndConditions = ({fullPage}) => {
  const {name} = Meteor.settings.public.app;
  const company = Meteor.settings.public.company;
  const t = useTranslator();
  const title = t('TermsAndConditions');

  return (
    <>
      {fullPage && (
        <H2 text={title} showBackButton={true}/>
      )}
      <div className="text-lg text-gray-500 space-y-6 mt-3 mb-8">
        <H3 text={t('terms.title.1')}/>
        <p>{t('terms.content.1-1', {
          appName: name,
          companyName: company.name,
          companyAddress: company.address,
          companyRegistrationOffice: company.registrationOffice,
          companyRegistrationId: company.registrationId,
          companyMersis: company.mersis,
          companyTaxOffice: company.taxOffice,
          companyTaxId: company.taxId,
          companyWebsite: company.website
        })}</p>
        <p>{t('terms.content.1-2')}</p>
        <p>{t('terms.content.1-3')}</p>

        <H3 text={t('terms.title.2')}/>
        <p>{t('terms.content.2-1', {appName: name})}</p>

        <H3 text={t('terms.title.3')}/>
        <p>{t('terms.content.3-1')}</p>
        <p>{t('terms.content.3-2')}</p>
        <p>{t('terms.content.3-3')}</p>
        <p>{t('terms.content.3-4')}</p>

        <H3 text={t('terms.title.4')}/>
        <p>{t('terms.content.4-1')}</p>
        <p>{t('terms.content.4-2')}</p>
        <p>{t('terms.content.4-3')}</p>
        <p>{t('terms.content.4-4')}</p>
        <p>{t('terms.content.4-5')}</p>
        <p>{t('terms.content.4-6')}</p>
        <p>{t('terms.content.4-7')}</p>

        <H3 text={t('terms.title.5')}/>
        <p>{t('terms.content.5-1')}</p>
        <p>{t('terms.content.5-2')}</p>
        <p>{t('terms.content.5-3')}</p>
        <p>{t('terms.content.5-4')}</p>
        <p>{t('terms.content.5-5')}</p>
        <p>{t('terms.content.5-6')}</p>
        <p>{t('terms.content.5-7')}</p>

        <H3 text={t('terms.title.6')}/>
        <p>{t('terms.content.6-1')}</p>
        <p>{t('terms.content.6-2')}</p>

        <H3 text={t('terms.title.7')}/>
        <p>{t('terms.content.7-1', {
          companyMainEmail: company.email.main,
          companyPhone: company.phone
        })}</p>

        <H3 text={t('terms.title.8')}/>
        <p>{t('terms.content.8-1')}</p>
        <p>{t('terms.content.8-2')}</p>
      </div>
    </>
  );
};
