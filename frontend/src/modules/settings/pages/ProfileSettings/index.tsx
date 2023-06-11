import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { DateInput, Form, PageWrapper } from '@/components';
import { useForm, useMutation, useQuery } from '@/hooks';
import FIELDS_VALIDATION_RULES from '@/lib/constants/fields-validation-rules';
import { locations } from '@/lib/constants/country-city';
import { ProfileService } from '@/lib/service';
import { RootState } from '@/store';
import { Avatar, Input, Select, SubmitButton } from '@/ui-kit';

import styles from './styles.module.scss';

const ProfileSettingsPage = () => {
  const { t } = useTranslation();
  const userId = useSelector((state: RootState) => state.user.id as number);

  const profileService = new ProfileService();

  const { loading: profileLoading, data: profile = {} } = useQuery(() => profileService.getProfile(userId));

  const { formData, onChange, isValid } = useForm(
    {
      firstName: {
        value: profile.firstName,
        minLength: FIELDS_VALIDATION_RULES.FIRST_NAME.MIN,
        maxLength: FIELDS_VALIDATION_RULES.FIRST_NAME.MAX,
      },
      lastName: {
        value: profile.lastName,
        minLength: FIELDS_VALIDATION_RULES.LAST_NAME.MIN,
        maxLength: FIELDS_VALIDATION_RULES.LAST_NAME.MAX,
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
        minLength: FIELDS_VALIDATION_RULES.COUNTRY.MIN,
        maxLength: FIELDS_VALIDATION_RULES.COUNTRY.MAX,
      },
      city: {
        value: profile.city,
        minLength: FIELDS_VALIDATION_RULES.CITY.MIN,
        maxLength: FIELDS_VALIDATION_RULES.CITY.MAX,
      },
      avatar: {
        value: `${import.meta.env.VITE_API_URL}/${profile.avatar}`,
      },
    },
    profileLoading,
  );

  const {
    mutate: onSubmit,
    loading,
    error,
  } = useMutation(() =>
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
  );

  const { mutate: onUpdateAvatar } = useMutation((file) => profileService.updateAvatar(Number(userId), file as File));

  return (
    <PageWrapper
      loading={loading}
      error={error}
    >
      {!loading && (
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
                placeholder={t('Name')}
              />
              <Input
                value={formData.lastName.value as string}
                valid={formData.lastName.valid}
                onChange={(value) => onChange('lastName', value)}
                placeholder={t('Surname')}
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
                  formData.country.value && formData.country.value in locations
                    ? locations[formData.country.value as keyof typeof locations].map((city: string) => ({
                        label: city,
                        value: city,
                      }))
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
      )}
    </PageWrapper>
  );
};

export default ProfileSettingsPage;
