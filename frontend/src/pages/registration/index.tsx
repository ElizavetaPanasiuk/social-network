import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Finish, Step1, Step2, Step3, Step4 } from './components';
import { Box } from '@/ui-kit';
import styles from './styles.module.scss';
import RegistrationService from './service';
import { RegistrationData } from './types/registrationData';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { signIn } from '@/store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    dateOfBirth: '',
    country: '',
    city: '',
    avatar: null,
  });

  const onContinue = () => {
    setStep(step + 1);
  };

  const onSubmit = async () => {
    const { access_token } = await registrationService.signUp(registrationData);
    Cookies.set('token', access_token);
    const { id, firstName, lastName } = jwtDecode(access_token) as {
      id: number;
      firstName: string;
      lastName: string;
    };
    dispatch(signIn({ id, firstName, lastName }));
    navigate(`/profile/${id}`);

    //setStep(5); // return step 5 when add activation by email
  };

  const onChange = (key: keyof typeof registrationData, value: string | File) => {
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
        onSubmit={onSubmit}
        onChange={onChange}
      />,
    ],
    [5, <Finish />],
  ]);

  return (
    <Box className={styles.registrationContainer}>
      <h1>{t('Registration')}</h1>
      {contentMap.get(step)}
    </Box>
  );
};

export default RegistrationPage;
