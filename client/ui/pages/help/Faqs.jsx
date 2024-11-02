import React from "react";
import {Accordion} from 'flowbite-react';
import {useTranslator} from "../../providers/i18n";
import {useTracker} from "meteor/react-meteor-data";
import {faqModule} from "../../../../imports/modules/app/faqs/faqModule";
import {H2} from "../../components/heading/Headings";

export const Faqs = ({showTitle = true}) => {
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

  return (
    <>
      {showTitle ? <div className="mb-3"><H2 text={t('FAQs')} showBackButton={true}/></div> : ''}
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
