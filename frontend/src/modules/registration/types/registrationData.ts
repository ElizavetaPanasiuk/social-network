export type RegistrationData = {
  email: string;
  password: string;
  passwordRepeat: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  city: string;
  avatar: File | null;
};
