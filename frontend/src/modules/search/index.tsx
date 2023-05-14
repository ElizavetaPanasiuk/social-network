import { ProfileRow } from '@/components';
import { useQuery } from '@/hooks';
import { ProfileService } from '@/lib/service';
import { Loader, Input, Select } from '@/ui-kit';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { locations } from '@/lib/constants/country-city';

const SearchPage = () => {
  const { t } = useTranslation();
  const profileService = new ProfileService();
  const [searchString, setSearchString] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const { loading, data } = useQuery(() => profileService.searchUsers({ search: searchString, city, country }), {
    dependencies: [country, city, searchString],
  });

  return (
    <div className={styles.searchPage}>
      <div className={styles.mainPanel}>
        <Input
          value={searchString}
          onChange={setSearchString}
          placeholder={t('Search') as string}
          className={styles.searchInput}
        />
        {loading ? (
          <Loader />
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
          options={country ? locations[country].map((city) => ({ value: city, label: city })) : []}
          value={city}
          disabled={!country}
          onChange={setCity}
        />
      </div>
    </div>
  );
};

export default SearchPage;
