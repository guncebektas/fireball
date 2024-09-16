import i18n from "meteor/universe:i18n";

export const onChangeLocale = locale => {
  /* eslint-disable no-unreachable */
  if (false) {
    import '../../../../translations/en-US.i18n.json';
    import '../../../../translations/tr-TR.i18n.json';
  }

  import(`../../../translations/${locale}`).then(async () => {
    await i18n.setLocale(locale);
  });
};
