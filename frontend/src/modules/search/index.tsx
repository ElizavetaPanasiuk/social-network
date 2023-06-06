import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { EmptyListMessage, PageWrapper, ProfileRow } from '@/components';
import { useQuery } from '@/hooks';
import { ProfileService } from '@/lib/service';
import { locations } from '@/lib/constants/country-city';
import { BasicProfileInfo, QueryError } from '@/lib/global/types';
import { Input, Select } from '@/ui-kit';

import styles from './styles.module.scss';

const SearchPage = () => {
  const { t } = useTranslation();
  const [searchString, setSearchString] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const profileService = new ProfileService();

  const {
    loading,
    data,
    error,
  }: {
    loading: boolean;
    data: BasicProfileInfo[];
    error: QueryError;
  } = useQuery((page?: number) => profileService.searchUsers({ search: searchString, city, country, page }), {
    dependencies: [country, city, searchString],
    pagination: {
      enabled: true,
      ref: ref as unknown as HTMLElement,
    },
  });

  return (
    <div className={styles.searchPage}>
      <div
        className={styles.mainPanel}
        ref={ref}
      >
        <Input
          value={searchString}
          onChange={setSearchString}
          placeholder={t('Search') as string}
          className={styles.searchInput}
        />
        <PageWrapper
          loading={loading}
          error={error}
        >
          {!data?.length ? (
            <EmptyListMessage text={t('No users matching the parameters')} />
          ) : (
            data.map((profile) => (
              <ProfileRow
                key={profile.id}
                {...profile}
              />
            ))
          )}
        </PageWrapper>
      </div>
      <div className={styles.filters}>
        <Select
          label={t('Country')}
          options={Object.keys(locations).map((country) => ({ value: country, label: country }))}
          value={country}
          onChange={setCountry}
        />
        <Select
          label={t('City')}
          options={
            country
              ? locations[country as keyof typeof locations].map((city: string) => ({ value: city, label: city }))
              : []
          }
          value={city}
          disabled={!country}
          onChange={setCity}
        />
      </div>
    </div>
  );
};

export default SearchPage;
