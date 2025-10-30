import "./ItemModal.css";
import closeIconWhite from "../../assets/close-icon-white.png";

function ItemModal({ activeModal, onClose, card, onDeleteItem }) {
  const handleDeleteClick = () => {
    if (!card._id) {
      console.error("Item ID is missing:", card);
      return;
    }
    onDeleteItem(card._id);
  };

  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal__opened" : ""}`}
    >
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} className="modal__close" type="button">
          <img src={closeIconWhite} alt="Close" className="modal__close-icon" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <button className="modal__delete" onClick={handleDeleteClick}>
            Delete Item
          </button>
        </div>
        <div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
