import {defineRouting} from 'next-intl/routing';

export const LOCALES = [
  { short: 'en', long: 'English' },
  { short: 'hi', long: 'हिन्दी' },
  { short: 'es', long: 'Español' },
  { short: 'de', long: 'Deutsch' },
  { short: 'fr', long: 'Français' }
];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES.map(locale => locale.short),

  // Used when no locale matches
  defaultLocale: 'en'
});