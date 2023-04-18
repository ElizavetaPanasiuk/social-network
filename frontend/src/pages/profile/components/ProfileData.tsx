import { Box } from '@/ui-kit';
import { ProfileData as ProfileDataType } from '../types';

const ProfileData = ({ firstName, lastName, dateOfBirth, country, city }: ProfileDataType) => {
  return (
    <Box>
      <h1>
        {firstName} {lastName}
      </h1>
      <p>Birthday: {dateOfBirth.toString()}</p>
      <p>Country: {country}</p>
      <p>City: {city}</p>
    </Box>
  );
};

export default ProfileData;
