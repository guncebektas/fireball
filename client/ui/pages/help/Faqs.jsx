import React from "react";
import {Accordion} from 'flowbite-react';
import {H2} from "../../components/heading/Headings";
import {useTranslator} from "../../providers/i18n";

export const Faqs = () => {
  const t = useTranslator();

  const faqs = [
    { question: 'What is your return policy?', answer: 'Our return policy lasts 30 days...' },
    { question: 'How long does shipping take?', answer: 'Shipping usually takes 5-7 business days...' },
    { question: 'Where are you located?', answer: 'We are located in New York City...' },
  ];

  return (
    <>
      <H2 text={t('FAQs')} showBackButton={true}/>
      <Accordion>
        {faqs.map((faq, index) => (
          <Accordion.Panel key={index}>
            <Accordion.Title>
              {faq.question}
            </Accordion.Title>
            <Accordion.Content>
              <p className="m-text">{faq.answer}</p>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </>
  );
};
