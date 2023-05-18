import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Finish, Step1, Step2, Step3, Step4 } from './components';
import { Box } from '@/ui-kit';
import styles from './styles.module.scss';
import { RegistrationService } from '@/lib/service';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { signIn } from '@/store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, useMutation } from '@/hooks';
import { Form, LanguageSelector } from '@/components';
import FIELDS_LENGTH from '@/lib/constants/fields-length';
import { RegistrationData } from './types/registrationData';

const RegistrationPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const registrationService = new RegistrationService();
  const { formData, onChange, isValid } = useForm({
    email: {
      value: '',
      minLength: FIELDS_LENGTH.EMAIL.MIN,
      maxLength: FIELDS_LENGTH.EMAIL.MAX,
    },
    password: {
      value: '',
      minLength: FIELDS_LENGTH.PASSWORD.MIN,
      maxLength: FIELDS_LENGTH.PASSWORD.MAX,
    },
    passwordRepeat: {
      value: '',
      minLength: FIELDS_LENGTH.PASSWORD.MIN,
      maxLength: FIELDS_LENGTH.PASSWORD.MAX,
    },
    firstName: {
      value: '',
      minLength: FIELDS_LENGTH.FIRST_NAME.MIN,
      maxLength: FIELDS_LENGTH.FIRST_NAME.MAX,
    },
    lastName: {
      value: '',
      minLength: FIELDS_LENGTH.LAST_NAME.MIN,
      maxLength: FIELDS_LENGTH.LAST_NAME.MAX,
    },
    birthYear: {
      value: null,
    },
    birthMonth: {
      value: null,
    },
    birthDate: {
      value: null,
    },
    country: {
      value: '',
      minLength: FIELDS_LENGTH.COUNTRY.MIN,
      maxLength: FIELDS_LENGTH.COUNTRY.MAX,
    },
    city: {
      value: '',
      minLength: FIELDS_LENGTH.CITY.MIN,
      maxLength: FIELDS_LENGTH.CITY.MAX,
    },
    avatar: {
      value: null,
    },
  });

  const onContinue = () => {
    setStep(step + 1);
  };

  const { mutate: onSubmit } = useMutation(
    () =>
      registrationService.signUp({
        email: formData.email.value,
        password: formData.password.value,
        firstName: formData.firstName.value,
        lastName: formData.lastName.value,
        country: formData.country.value,
        city: formData.city.value,
        avatar: formData.avatar.value,
        dateOfBirth: new Date(
          formData.birthYear.value as number,
          formData.birthMonth.value as number,
          formData.birthDate.value as number,
        ),
      }),
    {
      onSuccess: (result) => {
        const { access_token } = result;
        Cookies.set('token', access_token);
        const { id, firstName, lastName } = jwtDecode(access_token) as {
          id: number;
          firstName: string;
          lastName: string;
        };
        dispatch(signIn({ id, firstName, lastName }));
        navigate(`/profile/${id}`);

        //setStep(5); // return step 5 when add activation by email
      },
    },
  );

  const contentMap = new Map([
    [
      1,
      <Step1
        onContinue={onContinue}
        registrationData={formData as RegistrationData}
        onChange={onChange}
      />,
    ],
    [
      2,
      <Step2
        onContinue={onContinue}
        registrationData={formData as RegistrationData}
        onChange={onChange}
      />,
    ],
    [
      3,
      <Step3
        onContinue={onContinue}
        registrationData={formData as RegistrationData}
        onChange={onChange}
      />,
    ],
    [4, <Step4 onChange={onChange} />],
    [5, <Finish />],
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
