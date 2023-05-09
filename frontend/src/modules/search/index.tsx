import { ProfileRow } from '@/components';
import { useQuery } from '@/hooks';
import { ProfileService } from '@/lib/service';
import { Loader, Input, Select } from '@/ui-kit';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

const SearchPage = () => {
  const { t } = useTranslation();
  const profileService = new ProfileService();
  const [searchString, setSearchString] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const { loading, error, data, setData } = useQuery(
    () => profileService.searchUsers({ search: searchString, city, country }),
    { dependencies: [country, city, searchString] },
  );

  return (
    <div className={styles.searchPage}>
      <div>
        <Input
          value={searchString}
          onChange={setSearchString}
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
          options={[{ value: 'Belarus', label: 'Belarus' }]}
          value={country}
          onChange={setCountry}
        />
        <Select
          label={t('City')}
          options={[{ value: 'Minsk', label: 'Minsk' }]}
          value={city}
          onChange={setCity}
        />
      </div>
    </div>
  );
};

export default SearchPage;
