import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import { Form, LanguageSelector } from '@/components';
import { useForm, useMutation } from '@/hooks';
import FIELDS_VALIDATION_RULES from '@/lib/constants/fields-validation-rules';
import { AuthService } from '@/lib/service';
import { signIn } from '@/store/userSlice';
import { Box } from '@/ui-kit';
import { DateObj } from '@/lib/global/types';

import { Step1, Step2, Step3, Step4 } from './components';
import styles from './styles.module.scss';

const RegistrationPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const authService = new AuthService();

  const { formData, onChange, isValid } = useForm<string | File | DateObj | null>({
    email: {
      value: '',
      minLength: FIELDS_VALIDATION_RULES.EMAIL.MIN,
      maxLength: FIELDS_VALIDATION_RULES.EMAIL.MAX,
      regexp: FIELDS_VALIDATION_RULES.EMAIL.REGEXP,
    },
    password: {
      value: '',
      minLength: FIELDS_VALIDATION_RULES.PASSWORD.MIN,
      maxLength: FIELDS_VALIDATION_RULES.PASSWORD.MAX,
      regexp: FIELDS_VALIDATION_RULES.PASSWORD.REGEXP,
    },
    passwordRepeat: {
      value: '',
      minLength: FIELDS_VALIDATION_RULES.PASSWORD.MIN,
      maxLength: FIELDS_VALIDATION_RULES.PASSWORD.MAX,
      regexp: FIELDS_VALIDATION_RULES.PASSWORD.REGEXP,
    },
    firstName: {
      value: '',
      minLength: FIELDS_VALIDATION_RULES.FIRST_NAME.MIN,
      maxLength: FIELDS_VALIDATION_RULES.FIRST_NAME.MAX,
    },
    lastName: {
      value: '',
      minLength: FIELDS_VALIDATION_RULES.LAST_NAME.MIN,
      maxLength: FIELDS_VALIDATION_RULES.LAST_NAME.MAX,
    },
    dateOfBirth: {
      value: {
        year: null,
        month: null,
        date: null,
      },
    },
    country: {
      value: '',
      minLength: FIELDS_VALIDATION_RULES.COUNTRY.MIN,
      maxLength: FIELDS_VALIDATION_RULES.COUNTRY.MAX,
    },
    city: {
      value: '',
      minLength: FIELDS_VALIDATION_RULES.CITY.MIN,
      maxLength: FIELDS_VALIDATION_RULES.CITY.MAX,
    },
    avatar: {
      value: null,
    },
  });

  const { mutate: onSubmit, loading } = useMutation(
    () => {
      const dateOfBirth = formData.dateOfBirth.value as DateObj;
      return authService.signUp({
        email: formData.email.value as string,
        password: formData.password.value as string,
        firstName: formData.firstName.value as string,
        lastName: formData.lastName.value as string,
        country: formData.country.value as string,
        city: formData.city.value as string,
        avatar: formData.avatar.value as File,
        dateOfBirth: new Date(dateOfBirth.year as number, dateOfBirth.month as number, dateOfBirth.date as number),
      });
    },
    {
      onSuccess: (result) => {
        const { access_token } = result;
        Cookies.set('token', access_token);
        const { id, firstName, lastName } = jwtDecode<{ id: number; firstName: string; lastName: string; exp: number }>(
          access_token,
        );
        dispatch(signIn({ id, firstName, lastName }));
        navigate(`/profile/${id}`);
      },
    },
  );

  const onContinue = () => {
    setStep(step + 1);
  };

  const contentMap = new Map([
    [
      1,
      <Step1
        onContinue={onContinue}
        registrationData={formData}
        onChange={onChange}
        key={1}
      />,
    ],
    [
      2,
      <Step2
        onContinue={onContinue}
        registrationData={formData}
        onChange={onChange}
        key={2}
      />,
    ],
    [
      3,
      <Step3
        onContinue={onContinue}
        registrationData={formData}
        onChange={onChange as (key: string | number, value: string | DateObj) => void}
        key={3}
      />,
    ],
    [
      4,
      <Step4
        onChange={onChange as (key: string, value: File | string) => void}
        registrationData={formData}
        isFormDataValid={isValid}
        loading={loading}
        key={4}
      />,
    ],
  ]);

  return (
    <>
      <Form
        className={styles.registrationFrom}
        onSubmit={onSubmit}
      >
        <Box className={styles.registrationContainer}>
          <h1>{t('Registration')}</h1>
          {contentMap.get(step)}
        </Box>
      </Form>
      <LanguageSelector />
    </>
  );
};

export default RegistrationPage;
