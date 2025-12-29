import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { coordinates, APIKey } from "../../utils/constants";
import Header from "../Header/Header";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  signup as register,
  signin as login,
  checkToken,
} from "../../utils/auth";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
  updateProfile,
} from "../../utils/api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");

    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData, token)
      .then((newItem) => {
        console.log(newItem.data);
        const normalized = {
          _id: newItem.data._id ?? newItem.data.id,
          name: newItem.data.name,
          imageUrl: newItem.data.imageUrl ?? newItem.data.link,
          weather: newItem.data.weather
            ? newItem.data.weather.toLowerCase()
            : "",
          owner:
            newItem.data.owner || currentUser?.data?._id || currentUser?._id,
          likes: newItem.data.likes || [],
        };

        setClothingItems((prevItems) => [normalized, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleUpdateUser = (userData) => {
    const token = localStorage.getItem("jwt");

    updateProfile(userData, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    removeItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardLike = ({ id, isLiked, handleCardLike }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((error) => {
            console.error("Error adding like:", error);
          })
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((error) => {
            console.error("Error removing like:", error);
          });
  };

  const handleCreateModal = () => setActiveModal("add-garment");
  const handleRegisterModal = () => setActiveModal("register");
  const handleLoginModal = () => setActiveModal("login");
  const closeAuthModal = () => setActiveModal("");

  const handleRegistration = (userData, reset) => {
    register(userData)
      .then(() => login({ email: userData.email, password: userData.password }))
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeAuthModal();
        if (typeof reset === "function") reset();
      })
      .catch((err) => console.error("Registration failed:", err));
  };

  const handleLogin = (userData, reset) => {
    login(userData)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeAuthModal();
        if (typeof reset === "function") reset();
      })
      .catch((err) => console.error("Login failed:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchWeatherFor = (coords) => {
      getWeather(coords, APIKey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);
    };

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          fetchWeatherFor(userCoords);
        },
        (err) => {
          console.warn("Geolocation failed, using default coordinates:", err);
          fetchWeatherFor(coordinates);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
      );
    } else {
      fetchWeatherFor(coordinates);
    }

    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }

    getItems()
      .then((data) => {
        const normalized = data.map((item) => ({
          _id: item._id ?? item.id,
          name: item.name,
          imageUrl: item.imageUrl ?? item.link,
          weather: item.weather ? item.weather.toLowerCase() : "",
          likes: item.likes || [],
          owner: item.owner,
        }));
        setClothingItems(normalized);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              onCreateModal={handleCreateModal}
              onRegisterModal={handleRegisterModal}
              onLoginModal={handleLoginModal}
              onLogout={handleLogout}
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      currentUser={currentUser}
                      onEditProfileModal={handleEditProfileModal}
                      onLogout={handleLogout}
                      isLoggedIn={isLoggedIn}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          {/* <ModalWithForm
          isOpen={activeModal === "add-garment"}
          title="New garment"
          buttonText="Add garment"
          onClose={closeActiveModal}
        ></ModalWithForm> */}
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            title="New garment"
            name="new-card"
            buttonText="Add garment"
            onClose={closeActiveModal}
            handleAddItem={handleAddItem}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onRegister={handleRegistration}
            onCloseModal={closeAuthModal}
            onLoginClick={handleLoginModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            onCloseModal={closeAuthModal}
            onRegisterClick={handleRegisterModal}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={handleDeleteItem}
          />
          {activeModal === "edit-profile" && (
            <EditProfileModal
              onClose={closeActiveModal}
              onUpdateUser={handleUpdateUser}
              isOpen={activeModal === "edit-profile"}
            />
          )}
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
