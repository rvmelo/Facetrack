// i18n
import { translate } from '../i18n/src/locales';

interface StatusData {
  status: 'single' | 'serious relationship' | 'married' | undefined;
  sex: 'male' | 'female' | undefined;
}

export const translateRelationshipStatus = (data: StatusData): string => {
  const { status, sex } = data;

  if (!status || !sex) return '';

  if (status === 'serious relationship') {
    return translate('seriousRelationship').toLocaleLowerCase();
  }

  if (status === 'married') {
    return sex === 'male'
      ? translate('maleMarried')
      : translate('femaleMarried');
  }

  return sex === 'male' ? translate('maleSingle') : translate('femaleSingle');
};
