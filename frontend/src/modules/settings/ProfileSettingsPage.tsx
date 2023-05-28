import { useForm, useMutation, useQuery } from '@/hooks';
import FIELDS_LENGTH from '@/lib/constants/fields-length';
import { useTranslation } from 'react-i18next';
import { DateInput, Form } from '@/components';
import { Avatar, Input, Loader, Select, SubmitButton } from '@/ui-kit';
import { locations } from '@/lib/constants/country-city';
import styles from './styles.module.scss';
import { ProfileService } from '@/lib/service';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ProfileSettingsPage = () => {
  const profileService = new ProfileService();
  const userId = useSelector((state: RootState) => state.user.id);
  const { loading: profileLoading, data: profile } = useQuery(() => profileService.getProfile(Number(userId)));
  const { formData, onChange, isValid } = useForm(
    {
      firstName: {
        value: profile.firstName,
        minLength: FIELDS_LENGTH.FIRST_NAME.MIN,
        maxLength: FIELDS_LENGTH.FIRST_NAME.MAX,
      },
      lastName: {
        value: profile.lastName,
        minLength: FIELDS_LENGTH.LAST_NAME.MIN,
        maxLength: FIELDS_LENGTH.LAST_NAME.MAX,
      },
      dateOfBirth: {
        value: {
          year: new Date(profile.dateOfBirth).getFullYear(),
          month: new Date(profile.dateOfBirth).getMonth(),
          date: new Date(profile.dateOfBirth).getDate(),
        },
      },
      country: {
        value: profile.country,
        minLength: FIELDS_LENGTH.COUNTRY.MIN,
        maxLength: FIELDS_LENGTH.COUNTRY.MAX,
      },
      city: {
        value: profile.city,
        minLength: FIELDS_LENGTH.CITY.MIN,
        maxLength: FIELDS_LENGTH.CITY.MAX,
      },
      avatar: {
        value: `http://localhost:5000/${profile.avatar}`,
      },
    },
    profileLoading,
  );
  const { t } = useTranslation();
  const { mutate: onSubmit, loading } = useMutation(
    () =>
      profileService.updateProfile(userId as number, {
        firstName: formData.firstName.value,
        lastName: formData.lastName.value,
        country: formData.country.value,
        city: formData.city.value,
        dateOfBirth: new Date(
          formData.dateOfBirth.value.year,
          formData.dateOfBirth.value.month,
          formData.dateOfBirth.value.date,
        ),
      }),
    {
      onSuccess: () => {},
    },
  );

  const { mutate: onUpdateAvatar, loading: loadingAvatar } = useMutation(
    (file) => profileService.updateAvatar(Number(userId), file),
    { onSuccess: () => {} },
  );

  return profileLoading ? (
    <Loader />
  ) : (
    <Form
      onSubmit={onSubmit}
      className={styles.profileSettings}
    >
      <Avatar
        src={formData.avatar.value}
        alt={`${formData.firstName.value} ${formData.lastName.value}`}
        edit
        onChange={(field, value) => {
          onChange(field, value);
          onUpdateAvatar(value);
        }}
        size="large"
      />
      <div className={styles.profileData}>
        <div className={styles.row}>
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
        </div>
        <p>{t('Birthday')}</p>
        <DateInput
          value={formData.dateOfBirth.value}
          onChange={(value) => onChange('dateOfBirth', value)}
        />
        <div className={styles.row}>
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
        </div>
        <SubmitButton
          title={t('Save')}
          disabled={loading || !isValid}
        />
      </div>
    </Form>
  );
};

export default ProfileSettingsPage;
