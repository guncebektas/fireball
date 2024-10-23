import {FAQS_PUBLICATION} from "./enums/publication";
import {faqRepository} from "./faqRepository";
import {faqsMethod} from "./faqs.methods";
import {ROUTE} from "../../../../client/routes/enums/route";

export const faqModule = {
  publisher: FAQS_PUBLICATION,
  repository: faqRepository,
  methods: faqsMethod,
  listRoute: ROUTE.SETTINGS_FAQS_LIST,
  formRoute: ROUTE.SETTINGS_FAQS_FORM,
}
