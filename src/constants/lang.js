import messages_zh from '@src/locales/zh_CN.json';
import messages_en from '@src/locales/en_US.json';

export const LANGE_ENUM = {
  ZH: 'zh',
  EN: 'en',
};

export const messages = {
  [LANGE_ENUM.ZH]: messages_zh,
  [LANGE_ENUM.EN]: messages_en,
};
