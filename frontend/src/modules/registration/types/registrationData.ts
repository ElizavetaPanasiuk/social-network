import { FormField } from '@/lib/global/types';

export type RegistrationData = {
  email: FormField;
  password: FormField;
  passwordRepeat: FormField;
  firstName: FormField;
  lastName: FormField;
  dateOfBirth: FormData;
  country: FormField;
  city: FormField;
  avatar: FormField;
};
