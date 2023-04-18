import { Box } from "@/ui-kit";

type ProfileDataProps = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  country: string;
  city: string;
};

const ProfileData = ({
  firstName,
  lastName,
  dateOfBirth,
  country,
  city,
}: ProfileDataProps) => {
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
