import i18n from "meteor/universe:i18n";

export const onChangeLocale = async locale => {
  /* eslint-disable no-unreachable */
  if (false) {
    import '../../../../translations/de-DE.i18n.json';
    import '../../../../translations/en-US.i18n.json';
    import '../../../../translations/tr-TR.i18n.json';
  }

  await import(`../../../../translations/${locale}.i18n.json`);
  await i18n.setLocale(locale);
};
