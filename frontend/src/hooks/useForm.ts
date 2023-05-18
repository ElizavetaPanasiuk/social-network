import { useState, useEffect } from 'react';

type Field = {
  value: string | number | null | File;
  maxLength?: number;
  minLength?: number;
};

type Fields = {
  [fieldName: string]: Field;
};

type FormData = {
  [fieldName: string]: Field & { valid: boolean };
};

const useForm = (fields: Fields) => {
  const initFormData = () => {
    const initialFormData: FormData = {};
    Object.keys(fields).forEach((field: string) => (initialFormData[field] = { ...fields[field], valid: true }));
    return initialFormData;
  };

  const [formData, setFormData] = useState<FormData>(initFormData());
  const [formValid, setFormValid] = useState(true);

  const validateField = (fieldName: keyof typeof formData, newValue: string) => {
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
    return formData[fieldName].valid;
  };

  const onChange = (fieldName: keyof typeof formData, newValue: string) => {
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
};

export default useForm;
