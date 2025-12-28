import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const AddItemModal = ({ isOpen, handleAddItem, onClose }) => {
  const defaultValues = { name: "", imageUrl: "", weather: "" };
  const { values, handleChange } = useForm(defaultValues);

  const [touched, setTouched] = useState({
    name: false,
    imageUrl: false,
    weather: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  function isValidUrl(url) {
    if (!url) return false;
    try {
      const test = url.match(/^https?:\/\//i) ? url : `https://${url}`;
      new URL(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  const isFormValid =
    values.name &&
    values.name.trim() &&
    isValidUrl(values.imageUrl) &&
    values.weather;

  const nameInvalid = touched.name && (!values.name || !values.name.trim());

  const imageInvalid = touched.imageUrl && !isValidUrl(values.imageUrl);

  const weatherInvalid = touched.weather && !values.weather;

  const validateField = (fieldName, value) => {
    if (touched[fieldName]) {
      if (value.trim() === "") {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: "This field is required",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setTouched({ name: false, imageUrl: false, weather: false });
      setErrors({ name: "", imageUrl: "", weather: "" });
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleAddItem(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      onClose={onClose}
      isOpen={isOpen}
      buttonText="Add garment"
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label
        htmlFor="name"
        className={`modal__label ${nameInvalid ? "modal__label_invalid" : ""}`}
      >
        Name
        <input
          type="text"
          name="name"
          className={`modal__input ${
            nameInvalid ? "modal__input_invalid" : ""
          }`}
          id="name"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
          onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
        />
      </label>
      <label
        htmlFor="imageUrl"
        className={`modal__label ${imageInvalid ? "modal__label_invalid" : ""}`}
      >
        Image
        <input
          type="url"
          name="imageUrl"
          className={`modal__input ${
            imageInvalid ? "modal__input_invalid" : ""
          }`}
          id="imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
          onBlur={() => setTouched((prev) => ({ ...prev, imageUrl: true }))}
        />
      </label>
      <fieldset
        className={`modal__radio-buttons ${
          weatherInvalid ? "modal__radio-buttons_invalid" : ""
        }`}
      >
        <legend
          className={`modal__legend ${
            weatherInvalid ? "modal__legend_invalid" : ""
          }`}
        >
          Select the weather type:
        </legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="hot"
            onChange={handleChange}
            onBlur={() => setTouched((prev) => ({ ...prev, weather: true }))}
            required
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="warm"
            onChange={handleChange}
            onBlur={() => setTouched((prev) => ({ ...prev, weather: true }))}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="cold"
            onChange={handleChange}
            onBlur={() => setTouched((prev) => ({ ...prev, weather: true }))}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
