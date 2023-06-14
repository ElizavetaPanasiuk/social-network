import { useState, useEffect } from 'react';

import { Fields, FormData, FormField } from '@/lib/global/types';

function useForm<T>(fields: Fields<T>, outerDataLoader?: boolean) {
  const validateField = (fieldName: keyof typeof fields, newValue: unknown) => {
    let isValid = true;

    if (typeof newValue === 'string') {
      const { minLength, maxLength, regexp } = fields[fieldName];
      const newValueLength = newValue.length;

      if (regexp) {
        isValid = regexp.test(newValue);
      }
      if (minLength) {
        isValid = isValid && newValueLength >= minLength;
      }
      if (maxLength) {
        isValid = isValid && newValueLength <= maxLength;
      }
    }

    if (newValue && typeof newValue === 'object' && 'year' in newValue && 'month' in newValue && 'date' in newValue) {
      isValid = isValid && newValue.year !== null && newValue.month !== null && newValue.date !== null;
    }

    return isValid;
  };

  const initFormData = () => {
    const initialFormData: FormData<T> = {} as FormData<T>;

    Object.keys(fields).forEach((field: string) => {
      const currentField = field as keyof T;
      initialFormData[currentField] = {
        ...fields[currentField],
        valid: validateField(currentField, fields[currentField].value),
      };
    });

    return initialFormData;
  };

  const [formData, setFormData] = useState<FormData<T>>(initFormData());
  const [formValid, setFormValid] = useState(true);

  const onChange = (fieldName: keyof typeof formData, newValue: unknown) => {
    setFormData({
      ...formData,
      [fieldName]: { ...formData[fieldName], value: newValue, valid: validateField(fieldName, newValue) },
    });
  };

  const resetForm = () => {
    setFormData(initFormData());
  };

  useEffect(() => {
    const isFormValid = Object.values(formData).every((field) => (field as FormField<T>).valid);
    setFormValid(isFormValid);
  }, [formData]);

  useEffect(() => {
    setFormData(initFormData());
  }, [outerDataLoader]);

  return { formData, onChange, isValid: formValid, resetForm };
}

export default useForm;
