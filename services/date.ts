import {
  differenceInHours,
  differenceInDays,
  differenceInMinutes,
  format,
} from 'date-fns';
import * as dateFNSLocales from 'date-fns/locale';

// i18n
import I18n from 'i18n-js';
import { location, translate } from '../i18n/src/locales';

export const getDate = (date: string): string => {
  const minutes = differenceInMinutes(new Date(), new Date(date));
  const hours = differenceInHours(new Date(), new Date(date));
  const days = differenceInDays(new Date(), new Date(date));

  if (minutes < 1) {
    return translate('lessThanOneMinute');
  }

  if (minutes === 1) {
    return translate('oneMinuteAgo');
  }

  if (minutes < 60) {
    return I18n.t('minutesAgo', {
      minutes,
    });
  }

  if (hours === 1) {
    return translate('oneHourAgo');
  }

  if (hours < 24) {
    return I18n.t('hoursAgo', {
      hours,
    });
  }

  if (days === 1) {
    return translate('oneDayAgo');
  }

  if (days <= 7) {
    return I18n.t('daysAgo', {
      days,
    });
  }

  return format(new Date(date), 'dd MMMM YYY', {
    locale:
      dateFNSLocales[location.substring(0, 2) as 'pt' | 'es'] ??
      dateFNSLocales.enUS,
  });
};
