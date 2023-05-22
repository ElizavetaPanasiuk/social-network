import { useState, useEffect } from 'react';
import { Fields, FormData } from '@/lib/global/types';

function useForm<T>(fields: Fields<T>) {
  const initFormData = () => {
    const initialFormData: FormData<T> = {};
    Object.keys(fields).forEach((field: string) => (initialFormData[field] = { ...fields[field], valid: false }));
    return initialFormData;
  };

  const [formData, setFormData] = useState<FormData<T>>(initFormData());
  const [formValid, setFormValid] = useState(true);

  const validateField = (fieldName: keyof typeof formData, newValue: T) => {
    if (typeof newValue === 'string') {
      const { minLength, maxLength } = formData[fieldName];
      const newValueLength = newValue.length;
      if (minLength && maxLength) {
        return newValueLength <= maxLength && newValueLength >= minLength;
      }
      if (minLength) {
        return newValueLength >= minLength;
      }
      if (maxLength) {
        return newValueLength <= maxLength;
      }
    } else if (newValue instanceof File || fieldName === 'dateOfBirth') {
      return true;
    }

    return formData[fieldName].valid;
  };

  const onChange = (fieldName: keyof typeof formData, newValue: T) => {
    setFormData({
      ...formData,
      [fieldName]: { ...formData[fieldName], value: newValue, valid: validateField(fieldName, newValue) },
    });
  };

  useEffect(() => {
    const isFormValid = Object.values(formData).every((field) => field.valid);
    setFormValid(isFormValid);
  }, [formData]);

  return { formData, onChange, isValid: formValid };
}

export default useForm;
