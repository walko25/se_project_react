import { useState, useCallback } from "react";

// Tracks form values, validation error messages and overall validity.
export function useFormWithValidation(defaultValues = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((evt) => {
    const { name, value, validationMessage } = evt.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: validationMessage }));

    const form = evt.target.closest("form");
    if (form) setIsValid(form.checkValidity());
    else setIsValid(false);
  }, []);

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, []);

  return { values, setValues, handleChange, errors, isValid, resetForm };
}

export default useFormWithValidation;
