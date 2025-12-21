import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon.png";

function ModalWithForm({
  title,
  name,
  buttonText = "save",
  activeModal,
  onClose,
  isOpen,
  children,
  onSubmit,
  isFormValid = false,
}) {
  return (
    <div className={`modal ${isOpen && "modal__opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} className="modal__close" type="button">
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button
            className={`modal__submit ${
              isFormValid ? "modal__submit_active" : ""
            }`}
            type="submit"
          >
            {isFormValid ? "Add" : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
