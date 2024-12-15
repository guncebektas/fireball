import {FAQS_PUBLICATION} from "./enums/publication";
import {faqRepository} from "./faqRepository";
import {faqsMethod} from "./faqsMethod";
import {ROUTE} from "../../../../client/routes/enums/route";

export const faqModule = {
  publisher: FAQS_PUBLICATION,
  repository: faqRepository,
  methods: faqsMethod,
  list: {
    title: 'FAQs',
    route: ROUTE.SETTINGS_FAQS_LIST,
  },
  form: {
    title: 'FAQ',
    route: ROUTE.SETTINGS_FAQS_FORM,
  }
}
