import { useTranslation } from 'react-i18next';
import { FormEvent, useState } from 'react';
import { Finish, Step1, Step2, Step3, Step4 } from './components';
import { Box } from '@/ui-kit';
import styles from './styles.module.scss';
import { RegistrationService } from '@/lib/service';
import { RegistrationData } from './types/registrationData';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { signIn } from '@/store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@/hooks';
import { Form, LanguageSelector } from '@/components';

const RegistrationPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const registrationService = new RegistrationService();
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    email: '',
    password: '',
    passwordRepeat: '',
    firstName: '',
    lastName: '',
    dateOfBirth: {
      year: null,
      month: null,
      date: null,
    },
    country: '',
    city: '',
    avatar: null,
  });

  const onContinue = () => {
    setStep(step + 1);
  };

  const { mutate: onSubmit } = useMutation(
    () =>
      registrationService.signUp({
        ...registrationData,
        dateOfBirth: new Date(
          registrationData.dateOfBirth.year,
          registrationData.dateOfBirth.month,
          registrationData.dateOfBirth.date,
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

  const onChange = (
    key: keyof typeof registrationData,
    value: string | File | keyof typeof registrationData.dateOfBirth,
  ) => {
    setRegistrationData({
      ...registrationData,
      [key]: value,
    });
  };

  const contentMap = new Map([
    [
      1,
      <Step1
        onContinue={onContinue}
        registrationData={registrationData}
        onChange={onChange}
      />,
    ],
    [
      2,
      <Step2
        onContinue={onContinue}
        registrationData={registrationData}
        onChange={onChange}
      />,
    ],
    [
      3,
      <Step3
        onContinue={onContinue}
        registrationData={registrationData}
        onChange={onChange}
      />,
    ],
    [
      4,
      <Step4
        onChange={onChange}
      />,
    ],
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
