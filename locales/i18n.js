const { I18n } = require('i18n');

const i18n = new I18n({
  defaultLocale: 'ru',
  directory: __dirname,
  objectNotation: true,
});

module.exports = i18n;