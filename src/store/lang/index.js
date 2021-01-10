import { useState } from 'react';
import { LANGE_ENUM } from '@src/constants/lang';
import createStore from '@src/store/utils/create';

const useLang = () => {
  const [lang, setLang] = useState(LANGE_ENUM.ZH);

  return { lang, setLang };
};

const langStore = createStore(useLang);

export default langStore;
