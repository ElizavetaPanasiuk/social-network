import { Form } from '@/components';
import { useForm } from '@/hooks';
import FIELDS_LENGTH from '@/lib/constants/fields-length';
import { useTranslation } from 'react-i18next';
import { DateInput } from '@/components';
import { Input, Select, SubmitButton } from '@/ui-kit';
import { locations } from '@/lib/constants/country-city';

const ProfileSettingsPage = () => {
  const { formData, onChange, isValid } = useForm({
    firstName: {
      value: '',
      minLength: FIELDS_LENGTH.FIRST_NAME.MIN,
      maxLength: FIELDS_LENGTH.FIRST_NAME.MAX,
    },
    lastName: {
      value: '',
      minLength: FIELDS_LENGTH.LAST_NAME.MIN,
      maxLength: FIELDS_LENGTH.LAST_NAME.MAX,
    },
    dateOfBirth: {
      value: {
        year: null,
        month: null,
        date: null,
      },
    },
    country: {
      value: '',
      minLength: FIELDS_LENGTH.COUNTRY.MIN,
      maxLength: FIELDS_LENGTH.COUNTRY.MAX,
    },
    city: {
      value: '',
      minLength: FIELDS_LENGTH.CITY.MIN,
      maxLength: FIELDS_LENGTH.CITY.MAX,
    },
  });
  const { t } = useTranslation();
  const onSubmit = () => console.log('submit');

  return (
    <Form onSubmit={onSubmit}>
      <Input
        value={formData.firstName.value as string}
        valid={formData.firstName.valid}
        onChange={(value) => onChange('firstName', value)}
        placeholder={t('Name') as string}
      />
      <Input
        value={formData.lastName.value as string}
        valid={formData.lastName.valid}
        onChange={(value) => onChange('lastName', value)}
        placeholder={t('Surname') as string}
      />
      <p>{t('Birthday')}</p>
      <DateInput
        value={formData.dateOfBirth.value}
        onChange={(value) => onChange('dateOfBirth', value)}
      />
      <Select
        value={formData.country.value as string}
        onChange={(value) => onChange('country', value as keyof typeof locations)}
        label={t('Country')}
        options={Object.keys(locations).map((country) => ({ label: country, value: country }))}
      />
      <Select
        value={formData.city.value as string}
        onChange={(value) => onChange('city', value as string)}
        label={t('City')}
        disabled={!formData.country}
        options={
          formData.country.value
            ? locations?.[formData.country.value].map((city: string) => ({ label: city, value: city }))
            : []
        }
      />
      <SubmitButton
        title={t('Save')}
        disabled={!isValid}
      />
    </Form>
  );
};

export default ProfileSettingsPage;
