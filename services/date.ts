/* eslint-disable radix */
// i18n
import { location } from '../i18n/src/locales';

export const formatDate = (date: string): string => {
  const auxDate = date.slice(0, 10);

  let formattedDate = auxDate.split('-').reverse().join('/');

  if (location === 'en-US') {
    const dateArray = auxDate.split('-');

    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];

    formattedDate = [month, day, year].join('/');
  }

  return formattedDate;
};

export const getHoursFromDate = (date: string): string => {
  const hour = date.slice(11, 13);

  const dateInfo = parseInt(hour) > 12 ? ' PM' : ' AM';

  return [date.slice(11, 16), dateInfo].join(' ');
};
