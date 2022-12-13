const path = require('path')
module.exports = {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'sp', 'vn'],
      localePath: path.resolve('./public/locales')
    },
    react: { useSuspense: false },
  }