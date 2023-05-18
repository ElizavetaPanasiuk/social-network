import { Field } from '@/lib/global/types';

export type RegistrationData = {
  email: Field;
  password: Field;
  passwordRepeat: Field;
  firstName: Field;
  lastName: Field;
  birthYear: Field;
  birthMonth: Field;
  birthDate: Field;
  country: Field;
  city: Field;
  avatar: Field;
};
