import React from "react";
import {Accordion} from 'flowbite-react';
import {H2} from "../../components/heading/Headings";
import {useTranslator} from "../../providers/i18n";
import {useTracker} from "meteor/react-meteor-data";
import {faqRepository} from "../../../../imports/modules/app/faqs/faqRepository";
import {FAQS_PUBLICATION} from "../../../../imports/modules/app/faqs/enums/publication";
import {faqModule} from "../../../../imports/modules/app/faqs/faqModule";

export const Faqs = () => {
  const t = useTranslator();

  const _module = faqModule;
  const columns = [
    {key: 'question'},
    {key: 'answer'}
  ];

  const {items, loading} = useTracker(() => {
    const handle = Meteor.subscribe(_module.publisher.ALL_ONCE, columns);
    return {
      loading: !handle.ready(),
      items: handle.ready() ? _module.repository.find().fetch() : []
    };
  });

  console.log(items);

  return (
    <>
      <H2 text={t('FAQs')} showBackButton={true}/>
      <Accordion>
        {items.map((faq, index) => (
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
