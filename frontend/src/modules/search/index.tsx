import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { EmptyListMessage, ProfileRow } from '@/components';
import { useQuery } from '@/hooks';
import { ProfileService } from '@/lib/service';
import { locations } from '@/lib/constants/country-city';
import { BasicProfileInfo } from '@/lib/global/types';
import { Loader, Input, Select } from '@/ui-kit';

import styles from './styles.module.scss';

const SearchPage = () => {
  const { t } = useTranslation();
  const profileService = new ProfileService();
  const [searchString, setSearchString] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const {
    loading,
    data,
  }: {
    loading: boolean;
    data: BasicProfileInfo[];
  } = useQuery((page?: number) => profileService.searchUsers({ search: searchString, city, country, page }), {
    dependencies: [country, city, searchString],
    pagination: {
      enabled: true,
      ref: ref,
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
        {loading ? (
          <Loader />
        ) : !data.length ? (
          <EmptyListMessage text="No users matching the parameters" />
        ) : (
          data.map((profile) => (
            <ProfileRow
              key={profile.id}
              {...profile}
            />
          ))
        )}
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
