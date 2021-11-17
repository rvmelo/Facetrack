// i18n
import {
  differenceInHours,
  differenceInDays,
  differenceInMinutes,
  format,
} from 'date-fns';
import * as dateFNSLocales from 'date-fns/locale';
import { location } from '../i18n/src/locales';

export const getDate = (date: string): string => {
  const minutes = differenceInMinutes(new Date(), new Date(date));
  const hours = differenceInHours(new Date(), new Date(date));
  const days = differenceInDays(new Date(), new Date(date));

  if (minutes < 1) {
    return 'less than one minute ago';
  }

  if (minutes === 1) {
    return `${minutes} minute ago`;
  }

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  if (hours < 1) {
    return 'less than one hour ago';
  }

  if (hours === 1) {
    return `${hours} hour ago`;
  }

  if (hours < 24) {
    return `${hours} hours ago`;
  }

  if (days === 1) {
    return `${days} days ago`;
  }

  if (days <= 7) {
    return `${days} days ago`;
  }

  return format(new Date(date), 'dd MMMM YYY', {
    locale:
      dateFNSLocales[location.substring(0, 2) as 'pt' | 'es'] ??
      dateFNSLocales.enUS,
  });
};
