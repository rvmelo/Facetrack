import I18n from 'i18n-js';
import * as Localization from 'expo-localization';

import en from './english';
import pt from './portuguese';
import es from './spanish';

// Set the key-value pairs for the different languages you want to support.
I18n.translations = {
  en,
  pt,
  es,
};

// Set the locale once at the beginning of your app.
I18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
I18n.fallbacks = true;

export const location = I18n.locale;
export const translate = (key: string): string => I18n.t(key);
