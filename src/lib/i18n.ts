import zh from '../../content/i18n/zh.json';
import en from '../../content/i18n/en.json';

export const translations = { zh, en };

export type Locale = 'zh' | 'en';
export type TranslationKey = keyof typeof zh;

export function getTranslation(locale: Locale) {
  return translations[locale] || translations.en;
}

export function getDefaultLocale(): Locale {
  return 'en';
}

export function getOtherLocale(locale: Locale): Locale {
  return locale === 'zh' ? 'en' : 'zh';
}
