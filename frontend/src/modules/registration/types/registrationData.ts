export type RegistrationData = {
  email: string;
  password: string;
  passwordRepeat: string;
  firstName: string;
  lastName: string;
  dateOfBirth: {
    year: number;
    month: number;
    date: number;
  };
  country: string;
  city: string;
  avatar: File | null;
};
