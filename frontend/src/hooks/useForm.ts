import { useState, useEffect } from 'react';
import { Fields, FormData } from '@/lib/global/types';

function useForm<T>(fields: Fields<T>, outerDataLoader?: boolean) {
  const validateField = (fieldName: keyof typeof fields, newValue: T) => {
    if (typeof newValue === 'string') {
      const { minLength, maxLength } = fields[fieldName];
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

    return true;
  };

  const initFormData = () => {
    const initialFormData: FormData<T> = {};
    Object.keys(fields).forEach(
      (field: string) =>
        (initialFormData[field] = { ...fields[field], valid: validateField(field, fields[field].value) }),
    );
    return initialFormData;
  };

  const [formData, setFormData] = useState<FormData<T>>(initFormData());
  const [formValid, setFormValid] = useState(true);

  const onChange = (fieldName: keyof typeof formData, newValue: T) => {
    setFormData({
      ...formData,
      [fieldName]: { ...formData[fieldName], value: newValue, valid: validateField(fieldName, newValue) },
    });
  };

  const resetForm = () => {
    setFormData(initFormData());
  };

  useEffect(() => {
    const isFormValid = Object.values(formData).every((field) => field.valid);
    setFormValid(isFormValid);
  }, [formData]);

  useEffect(() => {
    setFormData(initFormData());
  }, [outerDataLoader]);

  return { formData, onChange, isValid: formValid, resetForm };
}

export default useForm;
