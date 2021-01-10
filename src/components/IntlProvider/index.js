import React from 'react';
import { IntlProvider } from 'react-intl';
import { messages } from '@src/constants/lang';
import langStore from '@src/store/lang';

const MyIntlProvider = ({ children }) => {
  const { lang } = langStore.useStore((m) => [m.lang]);

  return (
    <IntlProvider messages={messages[lang]} locale={lang}>
      {children}
    </IntlProvider>
  );
};

export default MyIntlProvider;
